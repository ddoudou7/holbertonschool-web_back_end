#!/usr/bin/env python3
"""Hypermedia pagination layer on top of simple pagination."""

import math
from typing import Dict, List, Any

# Reuse the Server from task 1
BaseServer = __import__('1-simple_pagination').Server


class Server(BaseServer):
    """Extends simple pagination with hypermedia metadata."""

    def get_hyper(self, page: int = 1, page_size: int = 10) -> Dict[str, Any]:
        """Return page data plus hypermedia fields."""
        data: List[List] = self.get_page(page, page_size)
        total_items: int = len(self.dataset())
        total_pages: int = (
            math.ceil(total_items / page_size) if page_size else 0
        )

        next_page = page + 1 if page < total_pages else None
        prev_page = page - 1 if page > 1 else None

        return {
            "page_size": len(data),
            "page": page,
            "data": data,
            "next_page": next_page,
            "prev_page": prev_page,
            "total_pages": total_pages,
        }
