import os

from flask_jwt_extended import create_access_token, create_refresh_token

from globals import ALLOWED_EXTENSIONS


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def delete_image_from_storage(file_path):
    if os.path.exists(file_path):
        os.remove(file_path)


def create_jwt_token(user):
    access_token = create_access_token(identity=user.id, fresh=True)
    refresh_token = create_refresh_token(user.id)
    return {"access_token": access_token, "refresh_token": refresh_token}
