from datetime import datetime

from db import db

from models.base_model import BaseModel


class ProductModel(BaseModel, db.Model):
    __tablename__ = 'products'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), nullable=False)
    description = db.Column(db.Text, nullable=False)
    price = db.Column(db.Integer, nullable=False)
    zsu_price = db.Column(db.Float)
    reviews_qty = db.Column(db.Integer, default=0)
    rating = db.Column(db.Float)
    created_at = db.Column(db.DateTime, default=datetime.now())
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    images = db.relationship('ImageModel', backref='product', cascade='all, delete-orphan', lazy='dynamic')
    comments = db.relationship('ProductCommentModel', backref='product', cascade='all, delete-orphan', lazy='dynamic')
    favourites = db.relationship('FavouriteModel', backref='product', cascade='all, delete-orphan')
    product_owner = db.relationship('UserModel', backref='product', overlaps="products,user")

    def json(self):
        return {'id': self.id,
                'title': self.title,
                'description': self.description,
                'price': self.price,
                'zsu_price': self.zsu_price,
                'reviews_qty': self.reviews_qty,
                'rating': self.rating,
                'created_at': self.created_at,
                'category_id': self.category_id,
                'user_id': self.user_id, }

    @classmethod
    def find_by_id(cls, _id):
        return cls.query.filter_by(id=_id).first()
