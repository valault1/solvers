import requests
from bs4 import BeautifulSoup
import json
import re
import time
from concurrent.futures import ThreadPoolExecutor
import urllib.parse
import argparse

ITEM_DROP_DATA = {
    "Venusaur": "Leaf",
    "Bellsprout": "Vine Rope",
    "Weepinbell": "Vine Rope",
    "Cacturne": "Sturdy Stick",
    "Combee": "Honey",
    "Haxorus": "Small Log",
    "Spinarak": "Twine",
    "Ariados": "Twine",
    "Mareep": "Fluff",
    "Flaaffy": "Fluff",
    "Paldean Wooper": "Squishy Clay",
    "Wooper": "Squishy Clay", # Fallback as page name is 'Wooper'
    "Garbodor": "Nonburnable Garbage",
    "Larvesta": "Twine",
    "Glimmet": "Iron Ore",
    "Glimmora": "Iron Ore",
    "Bastiodon": "Stone",
    "Tyrantrum": "Stone",
    # Legacy from placeholder
    "Swablu": "Fluff",
    "Altaria": "Fluff",
}

# Regional/Special name mapping for PokeAPI
POKEAPI_NAME_MAP = {
    "Farfetch'D": "farfetchd",
    "Mr. Mime": "mr-mime",
    "Mime Jr.": "mime-jr",
    "Porygon-Z": "porygon-z",
    "Sirfetch'D": "sirfetchd",
    "Paldean Wooper": "wooper-paldea",
    "Tauros (Paldea)": "tauros-paldea",
    # Add more as needed
}

