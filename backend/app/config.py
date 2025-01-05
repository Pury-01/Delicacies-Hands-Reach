#!/usr/bin/env python3
"""Configuration class"""
import os
from dotenv import load_dotenv
from datetime import timedelta
import tempfile


load_dotenv()


class Config:
    """Configurations"""
    SECRET_KEY = os.getenv('SECRET_KEY') #or secrets.token_urlsafe(32)

    # database
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ECHO = False
    SQLALCHEMY_DATABASE_URI = (
        f"mysql+pymysql://{os.getenv('DB_USER')}:{os.getenv('DB_PASSWORD')}@"
        f"{os.getenv('DB_HOST')}:{os.getenv('DB_PORT')}/{os.getenv('DB_NAME')}"
    )

    # debugging
    DEBUG = True

    # Session configurations

    SESSION_FILE_DIR = '/tmp/flask_session' # store session files 
    SESSION_COOKIE_DOMAIN = None  # Allow all subdomains
    SESSION_COOKIE_NAME = 'session'
    SESSION_COOKIE_SECURE = True  # Required for SameSite=None
    SESSION_COOKIE_HTTPONLY = True
    SESSION_COOKIE_SAMESITE = 'None'  # Must be string 'None', not Python None
    SESSION_TYPE = 'filesystem'
    SESSION_PERMANENT = True
    PERMANENT_SESSION_LIFETIME = timedelta(days=1)
    SESSION_COOKIE_PATH = '/'