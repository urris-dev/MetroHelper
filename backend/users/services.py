from fastapi import UploadFile
from fastapi.responses import Response
from fastapi.exceptions import HTTPException
from os import mkdir, path, rename
from typing import Union

import oauth2
from config import settings
from . import models, schemas, utils, _BASE_DIR


JWT_ACCESS_TOKEN_EXPIRES_IN = settings.JWT_ACCESS_TOKEN_EXPIRES_IN * 60
JWT_REFRESH_TOKEN_EXPIRES_IN = settings.JWT_REFRESH_TOKEN_EXPIRES_IN * 60


async def save_user_photo(email: str, userType: str, photo: UploadFile):
    dir_path = path.join(_BASE_DIR, "media", email)
    file_path = path.join(dir_path, "avatar.png")
    with open(file_path, "wb") as f:
        f.write(await photo.read())
    
    if (userType == 'passenger'):
        user = await models.Passenger.objects.get(email=email)
    elif (userType == 'employee'):
        user = await models.Employee.objects.get(email=email)
    user.photo = f"/media/{email}/avatar.png"
    await user.update(["photo"])


async def create_user(user: schemas.UserRegister) -> Union[HTTPException, Response]:
    if user.userType == "employee":
        try:
            await models.Passenger.objects.get(email=user.email)
            raise HTTPException(status_code=400, detail="Невозможно зарегистрировать пользователя данного типа с переданной электронной почтой.")
        except HTTPException as e:
            raise e
        except: pass

        try:
            await models.Employee.objects.get(email=user.email)
            raise HTTPException(status_code=409, detail="Данный пользователь уже зарегистрирован.")
        except HTTPException as e:
            raise e
        except: pass
        
        user.password = await utils.hash_data(user.password)
        await models.Employee.objects.create(**user.model_dump(exclude={"userType", "passengerType"}), photo="")
    elif user.userType == 'passenger':
        try:
            await models.Employee.objects.get(email=user.email)
            raise HTTPException(status_code=400, detail="Невозможно зарегистрировать пользователя данного типа с переданной электронной почтой.")
        except HTTPException as e:
            raise e
        except: pass

        try:
            await models.Passenger.objects.get(email=user.email)
            raise HTTPException(status_code=409, detail="Данный пользователь уже зарегистрирован.")
        except HTTPException as e:
            raise e
        except: pass

        user.password = await utils.hash_data(user.password)
        await models.Passenger.objects.create(**user.model_dump(exclude={"userType", "passengerType"}), type=user.passengerType, photo="")

    mkdir(path.join(_BASE_DIR, "media", user.email))
    return Response(status_code=200)


async def login_user(user: schemas.UserLogin, Authorize: oauth2.AuthJWT) -> Union[HTTPException, Response]:
    try:
        if user.userType == 'employee':
            _user = await models.Employee.objects.get(email=user.email)
        elif user.userType == 'passenger':
            _user = await models.Passenger.objects.get(email=user.email)
    except:
        raise HTTPException(status_code=400, detail="Неправильная почта или пароль.")
    
    if not(await utils.verify_data(user.password, _user.password)):
        raise HTTPException(status_code=400, detail="Неправильная почта или пароль.")
    
    access_token = Authorize.create_access_token(subject=user.email)
    refresh_token = Authorize.create_refresh_token(subject=user.email)
    response = Response(status_code=200)
    Authorize.set_access_cookies(access_token, response, max_age=JWT_ACCESS_TOKEN_EXPIRES_IN)
    Authorize.set_refresh_cookies(refresh_token, response, max_age=JWT_REFRESH_TOKEN_EXPIRES_IN)

    return response


async def logout_user(Authorize: oauth2.AuthJWT) -> Response:
    response = Response(status_code=200) 
    Authorize.unset_jwt_cookies(response)
    return response 


async def recreate_tokens(Authorize: oauth2.AuthJWT) -> Response:
    email = Authorize.get_jwt_subject()
    access_token = Authorize.create_access_token(subject=email)
    refresh_token = Authorize.create_refresh_token(subject=email)
    response = Response(status_code=200)
    Authorize.set_access_cookies(access_token, response, max_age=JWT_ACCESS_TOKEN_EXPIRES_IN)
    Authorize.set_refresh_cookies(refresh_token, response, max_age=JWT_REFRESH_TOKEN_EXPIRES_IN)

    return response


async def edit_user(user: schemas.UserEdit, Authorize: oauth2.AuthJWT) -> Response:
    email = Authorize.get_jwt_subject()
    try:
        _user = await models.Passenger.objects.get(email=email)
    except:
        _user = await models.Employee.objects.get(email=email)

    response = Response(status_code=200)
    if user.email != "":
        _user.email = user.email

        access_token = Authorize.create_access_token(subject=user.email)
        refresh_token = Authorize.create_refresh_token(subject=user.email)
        Authorize.set_access_cookies(access_token, response, max_age=JWT_ACCESS_TOKEN_EXPIRES_IN)
        Authorize.set_refresh_cookies(refresh_token, response, max_age=JWT_REFRESH_TOKEN_EXPIRES_IN)
    
        rename(path.join(_BASE_DIR, "media", email), path.join(_BASE_DIR, "media", user.email))
        _user.photo = path.join("media", user.email, "avatar.png")
    if user.password != "":
        _user.password = await utils.hash_data(user.password)
    await _user.update(['email', 'password', 'photo'])

    return response


async def change_user_photo(photo: UploadFile, Authorize: oauth2.AuthJWT) -> Response:
    email = Authorize.get_jwt_subject()
    try:
        user = await models.Passenger.objects.get(email=email)
    except:
        user = await models.Employee.objects.get(email=email)
    file_path = path.join(_BASE_DIR, user.photo)
    with open(file_path, "wb") as f:
        f.write(await photo.read())

    return Response(status_code=200)


async def get_employee_rating(Authorize: oauth2.AuthJWT) -> float:
    email = Authorize.get_jwt_subject()
    employee = await models.Employee.objects.get(email=email)

    return (employee.rating / employee.ratings_count)
