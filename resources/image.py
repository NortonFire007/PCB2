import os

from flask import request, abort
from flask.views import MethodView
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_smorest import Blueprint
from werkzeug.utils import secure_filename

from globals import UPLOAD_FOLDER
from models import ImageModel, ProductModel
from schemas import PlainImageSchema
from utils import allowed_file, delete_image_from_storage

blp = Blueprint('Images', __name__, description='Operations on images')


@blp.route('/images/<int:product_id>')
class ImageList(MethodView):
    @blp.response(200, PlainImageSchema(many=True))
    def get(self, product_id):
        first = request.args.get('first')
        query = ImageModel.query

        query = query.filter_by(product_id=product_id).all()

        if bool(first):
            query = query.filter_by(is_first=True)
            return query.first()

        return query.all()


@blp.route('/images')
class Image(MethodView):
    @jwt_required
    @blp.arguments(PlainImageSchema)
    @blp.response(200, PlainImageSchema)
    def post(self, image_data):
        if 'image' not in request.files:
            abort(400, description='No image part')

        user_id = get_jwt_identity()

        product = ProductModel.query.filter_by(id=image_data['product_id']).first()

        if product.user_id != user_id:
            abort(403, description='You are not authorized to add image')

        image_file = request.files['image']

        if not image_file.filename:
            abort(400, description='No filename')

        if image_file and allowed_file(image_file.filename):
            filename = secure_filename(image_file.filename)
            file_path = os.path.join(UPLOAD_FOLDER, filename)
            image_file.save(file_path)

            image = ImageModel(**image_data, path=file_path, product_id=product.id)
            image.save_to_db()

        abort(400, description='Invalid file type')

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
