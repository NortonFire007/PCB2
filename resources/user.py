from flask.views import MethodView
from flask import request
from flask_smorest import Blueprint, abort
from flask_jwt_extended import get_jwt_identity, jwt_required, create_access_token, create_refresh_token
from passlib.handlers.pbkdf2 import pbkdf2_sha256
from sqlalchemy.exc import SQLAlchemyError

from db import db
from models import UserModel, CartModel
from schemas import PlainUserSchema, LoginUserSchema

blp = Blueprint('Users', __name__, description='Operations with users')


@blp.route('/register')
class UserRegister(MethodView):
    @blp.arguments(PlainUserSchema)
    def post(self, user_data):
        if UserModel.find_by_email(user_data['email']):
            abort(400, message='A user with that email already exists.')
        user = UserModel(
            email=user_data['email'],
            password=pbkdf2_sha256.hash(user_data['password']),
            phone_number=user_data['phone_number'],
            first_name=user_data['first_name'],
            last_name=user_data['last_name'],
            city=user_data['city'],
            profile_image='img',
            profile_image_mimetype='mimetype'
        )
        user.save_to_db()

        user_cart = CartModel(user_id=user.id)

        user_cart.save_to_db()

        return {'message': 'User created successfully.'}, 201


@blp.route("/login")
class UserLogin(MethodView):
    @blp.arguments(LoginUserSchema)
    def post(self, user_data):
        user = UserModel.find_by_email(user_data["email"])

        if user and pbkdf2_sha256.verify(user_data["password"], user.password):
            access_token = create_access_token(identity=user.id, fresh=True)
            refresh_token = create_refresh_token(user.id)
            return {"access_token": access_token, "refresh_token": refresh_token}, 200

        abort(401, message="Invalid credentials.")


@blp.route("/user/<int:user_id>")
class User(MethodView):

    @blp.response(200, PlainUserSchema)
    def get(self, user_id):
        user = UserModel.find_by_id(user_id)
        if not user:
            abort(404, message='User not found.')
        return user

    def delete(self, user_id):
        user = UserModel.find_by_id(user_id)
        if not user:
            abort(404, message='User not found.')
        user.delete_from_db()
        return {"message": "User deleted."}, 200


@blp.route("/refresh")
class TokenRefresh(MethodView):
    @jwt_required(refresh=True)
    def post(self):
        current_user = get_jwt_identity()
        new_token = create_access_token(identity=current_user, fresh=False)
        return {"access_token": new_token}, 200
