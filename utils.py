from redis import Redis
from models import ProductModel, ProductCommentModel
from db import db


redis_client = Redis()


def update_product_rating(product_id):
    product = ProductModel.find_by_id(product_id)
    if product:
        # Check if rating exists in Redis cache
        rating = redis_client.get(f'product:{product_id}:rating')
        if rating:
            product.rating = float(rating.decode('utf-8'))
        else:
            comments = ProductCommentModel.query.filter_by(product_id=product_id).all()
            if comments:
                total_grade = sum(comment.grade for comment in comments)
                average_rating = total_grade / len(comments)
                product.rating = average_rating
                # Update Redis cache
                redis_client.set(f'product:{product_id}:rating', average_rating, ex=3600)  # 1 hour
                db.session.commit()
