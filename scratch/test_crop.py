from PIL import Image, ImageChops
import numpy as np

def process_image(path):
    print(f"Processing {path}")
    img = Image.open(path).convert("RGBA")
    arr = np.array(img)
    
    # We want to identify the background. The background is mostly light grey/white.
    # Let's say any pixel with R>220, G>220, B>220 is background.
    # Wait, the white car itself has R>220, G>220, B>220!
    # If we do that, we make the car transparent! That's why rembg or thresholding fails.
    pass

process_image('C:/Users/91859/Desktop/New folder/Codex Results/Website/public/fleet/hatchback-white.png')
