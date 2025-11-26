import asyncio
from marketplace.full_listings import get_full_listing
from marketplace.all_listings import get_marketplace_listings

# the main method to call to get listings
async def search_full_marketplace_listings(search_term: str, limit: int=0):
    listings = await get_marketplace_listings(search_term)

    ids = [listing.id for listing in listings]
    # Run all get_full_listing() calls concurrently
    tasks = [get_full_listing(id) for id in ids]
    full_listings = await asyncio.gather(*tasks)
    return full_listings


