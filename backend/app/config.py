#!/usr/bin/env python3
"""Configuration class"""
import os
import secrets
from dotenv import load_dotenv


load_dotenv()


class Config:
    """Configurations"""
    SECRET_KEY = secrets.token_urlsafe()
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ECHO = False
    SQLALCHEMY_DATABASE_URI = (
        f"mysql+pymysql://{os.getenv('DB_USER')}:{os.getenv('DB_PASSWORD')}@"
        f"{os.getenv('DB_HOST')}:{os.getenv('DB_PORT')}/{os.getenv('DB_NAME')}"
    )
    DEBUG = True