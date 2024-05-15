from flask.views import MethodView
from flask_smorest import Blueprint

from models import CartModel
from schemas import CartSchema

blp = Blueprint('Carts', __name__, description='Operations on carts')


@blp.route('/carts')
class CartList(MethodView):
    @blp.response(201, CartSchema(many=True))
    def get(self):
        return CartModel.query.all()


@blp.route('/carts/<int:user_id>')
class Cart(MethodView):
    @blp.response(201, CartSchema)
    def get(self, user_id):
        return CartModel.query.filter_by(user_id=user_id).first()
