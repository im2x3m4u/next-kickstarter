"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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
  Shield, 
  Settings, 
  Users,
  Calendar,
  Check,
  X
} from "lucide-react"

interface Role {
  id: string
  name: string
  description: string
  permissions: string[]
  userCount: number
  createdAt: string
  isDefault: boolean
}

interface RoleFormProps {
  role?: Role
  isOpen: boolean
  onClose: () => void
  onSubmit: (roleData: Partial<Role>) => void
  mode: "create" | "edit" | "view"
}

const availablePermissions = [
  { id: "user.read", name: "View Users", category: "User Management" },
  { id: "user.create", name: "Create Users", category: "User Management" },
  { id: "user.update", name: "Edit Users", category: "User Management" },
  { id: "user.delete", name: "Delete Users", category: "User Management" },
  { id: "role.read", name: "View Roles", category: "Role Management" },
  { id: "role.create", name: "Create Roles", category: "Role Management" },
  { id: "role.update", name: "Edit Roles", category: "Role Management" },
  { id: "role.delete", name: "Delete Roles", category: "Role Management" },
  { id: "dashboard.read", name: "View Dashboard", category: "Dashboard" },
  { id: "reports.read", name: "View Reports", category: "Reports" },
  { id: "reports.create", name: "Create Reports", category: "Reports" },
  { id: "settings.read", name: "View Settings", category: "Settings" },
  { id: "settings.update", name: "Edit Settings", category: "Settings" }
]

export function RoleForm({ role, isOpen, onClose, onSubmit, mode }: RoleFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    permissions: [] as string[]
  })

  useEffect(() => {
    if (role && mode !== "create") {
      setFormData({
        name: role.name || "",
        description: role.description || "",
        permissions: role.permissions || []
      })
    } else {
      setFormData({
        name: "",
        description: "",
        permissions: []
      })
    }
  }, [role, mode])

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

  const handlePermissionToggle = (permissionId: string) => {
    setFormData(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permissionId)
        ? prev.permissions.filter(p => p !== permissionId)
        : [...prev.permissions, permissionId]
    }))
  }

  const getTitle = () => {
    switch (mode) {
      case "create": return "Create New Role"
      case "edit": return "Edit Role"
      case "view": return "Role Details"
      default: return "Role"
    }
  }

  const getDescription = () => {
    switch (mode) {
      case "create": return "Create a new role with specific permissions."
      case "edit": return "Update role information and permissions."
      case "view": return "View detailed information about this role."
      default: return ""
    }
  }

  const isReadOnly = mode === "view"

  // Group permissions by category
  const groupedPermissions = availablePermissions.reduce((acc, permission) => {
    if (!acc[permission.category]) {
      acc[permission.category] = []
    }
    acc[permission.category].push(permission)
    return acc
  }, {} as Record<string, typeof availablePermissions>)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
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
                <Shield className="h-4 w-4" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Role Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Enter role name"
                  required
                  disabled={isReadOnly}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Enter role description"
                  required
                  disabled={isReadOnly}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Permissions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Permissions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(groupedPermissions).map(([category, permissions]) => (
                <div key={category} className="space-y-3">
                  <h4 className="font-medium text-gray-900">{category}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {permissions.map((permission) => (
                      <div
                        key={permission.id}
                        className={`flex items-center space-x-2 p-2 rounded border cursor-pointer transition-colors ${
                          formData.permissions.includes(permission.id)
                            ? "bg-blue-50 border-blue-200"
                            : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                        } ${isReadOnly ? "cursor-not-allowed" : ""}`}
                        onClick={() => !isReadOnly && handlePermissionToggle(permission.id)}
                      >
                        <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                          formData.permissions.includes(permission.id)
                            ? "bg-blue-500 border-blue-500"
                            : "border-gray-300"
                        }`}>
                          {formData.permissions.includes(permission.id) && (
                            <Check className="w-3 h-3 text-white" />
                          )}
                        </div>
                        <span className="text-sm">{permission.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              
              {formData.permissions.length > 0 && (
                <div className="pt-4 border-t">
                  <div className="flex flex-wrap gap-2">
                    <span className="text-sm font-medium text-gray-700">Selected permissions:</span>
                    {formData.permissions.map((permissionId) => {
                      const permission = availablePermissions.find(p => p.id === permissionId)
                      return (
                        <Badge key={permissionId} variant="secondary" className="text-xs">
                          {permission?.name}
                        </Badge>
                      )
                    })}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Role Information (View Mode) */}
          {mode === "view" && role && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Role Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Users with this role</Label>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Users className="h-4 w-4" />
                      {role.userCount} users
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Created At</Label>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4" />
                      {new Date(role.createdAt).toLocaleDateString("id-ID")}
                    </div>
                  </div>
                </div>
                
                {role.isDefault && (
                  <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                    <Shield className="h-4 w-4 text-blue-500" />
                    <span className="text-sm text-blue-700 font-medium">
                      This is a default system role and cannot be deleted
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              {mode === "view" ? "Close" : "Cancel"}
            </Button>
            {mode !== "view" && (
              <Button type="submit">
                {mode === "create" ? "Create Role" : "Update Role"}
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
