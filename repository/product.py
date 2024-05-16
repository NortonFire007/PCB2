from datetime import datetime


def format_datetime(datetime_str: str):
    return datetime.strptime(datetime_str, '%Y-%m-%d %H:%M:%S')
