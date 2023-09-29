from fastapi import APIRouter, HTTPException, BackgroundTasks, Response, Request
from models.connect import DB_DEPENDENCY
from models.user import ForgotPasswordRequest, ResetPasswordRequest, RegisterUserRequest, LoginUserRequest, User
from starlette import status
from utils.email import send_email
from config import settings
from uuid import uuid4
from lib.auth import check_email_exists, generate_access_token, current_user
from utils import constants, auth
from argon2 import PasswordHasher
from datetime import timedelta, datetime

import redis

router = APIRouter(
    tags=["Authentication and Authorization"],
    prefix="/auth"
)

r = redis.Redis(
    host=settings.REDIS_HOST,
    port=settings.REDIS_PORT
)

argon2_hasher = PasswordHasher()


@router.post("/register", status_code=status.HTTP_201_CREATED)
def register_user(response: Response, user: RegisterUserRequest, db: DB_DEPENDENCY):
    # check if email exists
    email_exists = db.query(User).filter(User.email == user.email).first()

    if email_exists is not None:
        raise HTTPException(400, "Email already exists")

    # register user
    hashed_password = argon2_hasher.hash(user.password)
    new_user = User(
        name=user.name,
        email=user.email,
        password=hashed_password,
        is_confirmed=False,
        role=constants.USER_ROLE
    )

    db.add(new_user)
    db.commit()

    generate_add_token_to_cookie(response, new_user)


@router.post("/login", status_code=status.HTTP_200_OK)
def login_user(response: Response, user: LoginUserRequest, db: DB_DEPENDENCY):
    # check if user exists
    user_from_db = db.query(User).filter(User.email == user.email).first()

    if not user_from_db:
        raise HTTPException(401, "Invalid email or password")

    if not argon2_hasher.verify(user_from_db.password, user.password):
        raise HTTPException(401, "Invalid email or password")

    # generate token and add to cookie
    token = generate_add_token_to_cookie(response, user_from_db)

    return {
        "user": {
            "id": user_from_db.id,
            "name": user_from_db.name,
            "email": user_from_db.email,
            "role": user_from_db.role
        },
        "access_token": token,
        "token_type": "Bearer"
    }


def generate_add_token_to_cookie(response: Response, user: User):
    # generate and add token to cookie as http for auth
    cookie_expire = datetime.now() + timedelta(weeks=1)
    token = generate_access_token(user.id, user.email, user.role,
                                  user.is_confirmed, timedelta(weeks=1))
    response.set_cookie(constants.ACCESS_TOKEN, token, httponly=True,
                        expires=cookie_expire.strftime("%a, %d %b %Y %H:%M:%S GMT"))
    return token


@router.get("/current-user", status_code=status.HTTP_200_OK)
def get_current_user(request: Request, db: DB_DEPENDENCY):
    cookie_token = request.cookies.get(constants.ACCESS_TOKEN)

    token = cookie_token if cookie_token else request.headers["Authorization"]

    if token is None:
        return {}

    user_from_token = current_user(token)
    user = db.query(User).filter(User.id == user_from_token.get("id")).first()

    if user is None:
        return {}

    return auth.return_user_data(user)


@router.post("/logout", status_code=status.HTTP_204_NO_CONTENT)
def logout_user(response: Response):
    # access then delete token
    response.delete_cookie(constants.ACCESS_TOKEN)


@router.post("/forgot-password", status_code=status.HTTP_204_NO_CONTENT)
# takes in an email address and send reset password email
def forgot_user_password(user_input: ForgotPasswordRequest, db: DB_DEPENDENCY, background_tasks: BackgroundTasks):
    email_exists = check_email_exists(user_input.email, db)

    # generate reset code and store in Redis
    reset_code = uuid4()
    r.set(email_exists.email, str(reset_code), ex=60 * 60 * 24)

    reset_link = f"{settings.CLIENT_PATH}/reset-password?code={reset_code}"
    # send email to user in the background
    background_tasks.add_task(
        send_email,
        email_exists.email,
        "Reset Your Password",
        f"Click this link to reset your password: <a href=\"{reset_link}\">{reset_link}</a>. The link will expire in 24hrs."
    )


@router.post("/reset-password", status_code=status.HTTP_204_NO_CONTENT)
# takes in a password and confirm_password and resets user email
def reset_user_password(input: ResetPasswordRequest, db: DB_DEPENDENCY, background_tasks: BackgroundTasks):
    # check if email exists
    email_exists = check_email_exists(input.email, db)

    # check if code exists or is invalid
    reset_code = r.get(email_exists.email)

    if reset_code is None or reset_code.decode() != str(input.code):
        raise HTTPException(400, "Invalid password reset code")

    # delete entry from redis
    r.delete(email_exists.email)

    # check if passwords match
    if input.password != input.confirm_password:
        raise HTTPException(400, "Passwords must match")

    # reset password
    email_exists.password = input.password
    db.add(email_exists)
    db.commit()

    # send confirmation email
    background_tasks.add_task(
        send_email,
        email_exists.email,
        "Password Reset Successful",
        "Your password has been reset successfully"
    )
