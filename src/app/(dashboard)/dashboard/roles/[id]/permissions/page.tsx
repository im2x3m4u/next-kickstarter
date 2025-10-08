"use client";

import { useParams, useSearchParams, useRouter } from "next/navigation";
import PermissionManager from "../../_components/PermissionManager";

export default function ManagePermissionsPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const roleId = params.id as string;
  const roleName = searchParams.get("name") || "Role";

  if (!roleId) return <div>Role tidak ditemukan.</div>;

  return (
    <div className="min-h-[calc(100vh-6rem)] bg-white rounded-xl shadow-md p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Manage Permissions for{" "}
        <span className="text-indigo-600">{roleName}</span>
      </h1>

      <PermissionManager
        roleId={roleId}
        roleName={roleName}
        onSuccess={() => router.push("/dashboard/roles")}
      />
    </div>
  );
}
