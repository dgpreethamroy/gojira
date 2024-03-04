import React, { useRef, useState } from "react";

const SearchBox = ({ placeholder, inputSearch, setSearchinput }) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);
  const handleClick = () => {
    // Focus the sibling input element when button is clicked
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div
      className={`flex items-center   border-2 font-semibold ${
        isFocused ? "border-blue-500 " : "border-gray-300 "
      }  rounded-3xl bg-white `}
    >
      <input
        ref={inputRef}
        className="px-2 py-2 outline-none rounded-3xl rounded-r-none  h-full "
        placeholder={`Search ${placeholder && placeholder}`}
        value={inputSearch}
        onChange={(e) => setSearchinput(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {inputSearch === "" ? (
        <span
          className="bg-white px-2 rounded-3xl rounded-l-none hover:cursor-text "
          onClick={handleClick}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" role="presentation">
            <path
              d="M16.436 15.085l3.94 4.01a1 1 0 01-1.425 1.402l-3.938-4.006a7.5 7.5 0 111.423-1.406zM10.5 16a5.5 5.5 0 100-11 5.5 5.5 0 000 11z"
              fill="currentColor"
              fill-rule="evenodd"
            ></path>
          </svg>
        </span>
      ) : (
        <button
          className="bg-white px-2 py-2 rounded-3xl rounded-l-none h-full "
          onClick={() => setSearchinput("")}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" role="presentation">
            <path
              d="M12 10.586L6.707 5.293a1 1 0 00-1.414 1.414L10.586 12l-5.293 5.293a1 1 0 001.414 1.414L12 13.414l5.293 5.293a1 1 0 001.414-1.414L13.414 12l5.293-5.293a1 1 0 10-1.414-1.414L12 10.586z"
              fill="currentColor"
            ></path>
          </svg>
        </button>
      )}
    </div>
  );
};
export default SearchBox;
