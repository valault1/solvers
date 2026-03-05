from dataclasses import dataclass

@dataclass
class Listing:
    id: str
    title: str
    price_in_cents: float
    formatted_price: str
    description: str
    image_url: str
    listing_url: str
    image_urls: list[str]

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
