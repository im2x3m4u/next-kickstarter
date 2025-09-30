"use client"

import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";
import "jspdf-autotable";

interface DownloadPdfProps<T> {
    data: T[];
    columns: { header: string; key: keyof T}[]
    fileName?: string;
    title?: string; 
}

export default function DownloadPdf<T>({
    data,
    columns,
    fileName = "report.pdf",
    title = "Report",
}: DownloadPdfProps<T>) {
    const handleDownloadPDF = () => {
        const doc = new jsPDF();

        // Judul
        doc.text(title, 14, 16);

        // Tabel
        const tableColumn = columns.map(col => col.header);
        const tableRows: any[] = [];

        data.forEach(item => {
            const rowData = columns.map(col => item[col.key]);
            tableRows.push(rowData);
        });

        (doc as any).autoTable({
            head: [tableColumn],
            body: tableRows,
            startY: 20,
        });

        doc.save(fileName)
    };

    return <Button onClick={handleDownloadPDF}>Download PDF</Button>;
}