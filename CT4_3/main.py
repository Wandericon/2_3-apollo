import asyncio
import json

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sse_starlette.sse import EventSourceResponse

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["GET"],
)

STEPS = [20, 40, 60, 80, 100]


async def job_events():
    for pct in STEPS:
        await asyncio.sleep(1)  # типа работа
        yield {"event": "progress", "data": json.dumps({"percent": pct})}

    yield {"event": "complete", "data": json.dumps({"msg": "Готово"})}


@app.get("/progress")
async def progress():
    return EventSourceResponse(job_events())
