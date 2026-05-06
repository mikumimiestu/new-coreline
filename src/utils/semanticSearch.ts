import { pipeline } from '@xenova/transformers';

/**
 * UTILITY: SEMANTIC SEARCH (S-BERT)
 * Digunakan untuk mencari materi yang paling relevan dengan pertanyaan user.
 * Ini adalah inti dari penelitian "Peningkatan Akurasi AI menggunakan S-BERT".
 */

let extractor: any = null;

// Load model S-BERT (Xenova/all-MiniLM-L6-v2 adalah model yang sangat ringan & akurat)
async function getExtractor() {
  if (!extractor) {
    extractor = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
  }
  return extractor;
}

/**
 * Menghitung Cosine Similarity antara dua vector
 */
function cosineSimilarity(vecA: number[], vecB: number[]): number {
  let dotProduct = 0;
  let mA = 0;
  let mB = 0;
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    mA += vecA[i] * vecA[i];
    mB += vecB[i] * vecB[i];
  }
  return dotProduct / (Math.sqrt(mA) * Math.sqrt(mB));
}

/**
 * Fungsi Utama: Mencari konteks materi yang paling relevan
 */
export async function getRelevantContext(query: string): Promise<string> {
  try {
    const extract = await getExtractor();
    
    // 1. Ubah query user menjadi Vector Embedding
    const output = await extract(query, { pooling: 'mean', normalize: true });
    const queryVector = Array.from(output.data) as number[];

    // 2. Load Vector Index (Database materi yang sudah di-embed)
    // Mencoba import data secara dinamis
    let vectorData: any[] = [];
    try {
      // @ts-ignore
      const data = await import('../data/vectorIndex.json');
      vectorData = data.default || data;
    } catch (e) {
      console.warn("Vector index belum digenerate. Jalankan script embedding dulu.");
      return "";
    }

    // 3. Hitung skor kemiripan untuk setiap materi
    const results = vectorData.map(item => ({
      ...item,
      score: cosineSimilarity(queryVector, item.vector)
    }));

    // 4. Urutkan dari yang paling mirip (skor tertinggi)
    results.sort((a, b) => b.score - a.score);

    // 5. Ambil Top 5 materi teratas (Threshold diturunkan agar lebih sensitif)
    const topContexts = results.slice(0, 5).filter(r => r.score > 0.3); 
    
    if (topContexts.length === 0) return "";

    return topContexts.map(r => `[SUMBER: ${r.title}]\n${r.content}`).join("\n\n---\n\n");
  } catch (error) {
    console.error("Semantic search failed:", error);
    return "";
  }
}
