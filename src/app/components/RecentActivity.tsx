"use client";

import React from "react";
import { DashboardActivity } from "@/app/state/dashboardState";

interface RecentActivityProps {
  activities: DashboardActivity[];
}

export function RecentActivity({ activities }: RecentActivityProps) {
  // ambil 100 aktivitas terakhir dan urutkan berdasarkan waktu descending
  const recentActivities = [...activities]
    .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
    .slice(0, 100);

  return (
    <div className="overflow-x-auto bg-white shadow rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              No
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              User
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Action
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Time
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {recentActivities.map((activity, idx) => (
            <tr key={activity.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {idx + 1}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {activity.user}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {activity.action}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(activity.time).toLocaleString("id-ID", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })}
              </td>
            </tr>
          ))}
          {recentActivities.length === 0 && (
            <tr>
              <td
                colSpan={4}
                className="px-6 py-4 text-center text-sm text-gray-500"
              >
                No recent activities
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
