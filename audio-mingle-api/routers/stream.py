from fastapi import APIRouter, Request
import logging
from sse_starlette.sse import EventSourceResponse
import asyncio

router = APIRouter(
    tags=["Audio Streams"],
    prefix="/audio"
)

logger = logging.getLogger()

MESSAGE_STREAM_DELAY = 1  # second
MESSAGE_STREAM_RETRY_TIMEOUT = 15000  # milliseconds
COUNTER = 0


def get_message():
    global COUNTER
    COUNTER += 1
    return COUNTER, COUNTER < 21


@router.get("/stream")
async def message_stream(request: Request):
    async def event_generator():
        while True:
            if await request.is_disconnected():
                logger.debug("Request disconnected")
                break

            # checks for new messages and returns them to the client ie. react
            counter, exists = get_message()
            if exists:
                yield {
                    "event": "new_message",
                    "data": f"Counter value: {counter}"
                }
            else:
                yield {
                    "event": "end_event",
                    "data": "End of stream"
                }

            await asyncio.sleep(MESSAGE_STREAM_DELAY)
    return EventSourceResponse(event_generator())
