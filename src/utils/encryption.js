// src/utils/encryption.js
import CryptoJS from 'crypto-js';

const SECRET_KEY = import.meta.env.VITE_ENCRYPT_KEY || 'your-secret-key-123';

export const encryptId = (id) => {
  const encrypted = CryptoJS.AES.encrypt(id.toString(), SECRET_KEY);
  // Bikin URL-safe
  return encrypted.toString()
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
};

export const decryptId = (encryptedId) => {
  try {
    // Balikin dari URL-safe
    let encrypted = encryptedId
      .replace(/-/g, '+')
      .replace(/_/g, '/');
    
    const decrypted = CryptoJS.AES.decrypt(encrypted, SECRET_KEY);
    return decrypted.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    return null;
  }
};
