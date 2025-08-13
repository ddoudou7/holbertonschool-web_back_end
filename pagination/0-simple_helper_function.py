#!/usr/bin/env python3
"""Compute start and end indexes for simple pagination.
This module exposes a single helper function used to slice lists by page.
"""

from typing import Tuple


def index_range(page: int, page_size: int) -> Tuple[int, int]:
    """Return a (start, end) index pair for the given page and page_size.

    Page numbers are 1-indexed.
    Example: page=1, page_size=7 -> (0, 7)
    """
    start = (page - 1) * page_size
    end = page * page_size
    return (start, end)
