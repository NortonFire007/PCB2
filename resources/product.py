from json import loads
from os.path import join
from http import HTTPStatus
from uuid import uuid4

from flask import request
from flask.views import MethodView
from flask_smorest import Blueprint, abort
from flask_jwt_extended import get_jwt_identity, jwt_required
from marshmallow import ValidationError, fields
from webargs.flaskparser import use_args

from globals import PRODUCT_IMAGE_UPLOAD_FOLDER
from models import ProductModel, ImageModel, UserModel, FavouriteModel
from schemas import ProductTemplateSchema, ProductPageSchema
from repository.product_comment import get_grades_info

blp = Blueprint('Products', __name__, description='Operations on products')


@blp.route('/product/<int:product_id>')
class Product(MethodView):
    @blp.response(HTTPStatus.OK, ProductPageSchema)
    def get(self, product_id):
        product = ProductModel.query.get_or_404(product_id)
        product_data = product.json()

        if request.args.get('images'):
            product_data['images'] = product.images.all()

        if request.args.get('comments'):
            product_data['comments'] = product.comments.all()

        if request.args.get('product_owner'):
            product_data['product_owner'] = UserModel.query.filter(UserModel.id == product.user_id).first()

        if request.args.get('rating_info'):
            product_data['rating_info'] = get_grades_info(product_id)

        return product_data

    @jwt_required()
    @blp.response(HTTPStatus.GONE, ProductTemplateSchema)
    def delete(self, product_id):
        user_id = get_jwt_identity()
        product = ProductModel.query.get_or_404(product_id)
        if product.user_id != user_id:
            abort(HTTPStatus.FORBIDDEN, message='You are not allowed to delete this product.')
        product.delete_from_db()
        return product


@blp.route('/products/for_you')
class ProductsForYou(MethodView):
    @jwt_required()
    @blp.response(HTTPStatus.OK, ProductTemplateSchema(many=True))
    def get(self):
        user_id = get_jwt_identity()

        if favourites := FavouriteModel.query.filter_by(user_id=user_id):
            favourites = favourites.all()
            product_ids = [favourite.product_id for favourite in favourites]
            products = ProductModel.query.filter(ProductModel.id.in_(product_ids)).all()
            product_categories = [product.category_id for product in products]
            seller_ids = [product.user_id for product in products]
            desired_products = ProductModel.query.filter(ProductModel.category_id.in_(product_categories),
                                                         ProductModel.user_id.in_(seller_ids)).order_by(
                ProductModel.rating.desc()).limit(40).all()
            return desired_products
        else:
            return ProductModel.query.order_by(ProductModel.created_at.desc(), ProductModel.rating.desc()).limit(
                40).all()


@blp.route('/products')
class ProductList(MethodView):
    @blp.response(HTTPStatus.OK, ProductTemplateSchema(many=True))
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
    @blp.response(HTTPStatus.CREATED, ProductPageSchema)
    def post(self):
        user_id = get_jwt_identity()

        if 'data' not in request.form:
            abort(HTTPStatus.BAD_REQUEST, description='Missing JSON data')

        json_data = loads(request.form['data'])
        try:
            product_data = ProductTemplateSchema().load(json_data)
        except ValidationError as e:
            abort(HTTPStatus.BAD_REQUEST, message=e.messages)
        images = request.files.getlist('images')

        if not images:
            abort(HTTPStatus.BAD_REQUEST, description='No images provided')

        product = ProductModel(user_id=user_id, **product_data)
        product.save_to_db()

        for index, image in enumerate(images):
            if not image.filename:
                abort(HTTPStatus.BAD_REQUEST, description=f'No filename provided for image {image.filename}')

            filename = f"{uuid4()}.{image.filename.split('.')[-1]}"
            full_path = join(PRODUCT_IMAGE_UPLOAD_FOLDER, filename)
            image.save(full_path)

            new_image = ImageModel(path=full_path, product_id=product.id, is_first=index == 0)
            new_image.save_to_db()

        return product

# данные про продавца при странице товара
# данные про комменты при странице товара
# данные для вас
# потестить корзину
