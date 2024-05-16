from http import HTTPStatus

from flask import request, send_from_directory
from flask.views import MethodView
from flask_smorest import Blueprint

from globals import PRODUCT_IMAGE_UPLOAD_FOLDER
from models import ImageModel
from schemas import ImageSchema

blp = Blueprint('Images', __name__, description='Operations on images')


@blp.route('/images/<int:product_id>')
class ImageList(MethodView):
    @blp.response(HTTPStatus.OK, ImageSchema(many=True))
    def get(self, product_id):
        first = request.args.get('first')
        query = ImageModel.query

        query = query.filter_by(product_id=product_id).all()

        if bool(first):
            query = query.filter_by(is_first=True)
            return query.first()

        return query.all()

    # @jwt_required
    # @blp.response(204, PlainImageSchema)
    # def delete(self, image_id):
    #     user_id = get_jwt_identity()
    #     image = ImageModel.query.get(image_id)
    #
    #     if not image:
    #         abort(404, description='Image not found')
    #
    #     if image.user_id != user_id:
    #         abort(403, description='Unauthorized to delete this image')
    #
    #     delete_image_from_storage(image.path)
    #     image.delete_from_db()
    #
    #     return image


@blp.route('/images/display/<filename>')
class ImageDisplay(MethodView):
    def get(self, filename):
        return send_from_directory(PRODUCT_IMAGE_UPLOAD_FOLDER, filename)
