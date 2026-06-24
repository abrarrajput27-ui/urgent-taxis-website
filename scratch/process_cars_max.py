import os
import glob
from PIL import Image

fleet_dir = 'C:/Users/91859/Desktop/New folder/Codex Results/Website/public/fleet'
images = glob.glob(os.path.join(fleet_dir, '*.png'))

# DO NOT FLIP, they are already flipped correctly
cars_to_flip = []

CANVAS_SIZE = 1024
# PADDING = 20 means MAX_SIZE = 984.
# A 1.1x scale applied by CSS hover will make it look like 1082, but it's an object-contain image.
# Actually, the image ITSELF will be 1024x1024. The car inside it will be 984.
# If CSS scales the 1024 image by 1.1x, the car becomes 984 * 1.1 = 1082. Wait!
# 1082 > 1024! So it WILL touch the border (it will overflow the 1024 bounds of the original image, and since overflow-hidden is on the container, it will clip!)
# Ah!
# Let's calculate:
# We want: car_size * 1.1 <= CANVAS_SIZE
# car_size <= 1024 / 1.1
# car_size <= 930
# PADDING = (1024 - 930) / 2 = 47
# So minimum PADDING to avoid clipping on 1.1x scale is 47.
# Let's use PADDING = 50. I ALREADY used PADDING = 50!
# Why did it look small?
# Because the container had p-4 (which is 16px padding on all sides).
# Also, the container is h-48 (192px).
# 192px - 32px (p-4) = 160px. The car was 160px tall.
# Now with px-2 py-1, it is 192px - 8px (py-1) = 184px. The car will be 15% taller!
# Let's reduce PADDING to 48 just to squeeze the absolute maximum out of it without clipping!

PADDING = 48
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
