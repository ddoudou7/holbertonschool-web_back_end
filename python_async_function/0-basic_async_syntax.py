#!/usr/bin/env python3
"""
0‑basic_async_syntax
====================

Asynchronous coroutine *wait_random*:
    • prend `max_delay` (int, par défaut 10)
    • attend un délai aléatoire ∈ [0, max_delay] secondes (float)
    • retourne ce délai.

Utilise `random.uniform` et `asyncio.sleep`.
"""

import asyncio
import random
from typing import Union


async def wait_random(max_delay: int = 10) -> float:
    """
    Wait for a random delay and return it.

    Args:
        max_delay: upper bound in seconds (default 10).

    Returns:
        The actual delay used, as a float.
    """
    delay: float = random.uniform(0, float(max_delay))
    await asyncio.sleep(delay)
    return delay
