"use client";

import { RoleToolbar } from "@/app/components/role-management/role-toolbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, AlertCircle, CalendarCheck } from "lucide-react";

export default function ActivityManagementPage() {
  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <CalendarCheck className="h-8 w-8" /> Role Management
          </h1>
          <p></p>
        </div>
      </div>

      <RoleToolbar
        onAddRole={handleAddRole}
        onSearch={handleSearch}
        onFilterStatus={handleFilterStatus}
        onExport={() => console.log("Exporting...")}
        onImport={() => console.log("Importing...")}
      />

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>
            <CalendarCheck className="h-6 w-6" /> Activity Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">Loading...</div>) : error? (
          <div className="text-center py-8 text-red-500">{error}</div>)
          ) : filtered
        </CardContent>
      </Card>
    </div>
  );
}
