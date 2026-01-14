// src/utils/encoding.ts

const SALT = 'astbyte2026';

export const encodeId = (id: string): string | null => {
  try {
    const combined = `${SALT}:${id}:${Date.now()}`;
    const encoded = btoa(combined);
    
    return encoded
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
  } catch (error) {
    console.error('Encoding error:', error);
    return null;
  }
};

export const decodeId = (encodedId: string): string | null => {
  try {
    let base64 = encodedId
      .replace(/-/g, '+')
      .replace(/_/g, '/');
    
    while (base64.length % 4) {
      base64 += '=';
    }
    
    const decoded = atob(base64);
    const parts = decoded.split(':');
    
    if (parts[0] !== SALT || parts.length !== 3) {
      return null;
    }
    
    return parts[1];
  } catch (error) {
    console.error('Decoding error:', error);
    return null;
  }
};
