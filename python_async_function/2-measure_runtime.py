#!/usr/bin/env python3
"""Measure the average runtime of `wait_n`."""

import asyncio
import time
from typing import Callable

# Import ici pour garder la dépendance locale au package
wait_n: Callable[[int, int], asyncio.Future] = __import__(
    "python_async_function.1-concurrent_coroutines",
    fromlist=["wait_n"],
).wait_n


def measure_time(n: int, max_delay: int) -> float:
    """Return average time (in seconds) to execute `wait_n` *per coroutine*."""
    start = time.perf_counter()
    asyncio.run(wait_n(n, max_delay))
    total = time.perf_counter() - start
    return total / n
