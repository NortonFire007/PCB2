from http import HTTPStatus

from flask.views import MethodView
from flask_smorest import Blueprint, abort
from flask_jwt_extended import get_jwt_identity, jwt_required, create_access_token
from passlib.handlers.pbkdf2 import pbkdf2_sha256

from models import UserModel
from repository.user import get_user_or_abort
from schemas import UserDetailSchema, UserLoginSchema
from utils import create_jwt_token

blp = Blueprint('Users', __name__, description='Operations with users')


@blp.route('/register')
class UserRegister(MethodView):
    @blp.response(HTTPStatus.CREATED, UserDetailSchema)
    @blp.arguments(UserDetailSchema)
    def post(self, user_data):
        if UserModel.find_by_email(user_data['email']):
            abort(HTTPStatus.BAD_REQUEST, message='A user with that email already exists.')
        user = UserModel(
            email=user_data['email'],
            password=pbkdf2_sha256.hash(user_data['password']),
            tel=user_data['tel'],
            name=user_data['name'],
            surname=user_data['surname'],
            city=user_data['city'],
        )
        user.save_to_db()
        return user.json()


@blp.route("/login")
class UserLogin(MethodView):
    @blp.arguments(UserLoginSchema)
    def post(self, user_data):
        user = UserModel.find_by_email(user_data["email"])

        if user and pbkdf2_sha256.verify(user_data["password"], user.password):
            return create_jwt_token(user), HTTPStatus.CREATED

        abort(HTTPStatus.BAD_REQUEST, message="Invalid credentials.")


@blp.route("/user/<int:user_id>")
class User(MethodView):

    @blp.response(HTTPStatus.OK, UserDetailSchema)
    def get(self, user_id: int):
        user = get_user_or_abort(user_id)
        return user

    def delete(self, user_id: int):
        user = get_user_or_abort(user_id)
        user.delete_from_db()
        return user.json()


@blp.route("/refresh")
class TokenRefresh(MethodView):
    @jwt_required(refresh=True)
    def post(self):
        current_user = get_jwt_identity()
        new_token = create_access_token(identity=current_user, fresh=False)
        return {"access_token": new_token}, 200
