import os
import glob
from PIL import Image
import numpy as np

fleet_dir = 'C:/Users/91859/Desktop/New folder/Codex Results/Website/public/fleet'
images = glob.glob(os.path.join(fleet_dir, '*-full.png'))

def print_ascii_art(img_path, width=40):
    img = Image.open(img_path).convert("RGBA")
    arr = np.array(img)
    
    # We don't need difference from white since it's transparent
    mask = arr[:, :, 3] > 0
    
    y_indices, x_indices = np.where(mask)
    if len(x_indices) == 0: return
    
    x_min, x_max = np.min(x_indices), np.max(x_indices)
    y_min, y_max = np.min(y_indices), np.max(y_indices)
    
    cropped_mask = mask[y_min:y_max+1, x_min:x_max+1]
    
    # Resize mask to small ascii
    h, w = cropped_mask.shape
    height = int((h / w) * width * 0.5)
    
    img_mask = Image.fromarray(cropped_mask)
    img_resized = img_mask.resize((width, height), Image.NEAREST)
    arr_resized = np.array(img_resized)
    
    print(f"\n--- {os.path.basename(img_path)} ---")
    for row in arr_resized:
        line = "".join(["#" if val else "." for val in row])
        print(line)

for img_path in images:
    if 'backup' in img_path: continue
    print_ascii_art(img_path)
