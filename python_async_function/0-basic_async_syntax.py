#!/usr/bin/env python3
"""Coroutine that waits a random delay and returns it."""

import asyncio
import random
from typing import Union


async def wait_random(max_delay: int = 10) -> Union[int, float]:
    """
    Wait for a random delay between 0 and max_delay seconds
    and return the actual delay value.
    """
    delay: float = random.uniform(0, max_delay)
    await asyncio.sleep(delay)
    return delay
