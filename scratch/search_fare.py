import re

file_path = r'C:\Users\91859\Desktop\Antigravity Work\Urgent Taxis\frontend\src\pages\Home.jsx'
with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if 'showFareBreakup' in line:
        print(f"Line {i+1}: {line.strip()}")
