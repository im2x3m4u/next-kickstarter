"use client";

import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import {
  allPermissionsAtom,
  permissionsLoadingAtom,
  Permission,
} from "@/app/state/permissionState";
import {
  fetchAllPermissions,
  fetchRolePermissions,
  updateRolePermissions,
} from "@/app/lib/services/permissionService";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

interface PermissionManagerProps {
  roleId: string;
  roleName: string;
  onSuccess?: () => void; // callback opsional
}

export default function PermissionManager({
  roleId,
  roleName,
  onSuccess,
}: PermissionManagerProps) {
  const [allPermissions, setAllPermissions] = useAtom(allPermissionsAtom);
  const [loading, setLoading] = useAtom(permissionsLoadingAtom);
  const [selectedPermissions, setSelectedPermissions] = useState<
    Set<string>
  >(new Set());

  // Fetch data permissions
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [allPerms, rolePerms] = await Promise.all([
          fetchAllPermissions(),
          fetchRolePermissions(roleId),
        ]);

        setAllPermissions(allPerms);
        setSelectedPermissions(
          new Set(rolePerms.map((p: Permission) => p.id_permission))
        );
      } catch (error) {
        console.error("Gagal memuat data permission:", error);
        toast.error("Gagal memuat data permission.");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [roleId, setAllPermissions, setLoading]);

  const handleToggle = (permissionId: string, checked: boolean) => {
    setSelectedPermissions((prev) => {
      const updated = new Set(prev);
      checked ? updated.add(permissionId) : updated.delete(permissionId);
      return updated;
    });
  };

  const handleSave = async () => {
    try {
      await updateRolePermissions(roleId, Array.from(selectedPermissions));
      toast.success("Permission berhasil diperbarui!");

      // Panggil callback kalau disediakan
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Gagal menyimpan perubahan:", error);
      toast.error("Gagal menyimpan perubahan.");
    }
  };

  if (loading) return <div>Loading permissions...</div>;

  return (
    <div className="space-y-6">
      <div className="space-y-4 rounded-md border border-gray-200 p-4">
        {allPermissions.map((permission) => {
          const switchId = `permission-${permission.id_permission}`;
          return (
            <div
              key={permission.id_permission}
              className="flex items-center justify-between"
            >
              <label htmlFor={switchId} className="cursor-pointer">
                <p className="font-medium text-gray-800">
                  {permission.nama_permission}
                </p>
                <p className="text-sm text-gray-500">
                  {permission.deskripsi}
                </p>
              </label>
              <Switch
                id={switchId}
                checked={selectedPermissions.has(permission.id_permission)}
                onCheckedChange={(checked) =>
                  handleToggle(permission.id_permission, checked)
                }
                disabled={roleName.toLowerCase() === "admin"}
              />
            </div>
          );
        })}
      </div>

      <Button
        onClick={handleSave}
        disabled={roleName.toLowerCase() === "admin"}
        className="bg-[#AD49E1] text-white hover:bg-[#9B40D9] active:bg-[#7A1FC7] transition-all shadow-sm hover:shadow-md"
      >
        Simpan Perubahan
      </Button>
    </div>
  );
}
