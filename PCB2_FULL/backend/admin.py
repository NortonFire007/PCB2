from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView
from flask_admin.form import ImageUploadField


from db import db
from models import CartItemModel, UserModel, ProductModel, CategoryModel, ProfileCommentModel, ProductCommentModel, \
    FavouriteModel

admin = Admin()


class ProductModelView(ModelView):
    form_extra_fields = {
        'images': ImageUploadField('Image', base_path='path_to_your_upload_folder', thumbnail_size=(100, 100, True))
    }


admin.add_view(ModelView(CartItemModel, db.session))
admin.add_view(ModelView(UserModel, db.session))
admin.add_view(ProductModelView(ProductModel, db.session))
admin.add_view(ModelView(CategoryModel, db.session))
admin.add_view(ModelView(ProfileCommentModel, db.session))
admin.add_view(ModelView(ProductCommentModel, db.session))
admin.add_view(ModelView(FavouriteModel, db.session))
