// src/function/validateUser.ts

export function validateEmail(email?: string): string | null {
  if (!email) return "Email harus diisi";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return "Email tidak valid";
  return null; 
}

export function validatePhone(noTelepon?: string): string | null {
  if (!noTelepon) return "Nomor telepon harus diisi";
  if (!/^\d{9,15}$/.test(noTelepon)) return "Nomor telepon tidak valid";
  return null;
}

//gabungan
export function validateUserData(data: {
  email?: string;
  no_telepon?: string;
}): string[] {
  const errors: string[] = [];

  const emailErr = validateEmail(data.email);
  if (emailErr) errors.push(emailErr);

  const phoneErr = validatePhone(data.no_telepon);
  if (phoneErr) errors.push(phoneErr);

  return errors; 
}
