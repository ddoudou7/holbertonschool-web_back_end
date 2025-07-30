#!/usr/bin/env python3

import asyncio

async_generator = __import__('python_async_comprehension.0-async_generator',
                              fromlist=['async_generator']).async_generator

async def print_yielded_values():
    result = []
    async for i in async_generator():
        result.append(i)
    print(result)

asyncio.run(print_yielded_values())
