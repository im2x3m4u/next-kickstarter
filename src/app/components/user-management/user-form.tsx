"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User as UserIcon, Shield, CalendarCheck } from "lucide-react";
import { type User } from "@/app/state/userState";
import PasswordInput from "../auth/PasswordInput";

interface UserFormProps {
  user?: User;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (userData: Partial<User>) => void;
  mode: "create" | "edit" | "view";
}

export function UserForm({
  user,
  isOpen,
  onClose,
  onSubmit,
  mode,
}: UserFormProps) {
  const [formData, setFormData] = useState({
    nama: user?.nama || "",
    username: user?.username || "",
    email: user?.email || "",
    no_telepon: user?.no_telepon || "",
    password: "",
    is_aktif: user?.is_aktif ?? 1,
    id_role: user?.id_role || [],
  });

  const [roles, setRoles] = useState<any[]>([]);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const res = await fetch("/api/role");
        const data = await res.json();
        setRoles(data.data || []);
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };
    fetchRoles();
  }, []);

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleRoleChange = (value: string) => {
    const selectedId = parseInt(value);
    setFormData((prev) => ({ ...prev, id_role: [selectedId] }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const getTitle = () => {
    switch (mode) {
      case "create":
        return "Add New User";
      case "edit":
        return "Edit User";
      case "view":
        return "User Details";
      default:
        return "User";
    }
  };

  const getDescription = () => {
    switch (mode) {
      case "create":
        return "Create a new user account in the system.";
      case "edit":
        return "Update user information and permissions.";
      case "view":
        return "View detailed information about this user.";
      default:
        return "";
    }
  };

  const isReadOnly = mode === "view";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white text-gray-900">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserIcon className="h-5 w-5 text-gray-900" />
            {getTitle()}
          </DialogTitle>
          <DialogDescription className="text-gray-700">
            {getDescription()}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card className="bg-white border border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2 text-gray-900">
                <UserIcon className="h-4 w-4" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nama" className="text-gray-900">
                    Full Name *
                  </Label>
                  <Input
                    id="nama"
                    value={formData.nama}
                    onChange={(e) => handleInputChange("nama", e.target.value)}
                    placeholder="Enter full name"
                    className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-500"
                    required
                    disabled={isReadOnly}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-gray-900">
                    Username *
                  </Label>
                  <Input
                    id="username"
                    value={formData.username}
                    onChange={(e) =>
                      handleInputChange("username", e.target.value)
                    }
                    placeholder="Enter username"
                    className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-500"
                    required
                    disabled={isReadOnly}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-900">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="Enter email address"
                    className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-500"
                    required
                    disabled={isReadOnly}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="no_telepon" className="text-gray-900">
                    Phone Number
                  </Label>
                  <Input
                    id="no_telepon"
                    value={formData.no_telepon}
                    onChange={(e) =>
                      handleInputChange("no_telepon", e.target.value)
                    }
                    placeholder="Enter phone number"
                    className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-500"
                    disabled={isReadOnly}
                  />
                </div>
              </div>

              {mode === "create" && (
                // DIUBAH: Menggunakan komponen PasswordInput
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-900">
                    Password *
                  </Label>
                  <PasswordInput
                    id="password"
                    value={formData.password}
                    onChange={(e) =>
                      handleInputChange("password", e.target.value)
                    }
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="role" className="text-gray-900">
                  Role *
                </Label>
                <Select
                  value={formData.id_role[0]?.toString() || ""}
                  onValueChange={handleRoleChange}
                  disabled={isReadOnly}
                >
                  <SelectTrigger className="bg-white border-gray-300">
                    <SelectValue
                      placeholder="Select role"
                      className="text-gray-900"
                    />
                  </SelectTrigger>

                  <SelectContent className="bg-white border border-gray-300 shadow-md text-gray-900">
                    {roles.map((role) => (
                      <SelectItem
                        key={role.id_role}
                        value={role.id_role.toString()}
                        className="text-gray-900 hover:bg-gray-100"
                      >
                        {role.nama_role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2 text-gray-900">
                <Shield className="h-4 w-4" />
                System Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="is_aktif" className="text-gray-900">
                  Status *
                </Label>
                <Select
                  value={formData.is_aktif.toString()}
                  onValueChange={(value) =>
                    handleInputChange("is_aktif", parseInt(value))
                  }
                  disabled={isReadOnly}
                >
                  <SelectTrigger className="bg-white border-gray-300 text-gray-900">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-gray-300 shadow-md text-gray-900">
                    <SelectItem value="1">Active</SelectItem>
                    <SelectItem value="0">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {mode === "view" && user && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                  <div className="space-y-2">
                    <Label className="text-gray-900">Created At</Label>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <CalendarCheck className="h-4 w-4" />
                      {new Date(user.created_at).toLocaleDateString("id-ID")}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-900">Updated At</Label>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <CalendarCheck className="h-4 w-4" />
                      {new Date(user.updated_at).toLocaleDateString("id-ID")}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <DialogFooter>
            <Button type="button" variant="outline" className="text-gray bg-white" onClick={onClose}>
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
  );
}