#!/usr/bin/env python3
"""Module 8-all"""

def list_all(mongo_collection):
    """Lists all documents in the given MongoDB collection.
    Returns an empty list if no document is found."""
    return list(mongo_collection.find())
