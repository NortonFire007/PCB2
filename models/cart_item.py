from datetime import datetime
from db import db
from models.base_model import BaseModel


class CartItemModel(BaseModel, db.Model):
    __tablename__ = 'carts_items'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'))
    quantity = db.Column(db.Integer)
    price = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, default=datetime.now)

    product = db.relationship('ProductModel', backref='cart_items')
