from os import remove
from os.path import exists


def delete_image_from_storage(file_path):
    if exists(file_path):
        remove(file_path)
