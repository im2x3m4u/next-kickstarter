"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Download } from "lucide-react";
import DownloadExcel from "@/app/components/DownloadExcel";
import { fetchAllActivities } from "@/app/lib/services/activityService";

interface ActivityToolbarProps {
  onSearch: (query: string) => void;
  sortBy?: string;
  sortOrder?: "ASC" | "DESC";
  username?: string;
}

export function ActivityToolbar({
  onSearch,
  sortBy = "created_at",
  sortOrder = "DESC",
  username,
}: ActivityToolbarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    onSearch(value);
  };

  const handleExportExcel = async () => {
    try {
      setLoading(true);

      // Ambil SEMUA data aktivitas
      const allData = await fetchAllActivities(sortBy, sortOrder, username);

      if (!allData.length) {
        alert("Tidak ada data untuk diekspor");
        return;
      }

      // Definisikan kolom untuk Excel
      const columns = [
        { header: "ID", key: "id_activity" },
        { header: "Nama", key: "user.username" },
        { header: "Aktivitas", key: "activity" },
        { header: "Lokasi", key: "location" },
        { header: "Tanggal", key: "created_at" },
      ];

      await DownloadExcel({
        data: allData,
        columns,
        title: "Data Aktivitas",
        fileName: "activity_report.xlsx",
      });
    } catch (err) {
      console.error("Gagal mengekspor data:", err);
      alert("Terjadi kesalahan saat mengekspor data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="bg-white">
      <CardContent className="p-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* Search */}
          <div className="relative w-full sm:max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search activity..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10 text-gray-400"
            />
          </div>

          {/* Export Button */}
          <div className="flex items-center gap-2">
            <Button
              onClick={handleExportExcel}
              variant="outline"
              className="flex items-center gap-2 bg-[#AD49E1] hover:bg-[#9328d0] hover:text-white transition-colors"
              disabled={loading}
            >
              <Download className="h-4 w-4" />
              {loading ? "Exporting..." : "Export Excel"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
