#!/usr/bin/env python3
"""Provides stats about Nginx logs stored in MongoDB."""
from pymongo import MongoClient


if __name__ == "__main__":
    client = MongoClient("mongodb://127.0.0.1:27017")
    collection = client.logs.nginx

    logs_count = collection.count_documents({})
    print(f"{logs_count} logs")

    print("Methods:")
    for method in ["GET", "POST", "PUT", "PATCH", "DELETE"]:
        cnt = collection.count_documents({"method": method})
        print(f"\tmethod {method}: {cnt}")

    status_check = collection.count_documents(
        {"method": "GET", "path": "/status"}
    )
    print(f"{status_check} status check")