URLS_TEXT = """
https://pokopiadex.com/pokedex/bulbasaur-001
https://pokopiadex.com/pokedex/ivysaur-002
https://pokopiadex.com/pokedex/venusaur-003
https://pokopiadex.com/pokedex/charmander-004
https://pokopiadex.com/pokedex/charmeleon-005
https://pokopiadex.com/pokedex/charizard-006
https://pokopiadex.com/pokedex/squirtle-007
https://pokopiadex.com/pokedex/wartortle-008
https://pokopiadex.com/pokedex/blastoise-009
https://pokopiadex.com/pokedex/pidgey-010
https://pokopiadex.com/pokedex/pidgeotto-011
https://pokopiadex.com/pokedex/pidgeot-012
https://pokopiadex.com/pokedex/oddish-013
https://pokopiadex.com/pokedex/gloom-014
https://pokopiadex.com/pokedex/vileplume-015
https://pokopiadex.com/pokedex/bellossom-016
https://pokopiadex.com/pokedex/paras-017
https://pokopiadex.com/pokedex/parasect-018
https://pokopiadex.com/pokedex/venonat-019
https://pokopiadex.com/pokedex/venomoth-020
https://pokopiadex.com/pokedex/bellsprout-021
https://pokopiadex.com/pokedex/weepinbell-022
https://pokopiadex.com/pokedex/victreebel-023
https://pokopiadex.com/pokedex/slowpoke-024
https://pokopiadex.com/pokedex/slowbro-025
https://pokopiadex.com/pokedex/slowking-026
https://pokopiadex.com/pokedex/magnemite-027
https://pokopiadex.com/pokedex/magneton-028
https://pokopiadex.com/pokedex/magnezone-029
https://pokopiadex.com/pokedex/onix-030
https://pokopiadex.com/pokedex/steelix-031
https://pokopiadex.com/pokedex/cubone-032
https://pokopiadex.com/pokedex/marowak-033
https://pokopiadex.com/pokedex/tyrogue-034
https://pokopiadex.com/pokedex/hitmonlee-035
https://pokopiadex.com/pokedex/hitmonchan-036
https://pokopiadex.com/pokedex/hitmontop-037
https://pokopiadex.com/pokedex/koffing-038
https://pokopiadex.com/pokedex/weezing-039
https://pokopiadex.com/pokedex/tangela-040
https://pokopiadex.com/pokedex/tangrowth-041
https://pokopiadex.com/pokedex/scyther-042
https://pokopiadex.com/pokedex/scizor-043
https://pokopiadex.com/pokedex/pinsir-044
https://pokopiadex.com/pokedex/magikarp-045
https://pokopiadex.com/pokedex/gyarados-046
https://pokopiadex.com/pokedex/ditto-047
https://pokopiadex.com/pokedex/hoothoot-048
https://pokopiadex.com/pokedex/noctowl-049
https://pokopiadex.com/pokedex/heracross-050
https://pokopiadex.com/pokedex/volbeat-051
https://pokopiadex.com/pokedex/illumise-052
https://pokopiadex.com/pokedex/gulpin-053
https://pokopiadex.com/pokedex/swalot-054
https://pokopiadex.com/pokedex/cacnea-055
https://pokopiadex.com/pokedex/cacturne-056
https://pokopiadex.com/pokedex/combee-057
https://pokopiadex.com/pokedex/vespiquen-058
https://pokopiadex.com/pokedex/shellos-059
https://pokopiadex.com/pokedex/gastrodon-060
https://pokopiadex.com/pokedex/drifloon-061
https://pokopiadex.com/pokedex/drifblim-062
https://pokopiadex.com/pokedex/drilbur-063
https://pokopiadex.com/pokedex/excadrill-064
https://pokopiadex.com/pokedex/timburr-065
https://pokopiadex.com/pokedex/gurdurr-066
https://pokopiadex.com/pokedex/conkeldurr-067
https://pokopiadex.com/pokedex/litwick-068
https://pokopiadex.com/pokedex/lampent-069
https://pokopiadex.com/pokedex/chandelure-070
https://pokopiadex.com/pokedex/axew-071
https://pokopiadex.com/pokedex/fraxure-072
https://pokopiadex.com/pokedex/haxorus-073
https://pokopiadex.com/pokedex/goomy-074
https://pokopiadex.com/pokedex/sliggoo-075
https://pokopiadex.com/pokedex/goodra-076
https://pokopiadex.com/pokedex/cramorant-077
https://pokopiadex.com/pokedex/pichu-078
https://pokopiadex.com/pokedex/pikachu-079
https://pokopiadex.com/pokedex/raichu-080
https://pokopiadex.com/pokedex/zubat-081
https://pokopiadex.com/pokedex/golbat-082
https://pokopiadex.com/pokedex/crobat-083
https://pokopiadex.com/pokedex/meowth-084
https://pokopiadex.com/pokedex/persian-085
https://pokopiadex.com/pokedex/psyduck-086
https://pokopiadex.com/pokedex/golduck-087
https://pokopiadex.com/pokedex/growlithe-088
https://pokopiadex.com/pokedex/arcanine-089
https://pokopiadex.com/pokedex/farfetchd-090
https://pokopiadex.com/pokedex/grimer-091
https://pokopiadex.com/pokedex/muk-092
https://pokopiadex.com/pokedex/gastly-093
https://pokopiadex.com/pokedex/haunter-094
https://pokopiadex.com/pokedex/gengar-095
https://pokopiadex.com/pokedex/voltorb-096
https://pokopiadex.com/pokedex/electrode-097
https://pokopiadex.com/pokedex/exeggcute-098
https://pokopiadex.com/pokedex/exeggutor-099
https://pokopiadex.com/pokedex/happiny-100
https://pokopiadex.com/pokedex/chansey-101
https://pokopiadex.com/pokedex/blissey-102
https://pokopiadex.com/pokedex/elekid-103
https://pokopiadex.com/pokedex/electabuzz-104
https://pokopiadex.com/pokedex/electivire-105
https://pokopiadex.com/pokedex/lapras-106
https://pokopiadex.com/pokedex/munchlax-107
https://pokopiadex.com/pokedex/snorlax-108
https://pokopiadex.com/pokedex/spinarak-109
https://pokopiadex.com/pokedex/ariados-110
https://pokopiadex.com/pokedex/mareep-111
https://pokopiadex.com/pokedex/flaaffy-112
https://pokopiadex.com/pokedex/ampharos-113
https://pokopiadex.com/pokedex/azurill-114
https://pokopiadex.com/pokedex/marill-115
https://pokopiadex.com/pokedex/azumarill-116
https://pokopiadex.com/pokedex/wooper-117
https://pokopiadex.com/pokedex/clodsire-118
https://pokopiadex.com/pokedex/smeargle-119
https://pokopiadex.com/pokedex/torchic-120
https://pokopiadex.com/pokedex/combusken-121
https://pokopiadex.com/pokedex/blaziken-122
https://pokopiadex.com/pokedex/wingull-123
https://pokopiadex.com/pokedex/pelipper-124
https://pokopiadex.com/pokedex/makuhita-125
https://pokopiadex.com/pokedex/hariyama-126
https://pokopiadex.com/pokedex/absol-127
https://pokopiadex.com/pokedex/piplup-128
https://pokopiadex.com/pokedex/prinplup-129
https://pokopiadex.com/pokedex/empoleon-130
https://pokopiadex.com/pokedex/audino-131
https://pokopiadex.com/pokedex/trubbish-132
https://pokopiadex.com/pokedex/garbodor-133
https://pokopiadex.com/pokedex/zorua-134
https://pokopiadex.com/pokedex/zoroark-135
https://pokopiadex.com/pokedex/minccino-136
https://pokopiadex.com/pokedex/cinccino-137
https://pokopiadex.com/pokedex/grubbin-138
https://pokopiadex.com/pokedex/charjabug-139
https://pokopiadex.com/pokedex/vikavolt-140
https://pokopiadex.com/pokedex/mimikyu-141
https://pokopiadex.com/pokedex/pawmi-142
https://pokopiadex.com/pokedex/pawmo-143
https://pokopiadex.com/pokedex/pawmot-144
https://pokopiadex.com/pokedex/tatsugiri-145
https://pokopiadex.com/pokedex/ekans-146
https://pokopiadex.com/pokedex/arbok-147
https://pokopiadex.com/pokedex/cleffa-148
https://pokopiadex.com/pokedex/clefairy-149
https://pokopiadex.com/pokedex/clefable-150
https://pokopiadex.com/pokedex/igglybuff-151
https://pokopiadex.com/pokedex/jigglypuff-152
https://pokopiadex.com/pokedex/wigglytuff-153
https://pokopiadex.com/pokedex/diglett-154
https://pokopiadex.com/pokedex/dugtrio-155
https://pokopiadex.com/pokedex/machop-156
https://pokopiadex.com/pokedex/machoke-157
https://pokopiadex.com/pokedex/machamp-158
https://pokopiadex.com/pokedex/geodude-159
https://pokopiadex.com/pokedex/graveler-160
https://pokopiadex.com/pokedex/golem-161
https://pokopiadex.com/pokedex/magby-162
https://pokopiadex.com/pokedex/magmar-163
https://pokopiadex.com/pokedex/magmortar-164
https://pokopiadex.com/pokedex/bonsly-165
https://pokopiadex.com/pokedex/sudowoodo-166
https://pokopiadex.com/pokedex/murkrow-167
https://pokopiadex.com/pokedex/honchkrow-168
https://pokopiadex.com/pokedex/larvitar-169
https://pokopiadex.com/pokedex/pupitar-170
https://pokopiadex.com/pokedex/tyranitar-171
https://pokopiadex.com/pokedex/lotad-172
https://pokopiadex.com/pokedex/lombre-173
https://pokopiadex.com/pokedex/ludicolo-174
https://pokopiadex.com/pokedex/mawile-175
https://pokopiadex.com/pokedex/torkoal-176
https://pokopiadex.com/pokedex/kricketot-177
https://pokopiadex.com/pokedex/kricketune-178
https://pokopiadex.com/pokedex/chatot-179
https://pokopiadex.com/pokedex/riolu-180
https://pokopiadex.com/pokedex/lucario-181
https://pokopiadex.com/pokedex/rotom-182
https://pokopiadex.com/pokedex/larvesta-183
https://pokopiadex.com/pokedex/volcarona-184
https://pokopiadex.com/pokedex/rowlet-185
https://pokopiadex.com/pokedex/dartrix-186
https://pokopiadex.com/pokedex/decidueye-187
https://pokopiadex.com/pokedex/scorbunny-188
https://pokopiadex.com/pokedex/raboot-189
https://pokopiadex.com/pokedex/cinderace-190
https://pokopiadex.com/pokedex/skwovet-191
https://pokopiadex.com/pokedex/greedent-192
https://pokopiadex.com/pokedex/rolycoly-193
https://pokopiadex.com/pokedex/carkol-194
https://pokopiadex.com/pokedex/coalossal-195
https://pokopiadex.com/pokedex/toxel-196
https://pokopiadex.com/pokedex/toxtricity-197
https://pokopiadex.com/pokedex/fidough-198
https://pokopiadex.com/pokedex/dachsbun-199
https://pokopiadex.com/pokedex/charcadet-200
https://pokopiadex.com/pokedex/armarouge-201
https://pokopiadex.com/pokedex/ceruledge-202
https://pokopiadex.com/pokedex/glimmet-203
https://pokopiadex.com/pokedex/glimmora-204
https://pokopiadex.com/pokedex/gimmighoul-205
https://pokopiadex.com/pokedex/gholdengo-206
https://pokopiadex.com/pokedex/vulpix-207
https://pokopiadex.com/pokedex/ninetales-208
https://pokopiadex.com/pokedex/poliwag-209
https://pokopiadex.com/pokedex/poliwhirl-210
https://pokopiadex.com/pokedex/poliwrath-211
https://pokopiadex.com/pokedex/politoed-212
https://pokopiadex.com/pokedex/abra-213
https://pokopiadex.com/pokedex/kadabra-214
https://pokopiadex.com/pokedex/alakazam-215
https://pokopiadex.com/pokedex/mime-jr-216
https://pokopiadex.com/pokedex/mr-mime-217
https://pokopiadex.com/pokedex/porygon-218
https://pokopiadex.com/pokedex/porygon2-219
https://pokopiadex.com/pokedex/porygon-z-220
https://pokopiadex.com/pokedex/dratini-221
https://pokopiadex.com/pokedex/dragonair-222
https://pokopiadex.com/pokedex/dragonite-223
https://pokopiadex.com/pokedex/cyndaquil-224
https://pokopiadex.com/pokedex/quilava-225
https://pokopiadex.com/pokedex/typhlosion-226
https://pokopiadex.com/pokedex/misdreavus-227
https://pokopiadex.com/pokedex/mismagius-228
https://pokopiadex.com/pokedex/girafarig-229
https://pokopiadex.com/pokedex/farigiraf-230
https://pokopiadex.com/pokedex/ralts-231
https://pokopiadex.com/pokedex/kirlia-232
https://pokopiadex.com/pokedex/gardevoir-233
https://pokopiadex.com/pokedex/gallade-234
https://pokopiadex.com/pokedex/plusle-235
https://pokopiadex.com/pokedex/minun-236
https://pokopiadex.com/pokedex/trapinch-237
https://pokopiadex.com/pokedex/vibrava-238
https://pokopiadex.com/pokedex/flygon-239
https://pokopiadex.com/pokedex/swablu-240
https://pokopiadex.com/pokedex/altaria-241
https://pokopiadex.com/pokedex/duskull-242
https://pokopiadex.com/pokedex/dusclops-243
https://pokopiadex.com/pokedex/dusknoir-244
https://pokopiadex.com/pokedex/beldum-245
https://pokopiadex.com/pokedex/metang-246
https://pokopiadex.com/pokedex/metagross-247
https://pokopiadex.com/pokedex/snivy-248
https://pokopiadex.com/pokedex/servine-249
https://pokopiadex.com/pokedex/serperior-250
https://pokopiadex.com/pokedex/froakie-251
https://pokopiadex.com/pokedex/frogadier-252
https://pokopiadex.com/pokedex/greninja-253
https://pokopiadex.com/pokedex/dedenne-254
https://pokopiadex.com/pokedex/noibat-255
https://pokopiadex.com/pokedex/noivern-256
https://pokopiadex.com/pokedex/rookidee-257
https://pokopiadex.com/pokedex/corvisquire-258
https://pokopiadex.com/pokedex/corviknight-259
https://pokopiadex.com/pokedex/dreepy-260
https://pokopiadex.com/pokedex/drakloak-261
https://pokopiadex.com/pokedex/dragapult-262
https://pokopiadex.com/pokedex/sprigatito-263
https://pokopiadex.com/pokedex/floragato-264
https://pokopiadex.com/pokedex/meowscarada-265
https://pokopiadex.com/pokedex/wattrel-266
https://pokopiadex.com/pokedex/kilowattrel-267
https://pokopiadex.com/pokedex/tinkatink-268
https://pokopiadex.com/pokedex/tinkatuff-269
https://pokopiadex.com/pokedex/tinkaton-270
https://pokopiadex.com/pokedex/aerodactyl-271
https://pokopiadex.com/pokedex/cranidos-272
https://pokopiadex.com/pokedex/rampardos-273
https://pokopiadex.com/pokedex/shieldon-274
https://pokopiadex.com/pokedex/bastiodon-275
https://pokopiadex.com/pokedex/tyrunt-276
https://pokopiadex.com/pokedex/tyrantrum-277
https://pokopiadex.com/pokedex/amaura-278
https://pokopiadex.com/pokedex/aurorus-279
https://pokopiadex.com/pokedex/eevee-280
https://pokopiadex.com/pokedex/vaporeon-281
https://pokopiadex.com/pokedex/jolteon-282
https://pokopiadex.com/pokedex/flareon-283
https://pokopiadex.com/pokedex/espeon-284
https://pokopiadex.com/pokedex/umbreon-285
https://pokopiadex.com/pokedex/leafeon-286
https://pokopiadex.com/pokedex/glaceon-287
https://pokopiadex.com/pokedex/sylveon-288
https://pokopiadex.com/pokedex/kyogre-289
https://pokopiadex.com/pokedex/raikou-290
https://pokopiadex.com/pokedex/entei-291
https://pokopiadex.com/pokedex/suicune-292
https://pokopiadex.com/pokedex/volcanion-293
https://pokopiadex.com/pokedex/articuno-294
https://pokopiadex.com/pokedex/zapdos-295
https://pokopiadex.com/pokedex/moltres-296
https://pokopiadex.com/pokedex/lugia-297
https://pokopiadex.com/pokedex/ho-oh-298
https://pokopiadex.com/pokedex/mewtwo-299
https://pokopiadex.com/pokedex/mew-300
"""

