import React, { useState } from "react";

function StoreItem({ data }) {
  return (
    <tr
      className={`text-center font-semibold ${
        data.is_void ? "text-red-400" : "text-white/50"
      } hover:bg-cyan-900`}
    >
      <td>{data.name}</td>
      <td>{data.consignor}</td>
      <td>{data.description}</td>
      <td>⚙</td>
    </tr>
  );
}

export default StoreItem;
