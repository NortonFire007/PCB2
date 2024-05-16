from flask.views import MethodView
from flask_smorest import Blueprint, abort
from flask import request
from http import HTTPStatus

from models import CategoryModel
from repository.image import process_category_icon
from schemas import CategorySchema

blp = Blueprint('Categories', __name__, description='Operations on categories')


@blp.route('/category/<int:category_id>')
class Category(MethodView):
    @blp.response(HTTPStatus.OK, CategorySchema)
    def get(self, category_id):
        return CategoryModel.query.get_or_404(category_id)

    @blp.response(HTTPStatus.GONE, CategorySchema)
    def delete(self, category_id):
        category = CategoryModel.query.get_or_404(category_id)
        category.delete_from_db()
        return category


@blp.route('/categories')
class CategoryList(MethodView):
    @blp.response(HTTPStatus.CREATED, CategorySchema(many=True))
    def get(self):
        return CategoryModel.query.all()

    @blp.arguments(CategorySchema)
    @blp.response(HTTPStatus.CREATED, CategorySchema)
    def post(self, category_data):
        icon = request.files.get('icon')
        if not icon:
            abort(HTTPStatus.BAD_REQUEST, message='No icon uploaded')
        if CategoryModel.find_by_title(category_data.get('title')):
            abort(HTTPStatus.BAD_REQUEST, message='A category with that title already exists')

        icon_path = process_category_icon(icon)
        category = CategoryModel(**category_data, icon=icon_path)
        category.save_to_db()
        return category
