import React, { useState } from "react";
import {
  convertToPositive,
  formatNumberWithCommas,
  fromUTCtoManila,
} from "../services/utils";

function ProductItem({ data }) {
  return (
    <tr
      className={`text-center font-semibold ${
        data.is_void ? "text-red-400" : "text-white/50"
      } hover:bg-cyan-900`}
    >
      <td>{data.id}</td>
      <td>Admin</td>

      <td className="text-xl cursor-pointer relative">
        <p>Edit</p>
      </td>
    </tr>
  );
}

export default ProductItem;
