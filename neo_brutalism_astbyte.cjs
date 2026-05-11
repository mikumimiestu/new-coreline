const fs = require('fs');
const path = require('path');

const targetDirs = [
  '/Users/zakimushthafabillah/account-astbyte/frontend/src/routes'
];

// AstByte Professional Neo-Brutalist Palette
// Blue must be dominant, White as clean base, with minimal accents.
const accentColors = [
  'bg-cyan-300',   // Soft cyan
  'bg-purple-400', // Light purple/lavender
  'bg-yellow-200'  // Subtle pastel yellow
];

let accentIndex = 0;
function getNextAccent() {
  const c = accentColors[accentIndex % accentColors.length];
  accentIndex++;
  return c;
}

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  let originalContent = content;

  // 1. Neo-Brutalism Shadows & Borders
  // Replace all shadows with thick black shadows
  content = content.replace(/shadow-(sm|md|lg|xl|2xl|inner|none|blue-\w+\/\d+|indigo-\w+\/\d+|gray-\w+\/\d+|slate-\w+\/\d+)/g, 'shadow-[6px_6px_0px_0px_#111827]');
  content = content.replace(/shadow\b(?!\-\[)/g, 'shadow-[6px_6px_0px_0px_#111827]');
  content = content.replace(/shadow-\[4px_4px_0px_\#000\]/g, 'shadow-[6px_6px_0px_0px_#111827]');

  // Add thick black borders
  content = content.replace(/border-transparent/g, 'border-gray-900');
  content = content.replace(/border-white(\/\d+)?/g, 'border-gray-900');
  content = content.replace(/border-gray-\d+(\/\d+)?/g, 'border-gray-900');
  content = content.replace(/border-slate-\d+(\/\d+)?/g, 'border-gray-900');
  content = content.replace(/border-blue-\d+(\/\d+)?/g, 'border-gray-900');
  
  // If there's border but no width, make it border-4 or border-2
  content = content.replace(/\bborder\b(?!\-)/g, 'border-4 border-gray-900');

  // Remove rounded corners or make them consistent (rounded-xl)
  content = content.replace(/rounded-(sm|md|lg|2xl|3xl|full)/g, 'rounded-xl');
  content = content.replace(/rounded\b(?!\-)/g, 'rounded-xl');

  // 2. Color Palette Application (AstByte Blue, White, Accents)
  
  // Convert dark/slate backgrounds to White (clean base) or Blue-600 (dominant)
  content = content.replace(/bg-slate-900(\/\d+)?/g, 'bg-blue-600');
  content = content.replace(/bg-slate-800(\/\d+)?/g, 'bg-blue-600');
  content = content.replace(/bg-slate-50\b/g, 'bg-white');
  content = content.replace(/bg-gray-50\b/g, 'bg-white');
  content = content.replace(/bg-\[\#0f172a\]/g, 'bg-blue-600');

  // Apply Accents to specific elements (like buttons, small cards, or existing bright colors)
  // We'll replace existing colorful brutalism classes from previous scripts if they exist
  const oldColors = ['bg-yellow-300', 'bg-pink-300', 'bg-green-300', 'bg-orange-300', 'bg-lime-300', 'bg-teal-300'];
  oldColors.forEach(color => {
      const regex = new RegExp(`\\b${color}\\b`, 'g');
      content = content.replace(regex, () => getNextAccent());
  });

  // Make primary gradients solid blue or accent
  content = content.replace(/bg-gradient-to-\w+\s+from-\w+-\d+\s+to-\w+-\d+/g, 'bg-blue-600');

  // 3. Typography & Text Colors
  // Text inside white/accent backgrounds must be dark
  content = content.replace(/text-slate-\d+/g, 'text-gray-900 font-bold');
  content = content.replace(/text-gray-\d+/g, 'text-gray-900 font-bold');
  
  // Fix text colors for Blue backgrounds (should be white)
  // *This is hard to do perfectly with regex without context, but we ensure text-white stays white*
  content = content.replace(/text-black font-black font-black/g, 'text-gray-900 font-black');
  content = content.replace(/text-black font-bold/g, 'text-gray-900 font-bold');

  // 4. Hover Animations
  content = content.replace(/hover:-translate-y-1 hover:-translate-x-1/g, 'hover:-translate-y-1 hover:-translate-x-1');
  content = content.replace(/hover:shadow-\[[a-z0-9\-\#]+\]/g, 'hover:shadow-[8px_8px_0px_0px_#111827] transition-all');

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content);
    console.log(`Updated ${filePath} to AstByte Professional Neo-Brutalism`);
  }
}

function traverse(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      traverse(fullPath);
    } else if (fullPath.endsWith('.svelte') || fullPath.endsWith('.ts') || fullPath.endsWith('.tsx')) {
      processFile(fullPath);
    }
  }
}

targetDirs.forEach(dir => traverse(dir));
console.log('Finished updating AstByte project to new Neo Brutalism color scheme.');
