"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, MoreHorizontal, Download, Upload } from "lucide-react";

interface ActivityToolbarProps {
  onSearch: (query: string) => void;
  onExport: () => void;
  onImport: () => void;
}

export function ActivityToolbar({
  onSearch,
  onExport,
  onImport,
}: ActivityToolbarProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    onSearch(value);
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
              className="pl-10"
            />
          </div>

          {/* Actions */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="flex items-center gap-2 hover:bg-gray-100 hover:text-gray-900 transition-colors"
              >
                <MoreHorizontal className="h-4 w-4" />
                More
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-white border border-gray-200 shadow-lg"
            >
              <DropdownMenuLabel className="text-gray-900 bg-white">
                Actions
              </DropdownMenuLabel>
              <DropdownMenuItem
                onClick={onExport}
                className="text-gray-900 hover:bg-gray-50 focus:bg-gray-50"
              >
                <Download className="mr-2 h-4 w-4 text-gray-900" />
                Export Activities
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={onImport}
                className="text-gray-900 hover:bg-gray-50 focus:bg-gray-50"
              >
                <Upload className="mr-2 h-4 w-4 text-gray-900" />
                Import Activities
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );
}
