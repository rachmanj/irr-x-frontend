"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

interface DataTableProps<TData extends Record<string, any>> {
    columns: {
        id: string;
        header: string;
        accessorKey?: string;
        cell?: (row: TData) => React.ReactNode;
    }[];
    data: TData[];
    loading?: boolean;
}

export function DataTable<TData extends Record<string, any>>({
    columns,
    data,
    loading = false,
}: DataTableProps<TData>) {
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    {columns.map((column) => (
                        <TableHead key={column.id}>{column.header}</TableHead>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((row: TData, i) => (
                    <TableRow key={i}>
                        {columns.map((column) => (
                            <TableCell key={column.id}>
                                {column.cell ? column.cell(row) : column.accessorKey ? row[column.accessorKey] : null}
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
} 