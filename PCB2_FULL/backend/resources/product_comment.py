from http import HTTPStatus

from flask.views import MethodView
from flask_smorest import Blueprint, abort
from flask_jwt_extended import get_jwt_identity, jwt_required

from models import ProductCommentModel, ProductModel
from repository.product_comment import update_product_data, get_grades_info
from schemas import ProductCommentSchema, PlainProductCommentSchema

Blp = Blueprint('Products_Comments', __name__, description='Operations on Product Comments')


@Blp.route('/products/comments/<int:product_id>')
class ProductCommentList(MethodView):
    @Blp.response(HTTPStatus.OK, ProductCommentSchema(many=True))
    def get(self, product_id):
        return ProductCommentModel.query.filter_by(product_id=product_id).all()


@Blp.route('/info/products/comments/<int:product_id>')
class ProductCommentsInfo(MethodView):
    def get(self, product_id):
        return get_grades_info(product_id)


@Blp.route('/products/comments/<int:product_comment_id>')
class ProductCommentSingle(MethodView):
    @Blp.response(HTTPStatus.GONE, ProductCommentSchema)
    @jwt_required()
    def delete(self, product_comment_id):
        user_id = get_jwt_identity()
        product_comment = ProductCommentModel.query.get_or_404(product_comment_id)
        if product_comment.user_id != user_id:
            abort(HTTPStatus.FORBIDDEN, message='You are not allowed to delete this product.')
        product_comment.save_to_db()
        return product_comment


@Blp.route('/products/comments/add')
class ProductComment(MethodView):
    @jwt_required()
    @Blp.arguments(PlainProductCommentSchema)
    @Blp.response(HTTPStatus.CREATED, PlainProductCommentSchema)
    def post(self, comment_data):
        user_id = get_jwt_identity()
        product_id = comment_data['product_id']

        product = ProductModel.query.get_or_404(product_id)

        # if product.user_id == user_id:
        #     abort(HTTPStatus.BAD_REQUEST, message='You are not allowed to comment your product')

        if ProductCommentModel.query.filter_by(product_id=product_id, user_id=user_id).first():
            abort(HTTPStatus.BAD_REQUEST, message='You already commented on this product')

        product_comment = ProductCommentModel(user_id=user_id, **comment_data)
        product_comment.save_to_db()
        update_product_data(product)
        return product_comment.json()
