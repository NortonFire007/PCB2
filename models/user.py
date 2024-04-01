from datetime import datetime

from db import db

from models.base_model import BaseModel


class UserModel(db.Model, BaseModel):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    password = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    phone_number = db.Column(db.String(120), unique=True, nullable=False)
    last_login = db.Column(db.DateTime, nullable=False, default=datetime.now)
    first_name = db.Column(db.String(120), nullable=False)
    last_name = db.Column(db.String(120), nullable=False)
    city = db.Column(db.String(120), nullable=False)
    profile_image = db.Column(db.Text, nullable=False)
    profile_image_mimetype = db.Column(db.Text, nullable=False)

    def json(self):
        return {
            'id': self.id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'city': self.city
        }

    @classmethod
    def find_by_email(cls, email):
        return cls.query.filter_by(email=email).first()

    @classmethod
    def find_by_id(cls, _id):
        return cls.query.filter_by(id=_id).first()
