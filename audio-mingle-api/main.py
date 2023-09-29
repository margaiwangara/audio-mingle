from fastapi import FastAPI
from models import user
from database import engine
from routers import auth, stream
from fastapi.middleware.cors import CORSMiddleware
from config import settings

app = FastAPI()

# base models
user.Base.metadata.create_all(bind=engine)

# include routers
app.include_router(auth.router, prefix="/api")
app.include_router(stream.router, prefix="/api")

# cors
origins = [settings.CLIENT_PATH, "http://127.0.0.1:3000"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["POST", "GET", "PUT", "DELETE"],
    allow_headers=["*"]
)


@app.get("/")
def hello_world():
    return {"message": "Hello World"}
