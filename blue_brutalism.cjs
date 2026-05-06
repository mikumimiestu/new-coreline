const fs = require('fs');
const path = require('path');

const targetDirs = [
  path.join(__dirname, 'src', 'pages'),
  path.join(__dirname, 'src', 'components')
];

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  let originalContent = content;

  // 1. Convert all shadows to hard blue-900 shadows (#1e3a8a)
  content = content.replace(/shadow-(sm|md|lg|xl|2xl|inner|none|blue-\w+(\/\d+)?|indigo-\w+(\/\d+)?|gray-\w+(\/\d+)?|slate-\w+(\/\d+)?)/g, 'shadow-[4px_4px_0px_#1e3a8a]');
  content = content.replace(/shadow\b(?!\-\[)(?=[ "'}])/g, 'shadow-[4px_4px_0px_#1e3a8a]');

  // 2. Add thick dark blue borders (border-blue-900)
  content = content.replace(/border-transparent/g, 'border-blue-900');
  content = content.replace(/border-white(\/\d+)?/g, 'border-blue-900');
  content = content.replace(/border-(gray|slate|blue|indigo)-\d+(\/\d+)?/g, 'border-blue-900');

  // Replace naked "border" with "border-2 border-blue-900" 
  // (?![-:]) prevents matching border-x or border:
  // (?=[ "'}]) ensures it's likely inside a string
  content = content.replace(/\bborder\b(?![-:])(?=[ "'}])/g, 'border-2 border-blue-900');

  // 3. Remove rounded corners to make it flat (Brutalism)
  content = content.replace(/rounded-(sm|md|lg|xl|2xl|3xl|full)/g, 'rounded-none');
  content = content.replace(/rounded\b(?!\-)(?=[ "'}])/g, 'rounded-none');

  // 4. Backgrounds to dominant blue
  // Change neutral backgrounds to soft sky blue
  content = content.replace(/\bbg-slate-50\b/g, 'bg-sky-50');
  content = content.replace(/\bbg-gray-50\b/g, 'bg-sky-50');
  content = content.replace(/\bbg-slate-100\b/g, 'bg-sky-100');
  content = content.replace(/\bbg-gray-100\b/g, 'bg-sky-100');

  // Replace all gradients with solid vibrant blue
  content = content.replace(/bg-gradient-to-\w+\s+from-\w+-\d+\s+to-\w+-\d+/g, 'bg-blue-600 border-2 border-blue-900 shadow-[4px_4px_0px_#1e3a8a] text-white hover:bg-blue-700 hover:shadow-[6px_6px_0px_#1e3a8a] hover:-translate-y-1 transition-all');

  // Any text slate/gray should be turned to blue-950 for better integration
  content = content.replace(/text-slate-[6789]00/g, 'text-blue-950 font-bold');
  content = content.replace(/text-gray-[6789]00/g, 'text-blue-950 font-bold');
  
  // Make headings extra bold and dark blue
  content = content.replace(/text-slate-900/g, 'text-blue-950 font-black');
  content = content.replace(/text-gray-900/g, 'text-blue-950 font-black');

  // Add hover animations for existing buttons that didn't have gradient
  content = content.replace(/hover:shadow-[a-z0-9\-]+/g, 'hover:shadow-[6px_6px_0px_#1e3a8a] hover:-translate-y-1 hover:-translate-x-1 transition-all');

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
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      processFile(fullPath);
    }
  }
}

targetDirs.forEach(dir => traverse(dir));
console.log('Finished updating files to DOMINANT BLUE Neo Brutalism theme.');
