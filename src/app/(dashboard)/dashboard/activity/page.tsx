"use client";

import { useEffect, useCallback } from "react";
import { useAtom } from "jotai";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarCheck } from "lucide-react";
import {
  activityAtom,
  loadingActivityAtom,
  searchActivityQueryAtom,
  pageAtom,
  pageSizeAtom,
  sortByAtom,
  sortOrderAtom,
} from "@/app/state/activityState";
import { fetchActivities } from "@/app/lib/services/activityService";
import { ActivityTable } from "@/app/components/activity-management/activity-table";
import { ActivityToolbar } from "@/app/components/activity-management/activity-toolbar";

export default function ActivityManagementPage() {
  const [activities, setActivities] = useAtom(activityAtom);
  const [loading, setLoading] = useAtom(loadingActivityAtom);
  const [searchQuery, setSearchQuery] = useAtom(searchActivityQueryAtom);
  const [page, setPage] = useAtom(pageAtom);
  const [pageSize, setPageSize] = useAtom(pageSizeAtom);
  const [sortBy, setSortBy] = useAtom(sortByAtom);
  const [sortOrder, setSortOrder] = useAtom(sortOrderAtom);

  const loadActivities = useCallback(async () => {
    setLoading(true);
    try {
      const result = await fetchActivities(page, pageSize, sortBy, sortOrder);
      setActivities(result.data);
    } finally {
      setLoading(false);
    }
  }, [page, pageSize, sortBy, sortOrder, setActivities, setLoading]);

  useEffect(() => {
    loadActivities();
  }, [loadActivities]);

  // search filter
  const filteredActivities = activities.filter((act) => {
    const query = searchQuery.toLowerCase();
    return (
      act.activity.toLowerCase().includes(query) ||
      act.location.toLowerCase().includes(query) ||
      act.user?.username?.toLowerCase().includes(query)
    );
  });

  // Toolbar handlers
  const handleSearch = (query: string) => setSearchQuery(query);

  // Sorting handler
  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "ASC" ? "DESC" : "ASC");
    } else {
      setSortBy(field);
      setSortOrder("ASC");
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          <CalendarCheck className="h-8 w-8" />
          Activity Management
        </h1>
      </div>

      {/* Toolbar */}
      <ActivityToolbar
        onSearch={handleSearch}
        pdfData={filteredActivities}
        pdfColumns={[
          { header: "Activity", key: "activity" },
          { header: "Location", key: "location" },
          { header: "User", key: "user.username" },
          { header: "Created At", key: "created_at" },
        ]}
        pdfTitle="Activity Report"
        pdfFileName="activity_report.pdf"
      />

      {/* Activity Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-900">
            <CalendarCheck className="h-5 w-5 " />
            Activity ({filteredActivities.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">Loading activities...</div>
          ) : filteredActivities.length > 0 ? (
            <>
              <ActivityTable
                activities={filteredActivities}
                onSort={handleSort}
                sortBy={sortBy}
                sortOrder={sortOrder}
              />

              {/* Pagination */}
              <div className="flex justify-between items-center mt-4">
                <Button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  Prev
                </Button>
                <span>Page {page}</span>
                <Button onClick={() => setPage((p) => p + 1)}>Next</Button>

                <select
                  value={pageSize}
                  onChange={(e) => setPageSize(Number(e.target.value))}
                  className="ml-4 border rounded p-1"
                >
                  <option value={5}>5 / page</option>
                  <option value={10}>10 / page</option>
                  <option value={20}>20 / page</option>
                </select>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-64">
              <div className="text-gray-500 text-center">
                No activities found
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
