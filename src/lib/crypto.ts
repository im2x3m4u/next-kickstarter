// src/lib/crypto.ts
import CryptoJS from "crypto-js";

// Prefer PASSWORD_SECRET, fallback to SECRET_KEY
const SECRET_KEY = (process.env.PASSWORD_SECRET as string)
  || (process.env.SECRET_KEY as string)
  || "dev_secret_key";

export function encryptPassword(plain: string): string {
  return CryptoJS.AES.encrypt(plain, SECRET_KEY).toString();
}

export function decryptPassword(cipher: string): string {
  const bytes = CryptoJS.AES.decrypt(cipher, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
}

export function verifyPassword(plain: string, cipher: string): boolean {
  try {
    const dec = decryptPassword(cipher);
    return dec === plain;
  } catch {
    return false;
  }
}

