from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

from src.routers import pages

app = FastAPI()

app.mount("/static", StaticFiles(directory="src/static"), name="static")

# Routes
app.include_router(pages.router)
