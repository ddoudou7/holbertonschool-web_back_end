#!/usr/bin/env python3
"""Return an asyncio.Task for wait_random."""

import asyncio
from typing import Callable
wait_random: Callable = __import__('0-basic_async_syntax').wait_random


def task_wait_random(max_delay: int = 10) -> asyncio.Task:
    """
    Create and return an asyncio.Task that wraps wait_random(max_delay).
    This lets the caller schedule execution without awaiting immediately.
    """
    return asyncio.create_task(wait_random(max_delay))
