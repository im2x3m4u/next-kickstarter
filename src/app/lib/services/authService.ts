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
// export async function registerService(
//   nama: string,
//   username: string,
//   password: string,
//   email: string,
//   no_telepon: string,
//   is_aktif: number,
//   role: "user" | "admin"
// ) {
//   // Mapping role ke id_role
//   const roleId = role === "admin" ? 1 : 2;

//   const response = await fetch("/api/auth/register", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       username,
//       password,
//       nama,
//       email,
//       no_telepon,
//       is_aktif,
//       roleId,
//     }),
    
//   });
//   // const data = await response.json();
// const text = await response.text(); // ambil raw response
// let data: any = null;
// try {
//   data = JSON.parse(text); // coba parse jadi JSON
// } catch {
//   data = { message: text }; // kalau gagal parse, pakai plain text
// }
//   if (!response.ok) {
//     throw new Error(data.message || "Registrasi gagal!");
//   }
//   return data;
// }

export async function registerService(
  nama: string,
  username: string,
  password: string,
  email: string,
  no_telepon: string,
  // is_aktif: number,
  role: "user" | "admin"
) {
  // Mapping role ke id_role
  const roleId = role === "admin" ? 1 : 2;

  const bodyData = {
    username,
    password,
    nama,
    email,
    no_telepon,
    is_aktif: 1,
    roleId,
  };

  // ✅ log sebelum dikirim
  console.log("📤 Data yang dikirim ke backend:", bodyData);

  const response = await fetch("/api/user/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bodyData),
  });

  const text = await response.text();

  // ✅ log isi mentah response
  console.log("📥 Raw response dari backend:", text);

  let data: any = null;
  try {
    data = JSON.parse(text);
  } catch {
    data = { message: text };
  }

  // ✅ log hasil parse JSON
  console.log("📥 Parsed response:", data);

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
