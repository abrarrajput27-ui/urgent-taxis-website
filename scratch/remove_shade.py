import cv2
import numpy as np
from PIL import Image

def remove_double_shade(filepath):
    print(f"Processing {filepath}")
    img = Image.open(filepath).convert("RGBA")
    arr = np.array(img)
    
    # Let's find where the "car" ends and the "reflection" begins.
    # Usually, rembg gives an alpha mask. Let's run rembg again to get the exact car mask.
    import rembg
    rembg_img = rembg.remove(img)
    rembg_arr = np.array(rembg_img)
    alpha = rembg_arr[:, :, 3]
    
    y_indices, x_indices = np.where(alpha > 50)
    if len(y_indices) > 0:
        car_ymax = y_indices.max()
        # car_ymax is the bottom-most pixel of the car (tires).
        # We can crop or clear everything below car_ymax + 5 to remove reflections/double shades.
        
        # Set everything below car_ymax + 2 to pure white (or transparent if we want)
        # Since we use mix-blend-multiply in CSS, pure white (255,255,255) becomes transparent.
        arr[car_ymax + 3:, :, 0:3] = 255  # RGB to white
        arr[car_ymax + 3:, :, 3] = 255    # Alpha to opaque
        
        result = Image.fromarray(arr, "RGBA")
        result.save(filepath, "PNG")
        print(f"Removed shades below y={car_ymax + 3}")

files = [
    'C:/Users/91859/Desktop/New folder/Codex Results/Website/public/fleet/hatchback-white.png',
    'C:/Users/91859/Desktop/New folder/Codex Results/Website/public/fleet/sedan-white.png',
    'C:/Users/91859/Desktop/New folder/Codex Results/Website/public/fleet/muv-white.png',
    'C:/Users/91859/Desktop/New folder/Codex Results/Website/public/fleet/innova-hycross-official.png'
]

for f in files:
    import os
    if os.path.exists(f):
        remove_double_shade(f)
