from pydantic import BaseModel, Field, EmailStr, field_validator
from re import fullmatch
from typing import Annotated, Optional

from config import settings


class UserRegister(BaseModel):
    fullname: Annotated[str, Field(max_length=100)]
    email: Annotated[EmailStr, Field(max_length=255)]
    password: Annotated[str, Field(min_length=8, max_length=60)]
    userType: Annotated[str, Field(min_length=8, max_length=9)]
    passengerType: Optional[Annotated[str, Field(min_length=10, max_length=12)]] = ""

    @field_validator("password", mode="before")
    def validate_pswd(cls, value):
        pattern = settings.REGEX_PASSWORD_TEMPLATE
        if not fullmatch(pattern, value):
            raise ValueError("Неверный формат пароля.")
        return value
    

class UserLogin(BaseModel):
    userType: Annotated[str, Field(min_length=8, max_length=9)]
    email: Annotated[EmailStr, Field(max_length=255)]
    password: Annotated[str, Field(min_length=8, max_length=60)]

    @field_validator("password", mode="before")
    def validate_pswd(cls, value):
        pattern = settings.REGEX_PASSWORD_TEMPLATE
        if not fullmatch(pattern, value):
            raise ValueError("Неверный формат пароля.")
        return value
