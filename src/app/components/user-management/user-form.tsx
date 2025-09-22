"use client"

import { useState, useEffect } from "react"
import { useAtomValue } from "jotai"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  User as UserIcon, 
  Mail, 
  Phone, 
  Shield, 
  Calendar,
  MapPin,
  Building
} from "lucide-react"
import { type User } from "@/app/state/userState"
import { selectedUserAtom, formModeAtom, isFormOpenAtom } from "@/app/state/userState"

interface UserFormProps {
  user?: User
  isOpen: boolean
  onClose: () => void
  onSubmit: (userData: Partial<User>) => void
  mode: "create" | "edit" | "view"
}

export function UserForm({ user, isOpen, onClose, onSubmit, mode }: UserFormProps) {
  const [formData, setFormData] = useState({
    nama: "",
    username: "",
    email: "",
    no_telepon: "",
    password: "",
    is_aktif: 1,
    role: "user"
  })

  useEffect(() => {
    if (user && mode !== "create") {
      // Get role from user.userRoles array
      const userRole = user.userRoles && user.userRoles.length > 0 && user.userRoles[0]?.role?.nama_role ? user.userRoles[0].role.nama_role : "user"
      setFormData({
        nama: user.nama || "",
        username: user.username || "",
        email: user.email || "",
        no_telepon: user.no_telepon || "",
        password: "",
        is_aktif: user.is_aktif || 1,
        role: userRole
      })
    } else {
      setFormData({
        nama: "",
        username: "",
        email: "",
        no_telepon: "",
        password: "",
        is_aktif: 1,
        role: "user"
      })
    }
  }, [user, mode])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const getTitle = () => {
    switch (mode) {
      case "create": return "Add New User"
      case "edit": return "Edit User"
      case "view": return "User Details"
      default: return "User"
    }
  }

  const getDescription = () => {
    switch (mode) {
      case "create": return "Create a new user account in the system."
      case "edit": return "Update user information and permissions."
      case "view": return "View detailed information about this user."
      default: return ""
    }
  }

  const isReadOnly = mode === "view"

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <UserIcon className="h-5 w-5" />
          {getTitle()}
        </DialogTitle>
          <DialogDescription>
            {getDescription()}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <UserIcon className="h-4 w-4" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nama">Full Name *</Label>
                  <Input
                    id="nama"
                    value={formData.nama}
                    onChange={(e) => handleInputChange("nama", e.target.value)}
                    placeholder="Enter full name"
                    required
                    disabled={isReadOnly}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="username">Username *</Label>
                  <Input
                    id="username"
                    value={formData.username}
                    onChange={(e) => handleInputChange("username", e.target.value)}
                    placeholder="Enter username"
                    required
                    disabled={isReadOnly}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="Enter email address"
                    required
                    disabled={isReadOnly}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="no_telepon">Phone Number</Label>
                  <Input
                    id="no_telepon"
                    value={formData.no_telepon}
                    onChange={(e) => handleInputChange("no_telepon", e.target.value)}
                    placeholder="Enter phone number"
                    disabled={isReadOnly}
                  />
                </div>
              </div>

              {mode === "create" && (
                <div className="space-y-2">
                  <Label htmlFor="password">Password *</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    placeholder="Enter password"
                    required
                    disabled={isReadOnly}
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="role">Role *</Label>
                <Select
                  value={formData.role}
                  onValueChange={(value) => handleInputChange("role", value)}
                  disabled={isReadOnly}
                >
                  <SelectTrigger className="bg-white border-gray-200 text-gray-900">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-gray-200 shadow-lg">
                    <SelectItem value="user" className="text-gray-900 hover:bg-gray-50 focus:bg-gray-50">User</SelectItem>
                    <SelectItem value="admin" className="text-gray-900 hover:bg-gray-50 focus:bg-gray-50">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>


          {/* System Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Shield className="h-4 w-4" />
                System Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="is_aktif">Status *</Label>
                <Select
                  value={formData.is_aktif.toString()}
                  onValueChange={(value) => handleInputChange("is_aktif", parseInt(value))}
                  disabled={isReadOnly}
                >
                  <SelectTrigger className="bg-white border-gray-200 text-gray-900">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-gray-200 shadow-lg">
                    <SelectItem value="1" className="text-gray-900 hover:bg-gray-50 focus:bg-gray-50">Active</SelectItem>
                    <SelectItem value="0" className="text-gray-900 hover:bg-gray-50 focus:bg-gray-50">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {mode === "view" && user && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                  <div className="space-y-2">
                    <Label>Created At</Label>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4" />
                      {new Date(user.created_at).toLocaleDateString("id-ID")}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Updated At</Label>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4" />
                      {new Date(user.updated_at).toLocaleDateString("id-ID")}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              {mode === "view" ? "Close" : "Cancel"}
            </Button>
            {mode !== "view" && (
              <Button type="submit">
                {mode === "create" ? "Create User" : "Update User"}
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
