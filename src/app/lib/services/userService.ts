import type { User, ApiResponse } from "@/app/state/userState"

const BASE_URL = "/api/user"

export async function fetchUsersService(): Promise<ApiResponse> {
  const res = await fetch(BASE_URL)
  if (!res.ok) throw new Error("Failed to fetch users")
  return res.json()
}

export async function createUserService(userData: Partial<User>) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  })
  return res.json()
}

export async function updateUserService(userId: string, userData: Partial<User>) {
  const res = await fetch(`${BASE_URL}/${userId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  })
  return res.json()
}

export async function deleteUserService(userId: string) {
  const res = await fetch(`${BASE_URL}/${userId}`, { method: "DELETE" })
  return res.json()
}
