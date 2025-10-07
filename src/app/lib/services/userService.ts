import type { User, ApiResponse } from "@/app/state/userState";

export interface UsersApiResponse {
  ok: boolean;
  data: User[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

const BASE_URL = "/api/user";

// Get all users dengan parameter filter
export async function fetchUsersService(
  search: string = "",
  page: number = 1,
  pageSize: number = 10,
  sortBy: string = "nama",
  sortOrder: "ASC" | "DESC" = "ASC",
  role: string = "all",
  status: string = "all"
): Promise<UsersApiResponse> {
  try {
    const q = new URLSearchParams({
      search,
      page: String(page),
      pageSize: String(pageSize),
      sortBy,
      sortOrder,
      role,      // Tambahkan filter role
      status,    // Tambahkan filter status
    });

    const res = await fetch(`${BASE_URL}?${q.toString()}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (!res.ok) {
        const errorData = await res.json().catch(() => ({ message: 'Failed to fetch users' }));
        throw new Error(errorData.message || `Error: ${res.status}`);
    }

    return res.json();
  } catch (err) {
    console.error("fetchUsersService error:", err);
    // Return struktur data yang konsisten saat error
    return { ok: false, data: [], pagination: { total: 0, page: 1, pageSize: 10, totalPages: 0 } };
  }
}

// Create user
export async function createUserService(
  userData: Partial<User>
): Promise<ApiResponse> {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  if (!res.ok) throw new Error("Failed to create user");
  return res.json();
}

// Update user
export async function updateUserService(
  userId: string,
  userData: Partial<User>
): Promise<ApiResponse> {
  const res = await fetch(`${BASE_URL}/${userId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  if (!res.ok) throw new Error("Failed to update user");
  return res.json();
}

// Delete user
export async function deleteUserService(userId: string): Promise<ApiResponse> {
  const res = await fetch(`${BASE_URL}/${userId}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete user");
  return res.json();
}
