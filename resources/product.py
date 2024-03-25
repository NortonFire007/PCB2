from flask.views import MethodView
from flask_smorest import Blueprint, abort
from flask_jwt_extended import get_jwt_identity, jwt_required
from sqlalchemy.exc import SQLAlchemyError

from db import db
from models import ProductModel
from schemas import PlainProductSchema

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
        return ProductModel.query.all()

    @jwt_required()
    @blp.arguments(PlainProductSchema)
    @blp.response(201, PlainProductSchema)
    def post(self, product_data):
        user_id = get_jwt_identity()
        product = ProductModel(user_id=user_id, **product_data)

        # try:
        #     product.save_to_db()
        # except SQLAlchemyError:
        #     abort(500, message='An error occurred while inserting the item.')
        product.save_to_db()

        return product
