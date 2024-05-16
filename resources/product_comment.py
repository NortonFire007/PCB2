from http import HTTPStatus

from flask.views import MethodView
from flask_smorest import Blueprint, abort
from flask_jwt_extended import get_jwt_identity, jwt_required
from sqlalchemy.exc import SQLAlchemyError
from collections import Counter

from models import ProductCommentModel
from repository import product_comment as prod_comment_repo
from schemas import ProductCommentSchema, PlainProductCommentSchema

blp = Blueprint('Products_Comments', __name__, description='Operations on Product Comments')


@blp.route('/products/comments/<int:product_id>')
class ProductCommentList(MethodView):
    @blp.response(HTTPStatus.OK, ProductCommentSchema(many=True))
    def get(self, product_id):
        return ProductCommentModel.query.filter_by(product_id=product_id).all()


@blp.route('/info/products/comments/<int:product_id>')
class ProductCommentsInfo(MethodView):
    def get(self, product_id):
        return prod_comment_repo.get_grades_info(product_id)


@blp.route('/products/comments/<int:product_comment_id>')
class ProductCommentSingle(MethodView):
    @blp.response(HTTPStatus.GONE, ProductCommentSchema)
    @jwt_required()
    def delete(self, product_comment_id):
        user_id = get_jwt_identity()
        product_comment = ProductCommentModel.query.get_or_404(product_comment_id)
        if user_id == product_comment.user_id:
            product_comment.delete_from_db()
        return product_comment


@blp.route('/products/comments')
class ProductComment(MethodView):
    @jwt_required()
    @blp.arguments(PlainProductCommentSchema)
    @blp.response(HTTPStatus.CREATED, PlainProductCommentSchema)
    def post(self, comment_data):
        user_id = get_jwt_identity()
        if ProductCommentModel.query.filter_by(product_id=comment_data['product_id'],
                                               user_id=user_id).first():
            abort(HTTPStatus.BAD_REQUEST, message='You already commented on this product')
        product_comment = ProductCommentModel(user_id=user_id, **comment_data)
        product_comment.save_to_db()
        prod_comment_repo.update_product_rating(comment_data['product_id'])
        return product_comment.json()
