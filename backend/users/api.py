from fastapi import APIRouter, UploadFile, File, Form, Depends, Response

import oauth2
from dependencies import check_access_token, check_refresh_token
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


@user_router.delete("/logout")
async def logout(Authorize: oauth2.AuthJWT = Depends()):
    return await services.logout_user(Authorize)


@user_router.post("/refresh", dependencies=[Depends(check_refresh_token)], responses={401: {}})
async def refresh(Authorize: oauth2.AuthJWT = Depends()):
    return await services.recreate_tokens(Authorize)


@user_router.put("/edit-user-info", dependencies=[Depends(check_access_token)], responses={401: {}})
async def edit_user_info(user: schemas.UserEdit, Authorize: oauth2.AuthJWT = Depends()):
    return await services.edit_user(user, Authorize)


@user_router.post("/change-user-photo", dependencies=[Depends(check_access_token)], responses={401: {}})
async def change_user_photo(photo: UploadFile = File(...), Authorize: oauth2.AuthJWT = Depends()):
    return await services.change_user_photo(photo, Authorize)    


@user_router.get("/get-employee-rating", response_model=float, dependencies=[Depends(check_access_token)], responses={401: {}})
async def get_employee_rating(Authorize: oauth2.AuthJWT = Depends()):
    return await services.get_employee_rating(Authorize)
