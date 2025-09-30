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
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="cursor-pointer hover:bg-gray-50 text-gray-900 font-semibold">
            No
          </TableHead>
          <TableHead className="cursor-pointer hover:bg-gray-50 text-gray-900 font-semibold">
            User
          </TableHead>
          <TableHead className="cursor-pointer hover:bg-gray-50 text-gray-900 font-semibold">
            Email
          </TableHead>
          <TableHead className="cursor-pointer hover:bg-gray-50 text-gray-900 font-semibold">
            No Telepon
          </TableHead>
          <TableHead className="cursor-pointer hover:bg-gray-50 text-gray-900 font-semibold">
            Activity
          </TableHead>
          <TableHead className="cursor-pointer hover:bg-gray-50 text-gray-900 font-semibold">
            Location
          </TableHead>
          <TableHead className="cursor-pointer hover:bg-gray-50 text-gray-900 font-semibold">
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
            <TableCell className="text-gray-700">{activity.location}</TableCell>
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
