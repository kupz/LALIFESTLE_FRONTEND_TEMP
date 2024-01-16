import { signal } from "@preact/signals-react";
import Dropdown from "../../../components/Dropdown";
import DropdownSearch from "../../../components/DropdownSearch";
import { useSignals } from "@preact/signals-react/runtime";
// import { useCookies } from "react-cookie";

const watsonsConsignor = signal(true);

function CreateTransactionPage() {
  useSignals();
 
  return (
    <div className="flex-1 flex flex-col gap-4">
      <div className="flex justify-between">
        <p className="font-bold text-white/60">Create Transaction</p>
      </div>
      <div className="flex gap-4 items-center">
        <DropdownSearch />
        <Dropdown />
        <input
          type="text"
          placeholder="Remarks"
          className="px-2 py-1 rounded-md"
        />
        <div className="flex items-center gap-2">
          <div
            className="w-[22px] h-[22px] text-center text-white/50 border-gray border cursor-pointer"
            onClick={() => {
              watsonsConsignor.value = !watsonsConsignor.value;
            }}
          >
            ​{watsonsConsignor.value && "✔"}
          </div>
          <p className="font-semibold text-white/50">Watsons Consignor</p>
        </div>
      </div>
      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Itemcode"
          className="px-2 py-1 rounded-md"
        />
        <input
          type="number"
          placeholder="Quantity"
          className="px-2 py-1 rounded-md"
        />
      </div>
      <div className="p-2 flex gap-5 justify-between bg-green-300">
        <p>ITEMCODE</p>
        <p>BRAND</p>
        <p>DESCRIPTION</p>
        <p>SHADE</p>
        <p>PRICE</p>
      </div>
      <div className="h-full overflow-y-auto w-full">
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
            <tr className="text-center font-semibold text-white/50 hover:bg-cyan-900">
              <td>1</td>
              <td>Admin</td>
              <td>RR#10101</td>
              <td>SM MEGA MALL DS</td>
              <td>1,200</td>
              <td>1,200,000.00</td>
              <td>JAN 02 2024, 7:00PM</td>
              <td className="text-xs">more...</td>
            </tr>
            <tr className="text-center font-semibold text-red-400 hover:bg-cyan-900">
              <td>1</td>
              <td>Admin</td>
              <td>RR#10101</td>
              <td>SM MEGA MALL DS</td>
              <td>1,200</td>
              <td>1,200,000.00</td>
              <td>JAN 02 2024, 7:00PM</td>
              <td className="text-xs">more...</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="w-full bg-white/60 text-cyan-800 flex gap-5 px-5 py-2 items-center justify-between">
        <button className="font-bold bg-cyan-900 px-4 py-1 rounded-md text-white/50 text-xs">
          PREV
        </button>
        <p className="font-bold">Page 1</p>
        <button className="font-bold bg-cyan-900 px-4 py-1 rounded-md text-white/50 text-xs">
          NEXT
        </button>
      </div>
    </div>
  );
}

export default CreateTransactionPage;
