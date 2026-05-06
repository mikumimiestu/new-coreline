const fs = require('fs');
const path = require('path');

const targetDirs = [
  '/Users/zakimushthafabillah/account-astbyte/frontend/src/routes'
];

// Vibrant Neo-Brutalist colors
const colors = [
  'bg-yellow-300', 
  'bg-pink-300', 
  'bg-cyan-300', 
  'bg-green-300', 
  'bg-purple-300', 
  'bg-orange-300',
  'bg-lime-300',
  'bg-teal-300'
];

let colorIndex = 0;
function getNextColor() {
  const c = colors[colorIndex % colors.length];
  colorIndex++;
  return c;
}

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  let originalContent = content;

  // 1. Replace shadows with hard black shadows
  content = content.replace(/shadow-(sm|md|lg|xl|2xl|inner|none|blue-\w+\/\d+|indigo-\w+\/\d+|gray-\w+\/\d+|slate-\w+\/\d+)/g, 'shadow-[4px_4px_0px_#000]');
  content = content.replace(/shadow\b(?!\-\[)/g, 'shadow-[4px_4px_0px_#000]');

  // 2. Add thick borders
  content = content.replace(/border-transparent/g, 'border-black');
  content = content.replace(/border-white(\/\d+)?/g, 'border-black');
  content = content.replace(/border-gray-\d+/g, 'border-black');
  content = content.replace(/border-slate-\d+/g, 'border-black');
  content = content.replace(/border-blue-\d+/g, 'border-black');
  content = content.replace(/border-indigo-\d+/g, 'border-black');

  // If there's border but no width, make it border-2 or border-4
  content = content.replace(/\bborder\b(?!\-)/g, 'border-2 border-black');

  // 3. Remove rounded corners (optional, some rounding is ok, but we want flat)
  content = content.replace(/rounded-(sm|md|lg|xl|2xl|3xl|full)/g, 'rounded-none');
  content = content.replace(/rounded\b(?!\-)/g, 'rounded-none');

  // 4. Colorize backgrounds
  // We will replace 'bg-white' in cards with random bright colors!
  content = content.replace(/\bbg-white\b/g, () => getNextColor());
  
  // Replace gradients with solid vibrant colors
  content = content.replace(/bg-gradient-to-\w+\s+from-\w+-\d+\s+to-\w+-\d+/g, () => getNextColor());
  content = content.replace(/bg-blue-600/g, () => getNextColor());
  content = content.replace(/bg-indigo-600/g, () => getNextColor());

  // Background slates to vibrant main bg like bg-blue-100 or pink-50
  content = content.replace(/\bbg-slate-50\b/g, 'bg-blue-50');
  content = content.replace(/\bbg-gray-50\b/g, 'bg-blue-50');

  // 5. Fix Text Colors
  // Text inside vibrant backgrounds must be black for contrast
  content = content.replace(/text-slate-\d+/g, 'text-black font-bold');
  content = content.replace(/text-gray-\d+/g, 'text-black font-bold');
  content = content.replace(/text-white/g, 'text-black font-bold');

  // Add hover animations for buttons
  content = content.replace(/hover:shadow-[a-z0-9\-]+/g, 'hover:shadow-[6px_6px_0px_#000] hover:-translate-y-1 hover:-translate-x-1 transition-all');

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content);
    console.log(`Updated ${filePath}`);
  }
}

function traverse(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      traverse(fullPath);
    } else if (fullPath.endsWith('.svelte') || fullPath.endsWith('.ts')) {
      processFile(fullPath);
    }
  }
}

targetDirs.forEach(dir => traverse(dir));
console.log('Finished updating files to Neo Brutalism theme.');
