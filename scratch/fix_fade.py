import os
from PIL import Image, ImageEnhance

img_path = 'C:/Users/91859/Desktop/New folder/Codex Results/Website/src/assets/innova-hycross-official.png'

if os.path.exists(img_path):
    img = Image.open(img_path).convert("RGBA")
    
    # Increase Saturation drastically to fix fade
    enhancer = ImageEnhance.Color(img)
    img = enhancer.enhance(1.4)  # +40% color
    
    # Increase Contrast to make it pop
    enhancer = ImageEnhance.Contrast(img)
    img = enhancer.enhance(1.2)  # +20% contrast
    
    # Increase Sharpness
    enhancer = ImageEnhance.Sharpness(img)
    img = enhancer.enhance(1.5)  # +50% sharpness
    
    img.save(img_path, "PNG")
    print("Enhanced colors and contrast to fix faddish look.")
else:
    print("File not found.")
