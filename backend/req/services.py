from datetime import time
from fastapi import Response, HTTPException
from typing import List, Union

from oauth2 import AuthJWT
from . import schemas, models
from users.models import Passenger, Employee


async def create_request(request: schemas.RequestCreate, Authorize: AuthJWT) -> Union[HTTPException, Response]:
    email = Authorize.get_jwt_subject()
    passenger = await Passenger.objects.get(email=email)

    try:
        await models.Request.objects.filter(departure_time=request.departure_time, passenger=passenger.id).get()
    except:
        _request = await models.Request.objects.create(**request.model_dump(), passenger=passenger.id)

        executors_count = 0
        if passenger.type == 'Слабовидящий':
            executors_count += 1
            if request.luggage: executors_count += 1
        else: 
            executors_count += 2
            if request.luggage: executors_count += 2

        executors = await Employee.objects.filter(status=True).limit(executors_count).all()
        for executor in executors:
            await _request.executors.add(executor)
            executor.status = False
            await executor.update(['status'])
        await _request.update(['executors'])

    return Response(status_code=200)


async def get_requests(Authorize: AuthJWT) -> List[schemas.Request]:
    email = Authorize.get_jwt_subject()
    user = await Passenger.objects.select_related("requests").order_by("-requests__id").get(email=email)
    return user.requests


async def delete_request(request_id: int) -> Union[HTTPException, Response]:
    try:
        request = await models.Request.objects.prefetch_related("executors").get(id=request_id)
    except:
        raise HTTPException(status_code=404, detail="Запрос с переданным идентификатором не найден.")
    
    for employee in request.executors:
        employee.status = True
        await employee.update(["status"])

    await request.delete()
    
    return Response(status_code=200)


async def check_active_request(current_time: time, Authorize: AuthJWT) -> Union[HTTPException, schemas.ActiveRequest]:
    email = Authorize.get_jwt_subject()
    try:
        user = await Passenger.objects.get(email=email)
        user_type = 'passenger'
    except:
        user = await Employee.objects.get(email=email)
        user_type = 'employee'

    try:
        if user_type == 'passenger':
            request = await models.Request.objects.filter(passenger=user.id, departure_time__lte=current_time).order_by("-departure_time").first()
        else:
            request = await models.Request.objects.filter(departure_time__lte=current_time, executors__id=user.id).order_by("-departure_time").first()
        
        return schemas.ActiveRequest(id=request.id, user_type=user_type, departure_station=request.departure_station, destination_station=request.destination_station)
    except:
        raise HTTPException(status_code=404, detail="Запрос с переданным идентификатором не найден.")


async def rating_request(request_id: int, assessment: int) -> Response:
    request = await models.Request.objects.prefetch_related("executors").get(id=request_id)
    
    for employee in request.executors:
        employee.ratings_count += 1
        employee.rating += assessment
        employee.status = True
        await employee.update(['ratings_count', 'rating', 'status'])

    await request.delete()

    return Response(status_code=200)