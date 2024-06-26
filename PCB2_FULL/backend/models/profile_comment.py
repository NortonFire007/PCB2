from datetime import datetime

from db import db

from models.base_model import BaseModel


class ProfileCommentModel(BaseModel, db.Model):
    __tablename__ = 'profiles_comments'

    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.Text)
    grade = db.Column(db.Integer, default=3)
    created_at = db.Column(db.DateTime, default=datetime.now)
    user_profile_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
