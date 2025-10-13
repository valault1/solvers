from playwright.sync_api import sync_playwright
from time import time
import json
from bs4 import BeautifulSoup

from dataclasses import dataclass
from typing import List

@dataclass
class Listing:
    id: str
    title: str
    price_in_cents: float
    formatted_price: str
    description: str
    image_url: str
    listing_url: str
    listing_urls: List[str]

def get_edges(html: str) -> List[dict]:
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

def get_listings(html: str) -> List[Listing]:
    edges = get_edges(html)
    with open("page.html", "w", encoding="utf-8") as file:
        file.write(json.dumps(edges, indent=4))
    result: List[Listing] = []
    for edge in edges:
        result.append(get_listing(edge))
    return result

def get_listing(edge: dict) -> Listing:
    node = edge["node"]
    listing = node["listing"]
    return Listing(
        id=node["id"],
        title=listing["marketplace_listing_title"],
        price_in_cents=listing["listing_price"]["amount_with_offset_in_currency"],
        formatted_price=listing["listing_price"]["formatted_amount"],
        description="",
        image_url=listing["primary_listing_photo"]["image"]["uri"],
        listing_url="https://www.facebook.com/marketplace/item/" + node["id"].split(":")[0],
        listing_urls=["https://www.facebook.com/marketplace/item/" + node["id"].split(":")[0]]
    )


def find_key_recursive(obj, target_key):
    """
    Recursively search for all values with key `target_key` in a nested dict/list.
    Returns a list of all matches.
    """
    results = []

    if isinstance(obj, dict):
        for key, value in obj.items():
            if key == target_key:
                results.append(value)
            else:
                results.extend(find_key_recursive(value, target_key))
    elif isinstance(obj, list):
        for item in obj:
            results.extend(find_key_recursive(item, target_key))

    return results

def get_marketplace_listings(search_term: str):
    start_time = time()
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Go to Facebook Marketplace search for "couch"
        page.goto("https://www.facebook.com/marketplace/category/search/?query=%s" % search_term, wait_until="networkidle")

        # Get the HTML content
        html = page.content()
        listings = get_listings(html)

        
        

        browser.close()
        end_time = time()
        print(f"Time taken: {end_time - start_time} seconds")
        return listings


def get_full_listing(listing_id: str) -> Listing:
    start_time = time()
    result = ""
    with sync_playwright() as p:
        print("launching chromium...")
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        print("navigating to listing...")
        # Go to Facebook Marketplace search for "couch"
        page.goto("https://www.facebook.com/marketplace/item/%s" % listing_id, wait_until="networkidle")

        # Get the HTML content
        html = page.content()
        print("got html!")
        line_with_details = ""
        for line in html.splitlines():
            if "adp_MarketplacePDPC2CMediaViewerWithImagesQueryRelayPreloader_" in line:
                line_with_details = line
                break
        start = line_with_details.find('{')   # first {
        end = line_with_details.rfind('}')    # last }

        json_str = line_with_details[start:end+1]

        line_with_hrefs = ""
        for line in html.splitlines():
            if 'data-preloader=\"adp_MarketplacePDPC2CMediaViewerWithImagesQueryRelayPreloader_' in line:
                line_with_hrefs = line
                break
        soup = BeautifulSoup(line_with_hrefs, "html.parser")

        # Get all <link> tags with href
        urls = [link['href'] for link in soup.find_all('link', href=True)]

        print(urls)
        

        json_data_obj: List[dict] = json.loads(json_str)
        result = json.dumps(json_data_obj, indent=4)
        # all_targets = find_key_recursive(json_data_obj, "target")
        # target = all_targets[0]

        # result = target

        
        listing = Listing(
            id=listing_id,
            title="",
            price_in_cents=0,
            formatted_price="",
            description="",
            image_url="",
            listing_url="",
            listing_urls=urls
        )

        with open("output.html", "w", encoding="utf-8") as file:
            #file.write(json.dumps(edges, indent=4))
            #file.write(result)
            file.write(line_with_hrefs)
    end_time = time()
    print(f"Time taken: {end_time - start_time} seconds")
    
    
    return listing
