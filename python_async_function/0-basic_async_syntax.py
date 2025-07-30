#!/usr/bin/env python3
"""Asynchronous coroutine returning a random delay.

`wait_random` attends un temps aléatoire compris entre 0 et `max_delay`
(inclus) puis renvoie cette durée.
"""

import asyncio
import random
from typing import Union


async def wait_random(max_delay: int = 10) -> float:
    """Wait for *delay* seconds, where *delay* ∈ [0, max_delay].

    Args:
        max_delay: upper bound in seconds (default 10).

    Returns:
        The actual delay used, as a float.
    """
    delay: float = random.uniform(0, float(max_delay))
    await asyncio.sleep(delay)
    return delay
