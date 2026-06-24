import os
import glob
from PIL import Image
import numpy as np

fleet_dir = 'C:/Users/91859/Desktop/New folder/Codex Results/Website/public/fleet'
images = glob.glob(os.path.join(fleet_dir, '*-white.png'))

def get_direction(img_path):
    img = Image.open(img_path).convert("RGBA")
    arr = np.array(img)
    
    # Treat white pixels (or near white) as transparent
    # Calculate difference from white
    diff = np.abs(arr[:, :, :3] - 255).sum(axis=2)
    # Mask where difference is significant (e.g. > 30) AND alpha > 0
    mask = (diff > 30) & (arr[:, :, 3] > 0)
    
    y_indices, x_indices = np.where(mask)
    if len(x_indices) == 0:
        return "UNKNOWN"
        
    x_min, x_max = np.min(x_indices), np.max(x_indices)
    
    # Center of mass
    com_x = np.mean(x_indices)
    midpoint_x = (x_min + x_max) / 2
    
    if com_x > midpoint_x:
        return "LEFT"
    else:
        return "RIGHT"

for img_path in images:
    if 'backup' in img_path: continue
    filename = os.path.basename(img_path)
    direction = get_direction(img_path)
    print(f"{filename:30}: Faces {direction}")
    
bus_path = os.path.join(fleet_dir, 'bus-white.png')
if os.path.exists(bus_path):
    print(f"{'bus-white.png':30}: Faces {get_direction(bus_path)}")
    
innova_path = 'C:/Users/91859/Desktop/New folder/Codex Results/Website/src/assets/innova-hycross-official.png'
if os.path.exists(innova_path):
    print(f"{'innova-hycross':30}: Faces {get_direction(innova_path)}")
