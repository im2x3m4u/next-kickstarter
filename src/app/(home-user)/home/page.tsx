"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function HomeUser() {
  const lastActivities = [
    {
      id: 1,
      title: "Mengikuti Pelatihan React",
      date: "30 September 2025",
      status: "Selesai 50%",
    },
    {
      id: 2,
      title: "Upload Tugas UI/UX",
      date: "28 September 2025",
      status: "Selesai",
    },
    {
      id: 3,
      title: "Mendaftar Pelatihan Database",
      date: "25 September 2025",
      status: "Menunggu Persetujuan",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Welcome */}
      <h1 className="text-2xl font-bold mb-6">
        Selamat Datang, <span className="text-blue-400">Shela 👋</span>
      </h1>

      {/* Last Activity */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle>Aktivitas Terakhir</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {lastActivities.map((activity) => (
              <li
                key={activity.id}
                className="p-4 rounded-lg bg-gray-700 flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold">{activity.title}</p>
                  <p className="text-sm text-gray-300">{activity.date}</p>
                </div>
                <span className="text-sm text-blue-400">{activity.status}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <div className="mt-6">
        <Button className="bg-blue-600 hover:bg-blue-700">Lihat Semua Aktivitas</Button>
      </div>
    </div>
  );
}
