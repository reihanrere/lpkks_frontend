"use client";

import React, { useEffect } from "react";
import { Breadcrumbs } from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUpdateProduct, useProduct } from "@/features/product/hooks/useProduct";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductFormData, productSchema } from "@/features/product/schemas/productSchema";
import { useParams, useRouter } from "next/navigation";

export default function EditProductPage() {
  const router = useRouter();
  const { id } = useParams();
  const productId = Number(id);

  const { data: productDetail, isLoading: isDetailLoading } = useProduct(productId);
  const { mutate: updateProduct, isPending } = useUpdateProduct();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
  });

  useEffect(() => {
    if (productDetail) {
      reset({
        product_name: productDetail.name,
        qty: productDetail.qty,
      });
    }
  }, [productDetail, reset]);

  const onFormSubmit = (data: ProductFormData) => {
    updateProduct(
      { id: productId, data },
      {
        onSuccess: () => router.push("/products"),
      }
    );
  };

  return (
    <div className="flex flex-col gap-4 md:gap-6 py-12 px-6 lg:px-12">
      <Breadcrumbs
        items={[
          { label: "Products", href: "/products" },
          { label: "Edit", isCurrent: true },
        ]}
      />

      <div className="flex justify-between">
        <h1 className="text-5xl font-semibold">Edit</h1>
      </div>

      {isDetailLoading ? (
        <p className="opacity-60">Loading product...</p>
      ) : (
        <form onSubmit={handleSubmit(onFormSubmit)} className="w-full flex flex-col gap-8">
          <div className="grid gap-4 lg:grid-cols-[1fr_250px]">
            <div className="flex flex-col gap-2">
              <label htmlFor={"product_name"} className="text-sm font-medium">
                Product Name
              </label>
              <Input
                id={"product_name"}
                {...register("product_name")}
                placeholder="Input your product name"
                type="text"
                error={errors.product_name?.message ?? ""}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor={"qty"} className="text-sm font-medium">
                Qty
              </label>
              <Input
                id={"qty"}
                {...register("qty", { valueAsNumber: true })}
                placeholder="Input your product quantity"
                type="number"
                error={errors.qty?.message ?? ""}
              />
            </div>
          </div>

          <div className="w-full flex justify-end gap-2">
            <Button type="submit" isLoading={isPending}>
              Update
            </Button>
            <Button
              type="button"
              disabled={isPending}
              variant="outline"
              onClick={() => router.push("/products")}
            >
              Cancel
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
