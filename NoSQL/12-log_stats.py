#!/usr/bin/env python3
"""Print stats about Nginx logs stored in MongoDB.

Database: logs
Collection: nginx

Output (exact format):
x logs
Methods:
\tmethod GET: X
\tmethod POST: X
\tmethod PUT: X
\tmethod PATCH: X
\tmethod DELETE: X
X status check
"""
from pymongo import MongoClient


if __name__ == "__main__":
    client = MongoClient("mongodb://127.0.0.1:27017")
    col = client.logs.nginx

    total = col.count_documents({})
    print(f"{total} logs")

    print("Methods:")
    for m in ["GET", "POST", "PUT", "PATCH", "DELETE"]:
        cnt = col.count_documents({"method": m})
        print(f"\tmethod {m}: {cnt}")

    status = col.count_documents({"method": "GET", "path": "/status"})
    print(f"{status} status check")
