import { signal } from "@preact/signals-react";
import { useSignals } from "@preact/signals-react/runtime";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { clearItemcode } from "../pages/dashboard/createTransaction";

const dropdown = signal(false);

// const inputValue = signal("");

function ItemcodeSearch({ options, selectedValue, placeholderValue }) {
  useSignals();

  // state for input
  const [inputValue, setInputValue] = useState("");

  // create a ref for itemcode input
  const itemcodeRef = useRef(null);

  const handleChange = (e) => {
    setInputValue(e.target.value.toUpperCase());
    dropdown.value = true;

    if (e.target.value === "") {
      dropdown.value = false;
    }
  };

  const filteredData = options?.filter((obj) =>
    obj.code.includes(inputValue.toUpperCase())
  );

  // Handle Tab
  const handleTab = (e) => {
    if (e.key === "Tab") {
      const itemcodeResult = checkItemcode();
      if (itemcodeResult && itemcodeResult.code) {
        setInputValue(itemcodeResult.code);
        selectedValue.value = itemcodeResult;
        // console.log(itemcodeResult.code);

        dropdown.value = !dropdown;
      } else {
        e.preventDefault();
        toast.error("Itemcode dont exist!");
      }
    }
  };

  // HandleBlur
  const handleBlur = (e) => {
    if (inputValue !== "") {
      const itemcodeResult = checkItemcode();
      if (itemcodeResult && itemcodeResult.code) {
        setInputValue(itemcodeResult.code);
        selectedValue.value = itemcodeResult;
        console.log(itemcodeResult.code);

        dropdown.value = !dropdown;
      } else {
        toast.error("Itemcode dont exist!");
        itemcodeRef.current.focus();
      }
    }
  };

  // Check if itemcode match
  const checkItemcode = () => {
    return filteredData.find((obj) => obj.code === inputValue);
  };

  // clear itemcode
  if (clearItemcode.value) {
    setTimeout(() => {
      setInputValue("");
      itemcodeRef.current.focus();
      clearItemcode.value = !clearItemcode.value;
    }, 100);
  }

  return (
    <div className="relative w-min bg-white rounded-md">
      <input
        type="text"
        placeholder={placeholderValue}
        className="px-2 py-1 rounded-md bg-transparent"
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleTab}
        onBlur={handleBlur}
        ref={itemcodeRef}
      />
      {dropdown.value && (
        <ul className="bg-cyan-900 text-white/50 p-2 overflow-y-auto max-h-[200px] absolute w-full ">
          {filteredData?.map((obj) => (
            <li
              key={obj.id}
              className="hover:bg-white/30 cursor-pointer"
              onClick={() => {
                setInputValue(obj.code);
                selectedValue.value = obj;

                dropdown.value = !dropdown;
              }}
            >
              {`${obj.code} - ${obj.description} - ${obj.variant}`}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ItemcodeSearch;
