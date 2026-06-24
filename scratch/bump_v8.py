import re

file_path = 'C:/Users/91859/Desktop/New folder/Codex Results/Website/src/data/mockData.js'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

content = re.sub(r"\?v=7", "?v=8", content)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated mockData.js with v=8")
