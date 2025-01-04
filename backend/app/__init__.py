#!/usr/bin/env python3
"""Initialize flask app"""
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import os
from flask_migrate import Migrate
from .config import Config
from flask_cors import CORS
import logging


# initialize SQLAlchemy
db = SQLAlchemy()
migrate = Migrate()

def create_app():
    """factory function to initialize flask app, register
    Blueprints, and set configurations.
    Returns:
        Flask app instance
    """
    app = Flask(__name__, static_folder=os.path.join(os.path.abspath(os.path.dirname(__file__)), 'static/static')) 
    
    # allow cross origin requests
    CORS(app,
         resources={r"/*": {
            "supports_credentials": True,
            "origins": ['http://localhost:3000'],
            "allow_headers" : ['Content-Type', 'Authorization'],
            "expose_headers": ['Set-Cookie'],
            "methods": ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
          }})
    # Load configuration
    app.config.from_object(Config)

    # set up logging
    logging.basicConfig(level=logging.DEBUG)
    
    # initialize database
    db.init_app(app)
    migrate.init_app(app, db)
    
    # register blueprint
    from .routes import bp as main_bp
    app.register_blueprint(main_bp)

    return app