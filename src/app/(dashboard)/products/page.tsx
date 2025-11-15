'use client'

import { DataTable } from "@/components/ui/data-table/data-table";
import {
  DropdownMenu,
  DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";

type Product = {
  id: string
  name: string
  qty: number
  created_at: string
}

const products: Product[] = [
  { id: "1", name: "Laptop XYZ", qty: 10, created_at: "2023-11-01T10:00:00Z" },
  { id: "2", name: "Mechanical Keyboard", qty: 5, created_at: "2023-11-03T14:30:00Z" },
  { id: "3", name: "Monitor 27 inch", qty: 7, created_at: "2023-11-05T09:20:00Z" },
  { id: "4", name: "Gaming Mouse Pro", qty: 12, created_at: "2023-11-06T11:10:00Z" },
  { id: "5", name: "USB-C Docking Station", qty: 4, created_at: "2023-11-06T15:45:00Z" },
  { id: "6", name: "External SSD 1TB", qty: 8, created_at: "2023-11-07T08:30:00Z" },
  { id: "7", name: "Portable Speaker Mini", qty: 6, created_at: "2023-11-07T10:50:00Z" },
  { id: "8", name: "Smartwatch Ultra", qty: 9, created_at: "2023-11-08T12:25:00Z" },
  { id: "9", name: "Wireless Earbuds S", qty: 14, created_at: "2023-11-08T16:00:00Z" },
  { id: "10", name: "Webcam HD 1080p", qty: 3, created_at: "2023-11-09T09:40:00Z" },
  { id: "11", name: "LED Desk Lamp", qty: 11, created_at: "2023-11-09T14:10:00Z" },
  { id: "12", name: "Standing Desk", qty: 2, created_at: "2023-11-10T07:15:00Z" },
  { id: "13", name: "Ergonomic Chair", qty: 4, created_at: "2023-11-10T10:05:00Z" },
  { id: "14", name: "Bluetooth Speaker XL", qty: 6, created_at: "2023-11-11T13:40:00Z" },
  { id: "15", name: "Graphics Tablet M", qty: 5, created_at: "2023-11-11T15:20:00Z" },
  { id: "16", name: "Capture Card Pro", qty: 3, created_at: "2023-11-12T08:55:00Z" },
  { id: "17", name: "NAS Storage 4-bay", qty: 1, created_at: "2023-11-12T11:30:00Z" },
  { id: "18", name: "HDMI 2.1 Cable", qty: 20, created_at: "2023-11-12T14:45:00Z" },
  { id: "19", name: "Mechanical Keycap Set", qty: 13, created_at: "2023-11-13T09:10:00Z" },
  { id: "20", name: "USB-C Fast Charger 65W", qty: 18, created_at: "2023-11-13T11:25:00Z" },
];

const productColumns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: "Product Name",
  },
  {
    accessorKey: "qty",
    header: "Qty",
    cell: ({ row }) => <span>{row.getValue("qty")} pcs</span>,
  },
  {
    accessorKey: "created_at",
    header: "Created At",
    cell: ({ row }) => (
      <span>{new Date(row.getValue("created_at")).toLocaleDateString()}</span>
    ),
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export default function ProductPage() {
  return (
    <div className="flex flex-col gap-4 md:gap-6 py-12 px-6 lg:px-12">
      <div className={"flex justify-between"}>
        <h1 className={"text-5xl font-semibold"}>Products</h1>
      </div>
      <DataTable columns={productColumns} data={products} />
    </div>
  );
}