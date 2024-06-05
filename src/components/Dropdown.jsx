import { signal } from "@preact/signals-react";
import { useSignals } from "@preact/signals-react/runtime";

const dropdown = signal(false);

const inputValue = signal("");

function Dropdown({ options, selectedValue, placeholderValue }) {
  useSignals();
  const handleClick = () => {
    dropdown.value = !dropdown.value;
  };
  return (
    <div className="relative w-min">
      <div className="flex bg-white rounded-md items-center px-2">
        <input
          type="text"
          placeholder={placeholderValue}
          className="py-1 rounded-md bg-transparent"
          value={inputValue}
          onChange={() => console.log("nice")}
     
        />
        <p onClick={handleClick} className="cursor-pointer">
          🔽
        </p>
      </div>
      {dropdown.value && (
        <ul className="bg-cyan-900 text-white/50 p-2 overflow-y-auto max-h-[200px] absolute w-full z-20">
          {options?.map((obj) => (
            <li
              key={obj.id}
              className="hover:bg-white/30 cursor-pointer"
              onClick={() => {
                selectedValue.value = obj;
                inputValue.value = obj.name;
                dropdown.value = false;
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

export default Dropdown;
