#!/usr/bin/env python3
"""Measure average runtime per coroutine for wait_n."""

import asyncio
import time
from typing import Callable

wait_n: Callable = __import__('1-concurrent_coroutines').wait_n


def measure_time(n: int, max_delay: int = 10) -> float:
    """
    Measure the total execution time for wait_n(n, max_delay)
    and return the average time per coroutine.
    """
    start = time.time()
    asyncio.run(wait_n(n, max_delay))
    total_time = time.time() - start
    return total_time / n
