from PIL import Image
import numpy as np

img = Image.open('C:/Users/91859/Desktop/New folder/Codex Results/Website/public/fleet/innova-fleet.png').convert("RGBA")
arr = np.array(img)
alpha = arr[:, :, 3]
partial = np.sum((alpha > 0) & (alpha < 255))
total = np.sum(alpha > 0)
print(f"Partial transparency pixels: {partial}/{total} ({(partial/total)*100:.2f}%)")

# Let's binarize the alpha channel so anything > 0 becomes 255 (fully opaque) to fix fading!
# But wait, if it's anti-aliased edges, making it 255 will cause jagged edges.
# What if we just multiply RGB by a factor?
