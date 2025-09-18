// Utility functions untuk authentication

export interface User {
  id_user: number;
  username: string;
  nama: string;
  email: string;
  no_telepon: string;
  roles: Array<{
    id_userRole: number;
    role_name: string;
  }>;
}

export interface LoginResponse {
  ok: boolean;
  status: number;
  message?: string;
  user?: User;
  token?: string;
}

// Simpan data user dan token ke localStorage
export const saveAuthData = (user: User, token: string) => {
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
};

// Ambil data user dari localStorage
export const getCurrentUser = (): User | null => {
  if (typeof window === "undefined") return null;
  
  const userStr = localStorage.getItem("user");
  if (!userStr) return null;
  
  try {
    return JSON.parse(userStr);
  } catch {
    return null;
  }
};

// Ambil token dari localStorage
export const getToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
};

// Hapus data auth dari localStorage
export const clearAuthData = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

// Cek apakah user sudah login
export const isAuthenticated = (): boolean => {
  return getToken() !== null && getCurrentUser() !== null;
};

// Login function
export const login = async (username: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Login error:", error);
    return {
      ok: false,
      status: 500,
      message: "Terjadi kesalahan saat login",
    };
  }
};
