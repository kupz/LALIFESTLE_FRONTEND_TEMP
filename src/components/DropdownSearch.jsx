import { signal } from "@preact/signals-react";
import { useSignals } from "@preact/signals-react/runtime";

const dropdown = signal(false);

const inputValue = signal("");

function DropdownSearch({ options, selectedValue, placeholderValue }) {
  useSignals();

  const handleChange = (e) => {
    inputValue.value = e.target.value.toUpperCase();
    dropdown.value = true;

    if (e.target.value === "") {
      dropdown.value = false;
    }
  };

  const filteredData = options?.filter((obj) =>
    obj.name.includes(inputValue.value.toUpperCase())
  );

  return (
    <div className="relative w-min bg-white rounded-md">
      <input
        type="text"
        placeholder={placeholderValue}
        className="px-2 py-1 rounded-md bg-transparent"
        value={inputValue}
        onChange={handleChange}
      />
      {dropdown.value && (
        <ul className="bg-cyan-900 text-white/50 p-2 overflow-y-auto max-h-[200px] absolute w-full z-10">
          {filteredData?.map((obj) => (
            <li
              key={obj.id}
              className="hover:bg-white/30 cursor-pointer"
              onClick={() => {
                inputValue.value = obj.name;
                selectedValue.value = obj;

                dropdown.value = !dropdown;
              }}
            >
              {obj.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DropdownSearch;
