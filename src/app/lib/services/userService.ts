import type { User, ApiResponse } from "@/app/state/userState";

const BASE_URL = "/api/user";

// Get all users
export async function fetchUsersService(): Promise<ApiResponse> {
  try {
    const res = await fetch(BASE_URL, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Fetch failed:", res.status, errorText);
      throw new Error(`Failed to fetch users: ${res.status} ${errorText}`);
    }

    return res.json();
  } catch (err) {
    console.error("fetchUsersService error:", err);
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
