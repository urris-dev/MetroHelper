from datetime import datetime
from typing import List

from oauth2 import AuthJWT
from . import schemas
from req.models import Request
from users.models import Employee


async def get_notifications(Authorize: AuthJWT) -> List[schemas.Notification]:
    email = Authorize.get_jwt_subject()
    employee = await Employee.objects.get(email=email)
    requests = await Request.objects.select_related("passenger").filter(executors__id=employee.id).all()

    return [{
             'passenger_type': request.passenger.type,
             'passenger': request.passenger.fullname,
             'departure_station': request.departure_station,
             'destination_station': request.destination_station,
             'time': int((datetime.combine(datetime.today(), request.departure_time) - datetime.now()).total_seconds()),
             }
               for request in requests]
