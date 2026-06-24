import os
import glob
from PIL import Image

fleet_dir = 'C:/Users/91859/Desktop/New folder/Codex Results/Website/public/fleet'
images = glob.glob(os.path.join(fleet_dir, '*.png'))

for img_path in images:
    if 'backup' in img_path: continue
    
    filename = os.path.basename(img_path)
    print(f"Tight cropping {filename}...")
    
    img = Image.open(img_path).convert("RGBA")
    
    # 2. Get bounding box of non-transparent pixels
    bbox = img.getbbox()
    if not bbox:
        print(f"  Warning: Empty bounding box for {filename}")
        continue
        
    # 3. Crop tight
    cropped = img.crop(bbox)
    
    # 4. Save
    cropped.save(img_path, "PNG")
    print(f"  Saved tightly cropped {filename}")

# Also process Innova from src/assets if needed
innova_path = 'C:/Users/91859/Desktop/New folder/Codex Results/Website/src/assets/innova-hycross-official.png'
if os.path.exists(innova_path):
    print("Tight cropping Innova...")
    img = Image.open(innova_path).convert("RGBA")
    bbox = img.getbbox()
    if bbox:
        cropped = img.crop(bbox)
        cropped.save(innova_path, "PNG")
        print("  Saved tightly cropped Innova.")
