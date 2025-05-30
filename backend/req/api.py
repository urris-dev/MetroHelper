from datetime import time
from fastapi import APIRouter, Depends
from typing import List

from dependencies import check_access_token
from oauth2 import AuthJWT

from . import schemas, services

request_router = APIRouter(
    prefix="/api/requests",
    tags=["requests"],
    dependencies=[Depends(check_access_token)],
    responses={401: {}}
)

@request_router.get("/requests-list", response_model=List[schemas.Request])
async def get_requests_list(Authorize: AuthJWT = Depends()):
    return await services.get_requests(Authorize)


@request_router.post("/create-request", responses={400: {}})
async def create_project(request: schemas.RequestCreate, Authorize: AuthJWT = Depends()):
    return await services.create_request(request, Authorize)


@request_router.delete("/delete-request", responses={404: {}})
async def delete_request(request_id: int):
    return await services.delete_request(request_id)


@request_router.get("/check-active-request", response_model=schemas.ActiveRequest, responses={404: {}})
async def check_active_request(current_time: time, Authorize: AuthJWT = Depends()):
    return await services.check_active_request(current_time, Authorize)


@request_router.post("/rating-request")
async def rating_request(request_id: int, assessment: int):
    return await services.rating_request(request_id, assessment)
