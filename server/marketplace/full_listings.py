from marketplace.common import Listing
from bs4 import BeautifulSoup
import json
from time import time
from playwright.async_api import async_playwright
import re

USE_LOCAL_HTML_FULL_LISTINGS = False

async def get_full_listing(listing_id: str) -> Listing:
    print("getting full listings for id: %s" % listing_id)
    start_time = time()
    result = ""
    async with async_playwright() as p:
        print("launching chromium...")
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()

        print("navigating to listing...")
        # Go to Facebook Marketplace search for "couch"
        html = ""
        if USE_LOCAL_HTML_FULL_LISTINGS:
            with open("examples/full-listings/output2-%s.html" % listing_id, "r", encoding="utf-8") as file:
                html = file.read()
        else:
            await page.goto("https://www.facebook.com/marketplace/item/%s" % listing_id, wait_until="networkidle", timeout=0)
            html = await page.content()
            with open("examples/full-listings/output2-%s.html" % listing_id, "w", encoding="utf-8") as file:
                file.write(html)


        # Get the HTML content
        try:
            description = get_listing_description(html)
            urls = get_listing_image_urls(html)
            title = get_listing_title(html)
            price = get_price(html)
        except Exception as e:
            print("ERROR ON get_full_listing for id: %s" % listing_id)
            print(e)
            description = ""
            urls = []
            title = ""
            price = ""

        listing = Listing(
            id=listing_id,
            title=title,
            price_in_cents=0,
            formatted_price=price,
            description=description,
            image_url=urls[0],
            image_urls=urls,
            listing_url=f"https://www.facebook.com/marketplace/item/{listing_id}",

        )
        await browser.close()


    end_time = time()
    print(f"Time taken: {end_time - start_time} seconds")
    
    
    return listing

def get_listing_description(html_string: str) -> str:
    # to find the description, it's safer to look for this meta tag:
    # meta property="og:description"
    soup = BeautifulSoup(html_string, "html.parser")
    description_tag = soup.find("meta", attrs={"name": "description"})

    if description_tag and description_tag.get("content"):
        content_value = description_tag["content"]
    else:
        content_value = ""
        print("No description tag found")
    return content_value



# for the description, we look for a data-preloader that starts with this string
preloader_regex = re.compile(r"^adp_MarketplacePDPC2CMediaViewerWithImagesQueryRelayPreloader_")
def get_listing_image_urls(html_string: str) -> str:
    soup = BeautifulSoup(html_string, "html.parser")
    link_tags = soup.find_all(
        "link",
        attrs={
            "rel": "preload",
            "as": "image",
            "data-preloader": preloader_regex
        }
    )
    image_links = [tag["href"] for tag in link_tags if tag.get("href")]

    return image_links

def get_listing_title(html_string: str) -> str:
    # to find the description, it's safer to look for this meta tag:
    # meta property="og:description"
    soup = BeautifulSoup(html_string, "html.parser")
    title_tag = soup.find("meta", attrs={"property": "og:title"})

    if title_tag and title_tag.get("content"):
        content_value = title_tag["content"]
    else:
        content_value = ""
        print("No title tag found")
    return content_value

def get_price(html_string: str) -> float:
    price_regex = r'"formatted_amount_zeros_stripped":"(\$\d+)"'
    match = re.search(price_regex, html_string)
    if match:
        amount = match.group(1)  # the part inside the parentheses
        print("Found amount:", amount)
    else:
        print("No match found")
        amount = ""
    return amount
    