import os
from PIL import Image
import numpy as np

src_path = 'C:/Users/91859/Desktop/New folder/Codex Results/Website/public/fleet/innova-fleet.png'
dst_path = 'C:/Users/91859/Desktop/New folder/Codex Results/Website/src/assets/innova-hycross-official.png'

if os.path.exists(src_path):
    img = Image.open(src_path).convert("RGBA")
    arr = np.array(img)
    
    # Binarize alpha channel to remove ghosting/fading
    # Any pixel with alpha > 100 becomes 255 (solid), else 0 (transparent)
    r, g, b, a = arr[:,:,0], arr[:,:,1], arr[:,:,2], arr[:,:,3]
    new_a = np.where(a > 100, 255, 0).astype(np.uint8)
    
    new_arr = np.dstack((r, g, b, new_a))
    solid_img = Image.fromarray(new_arr, 'RGBA')
    
    # Flip it directly
    flipped_img = solid_img.transpose(Image.FLIP_LEFT_RIGHT)
    
    flipped_img.save(dst_path, "PNG")
    print("Fixed faddish look and flipped the image directly.")
else:
    print("Source not found.")
