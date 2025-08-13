#!/usr/bin/env python3
"""Deletion-resilient hypermedia pagination."""

import csv
from typing import Dict, List, Optional, Any


class Server:
    """Server class to paginate a database of popular baby names."""

    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self) -> None:
        self.__dataset: Optional[List[List]] = None
        self.__indexed_dataset: Optional[Dict[int, List]] = None

    def dataset(self) -> List[List]:
        """Cached dataset (skip header row)."""
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]
        return self.__dataset

    def indexed_dataset(self) -> Dict[int, List]:
        """Dataset indexed by original position, starting at 0."""
        if self.__indexed_dataset is None:
            data = self.dataset()
            self.__indexed_dataset = {i: data[i] for i in range(len(data))}
        return self.__indexed_dataset

    def get_hyper_index(self, index: Optional[int] = None,
                        page_size: int = 10) -> Dict[str, Any]:
        """Return a page starting from a given index, robust to deletions.

        Returns:
            {
              "index": int,       # starting index used
              "next_index": int,  # index to use for next page
              "page_size": int,   # number of items actually returned
              "data": List[List]  # page rows
            }
        """
        if index is None:
            index = 0

        assert isinstance(index, int) and index >= 0
        assert isinstance(page_size, int) and page_size > 0

        indexed = self.indexed_dataset()
        if not indexed:
            return {"index": 0, "next_index": 0, "page_size": 0, "data": []}

        max_index = max(indexed.keys())
        assert index <= max_index, "index out of range"

        data: List[List] = []
        current = index
        while len(data) < page_size and current <= max_index:
            if current in indexed:
                data.append(indexed[current])
            current += 1

        next_index = current if current <= max_index else max_index + 1
        return {
            "index": index,
            "next_index": next_index,
            "page_size": len(data),
            "data": data,
        }
