#!/usr/bin/env python3
"""Measure total runtime of four async comprehensions in parallel."""

import asyncio
from time import perf_counter
from typing import List
from python_async_comprehension import async_comprehension


async def measure_runtime() -> float:
    """Launch async_comprehension 4 fois en parallèle et renvoyer la durée."""
    start: float = perf_counter()
    await asyncio.gather(*(async_comprehension() for _ in range(4)))
    return perf_counter() - start
