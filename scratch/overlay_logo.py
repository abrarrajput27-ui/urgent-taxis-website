import os
from PIL import Image

logo_path = 'C:/Users/91859/Desktop/New folder/Codex Results/Website/public/logo.jpg'
car_path = 'C:/Users/91859/Desktop/New folder/Codex Results/Website/public/fleet/hatchback-white.png'
out_path = 'C:/Users/91859/Desktop/New folder/Codex Results/Website/public/fleet/hatchback-white-logo.png'

# Load images
car = Image.open(car_path).convert("RGBA")
logo = Image.open(logo_path).convert("RGBA")

# Make logo background transparent
datas = logo.getdata()
new_data = []
for item in datas:
    # change all white (also shades of whites)
    if item[0] > 220 and item[1] > 220 and item[2] > 220:
        new_data.append((255, 255, 255, 0))
    else:
        new_data.append(item)
logo.putdata(new_data)

# Resize logo to fit on the side door/window
# Hatchback size is around 953x499
target_width = 250
ratio = target_width / logo.width
target_height = int(logo.height * ratio)
logo = logo.resize((target_width, target_height), Image.Resampling.LANCZOS)

# Rotate slightly to match car perspective
logo = logo.rotate(5, expand=True)

# Create a copy to modify
result = car.copy()

# Paste on side door (approximate coordinates for hatchback)
paste_x = 300
paste_y = 250

result.paste(logo, (paste_x, paste_y), logo)

# Also paste on bonnet? The prompt said "isko ho sake to bonet bhi use karo"
# Let's resize even smaller for bonnet
bonnet_width = 150
ratio_b = bonnet_width / logo.width
target_height_b = int(logo.height * ratio_b)
logo_bonnet = logo.resize((bonnet_width, target_height_b), Image.Resampling.LANCZOS)
logo_bonnet = logo_bonnet.rotate(-15, expand=True) # skew for bonnet
result.paste(logo_bonnet, (700, 260), logo_bonnet)

result.save(out_path, "PNG")
print(f"Created {out_path}")
