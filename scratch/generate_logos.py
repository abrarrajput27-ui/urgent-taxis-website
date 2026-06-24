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
# Car size is 953x499
# For normal car (facing left), side window is on the right side.
target_width = 200
ratio = target_width / logo_orig.width
target_height = int(logo_orig.height * ratio)
logo_side = logo_orig.resize((target_width, target_height), Image.Resampling.LANCZOS)
# It's on a slight angle
logo_side_normal = logo_side.rotate(5, expand=True)

# Paste on normal car (approx right side doors)
x_normal = 550
y_normal = 200
car_with_logo = car.copy()
car_with_logo.paste(logo_side_normal, (x_normal, y_normal), logo_side_normal)

# For flipped car, the car is facing right, so side window is on the left side
# Since the car is flipped horizontally, the x coordinate is mirrored:
# mirrored_x = car_width - logo_width - original_x
x_flipped = car.width - logo_side_normal.width - x_normal
# Perspective angle is mirrored too (if it was rotated +5, now rotate -5)
logo_side_flipped = logo_side.rotate(-5, expand=True)
car_flipped_with_logo = car_flipped.copy()
car_flipped_with_logo.paste(logo_side_flipped, (x_flipped, y_normal), logo_side_flipped)

# Bonnet Logo
bonnet_width = 120
ratio_b = bonnet_width / logo_orig.width
target_height_b = int(logo_orig.height * ratio_b)
logo_bonnet = logo_orig.resize((bonnet_width, target_height_b), Image.Resampling.LANCZOS)

# Normal car (bonnet is on the left)
logo_bonnet_normal = logo_bonnet.rotate(-15, expand=True) # skew for bonnet
x_bonnet_normal = 200
y_bonnet_normal = 220
car_with_logo.paste(logo_bonnet_normal, (x_bonnet_normal, y_bonnet_normal), logo_bonnet_normal)

# Flipped car (bonnet is on the right)
x_bonnet_flipped = car.width - logo_bonnet_normal.width - x_bonnet_normal
logo_bonnet_flipped = logo_bonnet.rotate(15, expand=True)
car_flipped_with_logo.paste(logo_bonnet_flipped, (x_bonnet_flipped, y_bonnet_normal), logo_bonnet_flipped)

# Save
car_with_logo.save(out_normal, "PNG")
car_flipped_with_logo.save(out_flipped, "PNG")

print(f"Created {out_normal} and {out_flipped}")
