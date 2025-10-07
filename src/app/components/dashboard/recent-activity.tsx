"use client";

import React, { useState } from "react";
import { DashboardActivity } from "@/app/state/dashboardState";

interface RecentActivityProps {
  activities: DashboardActivity[];
  defaultPageSize?: number; // opsional, default 10
}

export function RecentActivity({
  activities,
  defaultPageSize = 10,
}: RecentActivityProps) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize);

  // urutkan semua activity berdasarkan waktu descending
  const sortedActivities = [...activities].sort(
    (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
  );

  const totalPages = Math.ceil(sortedActivities.length / pageSize);

  // ambil data untuk halaman saat ini
  const currentActivities = sortedActivities.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
  };

  return (
    <div className="bg-white shadow rounded-lg p-4">
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 rounded-lg">
          <thead className="">
            <tr>
              {["No", "User", "Action", "Time"].map((header) => (
                <th
                  key={header}
                  className="px-4 py-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {currentActivities.map((activity, idx) => (
              <tr
                key={activity.id}
                className="hover:bg-gray-50 transition-colors duration-150"
              >
                <td className="px-4 py-3 text-sm text-gray-700">
                  {(page - 1) * pageSize + idx + 1}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  {activity.user}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  {activity.action}
                </td>
                <td className="px-4 py-3 text-sm text-gray-500">
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
            {currentActivities.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="px-4 py-4 text-center text-sm text-gray-400"
                >
                  No recent activities
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-2">
        <div className="flex gap-2">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            className="px-3 py-1 bg-[#AD49E1] text-white rounded hover:bg-[#9d3bd2] disabled:opacity-50"
          >
            Prev
          </button>
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
            className="px-3 py-1 bg-[#AD49E1] text-white rounded hover:bg-[#9d3bd2] disabled:opacity-50"
          >
            Next
          </button>
        </div>

        <div className="text-gray-600 text-sm">
          Page {page} of {totalPages} | Total Activities: {activities.length}
        </div>
      </div>
    </div>
  );
}
