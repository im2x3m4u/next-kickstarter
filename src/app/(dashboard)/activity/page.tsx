"use client";

import { useEffect } from "react";
import { useAtom } from "jotai";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { activityAtom, loadingActivityAtom, searchActivityQueryAtom } from "@/app/state/activityState";
import { fetchActivities } from "@/app/lib/services/activityService";
import { ActivityTable } from "@/app/components/activity-management/activity-table";
import { ActivityToolbar } from "@/app/components/activity-management/activity-toolbar";

export default function ActivityManagementPage() {
  const userId = "5e513b0c-165b-4367-b51f-1ac869b2f42d";
  const [activities, setActivities] = useAtom(activityAtom);
  const [loading, setLoading] = useAtom(loadingActivityAtom);
  const [searchQuery, setSearchQuery] = useAtom(searchActivityQueryAtom);

  useEffect(() => {
    const loadActivities = async () => {
      setLoading(true);
      try {
        const data = await fetchActivities();
        setActivities(data);
      } finally {
        setLoading(false);
      }
    };

    loadActivities();
  }, [ setActivities, setLoading]);

  // Filter activities
  const filteredActivities = activities.filter(
    (act) =>
      act.activity.toLowerCase().includes(searchQuery.toLowerCase()) ||
      act.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      act.user.nama.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Toolbar handlers
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleExport = () => {
    console.log("Exporting activities...");
    // bisa bikin generate CSV di sini
  };

  const handleImport = () => {
    console.log("Importing activities...");
    // bisa buka modal upload file di sini
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          <Calendar className="h-8 w-8" />
          Activity Management
        </h1>
      </div>

      {/* Toolbar */}
      <ActivityToolbar
        onSearch={handleSearch}
        onExport={handleExport}
        onImport={handleImport}
      />

      {/* Activity Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Activity ({filteredActivities.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
              <p className="text-gray-500">Loading activities...</p>
            </div>
          ) : filteredActivities.length > 0 ? (
            <ActivityTable activities={filteredActivities} />
          ) : (
            <div className="text-center py-8 text-gray-500">
              No activities found.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
