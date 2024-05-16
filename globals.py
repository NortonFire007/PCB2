from os.path import join

UPLOAD_FOLDER = 'static/uploads'
PRODUCT_IMAGE_UPLOAD_FOLDER = join(UPLOAD_FOLDER, 'products')
CATEGORY_IMAGE_UPLOAD_FOLDER = join(UPLOAD_FOLDER, 'categories')

ALLOWED_IMAGE_EXTENSIONS = ['png', 'jpg', 'jpeg']
ALLOWED_ICON_EXTENSIONS = ['ico']
