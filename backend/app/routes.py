#!/usr/bin/env python3
"""home route"""
from flask import Blueprint


bp = Blueprint("main", __name__)

@bp.route("/")
def home():
    return "Welcome to Delicacies@Hands-Reach"