import os
from PIL import Image

fleet_dir = 'C:/Users/91859/Desktop/New folder/Codex Results/Website/public/fleet'

to_flip = [
    os.path.join(fleet_dir, 'hatchback-white.png'),
    os.path.join(fleet_dir, 'urbania-white.png')
]

for img_path in to_flip:
    if os.path.exists(img_path):
        img = Image.open(img_path).convert("RGBA")
        img = img.transpose(Image.FLIP_LEFT_RIGHT)
        img.save(img_path, "PNG")
        print(f"Flipped {os.path.basename(img_path)}")
    else:
        print(f"Not found: {img_path}")
