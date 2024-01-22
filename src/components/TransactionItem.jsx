import React, { useState } from "react";
import {
  convertToPositive,
  formatNumberWithCommas,
  fromUTCtoManila,
} from "../services/utils";
import { transactionDetailModalData } from "./TransactionDetailModal";
import { TransactionDetailViewModal } from "../pages/dashboard";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { voidTransaction } from "../api/transactionApi";
import { toast } from "react-toastify";
import { printData } from "../pages/dashboard/Print";
import { useNavigate } from "react-router-dom";
import { transactionToUpdate } from "../pages/dashboard/createTransaction/UpdateTransaction";

function TransactionItem({ data }) {
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate()

  const queryClient = useQueryClient();

  const voidMutation = useMutation({
    mutationFn: voidTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries("transactions");
      toast("Transaction has been voided!");
    },
  });
  return (
    <tr
      className={`text-center font-semibold ${
        data.is_void ? "text-red-400" : "text-white/50"
      } hover:bg-cyan-900`}
    >
      <td>{data.id}</td>
      <td>{data.user__username}</td>
      <td>{data.remarks}</td>
      <td>{data.store__name}</td>
      <td>{formatNumberWithCommas(convertToPositive(data.total_qty))}</td>
      <td>{formatNumberWithCommas(convertToPositive(data.total_price))}</td>
      <td>{fromUTCtoManila(data.date_time)}</td>
      <td className="text-xl cursor-pointer relative">
        <p
          onClick={() => {
            setMenu(!menu);
          }}
        >
          ⚙
        </p>
        {menu && (
          <div className="absolute bg-cyan-300  z-10 rounded-md w-max -translate-x-[50%]">
            <ul className="text-sm flex flex-col cursor-pointer text-cyan-950">
              <li
                className="hover:bg-cyan-500 px-2 py-1 rounded-md "
                onClick={() => {
                  printData.value = data;
                  navigate('/print')
                }}
              >
                Print
              </li>
              <li
                className="hover:bg-cyan-500 px-2 py-1 rounded-md "
                onClick={() => {
                  TransactionDetailViewModal.value = true;
                  transactionDetailModalData.value = data;
                  setMenu(!menu);
                }}
              >
                View
              </li>
              <li className="hover:bg-cyan-500 px-2 py-1 rounded-md " onClick={() => {
                transactionToUpdate.value = data.id
                navigate('/updateTransaction')
              }}>Edit</li>
              <li
                className="hover:bg-cyan-500 px-2 py-1 rounded-md "
                onClick={() => {
                  voidMutation.mutate({ id: data.id });
                  setMenu(!menu);
                }}
              >
                Void/Unvoid
              </li>
            </ul>
          </div>
        )}
      </td>
    </tr>
  );
}

export default TransactionItem;
