from flask.views import MethodView
from flask_smorest import Blueprint, abort
from flask import request

from models import CategoryModel
from schemas import PlainCategorySchema

blp = Blueprint('Categories', __name__, description='Operations on categories')


@blp.route('/category/<int:category_id>')
class Category(MethodView):
    @blp.response(201, PlainCategorySchema)
    def get(self, category_id):
        return CategoryModel.query.get_or_404(category_id)

    @blp.response(410, PlainCategorySchema)
    def delete(self, category_id):
        category = CategoryModel.query.get_or_404(category_id)
        category.delete_from_db()
        return category


@blp.route('/categories')
class CategoryList(MethodView):
    @blp.response(201, PlainCategorySchema(many=True))
    def get(self):
        return CategoryModel.query.all()

    @blp.response(201, PlainCategorySchema)
    @blp.arguments(PlainCategorySchema)
    def post(self, category_data):
        if CategoryModel.find_by_title(category_data.get('title')):
            abort(400, message='A category with that title already exists')
        image = request.files['image']
        if not image:
            abort(400, message='No background image provided')

        category = CategoryModel(**category_data, bg_image=image.read(), bg_image_mimetype=image.mimetype)
        category.save_to_db()
        return category
