import { Fragment, useState, useEffect } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/solid";
import Avatar from "react-avatar";
export default function Dropdown({
  data,
  drop,
  setDrop,
  icon = false,
  option = "option",
  splitOption = "",
  avatar = false,
  multiple = false,
}) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const filtereddata =
    query === ""
      ? data
      : data.filter((item) =>
          item[option]
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  return (
    <div className="w-1/3 min-w-[300px] ] ">
      <Combobox value={drop} onChange={setDrop} multiple={multiple}>
        <div className="relative mt-1">
          <div className="relative w-full border-2 items-center pl-2 flex cursor-default overflow-hidden rounded-md bg-white text-left  focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
            {query === "" && !open && drop.icon}
            {multiple ? (
              <Combobox.Input
                className="w-full font-semibold  py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 outline-none focus:ring-0 focus:border-gray-300"
                displayValue={(items) =>
                  items.map((item) => item[option]).join(", ")
                }
                onChange={(event) => setQuery(event.target.value)}
                onFocus={() => setOpen(true)}
                onBlur={() => setOpen(false)}
              />
            ) : (
              <Combobox.Input
                className="w-full font-semibold  py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 outline-none focus:ring-0 focus:border-gray-300"
                displayValue={(item) => item[option]}
                onChange={(event) => setQuery(event.target.value)}
                onFocus={() => setOpen(true)}
                onBlur={() => setOpen(false)}
              />
            )}

            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto z-10 rounded-md bg-white py-1 text-base  ring-1 ring-black/5 focus:outline-none sm:text-sm">
              {filtereddata.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filtereddata.map((item) => (
                  <Combobox.Option
                    key={item.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4   ${
                        active ? "bg-gray-500 text-white" : "text-gray-900"
                      }`
                    }
                    value={item}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          <div className="flex justify-start  items-center">
                            {icon && <span className="px-2">{item.icon}</span>}
                            {avatar && (
                              <Avatar
                                name={item[option]}
                                size="32"
                                round
                                textSizeRatio={1.5}
                              />
                            )}

                            <div className=" ml-2 flex flex-col">
                              <span>{item[option]}</span>
                              {splitOption && (
                                <span className="text-xs ">
                                  {item[splitOption]}
                                </span>
                              )}
                            </div>
                          </div>
                        </span>
                        {selected || item[option] === drop[option] ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? "text-white" : "text-teal-600"
                            }`}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
}
