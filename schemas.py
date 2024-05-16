from marshmallow import Schema, fields, validate
from models import UserModel


class UserLoginSchema(Schema):
    id = fields.Integer(dump_only=True)
    email = fields.Email(required=True)
    password = fields.String(required=True, load_only=True)


class UserDetailSchema(UserLoginSchema):
    tel = fields.String(required=True)
    name = fields.String(required=True)
    surname = fields.String(required=True)
    city = fields.String(required=True)
    profile_image = fields.String()


class CategorySchema(Schema):
    id = fields.Integer(dump_only=True)
    title = fields.String(required=True)


class FavouriteSchema(Schema):
    id = fields.Integer(dump_only=True)
    user_id = fields.Integer(dump_only=True)
    product_id = fields.Integer(required=True)


class PlainProductCommentSchema(Schema):
    id = fields.Integer(dump_only=True)
    text = fields.String()
    grade = fields.Integer(required=True, validate=validate.Range(min=1, max=5))
    product_id = fields.Integer(required=True)
    user_id = fields.Integer(dump_only=True)
    created_at = fields.DateTime(dump_only=True, format='%Y-%m-%d %H:%M:%S')


class ProductCommentSchema(PlainProductCommentSchema):
    user_image = fields.Method('get_product_comment_image', dump_only=True)
    user_name = fields.Method('get_product_comment_username', dump_only=True)

    def get_product_comment_image(self, product_comment):
        user = UserModel.query.get(product_comment.user_id)
        return user.profile_image if user else None

    def get_product_comment_username(self, product_comment):
        user = UserModel.query.get(product_comment.user_id)
        return user.name if user else None


class ProfileCommentSchema(Schema):
    id = fields.Integer(dump_only=True)
    text = fields.String()
    grade = fields.Integer(required=True)
    user_profile_id = fields.Integer(required=True)
    user_id = fields.Integer(required=True)


class CartItemSchema(Schema):
    id = fields.Integer(dump_only=True)
    cart_id = fields.Integer(required=True)
    product_id = fields.Integer(required=True)
    quantity = fields.Integer(required=True)
    price = fields.Float(required=True)
    created_at = fields.DateTime()


class ImageSchema(Schema):
    id = fields.Integer(dump_only=True)
    is_first = fields.Boolean()
    path = fields.String()
    product_id = fields.Integer()


class ProductPageSchema(Schema):
    id = fields.Integer(dump_only=True)
    title = fields.String(required=True)
    description = fields.String(required=True)
    price = fields.Integer(required=True)
    rating = fields.Float(dump_only=True)
    zsu_price = fields.Float(dump_only=True)
    user_id = fields.Integer(required=True, load_only=True)
    category_id = fields.Integer(required=True)
    images = fields.List(fields.Nested('ImageSchema', only=['path']))
    comments = fields.List(
        fields.Nested('ProductCommentSchema',
                      only=['text', 'grade', 'created_at', 'product_id', 'user_id', 'user_image', 'user_name']))
    product_owner = fields.Nested('UserDetailSchema', only=['id', 'name', 'surname', 'profile_image'])
    rating_info = fields.Dict()


class ProductTemplateSchema(Schema):
    id = fields.Integer(dump_only=True)
    title = fields.String(required=True)
    description = fields.String(required=True)
    price = fields.Integer(required=True)
    rating = fields.Float(dump_only=True)
    zsu_price = fields.Float(dump_only=True)
    user_id = fields.Integer(dump_only=True)
    category_id = fields.Integer(required=True)
    image = fields.Method('get_first_image')

    def get_first_image(self, product):
        first_image = product.images.filter_by(is_first=True).first()
        return first_image.path if first_image else None
