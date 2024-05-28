from marshmallow import Schema, fields
from marshmallow.fields import List, Nested, Integer, String, Float, Method, Boolean, DateTime, Email
from marshmallow.validate import Range, OneOf

from models import UserModel
from repository.product_comment import get_grades_info


class UserLoginSchema(Schema):
    id = Integer(dump_only=True)
    email = Email(required=True)
    password = String(required=True, load_only=True)


class UserDetailSchema(UserLoginSchema):
    tel = String(required=True)
    name = String(required=True)
    surname = String(required=True)
    city = String(required=True)
    profile_image = String()


class CategorySchema(Schema):
    id = Integer(dump_only=True)
    title = String(required=True)
    icon = String(required=True)


class FavouriteSchema(Schema):
    id = Integer(dump_only=True)
    user_id = Integer(dump_only=True)
    product_id = Integer(required=True)


class PlainProductCommentSchema(Schema):
    id = Integer(dump_only=True)
    text = String()
    grade = Integer(required=True, validate=Range(min=1, max=5))
    product_id = Integer(required=True)
    user_id = Integer(dump_only=True)
    created_at = DateTime(dump_only=True, format='%Y-%m-%d %H:%M:%S')


class ProductCommentSchema(PlainProductCommentSchema):
    user_image = Method('get_product_comment_image', dump_only=True)
    user_name = Method('get_product_comment_username', dump_only=True)

    def get_product_comment_image(self, product_comment):
        user = UserModel.query.get(product_comment.user_id)
        return user.profile_image

    def get_product_comment_username(self, product_comment):
        user = UserModel.query.get(product_comment.user_id)
        return f'{user.name} {user.surname}'



class ProfileCommentSchema(Schema):
    id = Integer(dump_only=True)
    text = String()
    grade = Integer(required=True)
    user_profile_id = Integer(required=True)
    user_id = Integer(required=True)


class PlainCartItemSchema(Schema):
    id = Integer(dump_only=True)
    user_id = Integer()
    product_id = Integer(required=True)
    quantity = Integer(required=True)
    price = Float(required=True)
    created_at = DateTime()


class CartItemSchema(PlainCartItemSchema):
    product = Nested('ProductTemplateSchema', only=['title', 'rating', 'image'])


class ImageSchema(Schema):
    id = Integer(dump_only=True)
    is_first = Boolean()
    path = String()
    product_id = Integer()


class ProductSchema(Schema):
    id = Integer(dump_only=True)
    title = String(required=True)
    description = String(required=True)
    price = Integer(required=True)
    zsu_price = Float(required=True)
    rating = Float(dump_only=True)
    user_id = Integer(load_only=True)
    category_id = Integer(required=True)


class ProductPageSchema(ProductSchema):
    images = List(Nested('ImageSchema', only=['path']))
    comments = List(
        Nested('ProductCommentSchema',
                      only=['text', 'grade', 'created_at', 'product_id', 'user_id', 'user_image', 'user_name']))
    product_owner = Nested('UserDetailSchema', only=['id', 'name', 'surname', 'profile_image'])
    rating_info = Method('get_rating')

    def get_rating(self, obj):
        return get_grades_info(obj.id)


class ProductTemplateSchema(ProductSchema):
    image = Method('get_first_image')

    def get_first_image(self, product):
        first_image = product.images.filter_by(is_first=True).first()
        return first_image.path if first_image else None
