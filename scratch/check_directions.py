import os
import glob
from PIL import Image
import numpy as np

fleet_dir = 'C:/Users/91859/Desktop/New folder/Codex Results/Website/public/fleet'
images = glob.glob(os.path.join(fleet_dir, '*.png'))

for img_path in images:
    if 'backup' in img_path: continue
    
    filename = os.path.basename(img_path)
    img = Image.open(img_path).convert("RGBA")
    
    # Get alpha channel
    alpha = np.array(img)[:, :, 3]
    
    # Find bounding box
    y_indices, x_indices = np.where(alpha > 0)
    if len(x_indices) == 0:
        continue
        
    x_min, x_max = np.min(x_indices), np.max(x_indices)
    
    # Center of mass in X (using alpha values as weights)
    total_alpha = np.sum(alpha)
    com_x = np.sum(x_indices * alpha[y_indices, x_indices]) / total_alpha
    
    # Midpoint of the car
    midpoint_x = (x_min + x_max) / 2
    
    # If center of mass is to the RIGHT of the midpoint, the bulky part is on the right, so car points LEFT.
    if com_x > midpoint_x:
        direction = "LEFT"
    else:
        direction = "RIGHT"
        
    print(f"{filename:30}: COM={com_x:.1f}, Mid={midpoint_x:.1f} -> Faces {direction}")

innova_path = 'C:/Users/91859/Desktop/New folder/Codex Results/Website/src/assets/innova-hycross-official.png'
if os.path.exists(innova_path):
    img = Image.open(innova_path).convert("RGBA")
    alpha = np.array(img)[:, :, 3]
    y_indices, x_indices = np.where(alpha > 0)
    x_min, x_max = np.min(x_indices), np.max(x_indices)
    total_alpha = np.sum(alpha)
    com_x = np.sum(x_indices * alpha[y_indices, x_indices]) / total_alpha
    midpoint_x = (x_min + x_max) / 2
    direction = "LEFT" if com_x > midpoint_x else "RIGHT"
    print(f"{'innova-hycross-official.png':30}: COM={com_x:.1f}, Mid={midpoint_x:.1f} -> Faces {direction}")
