import cv2
import numpy as np

img = cv2.imread('C:/Users/91859/Desktop/New folder/Codex Results/Website/public/fleet/innova-fleet.png', cv2.IMREAD_UNCHANGED)
if img is not None and img.shape[2] == 4:
    alpha = img[:, :, 3]
    # Check if there are many pixels with alpha between 1 and 254 (partial transparency)
    partial = np.sum((alpha > 0) & (alpha < 255))
    total = np.sum(alpha > 0)
    print(f"Partial transparency pixels: {partial}/{total} ({(partial/total)*100:.2f}%)")
