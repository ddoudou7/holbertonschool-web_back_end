#!/usr/bin/env python3
"""
Module 10-update_topics
Contains a function to update the topics of a school document by name.
"""


def update_topics(mongo_collection, name, topics):
    """
    Updates all topics of a school document based on the school name.

    Args:
        mongo_collection: pymongo collection object.
        name (str): the name of the school to update.
        topics (list): list of strings representing topics.

    Returns:
        None
    """
    mongo_collection.update_many(
        {"name": name},
        {"$set": {"topics": topics}}
    )
