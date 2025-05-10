from pydantic import BaseModel


class Notification(BaseModel):
    passenger_type: str
    passenger: str
    departure_station: str
    destination_station: str
    time: int
