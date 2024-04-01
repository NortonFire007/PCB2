from datetime import datetime

from db import db

from models.base_model import BaseModel


class ProductCommentModel(db.Model, BaseModel):
    __tablename__ = 'products_comments'

    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.Text)
    grade = db.Column(db.Integer, default=3)
    created_at = db.Column(db.DateTime, default=datetime.now)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    def json(self):
        return {'id': self.id,
                'text': self.text,
                'grade': self.grade,
                'created_at': self.created_at
                }
