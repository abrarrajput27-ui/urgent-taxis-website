import os
import shutil
from PIL import Image

backup_dir = 'C:/Users/91859/Desktop/New folder/Codex Results/Website/public/fleet/backup-before-bg-fix'
target_dir = 'C:/Users/91859/Desktop/New folder/Codex Results/Website/public/fleet'

cars_to_flip = ['hatchback-white.png', 'urbania-white.png']

for filename in os.listdir(backup_dir):
    if not filename.endswith('.png'): continue
    
    src = os.path.join(backup_dir, filename)
    dst = os.path.join(target_dir, filename)
    
    print(f"Restoring {filename}...")
    
    if filename in cars_to_flip:
        # Load and flip
        img = Image.open(src).convert("RGBA")
        img = img.transpose(Image.FLIP_LEFT_RIGHT)
        img.save(dst, "PNG")
        print(f"  Flipped and saved {filename}")
    else:
        # Just copy
        shutil.copy2(src, dst)
        print(f"  Copied {filename}")

# Wait, what about innova?
innova_src = 'C:/Users/91859/Desktop/New folder/Codex Results/Website/src/assets/backup/innova-hycross-official.png'
innova_dst = 'C:/Users/91859/Desktop/New folder/Codex Results/Website/src/assets/innova-hycross-official.png'
if os.path.exists(innova_src):
    shutil.copy2(innova_src, innova_dst)
    print("Restored Innova from backup.")

print("Done restoring full size images.")
