  import { atom } from 'jotai'

  // User interface
  export interface User {
    id_user: string
    nama: string
    username: string
    email: string
    no_telepon: string
    is_aktif: number
    reset_token?: string | null
    login_token?: string | null
    created_at: string
    updated_at: string
    userRoles?: { role?: { nama_role: string } }[]
  }


  // API Response interface
  export interface ApiResponse {
    ok: boolean
    pagination?: {
      page: number
      pageSize: number
      total: number
      totalPages: number
    }
    data: User[]
  }

  // Base atoms
  export const usersAtom = atom<User[]>([])
  export const filteredUsersAtom = atom<User[]>([])
  export const loadingAtom = atom<boolean>(false)
  export const errorAtom = atom<string | null>(null)

  // Form state atoms
  export const isFormOpenAtom = atom<boolean>(false)
  export const formModeAtom = atom<"create" | "edit" | "view">("create")
  export const selectedUserAtom = atom<User | null>(null)

  // Delete dialog atoms
  export const deleteDialogOpenAtom = atom<boolean>(false)
  export const userToDeleteAtom = atom<string | null>(null)

  // Search and filter atoms
  export const searchQueryAtom = atom<string>("")
  export const roleFilterAtom = atom<string>("all")
  export const statusFilterAtom = atom<string>("all")

  // Derived atoms
  export const statsAtom = atom((get) => {
    const users = get(usersAtom) ?? []
    const total = users.length
    const active = users.filter(user => user.is_aktif === 1).length
    const inactive = users.filter(user => user.is_aktif === 0).length
    return { total, active, inactive }
  })


  // Action atoms for API calls
  export const fetchUsersAtom = atom(
    null,
    async (get, set) => {
      try {
        set(loadingAtom, true)
        
        const response = await fetch('/api/user')
        const data: ApiResponse = await response.json()
        
        if (data.ok) {
          set(usersAtom, data.data)
          set(filteredUsersAtom, data.data)
        }
      } catch (err) {
        console.error('Error fetching users:', err)
      } finally {
        set(loadingAtom, false)
      }
    }
  )

  // Helper functions for API calls
  export const fetchUsers = async () => {
    try {
      const response = await fetch('/api/user')
      const data: ApiResponse = await response.json()
      return data
    } catch (err) {
      console.error('Error fetching users:', err)
      throw err
    }
  }

  export const createUser = async (userData: Partial<User>) => {
    try {
      const response = await fetch('/api/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      })
      return await response.json()
    } catch (error) {
      console.error('Error creating user:', error)
      throw error
    }
  }

  export const updateUser = async (userId: string, userData: Partial<User>) => {
    try {
      const response = await fetch(`/api/user/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      })
      return await response.json()
    } catch (error) {
      console.error('Error updating user:', error)
      throw error
    }
  }

  export const deleteUser = async (userId: string) => {
    try {
      const response = await fetch(`/api/user/${userId}`, {
        method: 'DELETE'
      })
      return await response.json()
    } catch (error) {
      console.error('Error deleting user:', error)
      throw error
    }
  }