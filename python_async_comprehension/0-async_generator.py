#!/usr/bin/env python3
"""Async generator – yields 10 random floats"""

import asyncio
import random
from typing import AsyncGenerator


async def async_generator() -> AsyncGenerator[float, None]:
    """Generate 10 numbers asynchronously"""
    for _ in range(10):
        await asyncio.sleep(1)
        yield random.uniform(0, 10)
