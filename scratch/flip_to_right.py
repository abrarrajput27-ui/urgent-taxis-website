import os
import glob
from PIL import Image

fleet_dir = 'C:/Users/91859/Desktop/New folder/Codex Results/Website/public/fleet'

# We want ALL cars to face RIGHT.
# Currently, hatchback and urbania face RIGHT natively.
# The others face LEFT natively.
# Note: In a previous step I flipped hatchback and urbania to face LEFT.
# But then I restored from backup! 
# So currently in public/fleet:
# - hatchback and urbania face RIGHT (restored from backup, and wait... I flipped them in restore script!)
# Let's check restore_full_size.py:
# if filename in ['hatchback-white.png', 'urbania-white.png']: img.transpose(Image.FLIP_LEFT_RIGHT)
# Ah! So I flipped hatchback and urbania to face LEFT when restoring!
# This means ALL cars in public/fleet CURRENTLY face LEFT.
# If ALL cars currently face LEFT, and the user wants ALL cars to face RIGHT,
# I just need to flip ALL OF THEM!

images = glob.glob(os.path.join(fleet_dir, '*.png'))

for img_path in images:
    if 'backup' in img_path: continue
    
    filename = os.path.basename(img_path)
    print(f"Flipping {filename} to face right...")
    
    img = Image.open(img_path).convert("RGBA")
    img = img.transpose(Image.FLIP_LEFT_RIGHT)
    img.save(img_path, "PNG")
    print(f"  Flipped {filename}")

# Also flip Innova
innova_path = 'C:/Users/91859/Desktop/New folder/Codex Results/Website/src/assets/innova-hycross-official.png'
if os.path.exists(innova_path):
    print("Flipping Innova...")
    img = Image.open(innova_path).convert("RGBA")
    img = img.transpose(Image.FLIP_LEFT_RIGHT)
    img.save(innova_path, "PNG")
    print("  Flipped Innova.")
