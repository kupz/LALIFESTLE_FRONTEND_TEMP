import { signal } from "@preact/signals-react";
import { useSignals } from "@preact/signals-react/runtime";

const dropdown = signal(false);

const inputValue = signal("");

function DropdownSearch({ options, selectedValue }) {
  useSignals();

  const handleChange = (e) => {
    inputValue.value = e.target.value;
    dropdown.value = true;
  };

  return (
    <div className="relative w-min">
      <input
        type="text"
        placeholder="Select Store (required)"
        className="px-2 py-1 rounded-md"
        value={inputValue}
        onChange={handleChange}
      />
      {dropdown.value && (
        <ul className="bg-cyan-900 text-white/50 p-2 overflow-y-auto max-h-[200px] absolute w-full ">
          <li
            className="hover:bg-white/30"
            onClick={() => {
              if (selectedValue) {
                selectedValue.value = "wew";
              }
              inputValue.value = "wew";
              dropdown.value = false;
              console.log(inputValue.value);
            }}
          >
            SM CUBAO DS
          </li>
        </ul>
      )}
    </div>
  );
}

export default DropdownSearch;
