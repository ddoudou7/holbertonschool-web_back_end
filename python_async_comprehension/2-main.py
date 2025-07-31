#!/usr/bin/env python3

import asyncio
measure_runtime = __import__('2-measure_runtime',
                             fromlist=['measure_runtime']).measure_runtime

async def main():
    runtime = await measure_runtime()
    print(runtime)

asyncio.run(main())
