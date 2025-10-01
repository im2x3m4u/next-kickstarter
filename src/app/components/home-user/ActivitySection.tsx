"use client";

import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { activityAtom } from "@/app/state/activityState";
import { fetchActivities } from "@/app/lib/services/activityService";
import { Button } from "@/components/ui/button";

export default function ActivitySection() {
  const [activities, setActivities] = useAtom(activityAtom);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const loadActivities = async () => {
      const data = await fetchActivities();
      setActivities(data);
    };
    loadActivities();
  }, [setActivities]);

  // kalau showAll true → tampil semua
  // kalau false → slice 5 aktivitas terbaru
  const displayedActivities = showAll ? activities : activities.slice(0, 5);

  return (
    <div className="mt-16">
      <h2 className="text-xl font-semibold mb-4 text-gray-900">
        Aktivitas Terakhir
      </h2>

      <div className="space-y-4">
        {displayedActivities.length > 0 ? (
          displayedActivities.map((act) => (
            <div
              key={act.id_activity}
              className="p-4 rounded-lg border border-gray-200 shadow-sm bg-white"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{act.activity}</p>
                  <p className="text-sm text-gray-500">{act.location}</p>
                </div>
                <span className="text-sm text-gray-400">
                  {new Date(act.created_at).toLocaleDateString("id-ID", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">Belum ada aktivitas</p>
        )}
      </div>

      {activities.length > 5 && (
        <div className="mt-6 flex justify-end">
          <Button
            onClick={() => setShowAll(!showAll)}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            {showAll ? "Tutup detail" : "Lihat detail"}
          </Button>
        </div>
      )}
    </div>
  );
}
