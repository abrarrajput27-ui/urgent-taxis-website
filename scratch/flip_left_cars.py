import os
from PIL import Image

fleet_dir = 'C:/Users/91859/Desktop/New folder/Codex Results/Website/public/fleet'
innova_path = 'C:/Users/91859/Desktop/New folder/Codex Results/Website/src/assets/innova-hycross-official.png'

to_flip = [
    os.path.join(fleet_dir, 'sedan-white.png'),
    os.path.join(fleet_dir, 'muv-white.png'),
    os.path.join(fleet_dir, 'premium-white.png'),
    os.path.join(fleet_dir, 'traveller-white.png'),
    os.path.join(fleet_dir, 'bus-white.png'),
    innova_path
]

for img_path in to_flip:
    if os.path.exists(img_path):
        img = Image.open(img_path).convert("RGBA")
        img = img.transpose(Image.FLIP_LEFT_RIGHT)
        img.save(img_path, "PNG")
        print(f"Flipped {os.path.basename(img_path)}")
    else:
        print(f"Not found: {img_path}")
