from fastapi import APIRouter, UploadFile, File, Form, Depends, Response

import oauth2
from . import schemas, services


user_router = APIRouter(
    prefix="/api/users",
    tags=["users"]
)


@user_router.post("/register", responses={409: {}})
async def register(user: schemas.UserRegister):
    return await services.create_user(user)


@user_router.post("/set-user-photo")
async def set_user_photo(email: str = Form(...), userType: str = Form(...), photo: UploadFile = File(...)):
    return await services.save_user_photo(email, userType, photo)


@user_router.post("/login", responses={400: {}})
async def login(user: schemas.UserLogin, Authorize: oauth2.AuthJWT = Depends()):
    return await services.login_user(user, Authorize)
