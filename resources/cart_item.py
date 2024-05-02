from flask import abort
from flask.views import MethodView
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_smorest import Blueprint

from models import CartItemModel
from schemas import PlainCartItemSchema

blp = Blueprint('Cart_Items', __name__, description='Operations related to cart items')


@blp.route('/carts/items/<int:user_id>')
class CartItemList(MethodView):
    @jwt_required()
    @blp.response(200, PlainCartItemSchema(many=True))
    def get(self, user_id):
        cart_items = CartItemModel.query.filter_by(user_id=user_id).all()
        return cart_items


@blp.route('/carts/items')
class CartItem(MethodView):
    @jwt_required()
    @blp.arguments(PlainCartItemSchema)
    @blp.response(201, PlainCartItemSchema)
    def post(self, cart_item_data):
        user_id = get_jwt_identity()
        if user_id != cart_item_data.get('user_id'):
            abort(400, description='User ID mismatch')

        cart_item = CartItemModel(**cart_item_data)
        cart_item.save_to_db()
        return cart_item
