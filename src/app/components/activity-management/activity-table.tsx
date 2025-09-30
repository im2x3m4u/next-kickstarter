import React from "react";
import { Activity } from "@/app/state/activityState";
import {
  Table,
  TableBody,
  TableCaption,
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
      <TableCaption>Activity Management</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">No</TableHead>
          <TableHead>User</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>No Telepon</TableHead>
          <TableHead>Activity</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Updated At</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {activities.map((activity, index) => (
          <TableRow key={activity.id_activity}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{activity.user.nama}</TableCell>
            <TableCell>{activity.user.email}</TableCell>
            <TableCell>{activity.user.no_telepon}</TableCell>
            <TableCell>{activity.activity}</TableCell>
            <TableCell>{activity.location}</TableCell>
            <TableCell>
              {new Date(activity.created_at).toLocaleString("id-ID", {
                dateStyle: "short",
                timeStyle: "short",
              })}
            </TableCell>
            <TableCell>
              {activity.user.updated_at
                ? new Date(activity.user.updated_at).toLocaleString("id-ID", {
                    dateStyle: "short",
                    timeStyle: "short",
                  })
                : "-"}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
