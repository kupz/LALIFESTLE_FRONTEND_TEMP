import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getTransactions } from "../../../api/transactionApi";
import {
  convertToPositive,
  formatNumberWithCommas,
  fromUTCtoManila,
} from "../../../services/utils";
import TransactionItem from "../../../components/TransactionItem";

function DeliveryPage() {
  // params
  const [params, setParams] = useState({
    transaction_type: "Delivery",
    page: 1,
    limit: 50,
    filter: "",
  });

  // query for transactions
  const { data, isSuccess } = useQuery({
    queryKey: ["transactions", params],
    queryFn: () => getTransactions(params),
  });

  return (
    <div className="w-full h-full flex flex-col gap-4 ">
      <div className="flex justify-between">
        <p className="font-bold text-white/60">Delivery</p>
        <input
          type="text"
          placeholder="Search"
          value={params.filter}
          onChange={(e) =>
            setParams((prev) => {
              return { ...prev, filter: e.target.value };
            })
          }
          className="px-2 py-1 rounded-md"
        />
      </div>
      <div className="h-full max-h-[80vh] overflow-y-auto w-full">
        <table className="table-auto w-full border-spacing-y-5 border-separate">
          <thead>
            <tr className="bg-white/60 text-cyan-800">
              <th>Transaction#</th>
              <th>Prepared by</th>
              <th>Remarks</th>
              <th>Store</th>
              <th>Total Qty</th>
              <th>Total Cost</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((obj) => {
              return <TransactionItem key={obj.id} data={obj} />;
            })}
          </tbody>
        </table>
      </div>
      <div className="w-full bg-white/60 text-cyan-800 flex gap-5 px-5 py-2 items-center justify-between">
        <button className="font-bold bg-cyan-900 px-4 py-1 rounded-md text-white/50 text-xs">
          PREV
        </button>
        <p className="font-bold">Page {params.page}</p>
        <button className="font-bold bg-cyan-900 px-4 py-1 rounded-md text-white/50 text-xs">
          NEXT
        </button>
      </div>
    </div>
  );
}

export default DeliveryPage;
