#!/usr/bin/env python3
"""Initialize flask app"""
from flask import Flask
from .routes import bp as main_bp


def create_app():
    """factory function to initialize flask app, register
    Blueprints, and set configurations.
    Returns:
        Flask app instance
    """
    app = Flask(__name__)
    
    app.register_blueprint(main_bp)

    return app