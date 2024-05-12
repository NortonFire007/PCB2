from datetime import datetime

from db import db

from models.base_model import BaseModel


class UserModel(BaseModel, db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    password = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    tel = db.Column(db.String(120), unique=True, nullable=False)
    last_login = db.Column(db.DateTime, nullable=False, default=datetime.now)
    name = db.Column(db.String(120), nullable=False)
    surname = db.Column(db.String(120), nullable=False)
    city = db.Column(db.String(120), nullable=False)
    profile_image = db.Column(db.String(240), nullable=False, default='images/default_profile_pic.png')

    def json(self):
        return {'id': self.id,
                'name': self.name,
                'surname': self.surname,
                'email': self.email,
                'tel': self.tel,
                'city': self.city,
                }



    @classmethod
    def find_by_email(cls, email):
        return cls.query.filter_by(email=email).first()

    @classmethod
    def find_by_id(cls, _id):
        return cls.query.filter_by(id=_id).first()
