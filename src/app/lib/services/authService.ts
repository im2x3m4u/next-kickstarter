// Token CSRF
const getCsrfToken = async () => {
  const res = await fetch("/api/auth/csrf");
  const data = await res.json();
  return data.csrfToken;
};

//LOGIN
export async function loginService(username: string, password: string) {
  const csrfToken = await getCsrfToken();
  const response = await fetch("/api/auth/callback/credentials", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-Token": csrfToken,
    },
    credentials: "include",
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
  no_telepon: string
) {
  const response = await fetch("/api/user/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username,
      password,
      nama,
      email,
      no_telepon,
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
      console.log("Registrasi gagal: Username atau email sudah terdaftar");
      throw new Error("Username atau email sudah terdaftar!");
    }

    console.log("Registrasi gagal:", data.error || data.message);
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

// LOGOUT
export async function logoutService() {
  try {
    const csrfToken = await getCsrfToken(); // ambil CSRF sebelum logout
    const res = await fetch("/api/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": csrfToken,
      },
      credentials: "include", // untuk cookie session ikut terkirim
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.message || "Logout gagal!");
    }

    console.log("Logout berhasil");
    return true;
  } catch (err) {
    console.error("Logout gagal:", err);
    throw err;
  }
}
