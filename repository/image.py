from http import HTTPStatus

from flask import abort
from os import path

from globals import CATEGORY_IMAGE_UPLOAD_FOLDER


def process_category_icon(icon):
    filename = icon.filename
    if not filename or '.ico' not in filename:
        abort(HTTPStatus.BAD_REQUEST, description='Bad file provided for icon')
    full_path = path.join(CATEGORY_IMAGE_UPLOAD_FOLDER, filename)
    icon.save(full_path)

    return full_path

