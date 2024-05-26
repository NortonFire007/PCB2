from flask import abort
from flask.views import MethodView
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_smorest import Blueprint

from http import HTTPStatus

from db import db
from models import CartItemModel, ProductModel
from schemas import CartItemSchema, PlainCartItemSchema

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
        product_id = cart_item_data['product_id']

        product = ProductModel.query.get_or_404(product_id)

        if CartItemModel.query.filter_by(user_id=user_id, product_id=product_id).first():
            abort(HTTPStatus.BAD_REQUEST, 'Item already exists')

        cart_item = CartItemModel(**cart_item_data, user_id=user_id)
        db.session.add(cart_item)
        db.session.commit()
        return cart_item


@Blp.route('/carts/items/<int:cart_item_id>')
class CartItem(MethodView):
    @jwt_required()
    @Blp.response(HTTPStatus.OK, PlainCartItemSchema)
    def delete(self, cart_item_id):
        user_id = get_jwt_identity()
        cart_item = CartItemModel.query.get_or_404(cart_item_id)
        if cart_item.user_id != user_id:
            abort(HTTPStatus.BAD_REQUEST, description='You are not allowed to delete this cart item')
        db.session.delete(cart_item)
        db.session.commit()
        return cart_item