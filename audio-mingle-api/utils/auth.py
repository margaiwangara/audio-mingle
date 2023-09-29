from models.user import User


def return_user_data(user: User):
    return {
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "role": user.role,
        "is_confirmed": user.is_confirmed,
        "created_at": user.created_at
    }
