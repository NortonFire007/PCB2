from http import HTTPStatus
from os.path import join
from uuid import uuid4

from flask import abort
from db import db
from marshmallow import ValidationError


from globals import PRODUCT_IMAGE_UPLOAD_FOLDER, ALLOWED_IMAGE_EXTENSIONS
from models import FavouriteModel, ProductModel, ImageModel
from schemas import ProductSchema


def get_valid_product_data(json_data):
    try:
        product_data = ProductSchema().load(json_data)
    except ValidationError as e:
        abort(HTTPStatus.BAD_REQUEST, message=e.messages)
    return product_data


def save_product_images(images, product_id):
    if not images:
        abort(HTTPStatus.BAD_REQUEST, description='No images provided')

    for index, image in enumerate(images):
        if not image.filename:
            abort(HTTPStatus.BAD_REQUEST, description=f'No image name provided at index {index}')

        if image_extension := image.filename.split('.')[-1] not in ALLOWED_IMAGE_EXTENSIONS:
            abort(HTTPStatus.BAD_REQUEST, description=f'Bad extension {image_extension}')

        filename = f"{uuid4()}.{image.filename.split('.')[-1]}"
        full_path = join(PRODUCT_IMAGE_UPLOAD_FOLDER, filename)
        db.session.add(ImageModel(path=full_path, product_id=product_id, is_first=index == 0))
        image.save(full_path)
    db.session.commit()


def build_search_query(args, query, model, allowed_fields: dict):
    if args.get('query'):
        query = query.filter(model.title.ilike(f'%{args['query']}%'))

    if max_price := args.get('max_price'):
        query = query.filter(model.price < max_price)

    if min_price := args.get('min_price'):
        query = query.filter(model.price > min_price)

    if category_id := args.get('category_id'):
        query = query.filter(model.category_id == category_id)

    if order := args.get('order'):

        if order.startswith('-'):
            order_direction = 'desc'
            order = order[1:]
        else:
            order_direction = 'asc'

        if order in allowed_fields:
            order_column = allowed_fields[order]
            if order_direction == 'desc':
                query = query.order_by(order_column.desc())
            else:
                query = query.order_by(order_column.asc())
        else:
            return {"message": f"Invalid order field: {order}"}, HTTPStatus.BAD_REQUEST

    if amount := args.get('amount'):
        query = query.limit(amount)

    return query


def get_products_for_you(user_id, amount):
    if favourites := FavouriteModel.query.filter_by(user_id=user_id):
        product_ids = [favourite.product_id for favourite in favourites.all()]
        products = ProductModel.query.filter(ProductModel.id.in_(product_ids)).all()
        product_categories = [product.category_id for product in products]
        seller_ids = [product.user_id for product in products]
        desired_products = ProductModel.query.filter(ProductModel.category_id.in_(product_categories),
                                                     ProductModel.user_id.in_(seller_ids)).order_by(
            ProductModel.rating.desc()).limit(amount).all()
        return desired_products
    else:
        return ProductModel.query.order_by(ProductModel.created_at.desc(), ProductModel.rating.desc()).limit(
            amount).all()
