from flask import Flask
from flask_jwt_extended import JWTManager
from flask_smorest import Api
from flask_cors import CORS

from db import db
from admin import admin
from resources.cart import blp as CartBlueprint
from resources.cart_item import blp as CartItemBlueprint
from resources.product import blp as ProductBlueprint
from resources.category import blp as CategoryBlueprint
from resources.user import blp as UserBlueprint
from resources.favourite import blp as FavouritesBlueprint
from resources.product_comment import blp as ProductCommentBlueprint
from resources.profile_comment import blp as ProfileCommentBlueprint


def create_app(db_uri=None):
    app = Flask(__name__)

    CORS(app)

    app.config["API_TITLE"] = "Stores REST API"
    app.config["API_VERSION"] = "v1"
    app.config["OPENAPI_VERSION"] = "3.0.3"
    app.config["OPENAPI_URL_PREFIX"] = "/"
    app.config["OPENAPI_SWAGGER_UI_PATH"] = "/swagger-ui"
    app.config[
        "OPENAPI_SWAGGER_UI_URL"
    ] = "https://cdn.jsdelivr.net/npm/swagger-ui-dist/"
    app.config["SQLALCHEMY_DATABASE_URI"] = db_uri if db_uri else 'sqlite:///my.db'
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config["PROPAGATE_EXCEPTIONS"] = True

    db.init_app(app)
    admin.init_app(app)
    api = Api(app)

    jwt = JWTManager(app)
    app.config['JWT_SECRET_KEY'] = 'S:{ifZ:}BEjk,pJp/zOF/(xuebyeu0gQe7G*r=FE'

    with app.app_context():
        db.create_all()

    api.register_blueprint(CartBlueprint)
    api.register_blueprint(CartItemBlueprint)
    api.register_blueprint(ProductBlueprint)
    api.register_blueprint(CategoryBlueprint)
    api.register_blueprint(UserBlueprint)
    api.register_blueprint(FavouritesBlueprint)
    api.register_blueprint(ProductCommentBlueprint)
    api.register_blueprint(ProfileCommentBlueprint)

    return app


if __name__ == "__main__":
    # postgresql://postgres:{password}@localhost/{db_name}
    create_app().run(host='0.0.0.0', port=5000, debug=True)
