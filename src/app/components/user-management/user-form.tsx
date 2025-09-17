"use client"

import { useState, useEffect } from "react"
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
  User, 
  Mail, 
  Phone, 
  Shield, 
  Calendar,
  MapPin,
  Building
} from "lucide-react"

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

interface UserFormProps {
  user?: User
  isOpen: boolean
  onClose: () => void
  onSubmit: (userData: Partial<User>) => void
  mode: "create" | "edit" | "view"
}

export function UserForm({ user, isOpen, onClose, onSubmit, mode }: UserFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "employee",
    status: "active" as const,
    phone: "",
    department: "",
    position: "",
    location: ""
  })

  useEffect(() => {
    if (user && mode !== "create") {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        role: user.role || "employee",
        status: user.status || "active",
        phone: user.phone || "",
        department: user.department || "",
        position: user.position || "",
        location: user.location || ""
      })
    } else {
      setFormData({
        name: "",
        email: "",
        role: "employee",
        status: "active",
        phone: "",
        department: "",
        position: "",
        location: ""
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
            <User className="h-5 w-5" />
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
                <User className="h-4 w-4" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Enter full name"
                    required
                    disabled={isReadOnly}
                  />
                </div>
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
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="Enter phone number"
                    disabled={isReadOnly}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    placeholder="Enter location"
                    disabled={isReadOnly}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Work Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Building className="h-4 w-4" />
                Work Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Input
                    id="department"
                    value={formData.department}
                    onChange={(e) => handleInputChange("department", e.target.value)}
                    placeholder="Enter department"
                    disabled={isReadOnly}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="position">Position</Label>
                  <Input
                    id="position"
                    value={formData.position}
                    onChange={(e) => handleInputChange("position", e.target.value)}
                    placeholder="Enter position"
                    disabled={isReadOnly}
                  />
                </div>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      <SelectItem value="admin" className="text-gray-900 hover:bg-gray-50 focus:bg-gray-50">Admin</SelectItem>
                      <SelectItem value="manager" className="text-gray-900 hover:bg-gray-50 focus:bg-gray-50">Manager</SelectItem>
                      <SelectItem value="employee" className="text-gray-900 hover:bg-gray-50 focus:bg-gray-50">Employee</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status *</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => handleInputChange("status", value)}
                    disabled={isReadOnly}
                  >
                    <SelectTrigger className="bg-white border-gray-200 text-gray-900">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-gray-200 shadow-lg">
                      <SelectItem value="active" className="text-gray-900 hover:bg-gray-50 focus:bg-gray-50">Active</SelectItem>
                      <SelectItem value="inactive" className="text-gray-900 hover:bg-gray-50 focus:bg-gray-50">Inactive</SelectItem>
                      <SelectItem value="pending" className="text-gray-900 hover:bg-gray-50 focus:bg-gray-50">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {mode === "view" && user && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                  <div className="space-y-2">
                    <Label>Created At</Label>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4" />
                      {new Date(user.createdAt).toLocaleDateString("id-ID")}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Last Login</Label>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4" />
                      {new Date(user.lastLogin).toLocaleDateString("id-ID")}
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
