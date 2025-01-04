#!/usr/bin/env python3
"""JWT utils"""
import jwt
import datetime
from flask import current_app
from typing import Dict, Optional


# secret key for encoding JWT
SECRET_KEY = current_app.config['SECRET_KEY']

# expiration time for JWT
EXPIRATION_DELTA = datetime.timedelta(days=1)

def create_jwt(user_id: int) -> str:
    """Generate a JWT token for the user."""
    paylaod = {
        'user_id': user_id,
        'exp': datetime.datetime.utcnow() + EXPIRATION_DELTA
    }

    token = jwt.encode(paylaod, SECRET_KEY, algorithm='HS256')
    return token


def verify_jwt(token: str) -> Optional[Dict]:
    """Verify and decode a JWT token."""
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        return payload
    except jwt.ExpiredSignatureError:
        return None         # token has expired
    except jwt.InvalidTokenError:
        return None         # invalid token