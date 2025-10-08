"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
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
import type { User } from "@/app/state/userState";

interface Role {
  id_role: string;
  nama_role: string;
}

interface UserFormProps {
  user?: User | null;
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
  const getInitialFormData = () => ({
    nama: "",
    username: "",
    email: "",
    no_telepon: "",
    password: "",
    is_aktif: 1,
    id_role: [] as string[],
  });

  const [formData, setFormData] = useState(getInitialFormData());
  const [roles, setRoles] = useState<Role[]>([]);
  const isReadOnly = mode === "view";
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if ((mode === "edit" || mode === "view") && user) {
        const roleId = user.userRoles?.[0]?.role?.id_role;
        setFormData({
          nama: user.nama || "",
          username: user.username || "",
          email: user.email || "",
          no_telepon: user.no_telepon || "",
          password: "",
          is_aktif: user.is_aktif ?? 1,
          id_role: roleId ? [roleId] : [],
        });
      } else {
        setFormData(getInitialFormData());
      }
    }
  }, [isOpen, user, mode]);

  useEffect(() => {
    if (isOpen) {
      const fetchRoles = async () => {
        try {
          const res = await fetch("/api/role");
          const result = await res.json();
          if (result.ok && Array.isArray(result.data)) {
            setRoles(result.data);
          } else {
            setRoles([]);
          }
        } catch (error) {
          console.error("Error fetching roles:", error);
        }
      };
      fetchRoles();
    }
  }, [isOpen]);

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleRoleChange = (value: string) => {
    setFormData((prev) => ({ ...prev, id_role: [value] }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const submissionData: Partial<User> = { ...formData };
    // Jangan kirim password kosong saat edit
    if (mode === "edit" && !formData.password) {
      delete (submissionData as any).password;
    }
    onSubmit(submissionData);
  };

  const getTitle = () => {
    if (mode === "create") return "Add New User";
    if (mode === "edit") return "Edit User";
    return "User Details";
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white text-gray-900">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserIcon className="h-5 w-5 text-gray-900" />
            {getTitle()}
          </DialogTitle>
          <DialogDescription className="text-gray-700">
            {mode === "create"
              ? "Create a new user account."
              : "View or edit user details."}
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
                    disabled={isReadOnly || mode === "edit"}
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

              {mode !== "view" && (
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-900">
                    Password {mode === "create" ? "*" : "(Opsional)"}
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) =>
                        handleInputChange("password", e.target.value)
                      }
                      placeholder={
                        mode === "create"
                          ? "Enter password"
                          : "Kosongkan jika tidak ingin diubah"
                      }
                      className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-500 pr-10"
                      required={mode === "create"}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="role" className="text-gray-900">
                  Role *
                </Label>
                <Select
                  value={formData.id_role[0] || ""}
                  onValueChange={handleRoleChange}
                  disabled={isReadOnly}
                >
                  <SelectTrigger className="bg-white border-gray-300">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    {roles.map((role) => (
                      <SelectItem key={role.id_role} value={role.id_role}>
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

              {mode !== "create" && user && (
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
            <Button
              type="button"
              variant="outline"
              className="text-gray bg-white"
              onClick={onClose}
            >
              {mode === "view" ? "Close" : "Cancel"}
            </Button>
            {mode !== "view" && (
              <Button type="submit" className="bg-[#AD49E1] hover:bg-[#9328d0] hover:text-white transition-colors">
                {mode === "create" ? "Create User" : "Update User"}
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
