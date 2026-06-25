const Jimp = require('jimp');
const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, 'src', 'assets', 'images');
const images = [
    'Hero.png',
    'Hatchback.png',
    'Sedan.png',
    'Ertiga.png',
    'MUV.png',
    'premium suv.png',
    'innova.png',
    'urbania.png',
    'Urbnia.png',
    'tempo traveller.png'
];

async function removeBackground(filename) {
    const filePath = path.join(imagesDir, filename);
    if (!fs.existsSync(filePath)) {
        console.log(`File not found: ${filename}`);
        return;
    }

    try {
        const image = await Jimp.read(filePath);
        const w = image.bitmap.width;
        const h = image.bitmap.height;
        
        // Find black background using Flood Fill
        const visited = new Uint8Array(w * h);
        const queue = [{x: 0, y: 0}];
        
        // We assume corners are background
        // Add all 4 corners to ensure we catch background if car touches an edge
        queue.push({x: w-1, y: 0});
        queue.push({x: 0, y: h-1});
        queue.push({x: w-1, y: h-1});

        let head = 0;
        while (head < queue.length) {
            const {x, y} = queue[head++];
            const idx = y * w + x;
            
            if (visited[idx]) continue;
            visited[idx] = 1;
            
            const idx4 = idx * 4;
            const r = image.bitmap.data[idx4];
            const g = image.bitmap.data[idx4 + 1];
            const b = image.bitmap.data[idx4 + 2];
            
            // Background is pure black or very dark
            if (r < 25 && g < 25 && b < 25) {
                // Make completely transparent
                image.bitmap.data[idx4 + 3] = 0;
                
                // Add neighbors
                if (x > 0) queue.push({x: x - 1, y: y});
                if (x < w - 1) queue.push({x: x + 1, y: y});
                if (y > 0) queue.push({x: x, y: y - 1});
                if (y < h - 1) queue.push({x: x, y: y + 1});
            }
        }
        
        // Pass 2: Anti-aliasing edge smoothing
        // Any pixel that is NOT fully transparent, but is near a fully transparent pixel, 
        // we scale its alpha based on its luminance, and unpremultiply it.
        for (let y = 1; y < h - 1; y++) {
            for (let x = 1; x < w - 1; x++) {
                const idx = y * w + x;
                const idx4 = idx * 4;
                
                // If this pixel is not background
                if (image.bitmap.data[idx4 + 3] > 0) {
                    // Check if it neighbors a background pixel
                    let isEdge = false;
                    for (let dy = -1; dy <= 1; dy++) {
                        for (let dx = -1; dx <= 1; dx++) {
                            const nIdx4 = ((y + dy) * w + (x + dx)) * 4;
                            if (image.bitmap.data[nIdx4 + 3] === 0) {
                                isEdge = true;
                                break;
                            }
                        }
                        if (isEdge) break;
                    }
                    
                    if (isEdge) {
                        const r = image.bitmap.data[idx4];
                        const g = image.bitmap.data[idx4 + 1];
                        const b = image.bitmap.data[idx4 + 2];
                        
                        // If it's a dark edge pixel, it's likely an anti-aliased black edge
                        // We convert its lightness to alpha to remove the dark halo
                        const maxVal = Math.max(r, g, b);
                        if (maxVal < 150) {
                            // Boost the RGB to remove the black mix, but drop alpha
                            const alpha = Math.max(0, Math.min(255, maxVal * 2));
                            image.bitmap.data[idx4 + 3] = alpha;
                            
                            if (maxVal > 0) {
                                image.bitmap.data[idx4] = Math.min(255, r * 255 / maxVal);
                                image.bitmap.data[idx4+1] = Math.min(255, g * 255 / maxVal);
                                image.bitmap.data[idx4+2] = Math.min(255, b * 255 / maxVal);
                            }
                        }
                    }
                }
            }
        }

        // Save over the same file
        await image.writeAsync(filePath);
        console.log(`Successfully processed ${filename}`);
    } catch (e) {
        console.error(`Error processing ${filename}:`, e.message);
    }
}

async function run() {
    for (const img of images) {
        await removeBackground(img);
    }
    console.log('All done!');
}

run();
