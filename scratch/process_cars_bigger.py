import os
import glob
from PIL import Image

fleet_dir = 'C:/Users/91859/Desktop/New folder/Codex Results/Website/public/fleet'
images = glob.glob(os.path.join(fleet_dir, '*.png'))

# DO NOT FLIP, they are already flipped correctly
cars_to_flip = []

CANVAS_SIZE = 1024
# Reduce padding so images are significantly bigger
# 50px padding means max size is 924. 
# 10% zoom (scale-110) of 924 is 1016, which is < 1024. So it will NEVER touch the edges on hover!
PADDING = 50
MAX_SIZE = CANVAS_SIZE - 2 * PADDING

for img_path in images:
    if 'backup' in img_path: continue
    
    filename = os.path.basename(img_path)
    print(f"Processing {filename}...")
    
    img = Image.open(img_path).convert("RGBA")
    
    # 1. Flip if necessary (None here)
    if filename in cars_to_flip:
        img = img.transpose(Image.FLIP_LEFT_RIGHT)
        print(f"  Flipped {filename} to face Left")
        
    # 2. Get bounding box of non-transparent pixels
    bbox = img.getbbox()
    if not bbox:
        print(f"  Warning: Empty bounding box for {filename}")
        continue
        
    # 3. Crop tight
    cropped = img.crop(bbox)
    
    # 4. Calculate new size to fit within MAX_SIZE
    width, height = cropped.size
    ratio = min(MAX_SIZE / width, MAX_SIZE / height)
    new_width = int(width * ratio)
    new_height = int(height * ratio)
    
    cropped = cropped.resize((new_width, new_height), Image.Resampling.LANCZOS)
    
    # 5. Create new transparent canvas and paste perfectly in center
    canvas = Image.new("RGBA", (CANVAS_SIZE, CANVAS_SIZE), (0, 0, 0, 0))
    x_offset = (CANVAS_SIZE - new_width) // 2
    y_offset = (CANVAS_SIZE - new_height) // 2
    
    canvas.paste(cropped, (x_offset, y_offset), cropped)
    
    # 6. Save
    canvas.save(img_path, "PNG")
    print(f"  Saved perfectly centered and resized {filename}")

# Also process Innova from src/assets if needed
innova_path = 'C:/Users/91859/Desktop/New folder/Codex Results/Website/src/assets/innova-hycross-official.png'
if os.path.exists(innova_path):
    print("Processing Innova...")
    img = Image.open(innova_path).convert("RGBA")
    bbox = img.getbbox()
    if bbox:
        cropped = img.crop(bbox)
        width, height = cropped.size
        ratio = min(MAX_SIZE / width, MAX_SIZE / height)
        new_width = int(width * ratio)
        new_height = int(height * ratio)
        cropped = cropped.resize((new_width, new_height), Image.Resampling.LANCZOS)
        canvas = Image.new("RGBA", (CANVAS_SIZE, CANVAS_SIZE), (0, 0, 0, 0))
        x_offset = (CANVAS_SIZE - new_width) // 2
        y_offset = (CANVAS_SIZE - new_height) // 2
        canvas.paste(cropped, (x_offset, y_offset), cropped)
        canvas.save(innova_path, "PNG")
        print("  Saved Innova perfectly centered and resized.")
