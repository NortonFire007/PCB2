from datetime import datetime

from db import db

from models.base_model import BaseModel


class CategoryModel(BaseModel, db.Model):
    __tablename__ = 'categories'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(64), unique=True, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now)
    icon = db.Column(db.String(240), nullable=False)

    def json(self):
        return {'id': self.id,
                'title': self.title,
                }

    @classmethod
    def find_by_title(cls, title):
        return cls.query.filter_by(title=title).first()
