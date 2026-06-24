const fs = require('fs');
const txt = fs.readFileSync('live_index.js', 'utf8');
const tokens = txt.split(/["']/);
console.log(tokens.filter(t => t.endsWith('.png') || t.endsWith('.webp') || t.endsWith('.jpg')));
