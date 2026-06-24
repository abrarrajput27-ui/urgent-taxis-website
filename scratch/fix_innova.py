import os
from PIL import Image

# Revert the hero image back
hero_innova = 'C:/Users/91859/Desktop/New folder/Codex Results/Website/src/assets/innova-hycross-official.png'
if os.path.exists(hero_innova):
    img = Image.open(hero_innova).convert("RGBA")
    img = img.transpose(Image.FLIP_LEFT_RIGHT)
    img.save(hero_innova, "PNG")
    print(f"Restored hero innova")

# Flip the fleet innova
fleet_innova = 'C:/Users/91859/Desktop/New folder/Codex Results/Website/public/fleet/innova-hycross-official.png'
if os.path.exists(fleet_innova):
    img = Image.open(fleet_innova).convert("RGBA")
    img = img.transpose(Image.FLIP_LEFT_RIGHT)
    img.save(fleet_innova, "PNG")
    print(f"Flipped fleet innova")

