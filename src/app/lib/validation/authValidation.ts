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
