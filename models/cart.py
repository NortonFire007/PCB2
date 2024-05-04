from datetime import datetime

from models.base_model import BaseModel
from db import db


class CartModel(BaseModel, db.Model):
    __tablename__ = 'carts'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    created_at = db.Column(db.DateTime, default=datetime.now)

    cart_items = db.relationship('CartItemModel', backref='carts', lazy=True)
