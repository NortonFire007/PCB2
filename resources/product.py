import json
import os

from flask import request, jsonify
from flask.views import MethodView
from flask_smorest import Blueprint, abort
from flask_jwt_extended import get_jwt_identity, jwt_required
from marshmallow import ValidationError
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
        product_data = product.json()

        if request.args.get('images'):
            product_data['images'] = product.images.all()

        if request.args.get('comments'):
            product_data['comments'] = product.comments.all()

        return product_data

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
        include_image = request.args.get('image')

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

        if include_image:
            product_data = []
            for product in products:
                product_dict = product.json()

                image = product.images.filter_by(is_first=True).first()
                if image:
                    product_dict['image'] = image.path

                product_data.append(product_dict)

            return jsonify(product_data)
        else:
            return products

    @jwt_required()
    def post(self):
        user_id = get_jwt_identity()

        if 'data' not in request.form:
            abort(400, description='Missing JSON data')

        json_data = json.loads(request.form['data'])
        try:
            product_data = PlainProductSchema().load(json_data)
        except ValidationError as e:
            abort(400, message=e.messages)
        images = request.files.getlist('images')

        if not images:
            abort(400, description='No images provided')

        product = ProductModel(user_id=user_id, **product_data)
        product.save_to_db()

        product_folder = secure_filename(product.name)
        for index, image in enumerate(images):
            if not image.filename:
                abort(400, description=f'No filename in file number {index + 1}')

            if allowed_file(image.filename):
                filename = secure_filename(image.filename)
                file_path = os.path.join(UPLOAD_FOLDER, 'products', product_folder, filename)
                image.save(file_path)

                new_image = ImageModel(path=file_path, product_id=product.id, is_first=index == 0)
                new_image.save_to_db()

        return PlainProductSchema().dump(product), 201
