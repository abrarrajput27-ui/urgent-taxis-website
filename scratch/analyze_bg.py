from PIL import Image
import numpy as np

img = Image.open('C:/Users/91859/Desktop/New folder/Codex Results/Website/public/fleet/hatchback-white.png').convert("RGB")
arr = np.array(img)

# Print corners to see background color
print("Top-Left:", arr[0, 0])
print("Top-Right:", arr[0, -1])
print("Bottom-Left:", arr[-1, 0])
print("Bottom-Right:", arr[-1, -1])

# Assume the background is the top-left color. Let's find the bounding box of pixels that differ from background by > 5
bg_color = arr[0, 0]
diff = np.abs(arr.astype(int) - bg_color.astype(int))
mask = np.any(diff > 5, axis=-1)

y_indices, x_indices = np.where(mask)
if len(y_indices) > 0:
    ymin, ymax = y_indices.min(), y_indices.max()
    xmin, xmax = x_indices.min(), x_indices.max()
    print(f"Bounding box: x=[{xmin}, {xmax}], y=[{ymin}, {ymax}]")
    print(f"Original size: {arr.shape}")
else:
    print("No bounding box found.")
