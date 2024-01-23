import { signal } from "@preact/signals-react";
import Dropdown from "../../../components/Dropdown";
import DropdownSearch from "../../../components/DropdownSearch";
import { useSignals } from "@preact/signals-react/runtime";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { useCookies } from "react-cookie";
import { getStores } from "../../../api/storesApi";
import {
  addTransaction,
  getTransactionDetail,
  getTransactionType,
} from "../../../api/transactionApi";
import { getProductConditions, getProducts } from "../../../api/productsApi";
import ItemcodeSearch from "../../../components/ItemCodeSearch";
import ItemconditionDropdown from "./ItemconditionDropdown";
import TransactionItem from "./TransactionItem";
import { toast } from "react-toastify";
import {
  convertToNegative,
  convertToPositive,
  formatNumberWithCommas,
} from "../../../services/utils";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const watsonsConsignor = signal(true);

const selectedStore = signal("");
const selectedTransactionType = signal("");
const selectedItemcode = signal("");
const selectedCondition = signal(null);
const quantity = signal("");

export const transactionToUpdate = signal(null);

// const cart = signal([]);

export const clearItemcode = signal(false);

// getTransactionDetail(transactionToUpdate.value).then((res) => {
//   console.log(res);
// });

function UpdateTransaction() {
  useSignals();

  const [cart, setCart] = useState([]);

  const { data: transactionDetail, isLoading } = useQuery({
    queryKey: ["transactionDetail", transactionToUpdate.value],
    queryFn: () => getTransactionDetail(transactionToUpdate.value),
  });

  if (isLoading) {
    console.log("Loading");
  } else {
    const prevData = transactionDetail.items.map((item) => {
      return {
        ...item,
        id: item.product__id,
        code: item.product__code,
        brand__name: item.product__brnad__name,
        quantity: convertToPositive(item.quantity),
        description: item.product__description,
        variant: item.product__variant,
        price: item.price,
        item_condition: item.item_condition__name,
      };
    });
    setCart(prevData);
  }

  const queryClient = useQueryClient();
  const navigate = useNavigate();

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

  // add transaction mutation
  const addTransactionMutation = useMutation({
    mutationFn: addTransaction,
    onSuccess: () => {
      toast("transaction successfully added!");
      queryClient.invalidateQueries("transactions");
      navigate("/delivery");
    },
  });

  // Handle add to cart
  const addtocart = (e) => {
    if (e.key === "Enter") {
      if (cart.some((item) => item.code === selectedItemcode.value.code))
        toast.error("itemcode already exist!");
      else {
        if (selectedCondition.value) {
          const newProduct = {
            ...selectedItemcode.value,
            item_condition: selectedCondition.value.name,
            quantity: quantity.value,
          };
          setCart([newProduct, ...cart])
          selectedItemcode.value = "";
          quantity.value = "";
          clearItemcode.value = true;
        } else {
          toast.error("Please Select an Item Condition!");
        }
      }
    }
  };

  // create ref for remarks
  const remarksRef = useRef(null);

  // handle submit
  const handleSubmit = () => {
    const postData = {
      store: selectedStore.value.name,
      transaction_type: selectedTransactionType.value.name,
      remarks: remarksRef.current.value,
      items: cart.map((item) => {
        return {
          item_id: item.id,
          qty:
            selectedTransactionType.value.name === "Delivery"
              ? convertToNegative(parseInt(item.quantity))
              : parseInt(item.quantity),
          item_condition: item.item_condition,
          price: item.price,
        };
      }),
    };

    if (!cart.length < 1) {
      addTransactionMutation.mutate(postData);
    } else {
      toast.error("No Product selected to process this transaction");
    }
  };

  console.log(transactionDetail);

  return (
    <div className="flex-1 flex flex-col gap-4">
      <div className="flex justify-between">
        <p className="font-bold text-white/60">Create Transaction</p>
        {/* {transactionDetail && <h1>successfully</h1>} */}
      </div>
      <div className="flex gap-4 items-center">
        <DropdownSearch
          selectedValue={selectedStore}
          options={stores}
          placeholderValue={"Store Name"}
        />
        <Dropdown
          key="transactionType"
          placeholderValue={"Select Transaction"}
          options={transactionTypes}
          selectedValue={selectedTransactionType}
        />
        <input
          type="text"
          placeholder="Remarks"
          ref={remarksRef}
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
          placeholderValue={"Select Product Condition"}
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
        <button
          className="px-5 py-1 bg-cyan-400 rounded-md text-white font-semibold"
          onClick={handleSubmit}
          disabled={addTransactionMutation.isPending}
        >
          Submit
        </button>
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
            {cart.map((obj) => (
              <TransactionItem key={obj.code} data={obj} cart={cart} setCart={setCart} />
            ))}
          </tbody>
        </table>
      </div>
      <div className="w-full bg-white/60 text-cyan-800 flex gap-5 px-5 py-2 items-center justify-between">
        <button className="font-bold bg-cyan-900 px-4 py-1 rounded-md text-white/50 text-xs">
          {formatNumberWithCommas(
            cart.reduce(
              (accumulator, currentValue) =>
                accumulator + parseInt(currentValue.quantity),
              0
            )
          )}
        </button>
        <p className="font-bold"></p>
        <button className="font-bold bg-cyan-900 px-4 py-1 rounded-md text-white/50 text-xs">
          {formatNumberWithCommas(
            cart.reduce(
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

export default UpdateTransaction;
