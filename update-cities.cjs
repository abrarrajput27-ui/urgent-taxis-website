const fs = require("fs");
const path = require("path");

const file = path.join("src", "data", "cities.js");
let content = fs.readFileSync(file, "utf8");

const cityUpdates = {
  "delhi": "Noida International Airport",
  "noida": "Noida International Airport",
  "greater-noida": "Noida International Airport",
  "ghaziabad": "Noida International Airport",
  "gurugram": "Noida International Airport"
};

for (const [citySlug, dest] of Object.entries(cityUpdates)) {
  const cityRegex = new RegExp(`slug:\\s*["']${citySlug}["'][\\s\\S]*?popularRoutes:\\s*\\[([\\s\\S]*?)\\]`);
  content = content.replace(cityRegex, (match, routesContent) => {
    if (!routesContent.includes(dest)) {
      const newLine = `\n      "${dest}",`;
      return match.replace(routesContent, newLine + routesContent);
    }
    return match;
  });
}

fs.writeFileSync(file, content, "utf8");
console.log("Successfully updated popularRoutes in cities.js");

