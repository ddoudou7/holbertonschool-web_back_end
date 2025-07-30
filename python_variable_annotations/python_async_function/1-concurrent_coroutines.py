#!/usr/bin/env python3
"""Module for executing multiple coroutines concurrently."""

import asyncio
from typing import List
wait_random = __import__('0-basic_async_syntax').wait_random


async def wait_n(n: int, max_delay: int) -> List[float]:
    """Execute wait_random n times concurrently and return list of delays in ascending order."""
    delays = []
    for coro in asyncio.as_completed([wait_random(max_delay) for _ in range(n)]):
        delay = await coro
        delays.append(delay)
    return delays
