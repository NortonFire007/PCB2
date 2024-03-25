from flask.views import MethodView
from flask_smorest import Blueprint, abort
from flask_jwt_extended import get_jwt_identity, jwt_required
from sqlalchemy.exc import SQLAlchemyError

from models import ProductCommentModel
from schemas import PlainProductCommentSchema
from utils import update_product_rating

blp = Blueprint('Products Comments', __name__, description='Operations on Product Comments')


@blp.route('/products/comments/<int:product_id>')
class ProductCommentList(MethodView):
    @blp.response(200, PlainProductCommentSchema(many=True))
    def get(self, product_id):
        comments = ProductCommentModel.query.filter_by(product_id=product_id).all()
        return comments


@blp.route('/products/comments')
class ProductComment(MethodView):
    @jwt_required()
    @blp.arguments(PlainProductCommentSchema)
    @blp.response(201, PlainProductCommentSchema)
    def post(self, comment_data):
        user_id = get_jwt_identity()
        if ProductCommentModel.query.filter_by(product_id=comment_data['product_id'],
                                               user_id=user_id).first():
            abort(400, message='You already commented on this product')
        product_comment = ProductCommentModel(user_id=user_id, **comment_data)
        product_comment.save_to_db()
        update_product_rating(comment_data['product_id'])
        return product_comment.json()
