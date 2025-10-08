"use client";

import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

interface DownloadExcelProps {
  data: any[];
  columns: { header: string; key: string }[];
  title?: string;
  fileName?: string;
}

export default async function DownloadExcel({
  data,
  columns,
  title = "Report",
  fileName = "report.xlsx",
}: DownloadExcelProps) {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet(title);

  // Tambahkan header kolom
  worksheet.columns = columns.map(col => ({
    header: col.header,
    key: col.key,
    width: 25,
  }));

  // Tambahkan data
  data.forEach(item => {
    const row: any = {};
    columns.forEach(col => {
      // dukung nested key seperti user.username
      const keys = col.key.split(".");
      let value = item;
      for (const k of keys) value = value?.[k];
      row[col.key] = value ?? "-";
    });
    worksheet.addRow(row);
  });

  // Styling header
  worksheet.getRow(1).font = { bold: true };
  worksheet.getRow(1).alignment = { horizontal: "center" };

  // Auto-size kolom
  worksheet.columns.forEach(col => {
    col.width = Math.max(15, col.header?.length ?? 10);
  });

  // Simpan file
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  saveAs(blob, fileName);
}
