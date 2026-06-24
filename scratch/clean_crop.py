import os
import glob
from PIL import Image
import numpy as np
import cv2

backup_dir = 'C:/Users/91859/Desktop/New folder/Codex Results/Website/public/fleet/backup-before-bg-fix'
target_dir = 'C:/Users/91859/Desktop/New folder/Codex Results/Website/public/fleet'

# Let's restore the images, remove white background, and tighten them.
images = glob.glob(os.path.join(backup_dir, '*-white.png'))

def process_image(src, dst):
    img = cv2.imread(src, cv2.IMREAD_UNCHANGED)
    if img.shape[2] == 3:
        img = cv2.cvtColor(img, cv2.COLOR_BGR2BGRA)
        
    # Flood fill white background from the 4 corners
    h, w = img.shape[:2]
    mask = np.zeros((h + 2, w + 2), np.uint8)
    
    # White background (assume near white)
    seed_points = [(0,0), (0, h-1), (w-1, 0), (w-1, h-1)]
    for pt in seed_points:
        cv2.floodFill(img, mask, pt, (255, 255, 255, 0), loDiff=(10, 10, 10, 0), upDiff=(10, 10, 10, 0))
        
    # Now img has transparent pixels where it was flood filled with alpha 0
    # Let's make sure pure white was removed
    # Find bounding box of non-transparent
    alpha = img[:, :, 3]
    y_indices, x_indices = np.where(alpha > 0)
    if len(x_indices) > 0:
        y_min, y_max = np.min(y_indices), np.max(y_indices)
        x_min, x_max = np.min(x_indices), np.max(x_indices)
        # crop
        img = img[y_min:y_max+1, x_min:x_max+1]
        
    cv2.imwrite(dst, img)
    print(f"Processed and cropped {os.path.basename(dst)}")

for src in images:
    dst = os.path.join(target_dir, os.path.basename(src))
    process_image(src, dst)

# Innova
innova_src = 'C:/Users/91859/Desktop/New folder/Codex Results/Website/src/assets/backup/innova-hycross-official.png'
innova_dst = 'C:/Users/91859/Desktop/New folder/Codex Results/Website/src/assets/innova-hycross-official.png'
if os.path.exists(innova_src):
    process_image(innova_src, innova_dst)

# Bus?
bus_src = 'C:/Users/91859/Desktop/New folder/Codex Results/Website/public/fleet/Volvo Bus Images.cms'
bus_dst = 'C:/Users/91859/Desktop/New folder/Codex Results/Website/public/fleet/bus-white.png'
if os.path.exists(bus_src):
    process_image(bus_src, bus_dst)
