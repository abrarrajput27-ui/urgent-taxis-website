import fs from 'fs';
const data = fs.readFileSync('live_index.js', 'utf8');
const matches = data.match(/["'][^"']*?(hero|car|vehicle)[^"']*?(png|jpg|jpeg|webp)["']/ig);
if(matches) {
    console.log([...new Set(matches)]);
}
