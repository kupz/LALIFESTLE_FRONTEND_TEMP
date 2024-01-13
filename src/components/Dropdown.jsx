import { signal } from "@preact/signals-react";
import { useSignals } from "@preact/signals-react/runtime";

const dropdown = signal(false);

const inputValue = signal("");

function Dropdown({ options, selectedValue }) {
  useSignals();
  const handleClick = () => {
    dropdown.value = !dropdown.value;
  };
  return (
    <div className="relative w-min">
      <div className="flex bg-white rounded-md items-center px-2">
        <input
          type="text"
          placeholder="Select Store (required)"
          className="py-1 rounded-md"
          value={inputValue}
          onChange={()=> console.log('nice')}
        />
        <p onClick={handleClick} className="cursor-pointer">🔽</p>
      </div>
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
            }}
          >
            SM CUBAO DS
          </li>
        </ul>
      )}
    </div>
  );
}

export default Dropdown;
