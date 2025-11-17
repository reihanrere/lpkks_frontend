"use client"

import { Button } from "@/components/ui/button"
import { Table } from "@tanstack/react-table"

interface PaginationProps<TData> {
  table: Table<TData>
}

export function DataTablePagination<TData>({ table }: PaginationProps<TData>) {
  const currentPage = table.getState().pagination.pageIndex + 1
  const pageCount = table.getPageCount()

  const pages = Array.from({ length: pageCount }, (_, i) => i + 1)

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="sm"
        disabled={!table.getCanPreviousPage()}
        onClick={() => table.previousPage()}
      >
        ‹ Prev
      </Button>

      <div className="flex items-center gap-1">
        {pages.map((p) => (
          <Button
            key={p}
            variant={p === currentPage ? "outline" : "ghost"}
            size="sm"
            onClick={() => table.setPageIndex(p - 1)}
          >
            {p}
          </Button>
        ))}
      </div>

      <Button
        variant="ghost"
        size="sm"
        disabled={!table.getCanNextPage()}
        onClick={() => table.nextPage()}
      >
        Next ›
      </Button>
    </div>
  )
}
