#!/usr/bin/env python3
"""API endpoints"""
from flask import Blueprint, send_from_directory, jsonify, request
import os
import requests
import asyncio
import aiohttp
from dotenv import load_dotenv
from . import db

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
@bp.route("/api/save", methods=['POST'])
def save_recipe():
    """Endpoint to save a recipe to the database."""
    saved_recipe = {}
    db.session.add(saved_recipe)
    db.session.commit()