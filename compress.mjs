import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const assetsDir = path.join(__dirname, 'src', 'assets', 'images');

const images = [
  'roundtrip.png',
  'Airport Transfers j.png',
  'tour packages.png',
  'railway transfers.png',
  'wedding.png',
  'corporate.png',
  'service-local.png',
  'service-oneway.png'
];

for (const img of images) {
  const filePath = path.join(assetsDir, img);
  const jpgPath = filePath.replace(/\.png$/i, '.jpg');
  try {
    const before = fs.statSync(filePath).size;
    const inputBuf = fs.readFileSync(filePath);
    const outputBuf = await sharp(inputBuf)
      .resize(800, 500, { fit: 'cover' })
      .jpeg({ quality: 80, mozjpeg: true })
      .toBuffer();
    fs.writeFileSync(jpgPath, outputBuf);
    const after = fs.statSync(jpgPath).size;
    console.log(`${img}: ${Math.round(before/1024)}KB -> ${Math.round(after/1024)}KB (jpg)`);
  } catch(e) {
    console.log(`Error ${img}: ${e.message}`);
  }
}
