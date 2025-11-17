'use client'

import { DataTable } from "@/components/ui/data-table/data-table";
import {
  DropdownMenu,
  DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { ColumnDef, PaginationState } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { useDeleteProduct, useProducts } from "@/features/product/hooks/useProduct";
import { Product } from "@/types/product";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";
import Link from "next/link";
import { ConfirmationDialog } from "@/components/ui/confimation-dialog";
import { useFormattedDate } from "@/hooks/use-formatted-date";
import { useRouter } from "next/navigation";


export default function ProductPage() {
  const router = useRouter();
  const { formatDate } = useFormattedDate();

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  })

  const [open, setOpen] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 400);

  useEffect(() => {
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  }, [debouncedSearch]);

  const { data, isLoading } = useProducts({
    page: pagination.pageIndex + 1,
    size: pagination.pageSize,
    search: debouncedSearch,
  })

  const { mutate: deleteProduct, isPending } = useDeleteProduct();

  const handleConfirmDelete = () => {
    if (!selectedId) return;

    deleteProduct(selectedId, {
      onSuccess: () => {
        setOpen(false);
        setSelectedId(null);
      },
    });
  };

  const productColumns: ColumnDef<Product>[] = [
    {
      accessorKey: "name",
      header: "Product Name",
    },
    {
      accessorKey: "qty",
      header: "Quantity",
      cell: ({ row }) => <span>{row.getValue("qty")} pcs</span>,
    },
    {
      accessorKey: "updated_at",
      header: "Last Updated",
      cell: ({ row }) => {
        const date = row.getValue("updated_at") as string | null;
        return date ? (
          <span>{formatDate(date, "dd MMM yyyy HH:mm")} </span>
        ) : (
          <span className="text-muted-foreground">-</span>
        );
      },
    },
    {
      accessorKey: "action",
      header: "Action",
      cell: ({ row }) => {
        const product = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => router.push(`/products/${product.id}/edit`)}>
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                variant="destructive"
                onClick={() => {
                  setSelectedId(product.id);
                  setOpen(true);
                }}
                disabled={isPending}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ];

  return (
    <div className="flex flex-col gap-4 md:gap-6 py-12 px-6 lg:px-12">
      <div className={"flex justify-between"}>
        <h1 className={"text-5xl font-semibold"}>Products</h1>
      </div>
      <div className={"flex flex-col-reverse lg:flex-row justify-between gap-4"}>
        <Input
          className={"w-full lg:w-[300px]"}
          value={search}
          onChange={(e) => setSearch(e?.target?.value)} placeholder={"Search product name"}
        />
        <Link href={"/products/add"}>
          <Button>
            Add Product
          </Button>
        </Link>
      </div>
      <DataTable
        columns={productColumns}
        data={data?.data || []}
        pagination={pagination}
        onPaginationChange={setPagination}
        totalItems={data?.pagination.total ?? 0}
        isLoading={isLoading}
      />
      <ConfirmationDialog
        open={open}
        onOpenChange={setOpen}
        title="Delete product?"
        description="This action cannot be undone. This will permanently delete the product."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}