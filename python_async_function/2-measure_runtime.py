#!/usr/bin/env python3
"""
2‑measure_runtime
=================

Fonction *measure_time* :
    • mesure le temps total d'exécution de `wait_n`
    • renvoie le temps moyen par coroutine.
"""

import asyncio
import time
from typing import Callable

wait_n: Callable[[int, int], asyncio.Future] = (
    __import__('1-concurrent_coroutines').wait_n
)


def measure_time(n: int, max_delay: int) -> float:
    """
    Measure average runtime of `wait_n(n, max_delay)`.

    Args:
        n: number of coroutines.
        max_delay: max bound for each delay.

    Returns:
        Average time per coroutine (float).
    """
    start = time.perf_counter()
    asyncio.run(wait_n(n, max_delay))
    total = time.perf_counter() - start
    return total / n
