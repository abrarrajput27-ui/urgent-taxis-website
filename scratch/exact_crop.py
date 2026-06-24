import os
import numpy as np
from PIL import Image

def crop_exact(filepath):
    print(f"Processing {filepath}")
    img = Image.open(filepath).convert("RGBA")
    arr = np.array(img)
    
    # Background is considered (255, 255, 255) OR transparent (alpha == 0)
    # So the foreground is pixels where (NOT (R==255 and G==255 and B==255)) AND (Alpha > 0)
    
    # Wait! The car itself can have pure white pixels (glare).
    # If we crop based on non-white, we might cut into the glare on the roof of the car.
    # To be safe, we can use rembg again to get the exact car mask, 
    # OR since the image already has its background converted to exactly (255, 255, 255) or transparent?
    # Wait, earlier I only converted the bottom part to (255, 255, 255). The top part is the studio background which might be (238, 238, 238)!
    
    # So let's use rembg to find the car mask, and then crop exactly to the rembg mask bounding box!
    import rembg
    rembg_img = rembg.remove(img)
    rembg_arr = np.array(rembg_img)
    alpha = rembg_arr[:, :, 3]
    
    y_indices, x_indices = np.where(alpha > 10)
    if len(y_indices) > 0:
        ymin, ymax = y_indices.min(), y_indices.max()
        xmin, xmax = x_indices.min(), x_indices.max()
        
        # Crop exactly to the car's bounding box (0 padding)
        cropped = img.crop((xmin, ymin, xmax, ymax))
        cropped.save(filepath, "PNG")
        print(f"Exact crop: x=[{xmin}, {xmax}], y=[{ymin}, {ymax}]")
    else:
        print("No foreground found.")

files = [
    'C:/Users/91859/Desktop/New folder/Codex Results/Website/public/fleet/hatchback-white.png',
    'C:/Users/91859/Desktop/New folder/Codex Results/Website/public/fleet/sedan-white.png',
    'C:/Users/91859/Desktop/New folder/Codex Results/Website/public/fleet/muv-white.png',
    'C:/Users/91859/Desktop/New folder/Codex Results/Website/public/fleet/innova-hycross-official.png'
]

for f in files:
    if os.path.exists(f):
        crop_exact(f)
