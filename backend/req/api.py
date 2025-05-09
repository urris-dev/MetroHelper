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

# @request_router.get("/get-projects-list", response_model=List[schemas.Project])
# async def get_project_list(Authorize: AuthJWT = Depends()):
#     return await services.get_projects(Authorize)


@request_router.post("/create-request", response_model=int, responses={400: {}})
async def create_project(request: schemas.RequestCreate, Authorize: AuthJWT = Depends()):
    return await services.create_request(request, Authorize)


# @request_router.put("/edit-project/", responses={403: {}, 404: {}})
# async def edit_project(project: schemas.Project, Authorize: AuthJWT = Depends()):
#     return await services.edit_project(project, Authorize)


# @request_router.delete("/delete-project/", responses={403: {}, 404: {}})
# async def delete_project(project_id: int, Authorize: AuthJWT = Depends()):
#     return await services.delete_project(project_id, Authorize)
