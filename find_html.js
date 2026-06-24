import fs from 'fs';
fetch('https://urgenttaxis.com/')
  .then(res => res.text())
  .then(html => {
    const matches = html.match(/<img[^>]+src=["']([^"']+)["'][^>]*>/ig);
    console.log(matches);
  });
