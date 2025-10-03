import type { User, ApiResponse } from "@/app/state/userState";

const BASE_URL = "/api/user";

// Get all users
export async function fetchUsersService(
  search: string = "",
  page: number = 1,
  pageSize: number = 10,
  sortBy: string = "nama",
  sortOrder: "ASC" | "DESC" = "ASC"
): Promise<ApiResponse> {
  try {
    const q = new URLSearchParams({
      search,
      page: String(page),
      pageSize: String(pageSize),
      sortBy,
      sortOrder,
    });

    const res = await fetch(`${BASE_URL}?${q.toString()}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    const text = await res.text(); // baca text dulu supaya kita bisa log apa pun yang dikembalikan
    let data: any;
    try {
      data = text ? JSON.parse(text) : {};
    } catch {
      data = text;
    }

    if (!res.ok) {
      console.error("fetchUsersService error response:", res.status, data);
      throw new Error(`Failed to fetch users: ${res.status} ${typeof data === "string" ? data : JSON.stringify(data)}`);
    }

    return data as ApiResponse;
  } catch (err) {
    console.error("fetchUsersService thrown error:", err);
    throw err;
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
