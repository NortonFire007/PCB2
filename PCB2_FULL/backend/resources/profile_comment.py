from http import HTTPStatus

from flask.views import MethodView
from flask_smorest import Blueprint, abort
from flask_jwt_extended import get_jwt_identity, jwt_required

from models import ProfileCommentModel, UserModel
from schemas import ProfileCommentSchema

Blp = Blueprint('Profiles_Comments', __name__, description='Operations on Profile Comments')


@Blp.route('/profiles/comments/<int:profile_id>')
class ProfileCommentList(MethodView):
    @Blp.response(HTTPStatus.OK, ProfileCommentSchema(many=True))
    def get(self, profile_id):
        return ProfileCommentModel.query.filter_by(user_profile_id=profile_id).all()


@Blp.route('/profiles/comments/add')
class ProfileComment(MethodView):
    @jwt_required()
    @Blp.arguments(ProfileCommentSchema)
    @Blp.response(HTTPStatus.CREATED, ProfileCommentSchema)
    def post(self, comment_data):
        user_id = get_jwt_identity()
        user_profile_id = comment_data['user_profile_id']

        user_profile = UserModel.query.get_or_404(user_profile_id)
        if user_id == user_profile.user_id:
            abort(HTTPStatus.BAD_REQUEST, description='You are not allowed to comment your profile')

        if ProfileCommentModel.query.filter_by(user_profile_id=user_profile_id, user_id=user_id).first():
            abort(HTTPStatus.BAD_REQUEST, message='You already commented on this profile')

        profile_comment = ProfileCommentModel(user_id=user_id, **comment_data)
        profile_comment.save_to_db()
        return profile_comment.json()
