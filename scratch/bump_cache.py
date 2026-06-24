import re

file_path = 'C:/Users/91859/Desktop/New folder/Codex Results/Website/src/data/mockData.js'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Bump cache buster for the 4 images
content = re.sub(r"image: '/fleet/hatchback-white.png\?v=3'", "image: '/fleet/hatchback-white.png?v=4'", content)
content = re.sub(r"image: '/fleet/sedan-white.png\?v=3'", "image: '/fleet/sedan-white.png?v=4'", content)
content = re.sub(r"image: '/fleet/premium-white.png\?v=3'", "image: '/fleet/premium-white.png?v=4'", content)
content = re.sub(r"image: '/fleet/innova-hycross-official.png\?v=3'", "image: '/fleet/innova-hycross-official.png?v=4'", content)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated mockData.js with ?v=4")
