from json import loads
from http import HTTPStatus

from flask import request
from flask.views import MethodView
from flask_smorest import Blueprint, abort
from flask_jwt_extended import get_jwt_identity, jwt_required

from models import ProductModel
from schemas import ProductTemplateSchema, ProductPageSchema, ProductSchema
from repository.product import build_search_query, get_products_for_you, save_product_images, get_valid_product_data

ALLOWED_SEARCH_FIELDS = {'price': ProductModel.price,
                         'novelty': ProductModel.created_at,
                         'rating': ProductModel.rating, }

Blp = Blueprint('Products', __name__, description='Operations on products')


@Blp.route('/product/<int:product_id>')
class Product(MethodView):
    @Blp.response(HTTPStatus.OK, ProductPageSchema)
    def get(self, product_id):
        product = ProductModel.query.get_or_404(product_id)
        return product

    @jwt_required()
    @Blp.response(HTTPStatus.GONE, ProductTemplateSchema)
    def delete(self, product_id):
        user_id = get_jwt_identity()
        product = ProductModel.query.get_or_404(product_id)
        if product.user_id != user_id:
            abort(HTTPStatus.FORBIDDEN, message='You are not allowed to delete this product.')
        product.delete_from_db()
        return product


@Blp.route('/products/for_you')
class ProductsForYou(MethodView):
    @jwt_required()
    @Blp.response(HTTPStatus.OK, ProductTemplateSchema(many=True))
    def get(self):
        user_id = get_jwt_identity()
        return get_products_for_you(user_id, 40)


@Blp.route('/products/add')
class ProductsAdd(MethodView):
    @jwt_required()
    @Blp.response(HTTPStatus.CREATED, ProductSchema)
    def post(self):
        user_id = get_jwt_identity()

        if 'data' not in request.form:
            abort(HTTPStatus.BAD_REQUEST, description='Missing JSON data')

        product_data = get_valid_product_data(loads(request.form['data']))

        product = ProductModel(**product_data, user_id=user_id)

        product.save_to_db()

        save_product_images(request.files.getlist('images'), product.id)

        return product


@Blp.route('/products/search')
class ProductList(MethodView):
    @Blp.response(HTTPStatus.OK, ProductTemplateSchema(many=True))
    def get(self):
        query = build_search_query(request.args, ProductModel.query, ProductModel, ALLOWED_SEARCH_FIELDS)

        products = query.all()
        return products
