#!/usr/bin/env python3
"""Launch task_wait_random n times and return delays in ascending order."""

import asyncio
from typing import List, Callable

task_wait_random: Callable = __import__('3-tasks').task_wait_random


async def task_wait_n(n: int, max_delay: int = 10) -> List[float]:
    """
    Spawn task_wait_random n times with the given max_delay
    and return the list of completed delays in ascending order.
    """
    tasks = [task_wait_random(max_delay) for _ in range(n)]
    delays: List[float] = []

    for coro in asyncio.as_completed(tasks):
        delays.append(await coro)   # completion order == ascending delay

    return delays
