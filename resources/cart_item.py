from flask import abort
from flask.views import MethodView
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_smorest import Blueprint

from http import HTTPStatus
from models import CartItemModel
from schemas import CartItemSchema

Blp = Blueprint('Cart_Items', __name__, description='Operations related to cart items')


@Blp.route('/carts/items')
class CartItemList(MethodView):
    @jwt_required()
    @Blp.response(HTTPStatus.OK, CartItemSchema(many=True))
    def get(self):
        user_id = get_jwt_identity()
        return CartItemModel.query.filter_by(user_id=user_id).all()

    @jwt_required()
    @Blp.arguments(CartItemSchema)
    @Blp.response(HTTPStatus.CREATED, CartItemSchema)
    def post(self, cart_item_data):
        user_id = get_jwt_identity()

        if CartItemModel.query.filter_by(user_id=user_id, product_id=cart_item_data['product_id']).first():
            abort(HTTPStatus.BAD_REQUEST, 'Item already exists')

        cart_item = CartItemModel(**cart_item_data, user_id=user_id)
        cart_item.save_to_db()
        return cart_item


@Blp.route('/carts/items/<int:product_id>')
class CartItem(MethodView):
    @jwt_required()
    @Blp.response(HTTPStatus.GONE, CartItemSchema)
    def delete(self, product_id):
        user_id = get_jwt_identity()
        cart_item = CartItemModel.query.filter_by(product_id=product_id, user_id=user_id)
        cart_item.delete_from_db()
        return cart_item
