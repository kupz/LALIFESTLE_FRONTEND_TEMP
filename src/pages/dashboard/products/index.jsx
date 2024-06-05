import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import { getProducts, updateProduct } from "../../../api/productsApi";
import ProductItem from "./ProductItem";
import { signal } from "@preact/signals-react";
import { useSignals } from "@preact/signals-react/runtime";
import { toast } from "react-toastify";

const searchKey = signal("");

function Products() {
  const queryClient = useQueryClient();
  const itemcodeRef = useRef(null);
  const brandRef = useRef(null);
  const descriptionRef = useRef(null);
  const variantRef = useRef(null);
  const priceRef = useRef(null);

  const setdata = (data) => {
    setTimeout(() => {
      itemcodeRef.current.value = data.code;
      brandRef.current.value = data.brand__name;
      descriptionRef.current.value = data.description;
      variantRef.current.value = data.variant;
      priceRef.current.value = data.price;
    }, 1000);
  };

  const updateMutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setUpdateModal(false);
      toast("Updated Success!");
    },
  });

  useSignals();
  const { data } = useQuery({ queryKey: ["products"], queryFn: getProducts });
  const filteredData = data?.filter(
    (item) =>
      item.code.includes(searchKey.value.toUpperCase()) ||
      item.description.includes(searchKey.value.toUpperCase()) ||
      item.brand__name.includes(searchKey.value.toUpperCase()) ||
      item.variant.includes(searchKey.value.toUpperCase())
  );
  const [updateModal, setUpdateModal] = useState(false);
  const [updateData, setUpdateData] = useState(null);
  console.log(updateData);
  return (
    <div className="w-full h-full flex flex-col gap-4 relative">
      <div className="flex justify-between">
        <p className="font-bold text-white/60">Products</p>
        <input
          type="text"
          placeholder="Search"
          value={searchKey.value}
          onChange={(e) => (searchKey.value = e.target.value)}
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
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData?.map((obj) => {
              return (
                <ProductItem
                  key={obj.id}
                  data={obj}
                  setUpdateModal={setUpdateModal}
                  setUpdateData={setUpdateData}
                  setdata={setdata}
                />
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="w-full text-white/15 flex gap-5 px-5 py-2 items-center justify-center font-semibold">
        Copyright © 2024 BJ VILLABESA ®
      </div>
      {/* UPDATE MODAL */}
      {updateModal && (
        <div className="absolute w-full h-full bg-black/50 flex justify-center items-center">
          <div className="bg-gray-400 p-5 flex flex-col gap-4 ">
            <input
              type="text"
              placeholder="Itemcode"
              className="px-3 py-1 rounded-md"
              ref={itemcodeRef}
            />
            <input
              type="text"
              placeholder="Brand"
              className="px-3 py-1 rounded-md"
              ref={brandRef}
            />
            <input
              type="text"
              placeholder="Description"
              className="px-3 py-1 rounded-md"
              ref={descriptionRef}
            />
            <input
              type="text"
              placeholder="Variant"
              className="px-3 py-1 rounded-md"
              ref={variantRef}
            />
            <input
              type="text"
              placeholder="Price"
              className="px-3 py-1 rounded-md"
              ref={priceRef}
            />
            <div className="flex justify-between">
              <button
                className="px-3 py-1 bg-slate-500 text-white"
                onClick={() => {
                  setUpdateModal(false);
                }}
              >
                Cancel
              </button>
              <button
                className="px-3 py-1 bg-blue-500 text-white"
                onClick={() => {
                  updateMutation.mutate({
                    ...updateData,
                    price: priceRef.current.value,
                    description: descriptionRef.current.value,
                    variant: variantRef.current.value,
                    code: itemcodeRef.current.value,
                    brand: brandRef.current.value,
                  });
                }}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Products;
