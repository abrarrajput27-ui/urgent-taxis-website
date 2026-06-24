import os
import glob
from PIL import Image, ImageDraw

backup_dir = 'C:/Users/91859/Desktop/New folder/Codex Results/Website/public/fleet/backup-before-bg-fix'
target_dir = 'C:/Users/91859/Desktop/New folder/Codex Results/Website/public/fleet'

images = glob.glob(os.path.join(backup_dir, '*-white.png'))

def process_image(src, dst):
    img = Image.open(src).convert("RGBA")
    
    # We want to replace white with transparent.
    # Simple approach: if pixel is close to white, make it transparent.
    data = img.getdata()
    new_data = []
    for item in data:
        # white threshold
        if item[0] > 240 and item[1] > 240 and item[2] > 240:
            new_data.append((255, 255, 255, 0))
        else:
            new_data.append(item)
            
    img.putdata(new_data)
    
    # get bounding box of non transparent pixels
    bbox = img.getbbox()
    if bbox:
        img = img.crop(bbox)
        
    img.save(dst, "PNG")
    print(f"Processed {os.path.basename(dst)}")

for src in images:
    dst = os.path.join(target_dir, os.path.basename(src))
    process_image(src, dst)

innova_src = 'C:/Users/91859/Desktop/New folder/Codex Results/Website/src/assets/backup/innova-hycross-official.png'
innova_dst = 'C:/Users/91859/Desktop/New folder/Codex Results/Website/src/assets/innova-hycross-official.png'
if os.path.exists(innova_src):
    process_image(innova_src, innova_dst)

bus_src = 'C:/Users/91859/Desktop/New folder/Codex Results/Website/public/fleet/Volvo Bus Images.cms'
bus_dst = 'C:/Users/91859/Desktop/New folder/Codex Results/Website/public/fleet/bus-white.png'
if os.path.exists(bus_src):
    # Just save it as is but cropped if it has white bg
    try:
        process_image(bus_src, bus_dst)
    except:
        pass
