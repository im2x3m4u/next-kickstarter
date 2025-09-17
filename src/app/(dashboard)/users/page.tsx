"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/app/components/user-management/data-table"
import { UserForm } from "@/app/components/user-management/user-form"
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

interface User {
  id: string
  name: string
  email: string
  role: string
  status: "active" | "inactive" | "pending"
  lastLogin: string
  createdAt: string
  avatar?: string
  phone?: string
  department?: string
  position?: string
  location?: string
}

// Mock data
const mockUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@company.com",
    role: "admin",
    status: "active",
    lastLogin: "2024-01-15",
    createdAt: "2023-06-15",
    phone: "+62 812-3456-7890",
    department: "IT",
    position: "System Administrator",
    location: "Jakarta"
  },
  {
    id: "2", 
    name: "Jane Smith",
    email: "jane.smith@company.com",
    role: "manager",
    status: "active",
    lastLogin: "2024-01-14",
    createdAt: "2023-07-20",
    phone: "+62 813-4567-8901",
    department: "HR",
    position: "HR Manager",
    location: "Surabaya"
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike.johnson@company.com", 
    role: "employee",
    status: "active",
    lastLogin: "2024-01-13",
    createdAt: "2023-08-10",
    phone: "+62 814-5678-9012",
    department: "Marketing",
    position: "Marketing Specialist",
    location: "Bandung"
  },
  {
    id: "4",
    name: "Sarah Wilson",
    email: "sarah.wilson@company.com",
    role: "employee", 
    status: "inactive",
    lastLogin: "2023-12-20",
    createdAt: "2023-09-05",
    phone: "+62 815-6789-0123",
    department: "Finance",
    position: "Accountant",
    location: "Medan"
  },
  {
    id: "5",
    name: "David Brown",
    email: "david.brown@company.com",
    role: "manager",
    status: "pending",
    lastLogin: "2024-01-10",
    createdAt: "2024-01-01",
    phone: "+62 816-7890-1234",
    department: "Operations",
    position: "Operations Manager", 
    location: "Yogyakarta"
  }
]

export default function UserManagementPage() {
  const [users, setUsers] = useState<User[]>(mockUsers)
  const [filteredUsers, setFilteredUsers] = useState<User[]>(mockUsers)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [formMode, setFormMode] = useState<"create" | "edit" | "view">("create")
  const [selectedUser, setSelectedUser] = useState<User | undefined>()
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [userToDelete, setUserToDelete] = useState<string | null>(null)

  // Filter and search logic
  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setFilteredUsers(users)
      return
    }
    
    const filtered = users.filter(user =>
      user.name.toLowerCase().includes(query.toLowerCase()) ||
      user.email.toLowerCase().includes(query.toLowerCase()) ||
      user.department?.toLowerCase().includes(query.toLowerCase()) ||
      user.position?.toLowerCase().includes(query.toLowerCase())
    )
    setFilteredUsers(filtered)
  }

  const handleFilterRole = (role: string) => {
    if (role === "all") {
      setFilteredUsers(users)
      return
    }
    
    const filtered = users.filter(user => user.role === role)
    setFilteredUsers(filtered)
  }

  const handleFilterStatus = (status: string) => {
    if (status === "all") {
      setFilteredUsers(users)
      return
    }
    
    const filtered = users.filter(user => user.status === status)
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

  const confirmDelete = () => {
    if (userToDelete) {
      setUsers(prev => prev.filter(user => user.id !== userToDelete))
      setFilteredUsers(prev => prev.filter(user => user.id !== userToDelete))
      setUserToDelete(null)
      setDeleteDialogOpen(false)
    }
  }

  const handleFormSubmit = (userData: Partial<User>) => {
    if (formMode === "create") {
      const newUser: User = {
        id: Date.now().toString(),
        name: userData.name || "",
        email: userData.email || "",
        role: userData.role || "employee",
        status: userData.status || "active",
        lastLogin: new Date().toISOString().split('T')[0],
        createdAt: new Date().toISOString().split('T')[0],
        phone: userData.phone || "",
        department: userData.department || "",
        position: userData.position || "",
        location: userData.location || ""
      }
      setUsers(prev => [...prev, newUser])
      setFilteredUsers(prev => [...prev, newUser])
    } else if (formMode === "edit" && selectedUser) {
      const updatedUser = { ...selectedUser, ...userData }
      setUsers(prev => prev.map(user => user.id === selectedUser.id ? updatedUser : user))
      setFilteredUsers(prev => prev.map(user => user.id === selectedUser.id ? updatedUser : user))
    }
    setIsFormOpen(false)
  }

  const handleExport = () => {
    // Implement export functionality
    console.log("Exporting users...")
  }

  const handleImport = () => {
    // Implement import functionality
    console.log("Importing users...")
  }

  // Calculate stats
  const stats = useMemo(() => {
    const total = users.length
    const active = users.filter(user => user.status === "active").length
    const inactive = users.filter(user => user.status === "inactive").length
    return { total, active, inactive }
  }, [users])

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
          {filteredUsers.length > 0 ? (
            <DataTable
              users={filteredUsers}
              onEdit={handleEditUser}
              onDelete={handleDeleteUser}
              onView={handleViewUser}
            />
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
      <UserForm
        user={selectedUser}
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        mode={formMode}
      />

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
