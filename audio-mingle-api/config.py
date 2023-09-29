from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    MYSQL_HOST: str = "localhost"
    MYSQL_USER: str
    MYSQL_PASSWORD: str
    MYSQL_DB: str
    MG_HOST_URL: str
    MG_SEND_EMAIL_FROM: str
    MG_API_KEY: str
    REDIS_HOST: str = "localhost"
    REDIS_PORT: int = 6379
    CLIENT_PATH: str
    JWT_SECRET: str
    JWT_ALGORITHM: str = "HS256"

    class Config:
        env_file = ".env"


settings = Settings()
