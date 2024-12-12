#!/usr/bin/env python3
"""API endpoints"""
from flask import Blueprint, send_from_directory, jsonify, request
import requests
from dotenv import load_dotenv

# Load environment variables
load_dotenv()


bp = Blueprint("main", __name__, static_folder='../frontend/build', static_url_path='/')


# serve react build files
@bp.route("/", methods=['GET'])
def Serve_react_app():
    """serve the React app's index.html for the root route.
    """
    return send_from_directory(bp.static_folder, 'index.html')

@bp.route('/api/recipes', methods=['GET'])
def get_recipes():
    """endpoint to fetch recipes from Spoonacular API"""
    # fetch the query parameter from the request
    ingredients = request.args.get('ingredients', '')
    
    API_KEY = "SPOONACULAR_API_KEY"
    find_recipe_url = "https://api.spoonacular.com/recipes/findByIngredients"
    # recipe_steps_url = "https://api.spoonacular.com/recipes/{id}/analyzedInstructions"

    

    # parameters to pass to Spoonacular API
    params = {
        "ingredients": ingredients,
        "apiKey": API_KEY,
        "number": 10
    }
    
    try:
        # send GET request to the Spoonacular API
        response = requests.get(find_recipe_url, params=params)
        # raise an exception if request fails
        response.raise_for_status()

        # parse the response
        data = response.json()
        print(data)

        # get recipes from the response
        recipes = [
            {
                "id": recipe.get('id'),
                "name": recipe.get('title'),
                "ingredients": [
                    ingredient.get('name') for ingredient in recipe.get('usedIgredients', []) + recipe.get('missedIngredients', []) 
                    ]
            }
            for recipe in data
        ]
        return jsonify(recipes)
    except requests.exceptions.RequestException as e:
        return jsonify({"error": str(e)}), 500