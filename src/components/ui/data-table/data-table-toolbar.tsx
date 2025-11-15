"use client"

import { Table } from "@tanstack/react-table"
import { Input } from "@/components/ui/input"

interface ToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({ table }: ToolbarProps<TData>) {
  return (
    <div className="flex items-center py-4">
      <Input
        placeholder="Search..."
        className="max-w-sm"
        value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
        onChange={(e) => table.getColumn("email")?.setFilterValue(e.target.value)}
      />
    </div>
  )
}
