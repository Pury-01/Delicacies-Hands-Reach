#!/usr/bin/ env python3
"""Recipe model"""
from .. import db


class Recipe(db.Model):
    """define table name and columns foor the table recipes"""
    __tablename__ = 'recipes'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    ingredients = db.Column(db.Text, nullable=False)
    steps = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    def __init__(self, title: str, ingredients: str, steps: str, user_id: int):
        """Initialize recipe object"""
        self.title = title
        self.ingredients = ingredients
        self.steps = steps
        self.user_id = user_id