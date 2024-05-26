from collections import Counter

from models import ProductCommentModel, ProductModel


def get_grades_info(product_id: int):
    comments = ProductCommentModel.query.filter_by(product_id=product_id).all()
    grades_info = dict(Counter(comment.grade for comment in comments))
    return grades_info


def update_product_data(product):
    comments = ProductCommentModel.query.filter_by(product_id=product.id).all()
    total_grade = sum(comment.grade for comment in comments)
    average_rating = total_grade / len(comments)
    product.rating = average_rating
    product.reviews_qty += 1
    product.save_to_db()
