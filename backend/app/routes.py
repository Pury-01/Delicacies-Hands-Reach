#!/usr/bin/env python3
"""home route"""
from flask import Blueprint, send_from_directory, jsonify


bp = Blueprint("main", __name__, static_folder='../frontend/build', static_url_path='/')


# serve react build files
@bp.route("/", methods=['GET'])
def Serve_react_app():
    """serve the React app's index.html for the root route.
    """
    return send_from_directory(bp.static_folder, 'index.html')

@bp.route('/api/recipes', methods=['GET'])
def get_recipes():
    """endpoint to fetch recipes"""
    recipes = []

    return jsonify(recipes)