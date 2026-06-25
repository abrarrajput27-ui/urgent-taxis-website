const { removeBackground } = require('@imgly/background-removal-node');
const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, 'src', 'assets', 'images');
const images = [
    'volvo bus.png'
];

async function processImage(filename) {
    const filePath = path.join(imagesDir, filename);
    if (!fs.existsSync(filePath)) {
        console.log(`File not found: ${filename}`);
        return;
    }

    try {
        console.log(`Removing background from ${filename}...`);
        
        const fileUrl = 'file:///' + filePath.replace(/\\/g, '/');
        const blob = await removeBackground(fileUrl, {
            model: 'medium', // standard model
            output: {
                format: 'image/png',
                quality: 1
            }
        });

        const buffer = Buffer.from(await blob.arrayBuffer());
        fs.writeFileSync(filePath, buffer);
        console.log(`Successfully saved transparent ${filename}`);
    } catch (e) {
        console.error(`Error processing ${filename}:`, e.message);
    }
}

async function run() {
    for (const img of images) {
        await processImage(img);
    }
    console.log('All done!');
}

run();
