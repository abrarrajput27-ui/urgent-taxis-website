import fs from 'fs';
fetch('https://urgenttaxis.com/')
  .then(res => res.text())
  .then(html => {
    const matches = html.match(/src=["'](\/assets\/index-[^"']+\.js)["']/i);
    if(matches) {
       fetch('https://urgenttaxis.com' + matches[1])
         .then(r => r.text())
         .then(js => {
            const imgs = js.match(/["'][^"']+\.(png|webp|jpg)["']/ig);
            if (imgs) {
                console.log([...new Set(imgs)].filter(img => img.toLowerCase().includes('hero') || img.toLowerCase().includes('car')));
            }
         });
    }
  });
