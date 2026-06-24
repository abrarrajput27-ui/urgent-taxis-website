import os
from PIL import Image
import numpy as np
import rembg

def process_file(filepath):
    print(f"Processing {filepath}")
    original = Image.open(filepath).convert("RGBA")
    
    # 1. Get mask using rembg
    rembg_img = rembg.remove(original)
    rembg_arr = np.array(rembg_img)
    alpha = rembg_arr[:, :, 3]
    
    # 2. Find bounding box of anything with alpha > 10
    y_indices, x_indices = np.where(alpha > 10)
    if len(y_indices) == 0:
        print("No foreground found, skipping.")
        return
    
    ymin, ymax = y_indices.min(), y_indices.max()
    xmin, xmax = x_indices.min(), x_indices.max()
    
    # 3. Add a slight padding to preserve shadows that rembg might have missed
    padding = 20
    ymin = max(0, ymin - padding)
    ymax = min(original.height, ymax + padding)
    xmin = max(0, xmin - padding)
    xmax = min(original.width, xmax + padding)
    
    # 4. Crop the ORIGINAL image
    cropped = original.crop((xmin, ymin, xmax, ymax))
    
    # 5. Save back
    cropped.save(filepath, "PNG")
    print(f"Cropped to bounding box: x=[{xmin}, {xmax}], y=[{ymin}, {ymax}]")

files = [
    'C:/Users/91859/Desktop/New folder/Codex Results/Website/public/fleet/hatchback-white.png',
    'C:/Users/91859/Desktop/New folder/Codex Results/Website/public/fleet/sedan-white.png',
    'C:/Users/91859/Desktop/New folder/Codex Results/Website/public/fleet/muv-white.png',
    'C:/Users/91859/Desktop/New folder/Codex Results/Website/public/fleet/innova-hycross-official.png'
]

for f in files:
    if os.path.exists(f):
        # We need the original un-cropped un-messed-up images!
        # Wait, the current public/fleet/ files might already be messed up or flipped?
        # Let's process them directly.
        process_file(f)
    else:
        print(f"File not found: {f}")

