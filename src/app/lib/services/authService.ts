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
  nama: string,
  username: string,
  password: string,
  email: string,
  no_telepon: string,
  role: "user" | "admin"
) {
  const roleMap: Record<string, string> = {
    admin: "5c9d73a8-91d4-11f0-bcb7-586c25927655",
    user: "6389951b-d5eb-4554-8caa-3580f5656dec",
  };

  console.log("Mencoba registrasi user:", username, email); // LOG sebelum request

  const response = await fetch("/api/user/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username,
      password,
      nama,
      email,
      no_telepon,
      is_aktif: 1,
      id_role: roleMap[role],
    }),
  });

  let data: any;
  try {
    data = await response.json();
  } catch {
    const text = await response.text();
    data = { message: text };
  }

  if (!response.ok) {
    const message = (data.error || data.message || "").toString().toLowerCase();
    const isConflict = response.status === 409;
    const looksDuplicate =
      message.includes("already exists") ||
      message.includes("duplicate") ||
      message.includes("unique") ||
      message.includes("sudah terdaftar") ||
      message.includes("sudah ada");

    if (isConflict || looksDuplicate) {
      console.log("Registrasi gagal: Username atau email sudah terdaftar"); // LOG gagal
      throw new Error("Username atau email sudah terdaftar!");
    }

    console.log("Registrasi gagal:", data.error || data.message); // LOG gagal lain
    throw new Error(data.error || data.message || "Registrasi gagal!");
  }

  console.log("Registrasi berhasil:", data); // LOG berhasil
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
