from flask.views import MethodView
from flask_smorest import Blueprint, abort
from flask_jwt_extended import jwt_required, get_jwt_identity

from models import FavouriteModel
from schemas import FavouriteSchema

blp = Blueprint('Favourites', __name__, description='User favourites')


@blp.route('/favourites')
class Favourites(MethodView):
    @jwt_required()
    @blp.response(200, FavouriteSchema(many=True))
    def get(self):
        user_id = get_jwt_identity()
        return FavouriteModel.query.filter_by(user_id=user_id)

    @jwt_required()
    @blp.arguments(FavouriteSchema)
    @blp.response(201, FavouriteSchema)
    def post(self, favourites_data):
        user_id = get_jwt_identity()
        favourite = FavouriteModel.query.filter_by(user_id=user_id, product_id=favourites_data['product_id']).first()
        if favourite:
            favourite.delete_from_db()
        else:
            favourite = FavouriteModel(user_id=user_id, **favourites_data)
            favourite.save_to_db()

        return favourite


