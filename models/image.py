from db import db
from models.base_model import BaseModel


class ImageModel(BaseModel, db.model):
    id = db.Column(db.Integer, primary_key=True)
    path = db.Column(db.String(240), unique=True, nullable=False)
    is_first = db.Column(db.Boolean, nullable=False, default=False)
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'), nullable=False)

