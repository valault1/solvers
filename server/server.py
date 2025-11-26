from flask import Flask, render_template
from dataclasses import dataclass, asdict
from typing import List
from marketplace.marketplace import search_full_marketplace_listings
from marketplace.full_listings import get_full_listing

app = Flask(__name__)

#https://www.facebook.com/marketplace/item/771771458768307

# Route to render listings
@app.route("/")
async def home():
    # Convert dataclasses to dicts for templates
    listings = await search_full_marketplace_listings("couch")
    listings_dict = [asdict(l) for l in listings]
    return render_template("listings.html", listings=listings_dict)

@app.route("/listing")
def listing():
    listing_details = get_full_listing("24510947555241706")
    listings_dict = [asdict(l) for l in [listing_details]]
    return render_template("listings.html", listings=listings_dict)
    return listing_details

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)