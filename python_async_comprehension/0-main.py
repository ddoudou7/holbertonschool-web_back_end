#!/usr/bin/env python3
import asyncio
async_generator = __import__('0-async_generator').async_generator

async def main():
    result = []
    async for i in async_generator():
        print(i)
        result.append(i)

    print("Total:", len(result))

asyncio.run(main())
