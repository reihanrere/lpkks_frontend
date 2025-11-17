"use client"

import React from "react"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  PaginationState,
} from "@tanstack/react-table"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DataTablePagination } from "./data-table-pagination"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  pagination: PaginationState
  onPaginationChange: (updater: PaginationState | ((prev: PaginationState) => PaginationState)) => void
  totalItems: number
  toolbar?: React.ReactNode
  isLoading?: boolean
}

export function DataTable<TData, TValue>({
                                           columns,
                                           data,
                                           pagination,
                                           onPaginationChange,
                                           totalItems,
                                           toolbar,
                                           isLoading = false,
                                         }: DataTableProps<TData, TValue>) {
  const computedPageCount = Math.ceil(totalItems / pagination.pageSize)

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount: computedPageCount,
    state: { pagination },
    onPaginationChange,
  })

  return (
    <div className="w-full">
      {toolbar}

      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((group) => (
              <TableRow key={group.id}>
                {group.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {isLoading ? (
              <>
                {Array.from({ length: pagination.pageSize }).map((_, rowIndex) => (
                  <TableRow key={`loading-${rowIndex}`}>
                    {columns.map((col, colIndex) => (
                      <TableCell key={`loading-cell-${rowIndex}-${colIndex}`}>
                        <div className="w-full h-[10px] rounded bg-gray-200 animate-pulse" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </>
            ) : table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center h-20 text-muted-foreground">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Section */}
      <div className="flex items-center justify-between px-2 py-4">
        <div className="text-sm text-muted-foreground">
          Showing{" "}
          <span className="font-medium">{pagination.pageIndex * pagination.pageSize + 1}</span>{" "}
          to{" "}
          <span className="font-medium">
            {Math.min((pagination.pageIndex + 1) * pagination.pageSize, totalItems)}
          </span>{" "}
          of <span className="font-medium">{totalItems}</span> entries
        </div>

        <div className="flex items-center gap-6">
          {/* Rows Per Page */}
          <div className="flex items-center gap-2">
            <span className="text-sm">Rows per page</span>
            <Select
              value={String(pagination.pageSize)}
              onValueChange={(value) =>
                onPaginationChange((prev) => ({
                  ...prev,
                  pageSize: Number(value),
                  pageIndex: 0,
                }))
              }
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent side="top">
                {[5, 10, 20, 50].map((size) => (
                  <SelectItem key={size} value={String(size)}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <DataTablePagination table={table} />
        </div>
      </div>
    </div>
  )
}
