import React, { useState } from "react";
import { formatNumberWithCommas } from "../../../services/utils";

function StockItem({ data }) {
  return (
    <tr
      className={`text-center font-semibold ${
        data.is_void ? "text-red-400" : "text-white/50"
      } hover:bg-cyan-900`}
    >
      <td>{data.code}</td>
      <td>{data.brand__name}</td>
      <td>{data.description}</td>
      <td>{data.variant}</td>
      <td>{formatNumberWithCommas(data.stocks)}</td>
      <td>{formatNumberWithCommas(data.price)}</td>
      <td>{formatNumberWithCommas(data.price * data.stocks)}</td>
    </tr>
  );
}

export default StockItem;
