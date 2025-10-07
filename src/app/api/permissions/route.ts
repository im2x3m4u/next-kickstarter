// import { NextResponse } from "next/server";
// import { getAuthSession } from "@/function/authPermission";
// import { getAllEntities } from "@/function/entityHelp";
// import { Permission } from "@/entities/permission";

// export async function GET() {
//   const session = await getAuthSession();
//   if (!session || !session.user.roles.includes("admin")) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   const permissions = await getAllEntities(Permission, 1, 100, "nama_permission", "ASC");
//   return NextResponse.json(permissions.data);
// }
import { NextResponse } from "next/server";
import { getAuthSession } from "@/function/authPermission";
import { getAllEntities } from "@/function/entityHelp";
import { Permission } from "@/entities/permission";
import { logActivity } from "@/function/activityHelp";

export async function GET(req: Request) {
  const session = await getAuthSession();
  if (!session || !session.user.roles.includes("admin")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const permissions = await getAllEntities(Permission, 1, 100, "nama_permission", "ASC");

    try {
      await logActivity(session.user.id_user, "Melihat Daftar Permission", req);
    } catch (err) {
      console.error("logActivity GET error:", err);
    }

    return NextResponse.json(permissions.data);
  } catch (error) {
    console.error("GET permissions error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
