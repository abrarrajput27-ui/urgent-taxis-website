const fs = require('fs');

const files = [
  'CtaBand.jsx',
  'Fleet.jsx',
  'Footer.jsx',
  'Header.jsx',
  'PopularRoutes.jsx',
  'Services.jsx',
  'Testimonials.jsx'
];

files.forEach(file => {
  const path = 'src/components/' + file;
  let content = fs.readFileSync(path, 'utf8');
  content = content.replace(/max-w-7xl mx-auto px-4/g, 'w-full px-4 sm:px-8 lg:px-12 mx-auto');
  fs.writeFileSync(path, content);
});

let heroPath = 'src/components/Hero.jsx';
let heroContent = fs.readFileSync(heroPath, 'utf8');
heroContent = heroContent.replace(/w-full max-w-\[1500px\] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12/g, 'w-full px-4 sm:px-8 lg:px-12 mx-auto');
fs.writeFileSync(heroPath, heroContent);

let trustPath = 'src/components/TrustStrip.jsx';
let trustContent = fs.readFileSync(trustPath, 'utf8');
trustContent = trustContent.replace(/max-w-6xl mx-auto/g, 'w-full px-4 sm:px-8 lg:px-12 mx-auto');
fs.writeFileSync(trustPath, trustContent);

console.log('Update complete');
