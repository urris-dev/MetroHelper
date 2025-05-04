import ormar
from database import base_ormar_config


class Passenger(ormar.Model):
    ormar_config = base_ormar_config.copy(tablename="passengers")

    id: int = ormar.BigInteger(primary_key=True)
    fullname: str = ormar.String(nullable=False, max_length=100)
    email: str = ormar.String(nullable=False, unique=True, max_length=256)
    type: str = ormar.String(nullable=False, max_length=12)
    photo: str = ormar.String(nullable=False, max_length=100)
    password: str = ormar.String(nullable=False, max_length=60)


class Employee(ormar.Model):
    ormar_config = base_ormar_config.copy(tablename="employees")

    id: int = ormar.BigInteger(primary_key=True)
    fullname: str = ormar.String(nullable=False, max_length=100)
    email: str = ormar.String(nullable=False, unique=True, max_length=256)
    rating: float = ormar.Decimal(nullable=False, precision=4, scale=3, server_default="0.000")
    ratings_count: int = ormar.BigInteger(nullable=False, server_default="0")
    status: bool = ormar.Boolean(nullable=False, server_default="True")
    photo: str = ormar.String(nullable=False, max_length=100)
    password: str = ormar.String(nullable=False, max_length=60)
