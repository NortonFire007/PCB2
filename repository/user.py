from flask import abort

from models import UserModel


def get_user_or_abort(user_id: int):
    user = UserModel.find_by_id(user_id)
    if not user:
        abort(404, message='User not found.')
    return user
