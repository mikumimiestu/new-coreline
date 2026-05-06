import { pipeline } from '@xenova/transformers';
import fs from 'fs';
import path from 'path';

/**
 * SCRIPT: FULL PROJECT SCANNER (S-BERT)
 * Script ini memindai seluruh folder src/ untuk mencari file .ts dan .tsx,
 * lalu melakukan embedding pada isinya agar AI bisa memahami seluruh website.
 */

const DATA_DIR = './src';
const OUTPUT_FILE = './src/data/vectorIndex.json';

// Fungsi rekursif untuk mencari semua file .ts dan .tsx
function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);
  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      if (file.endsWith(".ts") || file.endsWith(".tsx")) {
        if (!file.includes('vectorIndex.json')) {
          arrayOfFiles.push(path.join(dirPath, "/", file));
        }
      }
    }
  });

  return arrayOfFiles;
}

async function generate() {
  console.log("🚀 Memulai Full Project Scanning (S-BERT)...");
  
  const extractor = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
  const allFiles = getAllFiles(DATA_DIR);
  
  const vectorIndex = [];

  for (const filePath of allFiles) {
    console.log(`🔍 Membaca file: ${filePath}`);
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // Bersihkan kode dari simbol-simbol aneh agar lebih mudah dibaca AI
    const cleanContent = content
      .replace(/import[\s\S]+?;/g, '') // Buang imports
      .replace(/export[\s\S]+?from/g, '') // Buang exports
      .replace(/<[^>]+>/g, ' ') // Buang tag HTML/JSX
      .replace(/\{[^}]+\}/g, ' ') // Buang JS expressions dalam JSX
      .substring(0, 2000); // Ambil 2000 karakter awal sebagai konteks

    if (cleanContent.trim().length < 50) continue;

    console.log(`   📄 Embedding content dari ${path.basename(filePath)}...`);
    const output = await extractor(cleanContent, { pooling: 'mean', normalize: true });
    
    vectorIndex.push({
      title: `File: ${path.basename(filePath)}`,
      path: filePath,
      content: cleanContent,
      vector: Array.from(output.data)
    });
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(vectorIndex, null, 2));
  console.log(`\n✅ Selesai! Lyra sekarang sudah membaca ${vectorIndex.length} file.`);
}

generate().catch(console.error);
