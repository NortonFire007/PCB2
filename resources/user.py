from http import HTTPStatus

from flask.views import MethodView
from flask_smorest import Blueprint, abort
from flask_jwt_extended import get_jwt_identity, jwt_required, create_access_token
from passlib.handlers.pbkdf2 import pbkdf2_sha256

from models import UserModel
from schemas import UserDetailSchema, UserLoginSchema
from utils import create_jwt_token

Blp = Blueprint('Users', __name__, description='Operations with users')


@Blp.route('/register')
class UserRegister(MethodView):
    @Blp.response(HTTPStatus.CREATED, UserDetailSchema)
    @Blp.arguments(UserDetailSchema)
    def post(self, user_data):
        if UserModel.find_by_email(user_data['email']):
            abort(HTTPStatus.BAD_REQUEST, message='A user with that email already exists.')

        user_data['password'] = pbkdf2_sha256.hash(user_data['password'])

        user = UserModel(**user_data)
        user.save_to_db()
        return user.json()


@Blp.route("/login")
class UserLogin(MethodView):
    @Blp.arguments(UserLoginSchema)
    def post(self, user_data):
        user = UserModel.find_by_email(user_data["email"])

        if user and pbkdf2_sha256.verify(user_data["password"], user.password):
            return create_jwt_token(user), HTTPStatus.CREATED

        abort(HTTPStatus.BAD_REQUEST, message="Invalid credentials.")


@Blp.route("/user/<int:user_id>")
class User(MethodView):

    @Blp.response(HTTPStatus.OK, UserDetailSchema)
    def get(self, user_id: int):
        user = UserModel.query.get_or_404(user_id)
        return user

    def delete(self, user_id: int):
        user = UserModel.query.get_or_404(user_id)
        user.delete_from_db()
        return user


@Blp.route("/refresh")
class TokenRefresh(MethodView):
    @jwt_required(refresh=True)
    def post(self):
        current_user = get_jwt_identity()
        new_token = create_access_token(identity=current_user, fresh=False)
        return {"access_token": new_token}, 200
