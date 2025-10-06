"use client";

import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { activityAtom } from "@/app/state/activityState";
import { fetchActivities } from "@/app/lib/services/activityService";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";

export default function ActivityUser() {
  const [activities, setActivities] = useAtom(activityAtom);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(5);
  const [total, setTotal] = useState(0);

  const totalPages = Math.ceil(total / pageSize);

  const loadActivities = async () => {
    setLoading(true);
    try {
      const result = await fetchActivities(
        page,
        pageSize,
        "created_at",
        "DESC"
      );
      setActivities(result.data);
      setTotal(result.total);
    } catch (error) {
      console.error("Error loading activities:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadActivities();
  }, [page]);

  const safeActivities = Array.isArray(activities) ? activities : [];

  return (
    <div className="mt-16">
      <h2 className="text-xl font-semibold mb-4 text-gray-900">
        Aktivitas Terakhir
      </h2>

      {/* Loading State */}
      {loading ? (
        <div className="space-y-3">
          {[...Array(pageSize)].map((_, i) => (
            <Skeleton key={i} className="h-10 w-full rounded-md" />
          ))}
        </div>
      ) : safeActivities.length > 0 ? (
        <>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow className="text-gray-800">
                  <TableHead className="w-[50px]">No</TableHead>
                  <TableHead>Aktivitas</TableHead>
                  <TableHead>Lokasi</TableHead>
                  <TableHead className="text-right">Tanggal</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="text-gray-500">
                {safeActivities.map((act, idx) => (
                  <TableRow key={act.id_activity}>
                    <TableCell>{(page - 1) * pageSize + idx + 1}</TableCell>
                    <TableCell className="font-medium">
                      {act.activity}
                    </TableCell>
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

          {/* Pagination Shadcn */}
          {totalPages > 1 && (
            <div className="mt-6 flex justify-center">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      className={`cursor-pointer text-black ${
                        page === 1 ? "opacity-50 pointer-events-none" : ""
                      }`}
                    />
                  </PaginationItem>

                  {/* Numbered Pages */}
                  {[...Array(totalPages)].map((_, i) => {
                    const pageNumber = i + 1;
                    const isActive = pageNumber === page;
                    return (
                      <PaginationItem key={i}>
                        <PaginationLink
                          onClick={() => setPage(pageNumber)}
                          isActive={pageNumber === page}
                          className={`cursor-pointer ${
                            isActive
                              ? "bg-black text-white hover:bg-black"
                              : "text-black hover:bg-gray-100"
                          }`}
                        >
                          {pageNumber}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  })}

                  <PaginationItem>
                    <PaginationNext
                      onClick={() =>
                        setPage((p) => Math.min(totalPages, p + 1))
                      }
                      className={`cursor-pointer text-black ${
                        page === totalPages
                          ? "opacity-50 pointer-events-none"
                          : ""
                      }`}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </>
      ) : (
        <p className="text-gray-500">Belum ada aktivitas</p>
      )}
    </div>
  );
}
