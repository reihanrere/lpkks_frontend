"use client"

import { Button } from "@/components/ui/button"
import { Table } from "@tanstack/react-table"

interface PaginationProps<TData> {
  table: Table<TData>
}

export function DataTablePagination<TData>({ table }: PaginationProps<TData>) {
  const currentPage = table.getState().pagination.pageIndex + 1
  const pageCount = table.getPageCount()

  const getPageNumbers = () => {
    const pages: (number | string)[] = []

    // Case 1: total pages <= 5 → tampilkan semua
    if (pageCount <= 5) {
      for (let i = 1; i <= pageCount; i++) pages.push(i)
      return pages
    }

    // Always show first page
    pages.push(1)

    // Left ellipsis
    if (currentPage > 3) pages.push("...")

    // Middle pages
    const start = Math.max(2, currentPage - 1)
    const end = Math.min(pageCount - 1, currentPage + 1)

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    // Right ellipsis
    if (currentPage < pageCount - 2) pages.push("...")

    // Always show last page
    pages.push(pageCount)

    return pages
  }

  const pages = getPageNumbers()

  return (
    <div className="flex items-center gap-2 py-4">
      {/* Previous */}
      <Button
        variant="ghost"
        size="sm"
        disabled={!table.getCanPreviousPage()}
        onClick={() => table.previousPage()}
        className="flex items-center gap-1"
      >
        ‹ Previous
      </Button>

      {/* Page numbers */}
      <div className="flex items-center gap-1">
        {pages.map((p, i) =>
          p === "..." ? (
            <span key={`ellipsis-${i}`} className="px-2 text-muted-foreground">
              ...
            </span>
          ) : (
            <Button
              key={`page-${p}-${i}`}
              variant={p === currentPage ? "outline" : "ghost"}
              size="sm"
              onClick={() => table.setPageIndex(Number(p) - 1)}
              className={`w-9 h-8 ${
                p === currentPage ? "bg-accent text-foreground rounded-md" : ""
              }`}
            >
              {p}
            </Button>
          )
        )}
      </div>

      {/* Next */}
      <Button
        variant="ghost"
        size="sm"
        disabled={!table.getCanNextPage()}
        onClick={() => table.nextPage()}
        className="flex items-center gap-1"
      >
        Next ›
      </Button>
    </div>
  )
}
