from http import HTTPStatus

from flask import request, send_from_directory, abort
from flask.views import MethodView
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_smorest import Blueprint

from constants import PRODUCT_IMAGE_UPLOAD_FOLDER
from models import ImageModel
from repository.image import delete_image_from_storage
from schemas import ImageSchema

Blp = Blueprint('Images', __name__, description='Operations on images')


@Blp.route('/images/<int:product_id>')
class ImageList(MethodView):
    @Blp.response(HTTPStatus.OK, ImageSchema(many=True))
    def get(self, product_id):
        first = request.args.get('first')

        query = ImageModel.query.filter_by(product_id=product_id).all()

        if bool(first):
            query = query.filter_by(is_first=True)
            return query.first()

        return query.all()

    @jwt_required
    @Blp.response(204, ImageSchema)
    def delete(self, image_id):
        user_id = get_jwt_identity()
        image = ImageModel.query.get_or_404(image_id)

        if image.user_id != user_id:
            abort(403, description='You are not allowed to delete this image')

        delete_image_from_storage(image.path)
        image.delete_from_db()

        return image


@Blp.route('/images/display/<filename>')
class ImageDisplay(MethodView):
    def get(self, filename):
        return send_from_directory(PRODUCT_IMAGE_UPLOAD_FOLDER, filename)
