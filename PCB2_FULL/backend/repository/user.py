from http import HTTPStatus
from os.path import join
from uuid import uuid4

from flask import abort

from globals import ALLOWED_IMAGE_EXTENSIONS, USER_IMAGE_UPLOAD_FOLDER


def process_image(image):
    if not image:
        abort(HTTPStatus.BAD_REQUEST, description='No image provided')

    if not image.filename:
        abort(HTTPStatus.BAD_REQUEST, description='No image name provided')

    if image_extension := image.filename.split('.')[-1] not in ALLOWED_IMAGE_EXTENSIONS:
        abort(HTTPStatus.BAD_REQUEST, description=f'Bad extension {image_extension}')

    filename = f"{uuid4()}.{image_extension}"
    full_path = join(USER_IMAGE_UPLOAD_FOLDER, filename)

    image.save(full_path)
    return full_path