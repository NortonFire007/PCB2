import os

from flask import request
from flask.views import MethodView
from flask_smorest import Blueprint, abort
from flask_jwt_extended import get_jwt_identity, jwt_required
from sqlalchemy.exc import SQLAlchemyError
from werkzeug.utils import secure_filename

from db import db
from globals import UPLOAD_FOLDER
from models import ProductModel, ImageModel
from schemas import PlainProductSchema
from utils import allowed_file

blp = Blueprint('Products', __name__, description='Operations on products')


@blp.route('/product/<int:product_id>')
class Product(MethodView):
    @jwt_required()
    @blp.response(200, PlainProductSchema)
    def get(self, product_id):
        product = ProductModel.query.get_or_404(product_id)
        return product.json()

    @jwt_required()
    def delete(self, product_id):
        user_id = get_jwt_identity()
        product = ProductModel.query.get_or_404(product_id)
        if product.user_id == user_id:
            product.delete_from_db()
            return {'message': 'Product deleted.'}
        abort(403, message='You are not allowed to delete this product.')


@blp.route('/products')
class ProductList(MethodView):
    @blp.response(200, PlainProductSchema(many=True))
    def get(self):
        query_key = request.args.get('query')
        max_price = request.args.get('max_price')
        min_price = request.args.get('min_price')
        category_id = request.args.get('category_id')
        amount = request.args.get('amount')

        query = ProductModel.query

        if query_key:
            query = query.filter(ProductModel.title.ilike(f'%{query_key}%'))

        if max_price:
            query = query.filter(ProductModel.price < max_price)

        if min_price:
            query = query.filter(ProductModel.price > min_price)

        if category_id:
            query = query.filter(ProductModel.category_id == category_id)

        if amount:
            query = query.limit(int(amount))

        products = query.all()

        return products

    @jwt_required()
    @blp.arguments(PlainProductSchema)
    @blp.response(201, PlainProductSchema)
    def post(self, product_data):
        user_id = get_jwt_identity()

        images = request.files.getlist('images')
        if not images:
            abort(400, description='No images provided')

        product = ProductModel(user_id=user_id, **product_data)
        product.save_to_db()

        for index, image in enumerate(images):
            if not image.filename:
                abort(400, description=f'No filename in file number {index + 1}')

            if allowed_file(image.filename):
                filename = secure_filename(image.filename)
                file_path = os.path.join(UPLOAD_FOLDER, filename)
                image.save(file_path)

                new_image = ImageModel(path=file_path, product_id=product.id,
                                       is_first=index == 0)
                new_image.save_to_db()

        return product
