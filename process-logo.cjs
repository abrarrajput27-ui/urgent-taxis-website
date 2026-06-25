const sharp = require("sharp");
const path = require("path");
const fs = require("fs");
const inputPath = path.join("src", "assets", "images", "Images", "Canva Designs", "Urgent Taxis Logo .png");
const outDir = "public";

async function processImage() {
  const { data, info } = await sharp(inputPath).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  
  const visited = new Uint8Array(info.width * info.height);
  const queue = [[0, 0], [info.width-1, 0], [0, info.height-1], [info.width-1, info.height-1]]; // start from 4 corners
  
  const getIndex = (x, y) => (y * info.width + x) * 4;
  
  while (queue.length > 0) {
    const [x, y] = queue.pop();
    if (x < 0 || x >= info.width || y < 0 || y >= info.height) continue;
    
    const vIdx = y * info.width + x;
    if (visited[vIdx]) continue;
    visited[vIdx] = 1;
    
    const idx = getIndex(x, y);
    const r = data[idx], g = data[idx+1], b = data[idx+2], a = data[idx+3];
    
    // Transparent or white
    if (a === 0 || (r > 240 && g > 240 && b > 240)) {
      data[idx+3] = 0; // make transparent
      queue.push([x+1, y], [x-1, y], [x, y+1], [x, y-1]);
    }
  }
  
  // Reload buffer into sharp and trim the transparent edges
  const processed = sharp(data, {
    raw: {
      width: info.width,
      height: info.height,
      channels: 4
    }
  }).trim();

  // Save all sizes
  await processed.resize(16, 16).png().toFile(path.join(outDir, "favicon-16x16.png"));
  await processed.resize(32, 32).png().toFile(path.join(outDir, "favicon-32x32.png"));
  await processed.resize(180, 180).png().toFile(path.join(outDir, "apple-touch-icon.png"));
  await processed.resize(192, 192).png().toFile(path.join(outDir, "android-chrome-192x192.png"));
  await processed.resize(512, 512).png().toFile(path.join(outDir, "android-chrome-512x512.png"));
  
  fs.copyFileSync(path.join(outDir, "favicon-32x32.png"), path.join(outDir, "favicon.ico"));
  
  console.log("Successfully removed white background, cropped, and generated all icons.");
}

processImage().catch(console.error);
