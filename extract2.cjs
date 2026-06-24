const fs = require('fs');
const css = fs.readFileSync('live_css.css', 'utf8');
const js = fs.readFileSync('live_js.js', 'utf8');
const regex = /https:\/\/[^\s\'\"`\(\)]+\.(png|jpg|jpeg|webp)/g;
const pathRegex = /\/[^\s\'\"`\(\)]+\.(png|jpg|jpeg|webp)/g;

let matches = [...(css.match(regex) || []), ...(js.match(regex) || []), ...(css.match(pathRegex) || []), ...(js.match(pathRegex) || [])];
console.log([...new Set(matches)].join('\n'));
