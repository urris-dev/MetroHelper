from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from typing import AsyncIterator
from database import base_ormar_config
from config import settings

from users.models import Passenger, Employee
from users.api import user_router

from req.models import Request
from req.api import request_router

from notifications.api import notification_router

def get_lifespan(config):
    @asynccontextmanager
    async def lifespan(_: FastAPI) -> AsyncIterator[None]:
        if not config.database.is_connected:
            await config.database.connect()

        yield

        if config.database.is_connected:
            await config.database.disconnect()
    return lifespan


app = FastAPI(lifespan=get_lifespan(base_ormar_config))

origins = [settings.CLIENT_ORIGIN]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(user_router)
app.include_router(request_router)
app.include_router(notification_router)

app.mount("/media", StaticFiles(directory="media"), name="media")

@app.get("/")
def home():
    return {"message": "Hello from MetroHelperAPI!"}
