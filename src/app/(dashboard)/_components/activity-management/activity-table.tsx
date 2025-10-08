import React from "react";
import { Activity } from "@/app/state/activityState";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ActivityProps {
  activities: Activity[];
}

export function ActivityTable({ activities }: ActivityProps) {
  return (
    <Table className="bg-white">
      <TableHeader>
        <TableRow>
          <TableHead className="font-semibold text-gray-900">No</TableHead>
          <TableHead className="font-semibold text-gray-900">User</TableHead>
          <TableHead className="font-semibold text-gray-900">Email</TableHead>
          <TableHead className="font-semibold text-gray-900">
            No Telepon
          </TableHead>
          <TableHead className="font-semibold text-gray-900">
            Activity
          </TableHead>
          <TableHead className="font-semibold text-gray-900">
            Location
          </TableHead>
          <TableHead className="font-semibold text-gray-900">
            Created At
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {activities.map((activity, index) => (
          <TableRow key={activity.id_activity} className="hover:bg-gray-50">
            <TableCell className="text-gray-700">{index + 1}</TableCell>
            <TableCell className="text-gray-700">
              {activity.user.username}
            </TableCell>
            <TableCell className="text-gray-700">
              {activity.user.email}
            </TableCell>
            <TableCell className="text-gray-700">
              {activity.user.no_telepon}
            </TableCell>
            <TableCell className="text-gray-700">{activity.activity}</TableCell>
            <TableCell className="text-gray-700 max-w-[200px] truncate hover:whitespace-normal hover:overflow-visible group relative">
              <span className="block truncate group-hover:whitespace-normal group-hover:bg-white group-hover:p-2 group-hover:shadow-md group-hover:absolute group-hover:z-10 group-hover:-left-2 group-hover:-top-2">
                {activity.location || "-"}
              </span>
            </TableCell>
            <TableCell className="text-gray-700">
              {new Date(activity.created_at).toLocaleString("id-ID", {
                dateStyle: "short",
                timeStyle: "short",
              })}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
