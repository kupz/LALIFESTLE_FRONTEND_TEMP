import { signal, useSignal } from "@preact/signals-react";
import React, { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import A4page from "./A4page";
import { chunkArray } from "../../../services/utils";
import { useQuery } from "@tanstack/react-query";
import { getTransactionDetail } from "../../../api/transactionApi";
import { useSignals } from "@preact/signals-react/runtime";

export const printData = signal(null);

function PrintableContent() {
  useSignals();
  const componentToPrint = useRef(null);

  const { data } = useQuery({
    queryKey: ["transaction_detail"],
    queryFn: () => getTransactionDetail(printData.value.id),
  });

  const handlePrint = useReactToPrint({
    content: () => componentToPrint.current,
  });

  const pages = chunkArray(data ? data.items : [], 15);

  const generateRandomKey = () => {
    return Math.random().toString(36).substring(7);
  }

  return (
    <div className="flex flex-col gap-2 items-center w-full h-screen overflow-y-auto">
      <div ref={componentToPrint}>
        {pages.map((page) => {
          return (
            <A4page key={generateRandomKey()} headers={data ? data.transaction : null} content={page} />
          );
        })}
      </div>
      <button
        className="bg-cyan-400 text-white px-5 py-1 rounded-md"
        onClick={handlePrint}
      >
        Print
      </button>
    </div>
  );
}

export default PrintableContent;
