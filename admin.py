from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView
from flask_admin.form import ImageUploadField

import models
from db import db

admin = Admin()


class ProductModelView(ModelView):
    form_extra_fields = {
        'images': ImageUploadField('Image', base_path='path_to_your_upload_folder', thumbnail_size=(100, 100, True))
    }


admin.add_view(ModelView(models.CartItemModel, db.session))
admin.add_view(ModelView(models.UserModel, db.session))
admin.add_view(ProductModelView(models.ProductModel, db.session))
admin.add_view(ModelView(models.CategoryModel, db.session))
admin.add_view(ModelView(models.ProfileCommentModel, db.session))
admin.add_view(ModelView(models.ProductCommentModel, db.session))
admin.add_view(ModelView(models.FavouriteModel, db.session))
