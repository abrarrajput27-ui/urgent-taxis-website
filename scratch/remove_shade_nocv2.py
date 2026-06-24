import numpy as np
from PIL import Image
import rembg

def remove_double_shade(filepath):
    print(f"Processing {filepath}")
    img = Image.open(filepath).convert("RGBA")
    arr = np.array(img)
    
    # Get mask
    rembg_img = rembg.remove(img)
    rembg_arr = np.array(rembg_img)
    alpha = rembg_arr[:, :, 3]
    
    y_indices, x_indices = np.where(alpha > 50)
    if len(y_indices) > 0:
        car_ymax = y_indices.max()
        
        # We blank out everything starting slightly below the tires.
        # This will wipe out any floor reflections.
        arr[car_ymax + 3:, :, 0:3] = 255  # RGB to white
        arr[car_ymax + 3:, :, 3] = 255    # Alpha to fully opaque (mix-blend-multiply will handle it)
        
        result = Image.fromarray(arr, "RGBA")
        result.save(filepath, "PNG")
        print(f"Removed shades below y={car_ymax + 3}")
    else:
        print("No car found.")

files = [
    'C:/Users/91859/Desktop/New folder/Codex Results/Website/public/fleet/hatchback-white.png',
    'C:/Users/91859/Desktop/New folder/Codex Results/Website/public/fleet/sedan-white.png',
    'C:/Users/91859/Desktop/New folder/Codex Results/Website/public/fleet/muv-white.png',
    'C:/Users/91859/Desktop/New folder/Codex Results/Website/public/fleet/innova-hycross-official.png'
]

import os
for f in files:
    if os.path.exists(f):
        remove_double_shade(f)
