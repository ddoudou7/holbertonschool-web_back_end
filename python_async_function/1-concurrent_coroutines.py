#!/usr/bin/env python3
"""Spawn wait_random n times and return delays in ascending order."""

import asyncio
from typing import List

wait_random = __import__('0-basic_async_syntax').wait_random


async def wait_n(n: int, max_delay: int = 10) -> List[float]:
    """
    Execute wait_random n times concurrently with the given max_delay.
    Return the list of delays in ascending order (no explicit sort).
    """
    tasks = [asyncio.create_task(wait_random(max_delay)) for _ in range(n)]
    delays: List[float] = []

    for coro in asyncio.as_completed(tasks):
        delay = await coro          # completed task returns its delay
        delays.append(delay)        # order of completion === ascending delay

    return delays                   # already ordered
