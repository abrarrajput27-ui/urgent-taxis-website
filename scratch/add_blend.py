import re

file_path = 'C:/Users/91859/Desktop/New folder/Codex Results/Website/src/data/mockData.js'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Add blend: true to fleetData 1-4
content = re.sub(r"image: '/fleet/hatchback-white.png\?v=\d+'(?!, blend)", r"image: '/fleet/hatchback-white.png?v=7', blend: true", content)
content = re.sub(r"image: '/fleet/sedan-white.png\?v=\d+'(?!, blend)", r"image: '/fleet/sedan-white.png?v=7', blend: true", content)
content = re.sub(r"image: '/fleet/muv-white.png\?v=\d+'(?!, blend)", r"image: '/fleet/muv-white.png?v=7', blend: true", content)
content = re.sub(r"image: '/fleet/innova-hycross-official.png\?v=\d+'(?!, blend)", r"image: '/fleet/innova-hycross-official.png?v=7', blend: true", content)

# Remove the ones we previously added to v1-v5 so they get updated correctly to v=7
content = re.sub(r"image: '/fleet/hatchback-white.png\?v=6', blend: true", r"image: '/fleet/hatchback-white.png?v=7', blend: true", content)
content = re.sub(r"image: '/fleet/sedan-white.png\?v=6', blend: true", r"image: '/fleet/sedan-white.png?v=7', blend: true", content)
content = re.sub(r"image: '/fleet/muv-white.png\?v=6', blend: true", r"image: '/fleet/muv-white.png?v=7', blend: true", content)
content = re.sub(r"image: '/fleet/innova-hycross-official.png\?v=6', blend: true", r"image: '/fleet/innova-hycross-official.png?v=7', blend: true", content)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated mockData.js with blend: true and v=7")
