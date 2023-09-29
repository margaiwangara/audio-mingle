from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import URL
from config import settings

url_object = URL.create(
    "mysql+mysqlconnector",
    username=settings.MYSQL_USER,
    password=settings.MYSQL_PASSWORD,
    host=settings.MYSQL_HOST,
    database=settings.MYSQL_DB
)

engine = create_engine(url_object, echo=True)

SessionLocal = sessionmaker(bind=engine, autoflush=True)

Base = declarative_base()
