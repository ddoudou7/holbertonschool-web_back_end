#!/usr/bin/env python3
"""Async generator – yields 10 random floats"""

import asyncio
import random
from typing import Generator
from typing import Generator


async def async_generator() -> Generator[float, None, None]:
    """Yield 10 random floats between 0 and 10, one every second"""
    for _ in range(10):
        await asyncio.sleep(1)
        yield random.uniform(0, 10)
