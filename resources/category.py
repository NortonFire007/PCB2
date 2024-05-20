from csv import DictReader
from io import StringIO

from flask.views import MethodView
from flask_jwt_extended import jwt_required
from flask_smorest import Blueprint
from flask import request
from http import HTTPStatus

from marshmallow import ValidationError

from models import CategoryModel
from schemas import CategorySchema


Blp = Blueprint('Categories', __name__, description='Operations on categories')


@Blp.route('/category/<int:category_id>')
class Category(MethodView):
    @Blp.response(HTTPStatus.OK, CategorySchema)
    def get(self, category_id):
        return CategoryModel.query.get_or_404(category_id)

    @Blp.response(HTTPStatus.GONE, CategorySchema)
    def delete(self, category_id):
        category = CategoryModel.query.get_or_404(category_id)
        category.delete_from_db()
        return category


@Blp.route('/categories')
class CategoryList(MethodView):
    @Blp.response(HTTPStatus.CREATED, CategorySchema(many=True))
    def get(self):
        return CategoryModel.query.all()

    @jwt_required()
    @Blp.response(HTTPStatus.CREATED)
    def post(self):
        if 'file' not in request.files:
            return {'message': 'No file part in the request'}, HTTPStatus.BAD_REQUEST

        file = request.files['file']

        if file.filename == '':
            return {'message': 'No selected file'}, HTTPStatus.BAD_REQUEST

        if not file.filename.endswith('.csv'):
            return {'message': 'File is not a CSV'}, HTTPStatus.BAD_REQUEST

        stream = StringIO(file.stream.read().decode("UTF8"), newline=None)
        csv_input = DictReader(stream)
        for row in csv_input:
            try:
                category_data = CategorySchema().load(row)
            except ValidationError as err:
                return {'message': err.messages}, HTTPStatus.BAD_REQUEST
            category = CategoryModel(**category_data)
            category.save_to_db()

