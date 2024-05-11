from db import db
from models.base_model import BaseModel


class ImageModel(BaseModel, db.Model):
    __tablename__ = 'images'

    id = db.Column(db.Integer, primary_key=True)
    path = db.Column(db.String(240), unique=True, nullable=False)
    is_first = db.Column(db.Boolean, nullable=False, default=False)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'), nullable=False)

