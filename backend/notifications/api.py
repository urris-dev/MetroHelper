from fastapi import APIRouter, Depends
from typing import List

from dependencies import check_access_token
from oauth2 import AuthJWT

from . import schemas, services

notification_router = APIRouter(
    prefix="/api/notifications",
    tags=["notifications"],
    dependencies=[Depends(check_access_token)],
    responses={401: {}}
)

@notification_router.get("/notifications-list", response_model=List[schemas.Notification])
async def get_notifications_list(Authorize: AuthJWT = Depends()):
    return await services.get_notifications(Authorize)

