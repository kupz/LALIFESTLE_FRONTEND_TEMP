import { signal } from "@preact/signals-react";
import Dropdown from "../../../components/Dropdown";
import DropdownSearch from "../../../components/DropdownSearch";
import { useSignals } from "@preact/signals-react/runtime";
import { useQuery } from "@tanstack/react-query";
// import { useCookies } from "react-cookie";
import { getStores } from "../../../api/storesApi";
import { getTransactionType } from "../../../api/transactionApi";
import { getProductConditions, getProducts } from "../../../api/productsApi";
import ItemcodeSearch from "../../../components/ItemCodeSearch";
import ItemconditionDropdown from "./ItemconditionDropdown";
import TransactionItem from "./TransactionItem";
import { toast } from "react-toastify";
import { formatNumberWithCommas } from "../../../services/utils";

const watsonsConsignor = signal(true);

const selectedStore = signal("");
const selectedTransactionType = signal("");
const selectedItemcode = signal("");
const selectedCondition = signal(null);
const quantity = signal("");

const cart = signal([]);

export const clearItemcode = signal(false);

function CreateTransactionPage() {
  useSignals();

  // get stores from server
  const { data: stores } = useQuery({
    queryKey: ["stores"],
    queryFn: getStores,
  });

  // get transaction type from server
  const { data: transactionTypes } = useQuery({
    queryKey: ["transaction_type"],
    queryFn: getTransactionType,
  });

  // get products
  const { data: products } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  // get itemcondition from server
  const { data: itemConditions } = useQuery({
    queryKey: ["conditions"],
    queryFn: getProductConditions,
  });

  // Handle add to cart
  const addtocart = (e) => {
    if (e.key === "Enter") {
      if (cart.value.some((item) => item.code === selectedItemcode.value.code))
        toast.error("itemcode already exist!");
      else {
        if (selectedCondition.value) {
          const newProduct = {
            ...selectedItemcode.value,
            item_condition: selectedCondition.value.name,
            quantity: quantity.value,
          };
          cart.value = [newProduct, ...cart.value];
          selectedItemcode.value = "";
          quantity.value = "";
          clearItemcode.value = true;
        } else {
          toast.error("Please Select an Item Condition!");
        }
      }
    }
  };

  return (
    <div className="flex-1 flex flex-col gap-4">
      <div className="flex justify-between">
        <p className="font-bold text-white/60">Create Transaction</p>
      </div>
      <div className="flex gap-4 items-center">
        <DropdownSearch
          selectedValue={selectedStore}
          options={stores}
          placeholderValue={"Select Store (required)"}
        />
        <Dropdown
          key="transactionType"
          placeholderValue={"Transaction type (required)"}
          options={transactionTypes}
          selectedValue={selectedTransactionType}
        />
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
        <ItemconditionDropdown
          key={"conditions"}
          placeholderValue={"Select Product Condition (required)"}
          options={itemConditions}
          selectedValue={selectedCondition}
        />
        <ItemcodeSearch
          selectedValue={selectedItemcode}
          options={products}
          placeholderValue={"Itemcode"}
          clearItemcode={clearItemcode}
        />
        <input
          type="number"
          placeholder="Quantity"
          className="px-2 py-1 rounded-md"
          onKeyDown={addtocart}
          value={quantity.value}
          onChange={(e) => (quantity.value = e.target.value)}
        />
      </div>

      <div className="h-full overflow-y-auto w-full">
        <table className="table-auto w-full border-spacing-y-5 border-separate">
          <thead>
            <tr className="bg-white/60 text-cyan-800">
              <th>Qty</th>
              <th>Itemcode</th>
              <th>Brand</th>
              <th>Description</th>
              <th>Variant</th>
              <th>Condition</th>
              <th>SRP</th>
              <th>Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cart.value.map((obj) => (
              <TransactionItem key={obj.code} data={obj} />
            ))}
          </tbody>
        </table>
      </div>
      <div className="w-full bg-white/60 text-cyan-800 flex gap-5 px-5 py-2 items-center justify-between">
        <button className="font-bold bg-cyan-900 px-4 py-1 rounded-md text-white/50 text-xs">
          {formatNumberWithCommas(
            cart.value.reduce(
              (accumulator, currentValue) =>
                accumulator + parseInt(currentValue.quantity),
              0
            )
          )}
        </button>
        <p className="font-bold"></p>
        <button className="font-bold bg-cyan-900 px-4 py-1 rounded-md text-white/50 text-xs">
          {formatNumberWithCommas(
            cart.value.reduce(
              (accumulator, currentValue) =>
                accumulator +
                parseFloat(currentValue.price * currentValue.quantity),
              0
            )
          )}
        </button>
      </div>
      <div className="w-full text-white/15 flex gap-5 px-5 py-2 items-center justify-center font-semibold">
        Copyright © 2024 BJ VILLABESA ®
      </div>
    </div>
  );
}

export default CreateTransactionPage;
