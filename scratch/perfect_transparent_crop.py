import os
import numpy as np
from PIL import Image
import rembg

def perfect_transparent_crop(filepath):
    print(f"Processing {filepath}")
    original = Image.open(filepath).convert("RGBA")
    
    # Remove background
    transparent_img = rembg.remove(original)
    arr = np.array(transparent_img)
    alpha = arr[:, :, 3]
    
    y_indices, x_indices = np.where(alpha > 10)
    if len(y_indices) > 0:
        ymin, ymax = y_indices.min(), y_indices.max()
        xmin, xmax = x_indices.min(), x_indices.max()
        
        # Crop exactly
        cropped = transparent_img.crop((xmin, ymin, xmax, ymax))
        cropped.save(filepath, "PNG")
        print(f"Transparent crop: x=[{xmin}, {xmax}], y=[{ymin}, {ymax}]")
    else:
        print("No foreground found.")

# Use the original backups if they exist to avoid degrading quality from multiple rembg passes
files = {
    'hatchback': 'C:/Users/91859/Desktop/New folder/Codex Results/Website/public/fleet/hatchback-white.png',
    'sedan': 'C:/Users/91859/Desktop/New folder/Codex Results/Website/public/fleet/sedan-white.png',
    'muv': 'C:/Users/91859/Desktop/New folder/Codex Results/Website/public/fleet/muv-white.png',
    'innova': 'C:/Users/91859/Desktop/New folder/Codex Results/Website/public/fleet/innova-hycross-official.png'
}

for name, f in files.items():
    if os.path.exists(f):
        perfect_transparent_crop(f)
