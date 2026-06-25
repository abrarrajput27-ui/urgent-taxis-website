const sharp = require("sharp");
const path = require("path");
const inputPath = path.join("src", "assets", "images", "Images", "Canva Designs", "Urgent Taxis Logo .png");
sharp(inputPath).metadata().then(metadata => console.log(metadata));
