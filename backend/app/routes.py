#!/usr/bin/env python3
"""API endpoints"""
from flask import (
    Blueprint,
    send_from_directory, 
    jsonify, 
    request, 
    session, 
    redirect,
    url_for,
)
import os
import requests
import asyncio
import aiohttp
from dotenv import load_dotenv
from . import db
from .models.user import User
from .models.recipe import Recipe
from werkzeug.security import check_password_hash
from functools import wraps


# Load environment variables
load_dotenv()


bp = Blueprint("main", __name__)


# Login decorator to ensure users login to access protected page
def login_required(func):
    """Decorator to ensure a user is logged in"""
    @wraps(func)
    def wrapper(*args, **kwargs):
        """validate users"""
        user_id = session.get('user_id')
        if not user_id:
            return jsonify({"error": "User not logged in", "redirect": "/login"}), 401
        
        user = User.query.get(user_id)
        if not user:
            session.clear()
            return jsonify({"error": "User does not exist", "redirect": "/signup"}), 404
        return func(user=user, *args, **kwargs)
    return wrapper
    
# serve react build files
@bp.route("/", methods=['GET'])
def Serve_react_app():
    """serve the React app's index.html for the root route.
    """
    # return send_from_directory(bp.static_folder, 'index.html')
    return send_from_directory(os.path.join(os.path.abspath(os.path.dirname(__file__)), 'static'), 'index.html')

# route to serve any other static file requested
@bp.route("/static/<path:path>")
def serve_static_file(path):
    """serve any other static file requested"""
    return send_from_directory(os.path.join(os.path.abspath(os.path.dirname(__file__)), 'static', 'static'), path)

# home route
@bp.route('/home', methods=['GET'])
def home():
    """Home page"""
    return 

# fetch recipes from Spoonacular API
@bp.route('/api/recipes', methods=['GET'])
async def get_recipes():
    """endpoint to fetch recipes from Spoonacular API"""
    # fetch the query parameter from the request
    ingredients = request.args.get('query', '')
    # set default  page as page 1 with 10 recipes per page
    page = int(request.args.get('page', 1))
    limit = min(max(int(request.args.get('limit', 10)), 1), 30)
    offset = (page - 1) * limit
    

    API_KEY = os.getenv('SPOONACULAR_API_KEY')
    find_recipe_url = "https://api.spoonacular.com/recipes/findByIngredients"
    

    # parameters to pass to Spoonacular API
    params = {
        "ingredients": ingredients,
        "apiKey": API_KEY,
        "number": limit,
        "offset": offset,
    }
    
    # empty list to store the recipes
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
                        "image": recipe.get('image'),
                        "ingredients": [
                            ingredient.get('name') for ingredient in recipe.get('usedIngredients', []) + recipe.get('missedIngredients', []) 
                            ],
                            "steps":  [step['step'] for step in steps]
    })
            
        except requests.exceptions.RequestException as e:
            return jsonify({"error": str(e)}), 500
    return jsonify({
        "recipes": recipes,
        "page": page,
        "limit": limit
        })


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
    
    return jsonify({
        "message": "Account created successsfuly",
        # "Login_url": url_for("main.login")
                    }), 201

@bp.route("/login", methods=['POST'])
def login():
    """user login"""
    # if user is already logged in, redirect to the homepage
    if 'user_id' in session:
        return jsonify({"message": "Already logged in", "redirect_url": "/"}), 200
    
    # get data from request
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    # check if user exists
    user = User.query.filter_by(email=email).first()

    if user and check_password_hash(user.password_hash, password):
        # store user ID in session to maintain login state
        session['user_id'] = user.id
        print(f"Session set: {session}")
        return jsonify({"message": "Login successful", "redirect_url": "/user/recipes"}), 200

    return jsonify({
        "error": "invalid email or password",
        "Signup_url": url_for("main.signup")
                    }), 401 
    
# protected route for user recipes page
@bp.route("/user/recipes", methods=['GET'])
@login_required
def user_recipes_page(user):
    """Page where user manage their own recipes"""
    # fetch user recipes from database
    recipes = Recipe.query.filter_by(user_id=user.id).all()

    # empty list for users with no recipes
    if not recipes:
        return jsonify({
            "message": "No saved recipes! Add and save your recipes",
            "recipes": []
        })

    # Return user recipes
    recipe_list = [
        {
            "id": recipe.id,
            "title": recipe.title,
            "ingredients": recipe.ingredients,
            "steps": recipe.steps
        } for recipe in recipes
    ]

    return jsonify({
        "recipes": recipe_list
    })

# user adds new recipe
@bp.route("/user/recipe", methods=['POST'])
@login_required
def add_recipe(user):
    """Endpoint to add recipe"""
    print(request.headers.get('Authorization'))
    # Get data from the request
    data = request.get_json()
    recipe = Recipe(
        title = data.get('title'),
        ingredients = data.get('ingredients'),
        steps = data.get('steps'),
        user_id = user.id
    )
    # save to db
    db.session.add(recipe)
    db.session.commit()

    return jsonify({
        "message": "Recipe added successfully",
        "recipe": {
            "id": recipe.id,
            "title": recipe.title,
            "ingredients": recipe.ingredients,
            "steps": recipe.steps
        }
    }), 201

# update or edit recipe
@bp.route("/user/recipes/<int:recipe_id>", methods=['PUT'])
@login_required
def edit_recipe(user, recipe_id):
    """Endpoint to edit an existing recipe"""
    recipe = Recipe.query.get(recipe_id)
    if not recipe or recipe.user_id != user.id:
        return jsonify({"error": "Recipe not found"}), 404

    data = request.get_json()
    recipe.title = data.get('title', recipe.title)
    recipe.ingredients = data.get('ingredients', recipe.ingredients)
    recipe.steps = data.get('steps', recipe.steps)

    # save update to db
    db.session.commit()

    return jsonify({
        "message": "Recipe updated successfully",
        "recipe": {
            "id": recipe.id,
            "title": recipe.title,
            "ingredients": recipe.ingredients,
            "steps": recipe.steps
        }
    })    

# delete a recipe
@bp.route("/user/recipes/<int:recipe_id>", methods=['DELETE'])
@login_required
def delete_recipe(user, recipe_id):
    """Endpoint to delete a recipe"""
    recipe = Recipe.query.get(recipe_id)
    if not recipe or recipe.user_id != user.id:
        return jsonify({"error": "Recipe not found"})

    # delete recipe and update the db
    db.session.delete(recipe)
    db.session.commit()

    return jsonify({"message": "Recipe deleted successfully!"})


# Logout endpoint
@bp.route("/logout", methods=['POST'])
def logout():
    """Log out current user by clearing their session"""
    session.clear()
    return jsonify({"message": "Logged out successfully"}), 200
