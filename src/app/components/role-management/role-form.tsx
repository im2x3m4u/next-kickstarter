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
import { 
  Shield, 
  Settings, 
  Calendar,
} from "lucide-react"
import { Role } from "@/app/state/roleState"

interface RoleFormProps {
  role?: Role
  isOpen: boolean
  onClose: () => void
  onSubmit: (roleData: Partial<Role>) => void
  mode: "create" | "edit" | "view"
}

export function RoleForm({ role, isOpen, onClose, onSubmit, mode }: RoleFormProps) {
  const [formData, setFormData] = useState({
    nama_role: "",
    is_aktif: 1
  })

  useEffect(() => {
    if (role && mode !== "create") {
      setFormData({
        nama_role: role.nama_role || "",
        is_aktif: role.is_aktif || 1
      })
    } else {
      setFormData({
        nama_role: "",
        is_aktif: 1
      })
    }
  }, [role, mode])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const getTitle = () => {
    switch (mode) {
      case "create": return "Add New Role"
      case "edit": return "Edit Role"
      case "view": return "Role Details"
      default: return "Role"
    }
  }

  const getDescription = () => {
    switch (mode) {
      case "create": return "Create a new role in the system."
      case "edit": return "Update role information and permissions."
      case "view": return "View detailed information about this role."
      default: return ""
    }
  }

  const isReadOnly = mode === "view"

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
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
                <Label htmlFor="nama_role">Role Name *</Label>
                <Input
                  id="nama_role"
                  value={formData.nama_role}
                  onChange={(e) => handleInputChange("nama_role", e.target.value)}
                  placeholder="Enter role name"
                  required
                  disabled={isReadOnly}
                />
              </div>
              
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
            </CardContent>
          </Card>

          {/* System Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Settings className="h-4 w-4" />
                System Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {mode === "view" && role && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                  <div className="space-y-2">
                    <Label>Created At</Label>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4" />
                      {new Date(role.created_at).toLocaleDateString("id-ID")}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Updated At</Label>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4" />
                      {new Date(role.updated_at).toLocaleDateString("id-ID")}
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
                {mode === "create" ? "Create Role" : "Update Role"}
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}