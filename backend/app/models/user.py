#!/usr/bin/env python3
"""user model"""
from .. import db
from werkzeug.security import generate_password_hash, check_password_hash


class User(db.Model):
    """define ctable name and columns for the table users"""
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(255), unique=True, nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)

    
    def __init__(self, username: str, email: str):
        """initialize user object"""
        self.username = username
        self.email = email
    # hash password
    def set_password(self, password: str):
        """method to set password and hash it before storing"""
        self.password_hash = generate_password_hash(password)

    def check_password(self, password: str) -> bool:
        """check if provided password matches the stored hash"""
        return check_password_hash(self.password_hash, password)
