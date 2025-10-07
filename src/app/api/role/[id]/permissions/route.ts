import { NextResponse } from "next/server";
import { getAuthSession } from "@/function/authPermission";
import { getConnection } from "@/lib/typeorm";
import { RolePermission } from "@/entities/rolePermission";
import { logActivity } from "@/function/activityHelp";
import { withProtection } from "@/function/authHelp";

// GET permissions for a specific role
export async function GET(req: Request, { params }: { params: { id: string } }) {
    const session = await getAuthSession();
    if (!session || !session.user.roles.includes("admin")) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const ds = await getConnection();
    const rolePermissionRepo = ds.getRepository(RolePermission);
    const permissions = await rolePermissionRepo.find({
        where: { role: { id_role: params.id } },
        relations: ["permission"],
    });
    try {
    await logActivity(session.user.id_user, "Melihat Data", req);
  } catch (err) {
    console.error("logActivity POST error:", err);
  }
    return NextResponse.json(permissions.map(p => p.permission));
}

// UPDATE permissions for a specific role
// export async function PUT(req: Request, { params }: { params: { id: string } }) {
//     const session = await getAuthSession();
//     if (!session || !session.user.roles.includes("admin")) {
//         return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const { permissionIds } = await req.json();
//     const ds = await getConnection();
//     const rolePermissionRepo = ds.getRepository(RolePermission);

//     // Hapus semua permission lama untuk role ini
//     await rolePermissionRepo.delete({ role: { id_role: params.id } });

//     // Buat data baru untuk disimpan
//     const newPermissions = permissionIds.map((pid: string) => ({
//         role: { id_role: params.id },
//         permission: { id_permission: pid },
//     }));

//     // Simpan semua permission baru dalam satu transaksi
//     if (newPermissions.length > 0) {
//         await rolePermissionRepo.save(newPermissions);
//     }
//     try {
//     await logActivity(session.user.id_user, "Mengubah", req);
//   } catch (err) {
//     console.error("logActivity POST error:", err);
//   }

//     return NextResponse.json({ message: "Permissions updated successfully" });
// }

export const PUT = withProtection(
  async (req, session, params) => {
    const { id } = params;
    const { permissionIds } = await req.json();

    // Validasi input sederhana
    if (!Array.isArray(permissionIds)) {
      return NextResponse.json(
        { message: "Invalid input: permissionIds harus berupa array" },
        { status: 400 }
      );
    }

    const ds = await getConnection();
    const rolePermissionRepo = ds.getRepository(RolePermission);

    // Hapus permission lama
    await rolePermissionRepo.delete({ role: { id_role: id } });

    // Buat permission baru
    const newPermissions = permissionIds.map((pid: string) => ({
      role: { id_role: id },
      permission: { id_permission: pid },
    }));

    // Simpan jika ada data baru
    if (newPermissions.length > 0) {
      await rolePermissionRepo.save(newPermissions);
    }

    return NextResponse.json({
      message: "Permissions updated successfully",
    });
  },
  {
    requiredRoles: ["admin"],
    activity: "Mengubah Role Permission",
  }

);


