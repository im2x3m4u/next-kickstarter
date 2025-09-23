"use client"

import { useEffect, useState, Suspense } from "react"
import dynamic from "next/dynamic"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Toolbar } from "@/app/components/user-management/toolbar"
import { 
  Users, 
  UserPlus, 
  Download, 
  Upload,
  AlertCircle
} from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { User } from "@/app/state/userState"

// Lazy load heavy components
const DataTable = dynamic(() => import("@/app/components/user-management/data-table").then(mod => ({ default: mod.DataTable })), {
  loading: () => <div className="animate-pulse bg-gray-200 h-64 rounded-lg" />
})

const UserForm = dynamic(() => import("@/app/components/user-management/user-form").then(mod => ({ default: mod.UserForm })), {
  loading: () => <div className="animate-pulse bg-gray-200 h-96 rounded-lg" />
})

export default function UserManagementPage() {
  // State management with useState (simplified approach)
  const [users, setUsers] = useState<User[]>([])
  const [filteredUsers, setFilteredUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [formMode, setFormMode] = useState<"create" | "edit" | "view">("create")
  const [selectedUser, setSelectedUser] = useState<User | undefined>()
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [userToDelete, setUserToDelete] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  // Calculate stats
  const stats = {
    total: users.length,
    active: users.filter(user => user.is_aktif === 1).length,
    inactive: users.filter(user => user.is_aktif === 0).length
  }

  // Load users from API
  const loadUsers = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch('/api/user')
      const data = await response.json()
      
      if (data.ok) {
        setUsers(data.users)
        setFilteredUsers(data.users)
      } else {
        setError('Failed to fetch users')
      }
    } catch (err) {
      setError('Error loading users')
      console.error('Error fetching users:', err)
    } finally {
      setLoading(false)
    }
  }

  // Load users on component mount
  useEffect(() => {
    loadUsers()
  }, [])

  // Filter and search logic
  const handleSearch = (query: string) => {
    setSearchQuery(query)
    filterUsers(query, roleFilter, statusFilter)
  }

  const handleFilterRole = (role: string) => {
    setRoleFilter(role)
    filterUsers(searchQuery, role, statusFilter)
  }

  const handleFilterStatus = (status: string) => {
    setStatusFilter(status)
    filterUsers(searchQuery, roleFilter, status)
  }

  const filterUsers = (searchQuery: string, roleFilter: string, statusFilter: string) => {
    let filtered = users
    
    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(user =>
        user.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.no_telepon.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
    
    // Apply role filter
    if (roleFilter !== "all") {
      filtered = filtered.filter(user => {
        if (roleFilter === "admin") {
          return user.userRoles?.some(ur => ur.role?.nama_role === "admin")
        } else if (roleFilter === "user") {
          return !user.userRoles || user.userRoles.length === 0 || !user.userRoles[0]?.role?.nama_role
        }
        return true
      })
    }
    
    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter(user => {
        if (statusFilter === "active") return user.is_aktif === 1
        if (statusFilter === "inactive") return user.is_aktif === 0
        return true
      })
    }
    
    setFilteredUsers(filtered)
  }

  // CRUD operations
  const handleAddUser = () => {
    setSelectedUser(undefined)
    setFormMode("create")
    setIsFormOpen(true)
  }

  const handleEditUser = (user: User) => {
    setSelectedUser(user)
    setFormMode("edit")
    setIsFormOpen(true)
  }

  const handleViewUser = (user: User) => {
    setSelectedUser(user)
    setFormMode("view")
    setIsFormOpen(true)
  }

  const handleDeleteUser = (userId: string) => {
    setUserToDelete(userId)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = async () => {
    if (userToDelete) {
      try {
        const response = await fetch(`/api/user/${userToDelete}`, {
          method: 'DELETE'
        })
        const result = await response.json()
        if (result.ok) {
          loadUsers() // Refresh the list
        }
      } catch (error) {
        console.error('Error deleting user:', error)
      }
      setUserToDelete(null)
      setDeleteDialogOpen(false)
    }
  }

  const handleFormSubmit = async (userData: Partial<User>) => {
    try {
      if (formMode === "create") {
        const response = await fetch('/api/user', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userData)
        })
        const result = await response.json()
        if (result.ok) {
          loadUsers() // Refresh the list
        }
      } else if (formMode === "edit" && selectedUser) {
        const response = await fetch(`/api/user/${selectedUser.id_user}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userData)
        })
        const result = await response.json()
        if (result.ok) {
          loadUsers() // Refresh the list
        }
      }
      setIsFormOpen(false)
    } catch (error) {
      console.error('Error saving user:', error)
    }
  }

  const handleExport = () => {
    // Implement export functionality
    console.log("Exporting users...")
  }

  const handleImport = () => {
    // Implement import functionality
    console.log("Importing users...")
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Users className="h-8 w-8" />
            User Management
          </h1>
          <p className="text-gray-600 mt-1">
            Manage user accounts, roles, and permissions
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExport} className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button variant="outline" onClick={handleImport} className="flex items-center gap-2">
            <Upload className="h-4 w-4" />
            Import
          </Button>
        </div>
      </div>

      {/* Toolbar and Stats */}
      <Toolbar
        onAddUser={handleAddUser}
        onSearch={handleSearch}
        onFilterRole={handleFilterRole}
        onFilterStatus={handleFilterStatus}
        onExport={handleExport}
        onImport={handleImport}
        totalUsers={stats.total}
        activeUsers={stats.active}
        inactiveUsers={stats.inactive}
      />

      {/* Data Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-900">
            <Users className="h-5 w-5" />
            Users ({filteredUsers.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
              <p className="text-gray-500">Loading users...</p>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Error loading users</h3>
              <p className="text-gray-500 mb-4">{error}</p>
              <Button onClick={loadUsers} className="flex items-center gap-2">
                Try Again
              </Button>
            </div>
          ) : filteredUsers.length > 0 ? (
            <Suspense fallback={<div className="animate-pulse bg-gray-200 h-64 rounded-lg" />}>
              <DataTable
                users={filteredUsers}
                onEdit={handleEditUser}
                onDelete={handleDeleteUser}
                onView={handleViewUser}
              />
            </Suspense>
          ) : (
            <div className="text-center py-8">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
              <p className="text-gray-500 mb-4">
                Try adjusting your search or filter criteria
              </p>
              <Button onClick={handleAddUser} className="flex items-center gap-2">
                <UserPlus className="h-4 w-4" />
                Add First User
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* User Form Modal */}
      <Suspense fallback={<div className="animate-pulse bg-gray-200 h-96 rounded-lg" />}>
        <UserForm
          user={selectedUser}
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onSubmit={handleFormSubmit}
          mode={formMode}
        />
      </Suspense>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-500" />
              Delete User
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this user? This action cannot be undone.
              The user will be permanently removed from the system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete User
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}