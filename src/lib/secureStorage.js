import CryptoJS from 'crypto-js';

// Prefer an env-provided key so deploys can rotate it without a rebuild bundle
// containing the literal secret in plain text. We still fall back to a constant
// so local dev without .env keeps working; rotating the env var invalidates any
// existing ciphertext and forces the getItem fallback path.
const SECRET_KEY =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SECRET_KEY) ||
  'arrel-longevity-secret-key-v1';

const encrypt = (data) => {
  try {
    return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
  } catch (e) {
    console.error('Encryption Error', e);
    return null;
  }
};

const decrypt = (ciphertext) => {
  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(originalText);
  } catch (e) {
    // Fallback for non-encrypted legacy data or errors
    // Suppress warning for expected "empty" or "malformed" during init
    if (e.message !== 'Malformed UTF-8 data') {
      console.warn('Decryption failed for key, trying raw fallback.', e);
    }
    return null;
  }
};

export const secureStorage = {
  setItem: (key, value) => {
    const encrypted = encrypt(value);
    if (encrypted) {
      localStorage.setItem(key, encrypted);
    }
  },
  getItem: (key) => {
    const item = localStorage.getItem(key);
    if (!item) return null;

    // Try decrypting
    const decrypted = decrypt(item);
    if (decrypted !== null) return decrypted;

    // If decryption fails (maybe old unencrypted data), return raw if possible or null
    // Logic: if JSON.parse fails implies it might be encrypted but key wrong,
    // or just a raw string. For safety in transition:
    try {
      return JSON.parse(item);
    } catch {
      // If it can't be parsed as JSON, and failed decryption, it's likely corrupted or encrypted with wrong key.
      // Safest option: return null and clear it to prevent app crash loop.
      console.warn(`removing corrupted/unreadable item: ${key}`);
      localStorage.removeItem(key);
      return null;
    }
  },
  removeItem: (key) => {
    localStorage.removeItem(key);
  },
  clear: () => {
    localStorage.clear();
  },
};
