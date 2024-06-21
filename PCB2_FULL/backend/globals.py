from os.path import join

UPLOAD_FOLDER = 'static/uploads'
PRODUCT_IMAGE_UPLOAD_FOLDER = join(UPLOAD_FOLDER, 'products')
USER_IMAGE_UPLOAD_FOLDER = join(UPLOAD_FOLDER, 'users')
DEFAULT_PROFILE_IMAGE = 'default_profile_pic.png'
CATEGORY_IMAGE_UPLOAD_FOLDER = join(UPLOAD_FOLDER, 'categories')

ALLOWED_IMAGE_EXTENSIONS = ['png', 'jpg', 'jpeg']
ALLOWED_ICON_EXTENSIONS = ['ico', 'svg']
