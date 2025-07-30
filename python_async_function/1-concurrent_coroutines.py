#!/usr/bin/env python3
"""
1‑concurrent_coroutines
=======================

Coroutine *wait_n* :
    • lance `wait_random` *n* fois (concurrence)
    • renvoie la liste des délais, ordonnée croissante sans `list.sort()`.
"""

import asyncio
from typing import List

wait_random = __import__('0-basic_async_syntax').wait_random


async def wait_n(n: int, max_delay: int) -> List[float]:
    """
    Spawn `wait_random` n times and return the sorted list of delays.

    Args:
        n: number of coroutines to spawn.
        max_delay: max bound forwarded to `wait_random`.

    Returns:
        List of delays in ascending order.
    """
    coros = [wait_random(max_delay) for _ in range(n)]

    delays: List[float] = []
    for task in asyncio.as_completed(coros):
        delay = await task
        delays.append(delay)

    return delays  # déjà dans l'ordre grâce à as_completed
