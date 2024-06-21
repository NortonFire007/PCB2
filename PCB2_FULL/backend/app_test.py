import secrets
from datetime import timedelta

from flask import Flask
from flask_jwt_extended import JWTManager
from flask_smorest import Api
from flask_cors import CORS

from admin import admin
from db import db
from globals import PRODUCT_IMAGE_UPLOAD_FOLDER
from resources.cart_item import Blp as CartItemBlueprint
from resources.product import Blp as ProductBlueprint
from resources.category import Blp as CategoryBlueprint
from resources.user import Blp as UserBlueprint
from resources.favourite import Blp as FavouritesBlueprint
from resources.product_comment import Blp as ProductCommentBlueprint
from resources.profile_comment import Blp as ProfileCommentBlueprint
from resources.image import Blp as ImageBlueprint


def create_app(db_uri=None):
    app = Flask(__name__)

    app.secret_key = secrets.token_hex(16)

    CORS(app, supports_credentials=True)

    app.config["API_TITLE"] = "Stores REST API"
    app.config["API_VERSION"] = "v1"
    app.config["OPENAPI_VERSION"] = "3.0.3"
    app.config["OPENAPI_URL_PREFIX"] = "/"
    app.config["OPENAPI_SWAGGER_UI_PATH"] = "/swagger-ui"
    app.config["OPENAPI_SWAGGER_UI_URL"] = "https://cdn.jsdelivr.net/npm/swagger-ui-dist/"
    app.config["SQLALCHEMY_DATABASE_URI"] = db_uri if db_uri else 'sqlite:///my.db'
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config["PROPAGATE_EXCEPTIONS"] = True
    app.config['SQLALCHEMY_ECHO'] = True

    db.init_app(app)
    app.config['UPLOAD_FOLDER'] = PRODUCT_IMAGE_UPLOAD_FOLDER
    admin.init_app(app)
    api = Api(app)

    jwt = JWTManager(app)
    app.config['JWT_SECRET_KEY'] = 'S:{ifZ:}BEjk,pJp/zOF/(xuebyeu0gQe7G*r=FE'
    app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(days=30)
    app.config['JWT_REFRESH_TOKEN_EXPIRES'] = timedelta(days=30)
    app.config['JWT_BLACKLIST_ENABLED'] = True
    app.config['JWT_BLACKLIST_TOKEN_CHECKS'] = ['access', 'refresh']
    app.config['JWT_COOKIE_SECURE'] = True
    with app.app_context():
        db.create_all()

    api.register_blueprint(CartItemBlueprint)
    api.register_blueprint(ProductBlueprint)
    api.register_blueprint(CategoryBlueprint)
    api.register_blueprint(UserBlueprint)
    api.register_blueprint(FavouritesBlueprint)
    api.register_blueprint(ProductCommentBlueprint)
    api.register_blueprint(ProfileCommentBlueprint)
    api.register_blueprint(ImageBlueprint)

    return app


if __name__ == "__main__":
    # postgresql://postgres:{password}@localhost/{db_name}
    create_app('postgresql://postgres:123@localhost/PCB2').run(host='0.0.0.0', port=5000, debug=True)
