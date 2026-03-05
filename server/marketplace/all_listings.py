from playwright.async_api import async_playwright
from time import time
import json
from typing import List
from marketplace.common import Listing, find_key_recursive

USE_LOCAL_HTML = False

async def get_marketplace_listings(search_term: str):
    start_time = time()
    listings = []
    print("First, getting all listings for term: '%s'" % search_term)
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()

        # Go to Facebook Marketplace search for "couch"
        html = ""
        if USE_LOCAL_HTML:
            with open("examples/search/%s.html" % search_term, "r", encoding="utf-8") as file:
                html = file.read()
        else:
            await page.goto("https://www.facebook.com/marketplace/category/search/?query=%s" % search_term, wait_until="networkidle", timeout=0)
            # Get the HTML content
            html = await page.content()
            with open("examples/search/%s.html" % search_term, "w", encoding="utf-8") as file:
                file.write(html)
        
        listings = get_listings(html)

        await browser.close()
        end_time = time()
        print(f"Time taken to get all listings: {end_time - start_time} seconds")
    return listings

def get_listings(html: str) -> List[Listing]:
    edges = get_edges(html)
    with open("page.html", "w", encoding="utf-8") as file:
        file.write(json.dumps(edges, indent=4))
    result: List[Listing] = []
    for edge in edges:
        result.append(get_listing(edge))
    return result

def get_edges(html: str) -> List[dict]:
    line_with_listings = ''
    for line in html.splitlines():
        if "marketplace_search" in line:
            line_with_listings = line
            break
    start = line_with_listings.find('{')   # first {
    end = line_with_listings.rfind('}')    # last }

    json_str = line_with_listings[start:end+1]
    
    json_data_obj: List[dict] = json.loads(json_str)
    all_edges = find_key_recursive(json_data_obj, "edges")

    edges = all_edges[0]
    return edges

def get_listing(edge: dict) -> Listing:
    node = edge["node"]
    listing = node["listing"]
    url = "https://www.facebook.com/marketplace/item/" + node["id"].split(":")[0]
    image_url = listing["primary_listing_photo"]["image"]["uri"]
    return Listing(
        id= node["id"].split(":")[0],
        title=listing["marketplace_listing_title"],
        price_in_cents=listing["listing_price"]["amount_with_offset_in_currency"],
        formatted_price=listing["listing_price"]["formatted_amount"],
        description="",
        image_url=image_url,
        image_urls=[],
        listing_url=url
    )