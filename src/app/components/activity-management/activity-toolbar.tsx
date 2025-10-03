"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Download } from "lucide-react";
import DownloadPdf from "@/app/components/DownloadPdf";

interface ActivityToolbarProps {
  onSearch: (query: string) => void;
  pdfData?: any[];
  pdfColumns?: { header: string; key: string }[];
  pdfTitle?: string;
  pdfFileName?: string;
}

export function ActivityToolbar({
  onSearch,
  pdfData = [],
  pdfColumns = [],
  pdfTitle = "Report",
  pdfFileName = "report.pdf",
}: ActivityToolbarProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    onSearch(value);
  };

  const handleExport = () => {
    if (pdfData.length > 0) {
      DownloadPdf({
        data: pdfData,
        columns: pdfColumns,
        title: pdfTitle,
        fileName: pdfFileName,
      });
    } else {
      console.warn("No data available to export.");
    }
  };

  return (
    <Card>
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
          <Button
            onClick={handleExport}
            variant="outline"
            className="flex items-center gap-2 hover:bg-gray-100 hover:text-gray-900 transition-colors"
          >
            <Download className="mr-2 h-4 w-4 " />
            Export PDF
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
