import os
from PIL import Image, ImageEnhance

img_path = 'C:/Users/91859/Desktop/New folder/Codex Results/Website/src/assets/innova-hycross-official.png'

if os.path.exists(img_path):
    img = Image.open(img_path).convert("RGBA")
    
    # 1. Flip
    img = img.transpose(Image.FLIP_LEFT_RIGHT)
    
    # 2. Brighten and clarify (remove fade)
    # Increase Contrast slightly
    enhancer = ImageEnhance.Contrast(img)
    img = enhancer.enhance(1.15)
    
    # Increase Saturation slightly to make it pop
    enhancer = ImageEnhance.Color(img)
    img = enhancer.enhance(1.2)
    
    # Increase Brightness slightly
    enhancer = ImageEnhance.Brightness(img)
    img = enhancer.enhance(1.05)
    
    img.save(img_path, "PNG")
    print("Flipped and enhanced Hero image.")
else:
    print("File not found.")
