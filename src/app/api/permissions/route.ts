
import { NextResponse } from "next/server";
import { getAuthSession } from "@/function/authPermission";
import { getAllEntities } from "@/function/entityHelp";
import { Permission } from "@/entities/permission";
import { withProtection } from "@/function/authHelp";

export const GET = withProtection(
  async (req, session, params) => {
    const permissions = await getAllEntities(
      Permission,
      1,
      100,
      "nama_permission",
      "ASC"
    );
    return NextResponse.json(permissions.data);
  },
  {
    requiredRoles: ["admin"],
    activity: "Melihat Daftar Permission",
  }
);
