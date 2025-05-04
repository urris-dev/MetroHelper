from fastapi import UploadFile
from fastapi.responses import Response
from fastapi.exceptions import HTTPException
from os import mkdir, path
from typing import Union

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
            await models.Employee.objects.get(email=user.email)
            raise HTTPException(status_code=409, detail="Данный пользователь уже зарегистрирован.")
        except HTTPException as e:
            raise e
        except: pass
        
        user.password = await utils.hash_data(user.password)
        await models.Employee.objects.create(**user.model_dump(exclude={"userType", "passengerType"}), photo="")
    elif user.userType == 'passenger':
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
