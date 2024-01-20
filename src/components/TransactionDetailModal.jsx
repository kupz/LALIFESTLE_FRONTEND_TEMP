import React from "react";
import { TransactionDetailViewModal } from "../pages/dashboard";
import { useSignals } from "@preact/signals-react/runtime";
import { signal } from "@preact/signals-react";
import { convertToPositive, fromUTCtoManila } from "../services/utils";
import { useQuery } from "@tanstack/react-query";
import { getTransactionDetail } from "../api/transactionApi";

export const transactionDetailModalData = signal({});

function TransactionDetailModal() {
  useSignals();
  const { data } = useQuery({
    queryKey: ["transaction_detail"],
    queryFn: () => getTransactionDetail(transactionDetailModalData.value.id),
  });
  console.log(TransactionDetailViewModal.value);
  return (
    <div className="absolute w-screen h-screen top-0 left-0 bg-black/50 backdrop-blur-sm flex flex-col gap-3 items-center justify-center">
      <div
        style={{ width: "210mm" }}
        className="bg-white p-5 h-[600px] overflow-y-auto flex flex-col gap-3"
      >
        <div className="flex justify-between">
          <p>Transaction #: {transactionDetailModalData.value.id}</p>
          <p>Remarks: {transactionDetailModalData.value.remarks}</p>
        </div>
        <div className="flex justify-between">
          <p>Store: {transactionDetailModalData.value.store__name}</p>
          <p>
            Date: {fromUTCtoManila(transactionDetailModalData.value.date_time)}
          </p>
        </div>
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th>itemcode</th>
              <th>qty</th>
              <th>description</th>
              <th>price</th>
              <th>total</th>
            </tr>
          </thead>
          <tbody>
            {data?.items.map((item) => {
              return (
                <tr key={item.product__id} className="text-sm text-center">
                  <td>{item.product__code}</td>
                  <td>{convertToPositive(item.quantity)}</td>
                  <td>
                    {`${item.product__brand__name} ${item.product__description} - ${item.product__variant} (${item.item_condition__name})`}
                  </td>
                  <td>399.00</td>
                  <td>33,990.00</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <button
        className="bg-red-400 text-white py-1 px-5"
        onClick={() => {
          TransactionDetailViewModal.value = false;
          console.log(TransactionDetailViewModal.value);
        }}
      >
        close
      </button>
    </div>
  );
}

export default TransactionDetailModal;
