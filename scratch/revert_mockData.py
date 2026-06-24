import re

file_path = 'C:/Users/91859/Desktop/New folder/Codex Results/Website/src/data/mockData.js'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Original was: image: '/fleet/hatchback-white.png?v=6', blend: true
# Currently it is: image: '/fleet/hatchback-logo.png?v=4', imageFlipped: '/fleet/hatchback-logo-flipped.png?v=4', blend: true

old_str = r"image: '/fleet/hatchback-logo\.png\?v=\d+', imageFlipped: '/fleet/hatchback-logo-flipped\.png\?v=\d+', blend: true"
new_str = "image: '/fleet/hatchback-white.png?v=10', blend: true"

content = re.sub(old_str, new_str, content)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Reverted mockData.js")
