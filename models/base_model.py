from db import db


class BaseModel:

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()


def main():
    pass


if __name__ == '__main__':
    main()
