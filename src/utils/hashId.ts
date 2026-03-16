// src/utils/hashId.ts

// Mengubah "ts-01" menjadi "74732d3031"
export const encodeId = (str: string): string => {
  if (!str) return '';
  return Array.from(str)
    .map(c => c.charCodeAt(0).toString(16).padStart(2, '0'))
    .join('');
};

// Mengubah kembali "74732d3031" menjadi "ts-01"
export const decodeId = (hex: string): string => {
  if (!hex) return '';
  let str = '';
  for (let i = 0; i < hex.length; i += 2) {
    str += String.fromCharCode(parseInt(hex.substring(i, i + 2), 16));
  }
  return str;
};