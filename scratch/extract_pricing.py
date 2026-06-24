import re

file_path = r'C:\Users\91859\.gemini\antigravity\brain\e496f2b9-c87a-404b-a909-0652d65465bf\.system_generated\steps\5732\content.md'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# find "youSave"
matches = [m.start() for m in re.finditer('youSave', content)]
for i, m in enumerate(matches):
    if i > 2: break
    start = max(0, m - 100)
    end = min(len(content), m + 1500)
    print(f"Match {i+1}: \n", content[start:end])
    print("-" * 50)
