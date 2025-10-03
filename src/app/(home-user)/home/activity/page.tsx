"use client";

import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { activityAtom } from "@/app/state/activityState";
import { fetchActivities } from "@/app/lib/services/activityService";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function ActivityUser() {
  const [activities, setActivities] = useAtom(activityAtom);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const loadActivities = async () => {
      const data = await fetchActivities();
      setActivities(data);
    };
    loadActivities();
  }, [setActivities]);

  const displayedActivities = showAll ? activities : activities.slice(0, 5);

  return (
    <div className="mt-16">
      <h2 className="text-xl font-semibold mb-4 text-gray-900">
        Aktivitas Terakhir
      </h2>

      {displayedActivities.length > 0 ? (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">No</TableHead>
                <TableHead>Aktivitas</TableHead>
                <TableHead>Lokasi</TableHead>
                <TableHead className="text-right">Tanggal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayedActivities.map((act, idx) => (
                <TableRow key={act.id_activity}>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell className="font-medium">{act.activity}</TableCell>
                  <TableCell>{act.location}</TableCell>
                  <TableCell className="text-right text-gray-500">
                    {new Date(act.created_at).toLocaleDateString("id-ID", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <p className="text-gray-500">Belum ada aktivitas</p>
      )}

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
