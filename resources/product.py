import json
import os

from flask import request
from flask.views import MethodView
from flask_smorest import Blueprint, abort
from flask_jwt_extended import get_jwt_identity, jwt_required
from marshmallow import ValidationError, fields
from webargs.flaskparser import use_args
from werkzeug.utils import secure_filename

from globals import IMAGE_UPLOAD_FOLDER
from models import ProductModel, ImageModel, UserModel
from schemas import ProductFirstImageSchema, ProductAllImagesSchema
from utils import allowed_file

blp = Blueprint('Products', __name__, description='Operations on products')


@blp.route('/product/<int:product_id>')
class Product(MethodView):
    @blp.response(200, ProductAllImagesSchema)
    def get(self, product_id):
        product = ProductModel.query.get_or_404(product_id)
        product_data = product.json()

        if request.args.get('images'):
            product_data['images'] = product.images.all()

        if request.args.get('comments'):
            product_data['comments'] = product.comments.all()

        if request.args.get('product_owner'):
            product_data['product_owner'] = UserModel.query.filter(UserModel.id == product.user_id).first()

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
    @blp.response(200, ProductFirstImageSchema(many=True))
    @use_args({
        'query': fields.Str(),
        'order': fields.Str(),
        'max_price': fields.Int(),
        'min_price': fields.Int(),
        'category_id': fields.Int(),
        'amount': fields.Int(),
        'image': fields.Bool(),
    })
    def get(self, args):
        query = ProductModel.query

        if args.get('query'):
            query = query.filter(ProductModel.title.ilike(f'%{args["query"]}%'))

        if args.get('max_price'):
            query = query.filter(ProductModel.price < args['max_price'])

        if args.get('min_price'):
            query = query.filter(ProductModel.price > args['min_price'])

        if args.get('category_id'):
            query = query.filter(ProductModel.category_id == args['category_id'])

        if args.get('amount'):
            query = query.limit(args['amount'])

        products = query.all()

        return products

    @jwt_required()
    def post(self):
        user_id = get_jwt_identity()

        if 'data' not in request.form:
            abort(400, description='Missing JSON data')

        json_data = json.loads(request.form['data'])
        try:
            product_data = ProductFirstImageSchema().load(json_data)
        except ValidationError as e:
            abort(400, message=e.messages)
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
                full_path = os.path.join(IMAGE_UPLOAD_FOLDER, filename)
                image.save(full_path)

                new_image = ImageModel(path=full_path, product_id=product.id,
                                       is_first=index == 0)
                new_image.save_to_db()
        return ProductFirstImageSchema().dump(product), 201

# данные про продавца при странице товара
# данные про комменты при странице товара
# данные для вас
# потестить корзину