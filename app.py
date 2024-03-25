from flask import Flask
from flask_jwt_extended import JWTManager
from flask_smorest import Api

import models

from db import db
from resources.product import blp as ProductBlueprint
from resources.category import blp as CategoryBlueprint
from resources.user import blp as UserBlueprint
from resources.favourite import blp as FavouritesBlueprint
from resources.product_comment import blp as ProductCommentBlueprint
from resources.profile_comment import blp as ProfileCommentBlueprint


def create_app(db_url=None):
    app = Flask(__name__)
    app.config["API_TITLE"] = "Stores REST API"
    app.config["API_VERSION"] = "v1"
    app.config["OPENAPI_VERSION"] = "3.0.3"
    app.config["OPENAPI_URL_PREFIX"] = "/"
    app.config["OPENAPI_SWAGGER_UI_PATH"] = "/swagger-ui"
    app.config[
        "OPENAPI_SWAGGER_UI_URL"
    ] = "https://cdn.jsdelivr.net/npm/swagger-ui-dist/"
    app.config["SQLALCHEMY_DATABASE_URI"] = 'postgresql://postgres:stikers456@host.docker.internal/pashtet_db'
    # sqlite:///data.db
    # postgresql://postgres:stikers456@localhost/pashtet_db
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config["PROPAGATE_EXCEPTIONS"] = True

    db.init_app(app)
    api = Api(app)

    jwt = JWTManager(app)
    app.config['JWT_SECRET_KEY'] = 'jopa'

    with app.app_context():
        db.create_all()

    api.register_blueprint(ProductBlueprint)
    api.register_blueprint(CategoryBlueprint)
    api.register_blueprint(UserBlueprint)
    api.register_blueprint(FavouritesBlueprint)
    api.register_blueprint(ProductCommentBlueprint)
    api.register_blueprint(ProfileCommentBlueprint)

    return app


if __name__ == "__main__":
    create_app().run(host='0.0.0.0', port=5000)
