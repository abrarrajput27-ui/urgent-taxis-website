const fs = require('fs');
const data = fs.readFileSync('live_index.js', 'utf8');
const matches = data.match(/src:["'][^"']*?["']/g);
if(matches) {
    console.log(matches.filter(m => m.toLowerCase().includes('hero') || m.toLowerCase().includes('car')));
}
