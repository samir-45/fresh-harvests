import { useMemo } from "react";
import { ProductFromApi, useGetProductsQuery } from "@/store/services/api";
import ProductCard from "@/components/product/ProductCard";

type Props = {
  currentProduct: ProductFromApi;
  limit?: number;
  title?: string;
};

export default function RelatedProductsSection({
  currentProduct,
  limit = 4,
  title = "Related products",
}: Props) {
  const { data: listRes, isLoading } = useGetProductsQuery({
    page: 1,
    limit: 1000,
  });

  const allProducts = listRes?.data ?? [];

  const related = useMemo(() => {
    return allProducts
      .filter((p) => p.categoryId === currentProduct.categoryId)
      .filter((p) => p.id !== currentProduct.id)
      .slice(0, limit);
  }, [allProducts, currentProduct, limit]);

  return (
    <div className="mt-16">
      <div className="text-center">
        <div className="mx-auto inline-flex rounded-md bg-[#EAF3DF] px-3 py-1 text-xs font-semibold text-[#6D9B3B]">
          Our Products
        </div>
        <h2 className="mt-3 text-4xl font-extrabold text-[#1B2032]">{title}</h2>
      </div>

      {isLoading ? (
        <div className="w-full flex justify-center items-center"><span className="loading mx-auto loading-spinner text-[#749B3F]"></span></div>
        
      ) : related.length === 0 ? (
        <div className="mt-10 text-center text-sm text-gray-500">No related products.</div>
      ) : (
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {related.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
      )}
    </div>
  );
}
