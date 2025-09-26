// Validasi form login
export function validateLogin(username: string, password: string) {
  if (!username || !password) {
    return "Username atau password tidak boleh kosong!";
  }
  if (username.length < 3) {
    return "Username minimal 3 karakter!";
  }
  if (password.length < 6) {
    return "Password minimal 6 karakter!";
  }
  return null;
}

// Validasi form reset password
export function validateResetPassword(
  password: string,
  confirm: string,
  token: string
): string | null {
  if (!token) return "Token tidak valid atau tidak ditemukan!";

  if (!password) return "Password baru wajib diisi.";
  if (password.length < 6) return "Password minimal 6 karakter.";

  if (!confirm) return "Konfirmasi password wajib diisi.";
  if (password !== confirm) return "Password dan konfirmasi tidak sama.";

  return null;
}

// Validasi form register
export function validateRegister(
  username: string,
  email: string,
  telp: string,
  password: string,
  confirm: string
): string | null {
  if (!username) return "Username wajib diisi!";
  if (username.length < 3) return "Username minimal 3 karakter.";

  // Email regex sederhana
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) return "Email wajib diisi!";
  if (!emailRegex.test(email)) return "Format email tidak valid!";

  // No telp hanya angka
  const telpRegex = /^[0-9]+$/;
  if (!telp) return "Nomor telepon wajib diisi!";
  if (!telpRegex.test(telp)) return "Nomor telepon hanya boleh angka!";
  if (telp.length < 10) return "Nomor telepon minimal 10 digit!";

  // Password rules
  if (!password) return "Password wajib diisi!";
  if (password.length < 6) return "Password minimal 6 karakter!";

  if (!confirm) return "Konfirmasi password wajib diisi!";
  if (password !== confirm) return "Password dan konfirmasi tidak sama!";

  return null;
}
