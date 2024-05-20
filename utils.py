import os
from datetime import datetime
from http import HTTPStatus

from flask_jwt_extended import create_access_token, create_refresh_token


def format_datetime(datetime_str: str):
    return datetime.strptime(datetime_str, '%Y-%m-%d %H:%M:%S')


def handle_file(request_file, allowed_file_extensions):
    if not request_file.filename:
        return {'message': 'Bad filename'}, HTTPStatus.BAD_REQUEST

    if request_file.filename.split('.')[-1] in allowed_file_extensions:
        return {'message': f'File is not in {', '.join(allowed_file_extensions)}'}, HTTPStatus.BAD_REQUEST

    return request_file


def create_jwt_token(user):
    access_token = create_access_token(identity=user.id, fresh=True)
    refresh_token = create_refresh_token(user.id)
    return {"accessToken": access_token, "refreshToken": refresh_token}
