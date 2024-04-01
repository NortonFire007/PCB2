from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView
import models
from db import db

admin = Admin()

admin.add_view(ModelView(models.UserModel, db.session))
admin.add_view(ModelView(models.ProductModel, db.session))
admin.add_view(ModelView(models.CategoryModel, db.session))
admin.add_view(ModelView(models.ProfileCommentModel, db.session))
admin.add_view(ModelView(models.ProductCommentModel, db.session))
admin.add_view(ModelView(models.FavouriteModel, db.session))
