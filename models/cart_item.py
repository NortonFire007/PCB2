from datetime import datetime

from models.base_model import BaseModel
from db import db


class CartItemModel(BaseModel):
    __tablename__ = 'carts_items'

    id = db.Column(db.Integer, primary_key=True)
    cart_id = db.Column(db.Integer, db.ForeignKey('carts.id'))
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'))
    quantity = db.Column(db.Integer)
    price = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, default=datetime.now)