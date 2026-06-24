import re

file_path = 'C:/Users/91859/Desktop/New folder/Codex Results/Website/src/data/mockData.js'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Update hatchback image and add imageFlipped
# Original was: image: '/fleet/hatchback-white.png?v=10', blend: true

new_str = "image: '/fleet/hatchback-logo.png?v=1', imageFlipped: '/fleet/hatchback-logo-flipped.png?v=1', blend: true"
content = re.sub(r"image: '/fleet/hatchback-white\.png\?v=\d+', blend: true", new_str, content)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated mockData.js with hatchback logos")