def get_national_id(name):
    # Standardize name for PokeAPI
    search_name = name.strip()
    if search_name in POKEAPI_NAME_MAP:
        search_name = POKEAPI_NAME_MAP[search_name]
    else:
        # lower case, replace space/dot with dash, remove special chars
        search_name = search_name.lower().replace(' ', '-').replace('.', '').replace("'", "")
    
    try:
        url = f"https://pokeapi.co/api/v2/pokemon/{search_name}"
        res = requests.get(url, timeout=5)
        if res.status_code == 200:
            data = res.json()
            return data['id']
    except:
        pass
    return None

def scrape_pokemon(url):
    try:
        response = requests.get(url, timeout=15)
        if response.status_code != 200:
            return None
        
        soup = BeautifulSoup(response.content, 'html.parser')
        
        h1 = soup.find('h1')
        actual_name = re.sub(r'#\d+\s*', '', h1.get_text(strip=True)) if h1 else "Unknown"

        # Pokopia ID from URL
        match = re.search(r'-(\d+)$', url)
        pokopia_id = int(match.group(1)) if match else 0
        pkmn_id = pokopia_id

        # National ID for image
        nat_id = get_national_id(actual_name)

        # Item Drop (from mapping) - override page
        item_drop = ITEM_DROP_DATA.get(actual_name)

        # Image from PokeAPI (if we have nat_id)
        if nat_id:
            image_url = f"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/{nat_id}.png"
        else:
            # Fallback to Pokopia sprite
            image_url = ""
            main_img = soup.find('img', alt=actual_name)
            if main_img:
                src = main_img.get('src', '')
                parsed = urllib.parse.urlparse(src)
                qs = urllib.parse.parse_qs(parsed.query)
                if 'url' in qs:
                    image_url = "https://pokopiadex.com" + qs['url'][0]

        # Types
        types = []
        type_links = soup.find_all('a', href=lambda h: h and '/pokedex?type=' in h)
        for link in type_links:
            img = link.find('img')
            if img and img.get('alt'):
                t_name = img.get('alt').capitalize()
                if t_name not in types:
                    types.append(t_name)
        
        # Specialties & Likes
        specialties = []
        ideal_habitat = ""
        favorites = []
        
        header = soup.find(string=lambda t: t and 'Specialties & Likes' in t)
        if header:
            section = header.find_parent('div', class_='detail-card')
            if section:
                for row in section.find_all('div', recursive=False):
                    text = row.get_text(" ", strip=True)
                    if text.startswith('Specialties'):
                        val_str = text[len('Specialties'):].strip()
                        parts = re.findall(r'Litter\s*\([^)]+\)|[^\s()]+', val_str)
                        for p in parts:
                            if 'Litter' in p:
                                specialties.append('Litter')
                                # Only set item_drop if not already set by override
                                if not item_drop:
                                    drop_match = re.search(r'\(([^)]+)\)', p)
                                    if drop_match:
                                        item_drop = drop_match.group(1).strip().title()
                            else:
                                specialties.append(p)
                    elif text.startswith('Ideal Habitat'):
                        ideal_habitat = text[len('Ideal Habitat'):].strip()
                    elif text.startswith('Favorites'):
                        parts = [p.strip() for p in row.get_text("|", strip=True).split("|") if p.strip()]
                        if len(parts) > 1:
                            favorites = parts[1:]

        return {
            "id": pkmn_id,
            "name": actual_name,
            "types": types,
            "specialties": specialties,
            "idealHabitat": ideal_habitat,
            "itemDrop": item_drop,
            "favorites": favorites,
            "image": image_url
        }
    except Exception as e:
        print(f"Error scraping {url}: {e}")
        return None

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--limit", type=int, default=None)
    args = parser.parse_args()

    urls = [line.strip() for line in URLS_TEXT.strip().split('\n') if line.strip()]
    if args.limit:
        urls = urls[:args.limit]
    
    print(f"Starting scrape of {len(urls)} URLs...")
    results = []
    
    with ThreadPoolExecutor(max_workers=5) as executor: # lowered workers for PokeAPI rate limit safety
        for idx, res in enumerate(executor.map(scrape_pokemon, urls)):
            if res:
                results.append(res)
            if (idx + 1) % 10 == 0:
                print(f"Progress: {idx + 1}/{len(urls)}")
    
    # Sort by ID (National Dex ID)
    results.sort(key=lambda x: x['id'])
    
    filename = "src/domains/Pokopia/data/pokopia_data.ts"
    with open(filename, 'w') as f:
        f.write('import { Pokemon } from "../types";\n\n')
        f.write('export const pokopiaData: Pokemon[] = [\n')
        for i, res in enumerate(results):
            json_str = json.dumps(res, indent=2)
            indented = "\n".join("  " + line for line in json_str.split("\n"))
            f.write(indented)
            f.write(',\n' if i < len(results) - 1 else '\n')
        f.write('];\n')
    print("Done!")

if __name__ == "__main__":
    main()
