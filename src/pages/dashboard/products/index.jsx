import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getProducts } from "../../../api/productsApi";
import ProductItem from "../../../components/ProductItem";

function Products() {
  const { data } = useQuery({ queryKey: ["products"], queryFn: getProducts });
  return (
    <div className="w-full h-full flex flex-col gap-4 ">
      <div className="flex justify-between">
        <p className="font-bold text-white/60">Products</p>
        <input
          type="text"
          placeholder="Search"
          className="px-2 py-1 rounded-md"
        />
      </div>
      <div className="h-full max-h-[80vh] overflow-y-auto w-full">
        <table className="table-auto w-full border-spacing-y-5 border-separate">
          <thead>
            <tr className="bg-white/60 text-cyan-800">
              <th>Itemcode</th>
              <th>Brand by</th>
              <th>Description</th>
              <th>Variant</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((obj) => {
              return <ProductItem key={obj.id} data={obj} />;
            })}
          </tbody>
        </table>
      </div>
      <div className="w-full bg-white/60 text-cyan-800 flex gap-5 px-5 py-2 items-center justify-between">
        <button className="font-bold bg-cyan-900 px-4 py-1 rounded-md text-white/50 text-xs">
          PREV
        </button>
        <p className="font-bold">Page 1</p>
        <button className="font-bold bg-cyan-900 px-4 py-1 rounded-md text-white/50 text-xs">
          NEXT
        </button>
      </div>
    </div>
  );
}

export default Products;
