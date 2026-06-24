import re

file_path = 'C:/Users/91859/Desktop/New folder/Codex Results/Website/src/data/mockData.js'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace references
# hatchback
content = re.sub(r"image: '/fleet/hatchback[^']+'", "image: '/fleet/hatchback-white.png?v=3'", content)
# sedan
content = re.sub(r"image: '/fleet/sedan[^']+'", "image: '/fleet/sedan-white.png?v=3'", content)
# muv
content = re.sub(r"image: '/fleet/muv[^']+'", "image: '/fleet/muv-white.png?v=3'", content)
# innova
content = re.sub(r"image: '/fleet/innova[^']+'", "image: '/fleet/innova-hycross-official.png?v=3'", content)
# traveller
content = re.sub(r"image: '/fleet/traveller[^']+'", "image: '/fleet/traveller-white.png?v=3'", content)
# urbania
content = re.sub(r"image: '/fleet/urbania[^']+'", "image: '/fleet/urbania-white.png?v=3'", content)
# bus
content = re.sub(r"image: '/fleet/bus[^']+'", "image: '/fleet/bus-white.png?v=3'", content)
# premium
content = re.sub(r"image: '/fleet/premium[^']+'", "image: '/fleet/premium-white.png?v=3'", content)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated mockData.js with ?v=3")
