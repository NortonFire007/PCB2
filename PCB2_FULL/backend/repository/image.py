from os import remove
from os.path import exists

from globals import UPLOAD_FOLDER, DEFAULT_PROFILE_IMAGE


def delete_image_from_storage(file_path):
    if exists(file_path) and file_path.startswith(UPLOAD_FOLDER) and not file_path.endswith(DEFAULT_PROFILE_IMAGE):
        remove(file_path)


