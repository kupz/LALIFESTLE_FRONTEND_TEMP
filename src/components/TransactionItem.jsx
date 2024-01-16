import React, { useState } from "react";
import {
  convertToPositive,
  formatNumberWithCommas,
  fromUTCtoManila,
} from "../services/utils";

function TransactionItem({ data }) {
  const [menu, setMenu] = useState(false);
  return (
    <tr
      className={`text-center font-semibold ${
        data.is_void ? "text-red-400" : "text-white/50"
      } hover:bg-cyan-900`}
    >
      <td>{data.id}</td>
      <td>Admin</td>
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
              <li className="hover:bg-cyan-500 px-2 py-1 rounded-md ">Print</li>
              <li className="hover:bg-cyan-500 px-2 py-1 rounded-md ">View</li>
              <li className="hover:bg-cyan-500 px-2 py-1 rounded-md ">Edit</li>
              <li className="hover:bg-cyan-500 px-2 py-1 rounded-md ">
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
