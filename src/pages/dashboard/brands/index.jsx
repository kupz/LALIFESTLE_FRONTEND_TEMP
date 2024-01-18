import { useQuery } from "@tanstack/react-query";
import React from "react";
import { signal } from "@preact/signals-react";
import { useSignals } from "@preact/signals-react/runtime";
import BrandItem from "./BrandItem";
import { getBrands } from "../../../api/brandApi";

const searchKey = signal("");

function Brands() {
  useSignals();
  const { data } = useQuery({ queryKey: ["brands"], queryFn: getBrands });

  const filteredData = data?.filter((item) =>
    item.name.includes(searchKey.value.toUpperCase())
  );
  return (
    <div className="w-full h-full flex flex-col gap-4 ">
      <div className="flex justify-between">
        <p className="font-bold text-white/60">Brands</p>
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
              <th>Brand Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData?.map((obj) => {
              return <BrandItem key={obj.id} data={obj} />;
            })}
          </tbody>
        </table>
      </div>
      <div className="w-full text-white/15 flex gap-5 px-5 py-2 items-center justify-center font-semibold">
        Copyright © 2024 BJ VILLABESA ®
      </div>
    </div>
  );
}

export default Brands;
