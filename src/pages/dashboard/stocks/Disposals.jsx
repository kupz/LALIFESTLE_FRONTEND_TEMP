import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getDisposal } from "../../../api/productsApi";
import { signal } from "@preact/signals-react";
import { useSignals } from "@preact/signals-react/runtime";
import StockItem from "./StockItem";

const searchKey = signal("");

function Disposals() {
  useSignals();
  const { data } = useQuery({ queryKey: ["disposals"], queryFn: getDisposal });
  const filteredData = data?.filter(
    (item) =>
      item.code.includes(searchKey.value.toUpperCase()) ||
      item.description.includes(searchKey.value.toUpperCase()) ||
      item.brand__name.includes(searchKey.value.toUpperCase()) ||
      item.variant.includes(searchKey.value.toUpperCase())
  );
  return (
    <div className="w-full h-full flex flex-col gap-4 ">
      <div className="flex justify-between">
        <p className="font-bold text-white/60">Disposals</p>
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
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {filteredData?.map((obj) => {
              return <StockItem key={obj.id} data={obj} />;
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Disposals;
