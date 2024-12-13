#!/usr/bin/env python3
"""Initialize flask app"""
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from .routes import bp as main_bp
import os
from flask_migrate import Migrate


# load environment variables
load_dotenv()

# initialize SQLAlchemy
db = SQLAlchemy()
migrate = Migrate()

def create_app():
    """factory function to initialize flask app, register
    Blueprints, and set configurations.
    Returns:
        Flask app instance
    """
    app = Flask(__name__)

    # configure database
    app.config['SQLALCHEMY_DATABASE_URI'] = (
        f"mysql+pmysql://{os.getenv('DB_USER')}:{os.getenv('DB_PASSWORD')}@"
        f"{os.getenv('DB_HOST')}:{os.getenv('DB_PORT')}/{os.getenv('DB_NAME')}"
    )
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # initialize database
    db.init_app(app)
    migrate.init_app(app, db)
    
    app.register_blueprint(main_bp)

    return app