import ormar
from datetime import time
from typing import List

from database import base_ormar_config
from users.models import Passenger, Employee


class Request(ormar.Model):
    ormar_config = base_ormar_config.copy(tablename="requests")

    id: int = ormar.BigInteger(primary_key=True)
    luggage: bool = ormar.Boolean(nullable=False, server_default="False")
    departure_station: str = ormar.String(nullable=False, max_length=100)
    destination_station: str = ormar.String(nullable=False, max_length=100) 
    departure_time: time = ormar.Time(nullable=False)
    passenger: int = ormar.ForeignKey(Passenger, nullable=False, ondelete=ormar.ReferentialAction.CASCADE)
    executors: List[Employee] = ormar.ManyToMany(Employee)
