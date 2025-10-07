"use client";

import { useEffect, useCallback } from "react";
import { useAtom } from "jotai";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarCheck } from "lucide-react";
import {
  activityAtom,
  loadingActivityAtom,
  searchActivityQueryAtom,
  pageAtom,
  pageSizeAtom,
  sortByAtom,
  sortOrderAtom,
  totalActivitiesAtom, // 1. Impor atom baru
} from "@/app/state/activityState";
import { fetchActivities } from "@/app/lib/services/activityService";
import { ActivityTable } from "@/app/components/activity-management/activity-table";
import { ActivityToolbar } from "@/app/components/activity-management/activity-toolbar";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";

export default function ActivityManagementPage() {
  const [activities, setActivities] = useAtom(activityAtom);
  const [loading, setLoading] = useAtom(loadingActivityAtom);
  const [searchQuery, setSearchQuery] = useAtom(searchActivityQueryAtom);
  const [page, setPage] = useAtom(pageAtom);
  const [pageSize] = useAtom(pageSizeAtom);
  const [sortBy, setSortBy] = useAtom(sortByAtom);
  const [sortOrder, setSortOrder] = useAtom(sortOrderAtom);
  const [totalActivities, setTotalActivities] = useAtom(totalActivitiesAtom); // 2. Gunakan atom baru

  const loadActivities = useCallback(async () => {
    setLoading(true);
    try {
      // 3. Kirim searchQuery ke API
      // Pastikan fetchActivities bisa menerima searchQuery
      const result = await fetchActivities(
        page,
        pageSize,
        sortBy,
        sortOrder,
        searchQuery
      );
      setActivities(result.data);
      setTotalActivities(result.total); // Simpan total data dari API
    } finally {
      setLoading(false);
    }
  }, [
    page,
    pageSize,
    sortBy,
    sortOrder,
    searchQuery,
    setActivities,
    setLoading,
    setTotalActivities,
  ]); // Tambahkan searchQuery di dependency array

  useEffect(() => {
    loadActivities();
  }, [loadActivities]);

  // 4. HAPUS filter dan slice di sisi klien. Data dari API sudah final.
  // const filteredActivities = activities.filter(...);  // <-- HAPUS
  // const paginatedData = filteredActivities.slice(...); // <-- HAPUS

  // 5. Hitung total halaman berdasarkan total data dari server
  const totalPages = Math.ceil(totalActivities / pageSize);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setPage(1); // Reset ke halaman 1 setiap kali ada pencarian baru
  };

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
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          <CalendarCheck className="h-8 w-8" />
          Activity Management
        </h1>
      </div>

      {/* Toolbar */}
      <ActivityToolbar
        onSearch={handleSearch}
        // PDF sebaiknya mengambil semua data atau data yang sudah difilter di server.
        // Untuk simpelnya, kita gunakan data yang ada di halaman ini saja.
        pdfData={activities}
        pdfColumns={[
          { header: "Activity", key: "activity" },
          { header: "Location", key: "location" },
          { header: "User", key: "user.username" },
          { header: "Created At", key: "created_at" },
        ]}
        pdfTitle="Activity Report"
        pdfFileName="activity_report.pdf"
      />

      {/* Table */}
      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-900">
            <CalendarCheck className="h-5 w-5" />
            {/* 6. Tampilkan total dari state */}
            Activity ({totalActivities})
          </CardTitle>
        </CardHeader>

        <CardContent>
          {loading ? (
            <div className="text-center py-8">Loading activities...</div>
          ) : activities.length > 0 ? ( // 7. Cek langsung ke `activities`
            <>
              <ActivityTable
                activities={activities} // 8. Gunakan `activities` langsung
                onSort={handleSort}
                sortBy={sortBy}
                sortOrder={sortOrder}
              />

              {/* Pagination */}
              {/* Logika pagination Anda sudah bagus, tidak perlu diubah */}
              <div className="flex justify-center items-center mt-6">
                <Pagination>
                  <PaginationContent className="flex items-center space-x-1">
                    {/* Previous */}
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        className={`cursor-pointer text-black ${
                          page === 1 ? "pointer-events-none opacity-50" : ""
                        }`}
                      />
                    </PaginationItem>

                    {/* Page Numbers */}
                    {(() => {
                      const maxVisible = 5;
                      let startPage = Math.max(
                        1,
                        page - Math.floor(maxVisible / 2)
                      );
                      let endPage = Math.min(
                        totalPages,
                        startPage + maxVisible - 1
                      );

                      if (endPage - startPage + 1 < maxVisible) {
                        startPage = Math.max(1, endPage - maxVisible + 1);
                      }

                      const pages = [];

                      if (startPage > 1) {
                        pages.push(
                          <PaginationItem key={1}>
                            <PaginationLink
                              onClick={() => setPage(1)}
                              className="text-black"
                            >
                              1
                            </PaginationLink>
                          </PaginationItem>
                        );
                        if (startPage > 2) {
                          pages.push(
                            <span
                              key="start-ellipsis"
                              className="px-1 text-gray-500"
                            >
                              ...
                            </span>
                          );
                        }
                      }

                      for (let i = startPage; i <= endPage; i++) {
                        pages.push(
                          <PaginationItem key={i}>
                            <PaginationLink
                              onClick={() => setPage(i)}
                              isActive={page === i}
                              className={`${
                                page === i
                                  ? "bg-[#AD49E1] hover:bg-[#9328d0] hover:text-white transition-colors"
                                  : "hover:bg-gray-100 text-black"
                              }`}
                            >
                              {i}
                            </PaginationLink>
                          </PaginationItem>
                        );
                      }

                      if (endPage < totalPages) {
                        if (endPage < totalPages - 1) {
                          pages.push(
                            <span
                              key="end-ellipsis"
                              className="px-1 text-gray-500"
                            >
                              ...
                            </span>
                          );
                        }
                        pages.push(
                          <PaginationItem key={totalPages}>
                            <PaginationLink
                              onClick={() => setPage(totalPages)}
                              className="text-black"
                            >
                              {totalPages}
                            </PaginationLink>
                          </PaginationItem>
                        );
                      }

                      return pages;
                    })()}

                    {/* Next */}
                    <PaginationItem>
                      <PaginationNext
                        onClick={() =>
                          setPage((p) => Math.min(totalPages, p + 1))
                        }
                        className={`cursor-pointer text-black ${
                          // <-- Tambahkan text-black di sini
                          page === totalPages || totalPages === 0
                            ? "pointer-events-none opacity-50"
                            : ""
                        }`}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
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
