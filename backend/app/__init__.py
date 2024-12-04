#!/usr/bin/env python3
"""Initialize the app"""
from flask import Flask


def create_app():
    """instance of flask application"""
    app = Flask(__name__)
    from .routes import bp as main_bp
    app.register_blueprint(main_bp)
    return app