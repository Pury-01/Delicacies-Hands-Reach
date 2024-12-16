#!/usr/bin/env python3
"""API endpoints"""
from flask import Blueprint, send_from_directory, jsonify, request, session
import os
import requests
import asyncio
import aiohttp
from dotenv import load_dotenv
from . import db
from .models import User
from werkzeug.security import check_password_hash


# Load environment variables
load_dotenv()


bp = Blueprint("main", __name__)


# serve react build files
@bp.route("/", methods=['GET'])
def Serve_react_app():
    """serve the React app's index.html for the root route.
    """
    return send_from_directory(bp.static_folder, 'index.html')

@bp.route('/api/recipes', methods=['GET'])
async def get_recipes():
    """endpoint to fetch recipes from Spoonacular API"""
    # fetch the query parameter from the request
    ingredients = request.args.get('ingredients', '')
    
    API_KEY = os.getenv('SPOONACULAR_API_KEY')
    find_recipe_url = "https://api.spoonacular.com/recipes/findByIngredients"
    

    # parameters to pass to Spoonacular API
    params = {
        "ingredients": ingredients,
        "apiKey": API_KEY,
        "number": 10
    }
    
    # empty list to stre the recipes
    recipes = []

    # perform http requests asyncronously
    async with aiohttp.ClientSession() as session:
        try:
             # send GET request to the Spoonacular API asynchronously
             async with session.get(find_recipe_url, params=params) as response:
                # raise an exception if request fails
                response.raise_for_status()

                # parse the response
                data = await response.json()

                # get recipes from the response
                for recipe in data:
                    # request to get the recipe steps from a 2nd endpoint API
                    recipe_steps_url = f"https://api.spoonacular.com/recipes/{recipe['id']}/analyzedInstructions"
                    async with session.get(recipe_steps_url, params={"apiKey": API_KEY}) as steps_response:
                        steps_response.raise_for_status()
                        steps_data = await steps_response.json()

                        # add the steps to the recipe
                        steps = steps_data[0]['steps'] if steps_data else []

                    # store the recipe's data 
                    recipes.append({
                        "id": recipe.get('id'),
                        "name": recipe.get('title'),
                        "ingredients": [
                            ingredient.get('name') for ingredient in recipe.get('usedIgredients', []) + recipe.get('missedIngredients', []) 
                            ],
                            "steps":  [step['step'] for step in steps]
    })
            
        except requests.exceptions.RequestException as e:
            return jsonify({"error": str(e)}), 500
    return jsonify(recipes)        

# route to handle user signup
@bp.route("/signup", methods=['POST'])
def signup():
    """create new user"""
    # get data from the request
    data = request.get_json()
    # print(f"Recieved data: {data}")
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    # check if user already exists
    if User.query.filter_by(username=username).first():
        return jsonify({"error": "Username already exists"}), 400
    
    if User.query.filter_by(email=email).first():
        return jsonify({"error": "Email is already registered"}), 400
    
    # create a new user object
    user = User(username=username, email=email)

    # hash and set password
    user.set_password(password)

    # save the user to the database
    db.session.add(user)
    db.session.commit()
    # print("user saved to DB")

    # return success message
    return jsonify({"message": "account created successsfuly"}), 201

@bp.route("/login", methods=['POST'])
def login():
    """user login"""
    # get data from request
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    # check if user exists
    user = User.query.filter_by(username=username).first()

    if user and check_password_hash(user.password_hash, password):
        # store user ID in session to maintain login state
        session['user_id'] = user.id
        return jsonify({"message": "Login successful"}), 200

    return jsonify({"error": "invalid username or password"}), 401 


# route to save recipe for user
@bp.route("/api/save_recipe", methods=['POST'])
def save_recipe():
    """Endpoint to save a recipe for a specific user."""
    # parse incoming Json request data and extract User Id and recipe ID
    data = request.get_json()
    user_id = data.get('user_id')
    recipe_id = data.get('recipe_id')

    try:
        # SQL query to insert a new record into saved_recipes table
        query = "INSERT INTO saved_recipes (user_id, recipe_id) VALUES (%s, %s)"
        # execute query
        db.engine.execute(query,  (user_id, recipe_id))
        return jsonify({'message': 'Recipe saved successfully'}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 400

# Route to retrive all saved recipes for a specific user
@bp.route('/api/saved_recipes', methods=['GET'])
def get_saved_recipes():
    user_id = request.arg.get('user_id')
    try:
        query = "SELECT recipes.* FROM recipes JOIN saved_recipes ON recipes.id = saved_recipes.recipe_id WHERE saved_recipes.user_id = %s"
        results = db.engine.execute(query, (user_id,))
        recipes = [dict(row) for row in results]
        return jsonify(recipes), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400