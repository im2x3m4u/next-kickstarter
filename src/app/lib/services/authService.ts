//LOGIN
export async function loginService(username: string, password: string) {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Login gagal!");
  }

  return data;
}

//REGISTER
export async function registerService(
  username: string,
  password: string,
  nama: string,
  email: string,
  telp: string,
  role: "user" | "admin"
) {
  const response = await fetch("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password, nama, email, telp, role }),
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Registrasi gagal!");
  }
  return data;
}

// FORGOT PASSWORD
export async function requestPasswordReset(email: string) {
  const res = await fetch("/api/auth/requestPassword", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Gagal mengirim link reset password");
  }

  return data;
}

// RESET PASSWORD
export async function resetPassword(token: string, newPassword: string) {
  const res = await fetch("/api/auth/resetPassword", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token, newPassword }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Gagal mengubah password.");
  }

  return data;
}

// VERIFY RESET TOKEN
export async function verifyResetToken(token: string) {
  const res = await fetch("/api/auth/verifyResetToken", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token }),
  });

  return res.json();
}
