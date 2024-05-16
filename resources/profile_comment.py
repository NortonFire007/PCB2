from http import HTTPStatus

from flask.views import MethodView
from flask_smorest import Blueprint, abort
from flask_jwt_extended import get_jwt_identity, jwt_required
from sqlalchemy.exc import SQLAlchemyError

from models import ProfileCommentModel
from schemas import ProfileCommentSchema

blp = Blueprint('Profiles_Comments', __name__, description='Operations on Profile Comments')


@blp.route('/profiles/comments/<int:profile_id>')
class ProfileCommentList(MethodView):
    @blp.response(HTTPStatus.OK, ProfileCommentSchema(many=True))
    def get(self, profile_id):
        comments = ProfileCommentModel.query.filter_by(user_profile_id=profile_id).all()
        return comments


@blp.route('/profiles/comments')
class ProfileComment(MethodView):
    @jwt_required()
    @blp.arguments(ProfileCommentSchema)
    @blp.response(HTTPStatus.CREATED, ProfileCommentSchema)
    def post(self, comment_data):
        user_id = get_jwt_identity()
        if ProfileCommentModel.query.filter_by(user_profile_id=comment_data['user_profile_id'],
                                               user_id=user_id).first():
            abort(HTTPStatus.BAD_REQUEST, message='You already commented on this profile')
        profile_comment = ProfileCommentModel(user_id=user_id, **comment_data)
        profile_comment.save_to_db()
        return profile_comment.json()

