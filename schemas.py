from marshmallow import Schema, fields


class PlainProductSchema(Schema):
    id = fields.Integer(dump_only=True)
    title = fields.String(required=True)
    description = fields.String(required=True)
    price = fields.Integer(required=True)
    rating = fields.Float(dump_only=True)
    # image = fields.String(required=True)
    category_id = fields.Integer(required=True)


class LoginUserSchema(Schema):
    id = fields.Integer(dump_only=True)
    email = fields.Email(required=True)
    password = fields.String(required=True)


class PlainUserSchema(LoginUserSchema):
    phone_number = fields.String(required=True)
    first_name = fields.String(required=True)
    last_name = fields.String(required=True)
    city = fields.String(required=True)


class PlainCategorySchema(Schema):
    id = fields.Integer(dump_only=True)
    title = fields.String(required=True)


class FavouriteSchema(Schema):
    id = fields.Integer(dump_only=True)
    user_id = fields.Integer(dump_only=True)
    product_id = fields.Integer(required=True)


class PlainProductCommentSchema(Schema):
    id = fields.Integer(dump_only=True)
    text = fields.String()
    grade = fields.Integer(required=True)
    product_id = fields.Integer(required=True)
    user_id = fields.Integer(dump_only=True)


class PlainProfileCommentSchema(Schema):
    id = fields.Integer(dump_only=True)
    text = fields.String()
    grade = fields.Integer(required=True)
    user_profile_id = fields.Integer(required=True)
    user_id = fields.Integer(dump_only=True)