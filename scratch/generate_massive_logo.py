import os
from PIL import Image

logo_path = 'C:/Users/91859/Desktop/New folder/Codex Results/Website/public/logo.jpg'
car_path = 'C:/Users/91859/Desktop/New folder/Codex Results/Website/public/fleet/hatchback-white.png'
out_normal = 'C:/Users/91859/Desktop/New folder/Codex Results/Website/public/fleet/hatchback-logo.png'
out_flipped = 'C:/Users/91859/Desktop/New folder/Codex Results/Website/public/fleet/hatchback-logo-flipped.png'

# Load images
car = Image.open(car_path).convert("RGBA")
car_flipped = car.transpose(Image.FLIP_LEFT_RIGHT)

logo_orig = Image.open(logo_path).convert("RGBA")

# Make logo background transparent
datas = logo_orig.getdata()
new_data = []
for item in datas:
    # change all white (also shades of whites)
    if item[0] > 220 and item[1] > 220 and item[2] > 220:
        new_data.append((255, 255, 255, 0))
    else:
        new_data.append(item)
logo_orig.putdata(new_data)

# Side Window Logo
# Make it even BIGGER!
target_width = 450
ratio = target_width / logo_orig.width
target_height = int(logo_orig.height * ratio)
logo_side = logo_orig.resize((target_width, target_height), Image.Resampling.LANCZOS)
# Rotate slightly
logo_side_normal = logo_side.rotate(5, expand=True)

# Paste on normal car (approx right side doors)
# With 450 width, we need to adjust X to keep it centered on the door.
x_normal = 450
y_normal = 180
car_with_logo = car.copy()
car_with_logo.paste(logo_side_normal, (x_normal, y_normal), logo_side_normal)

# Flipped car
x_flipped = car.width - logo_side_normal.width - x_normal
logo_side_flipped = logo_side.rotate(-5, expand=True)
car_flipped_with_logo = car_flipped.copy()
car_flipped_with_logo.paste(logo_side_flipped, (x_flipped, y_normal), logo_side_flipped)

# Bonnet logo removed as requested

# Save
car_with_logo.save(out_normal, "PNG")
car_flipped_with_logo.save(out_flipped, "PNG")

print(f"Created massive logos (no bonnet) for {out_normal} and {out_flipped}")
