from datetime import time
from pydantic import BaseModel, Field
from typing import Annotated


class RequestCreate(BaseModel):
    luggage: bool
    departure_station: Annotated[str, Field(max_length=100)]
    destination_station: Annotated[str, Field(max_length=100)]
    departure_time: time


class Request(BaseModel):
    id: int
    luggage: bool
    departure_station: str
    destination_station: str
    departure_time: time
    