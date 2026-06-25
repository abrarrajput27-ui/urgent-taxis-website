const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const inputImagePath = path.join("src", "assets", "images", "noida-jewar-airport.jpg");
const outputImagePath = path.join("public", "images", "routes", "jewar-airport.webp");

async function convertImage() {
  if (fs.existsSync(inputImagePath)) {
    await sharp(inputImagePath)
      .webp({ quality: 80 })
      .toFile(outputImagePath);
    console.log("Image successfully converted to WebP!");
  } else {
    console.log("Input image does not exist!");
  }
}

function updateRoutesFile() {
  const routesPath = path.join("src", "data", "routes.js");
  let content = fs.readFileSync(routesPath, "utf8");

  // Regex to match each route object
  // Since we only want to update Jewar routes, we can split by "{"id":" or something similar,
  // or use a regex to find the specific block.
  
  // A simple way is to replace globally, but we only want to replace for Jewar.
  // The Jewar routes are added at the very end of the file.
  // Or we can just use replace with a function.
  
  const updatedContent = content.replace(/\{[^}]*"fromCity":\s*"Noida International Airport"[^}]*"routeSlug"[^}]*\}/g, (match) => {
    // This regex might fail if there are nested objects or the route is very large.
    // Let's do a safer string replace manually.
    return match;
  });
  
  // Safer approach: Split by fromCity: "Noida International Airport"
  let parts = content.split(`"fromCity": "Noida International Airport"`);
  for (let i = 1; i < parts.length; i++) {
    parts[i] = parts[i].replace(/"image":\s*"\/images\/routes\/default-airport-transfer\.webp"/, `"image": "/images/routes/jewar-airport.webp"`);
    parts[i] = parts[i].replace(/"heroImage":\s*"\/images\/routes\/default-airport-transfer\.webp"/, `"heroImage": "/images/routes/jewar-airport.webp"`);
    parts[i] = parts[i].replace(/"imageVerified":\s*false/, `"imageVerified": true`);
  }
  
  const newContent = parts.join(`"fromCity": "Noida International Airport"`);
  fs.writeFileSync(routesPath, newContent, "utf8");
  console.log("Routes updated!");
}

async function run() {
  await convertImage();
  updateRoutesFile();
}

run();

