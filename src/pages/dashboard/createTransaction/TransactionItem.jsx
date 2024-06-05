import React from "react";
import { formatNumberWithCommas } from "../../../services/utils";
function TransactionItem({ data, setCart , cart}) {
  return (
    <tr className="text-center font-semibold text-white/50 hover:bg-cyan-900 cursor-pointer">
      <td>{data.quantity}</td>
      <td>{data.code}</td>
      <td>{data.brand__name}</td>
      <td>{data.description}</td>
      <td>{data.variant}</td>
      <td>{data.item_condition}</td>
      <td>{formatNumberWithCommas(data.price)}</td>
      <td className="text-xs">
        {formatNumberWithCommas(parseInt(data.price) * parseInt(data.quantity))}
      </td>
      <td className="text-xs" onClick={()=>{
        // console.log('remove ', data.code)
        // console.log(cart)
        setCart(cart.filter(item => item.code !== data.code))
      }}>❌</td>
    </tr>
  );
}

export default TransactionItem;
