#!/usr/bin/env python3
"""
Module 11-schools_by_topic
Contains a function to find all schools with a specific topic.
"""


def schools_by_topic(mongo_collection, topic):
    """
    Returns the list of schools having a specific topic.

    Args:
        mongo_collection: pymongo collection object.
        topic (str): topic to search for.

    Returns:
        list: list of matching documents.
    """
    return list(mongo_collection.find({"topics": topic}))
