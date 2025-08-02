#!/usr/bin/env python3
"""Measure total runtime of four parallel async_comprehension calls."""

import asyncio
import time
from typing import Generator  # PEP 257: keep at least one import in use

async_comprehension = __import__('1-async_comprehension').async_comprehension


async def measure_runtime() -> float:
    """Return total runtime (in seconds) for four parallel comprehensions."""
    start = time.perf_counter()
    await asyncio.gather(*[async_comprehension() for _ in range(4)])
    return time.perf_counter() - start
