import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { ChevronDownIcon } from "@heroicons/react/solid";

export default function CustomMenu({
  name,
  align,
  data,
  downIcon = true,
  buttonStyle = null,
  onClick = null,
}) {
  return (
    <div className="text-left">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button
            className={`${
              buttonStyle === false
                ? null
                : "inline-flex w-full justify-center rounded-md bg-slate-200 p-1 customMenu  font-bold text-white hover:bg-slate-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
            }`}
          >
            {name ? name : "Options"}
            {downIcon === false ? null : (
              <ChevronDownIcon
                className="-mr-1 ml-2 h-5 w-5 text-violet-200 hover:text-violet-100"
                aria-hidden="true"
              />
            )}
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items
            className={`absolute ${
              align ? align : "left"
            }-0 mt-2 ml-1  w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none`}
          >
            <div className="px-2 py-2 customMenuOption">
              {data?.map((item) => (
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? "bg-violet-500 text-white" : "text-gray-900 "
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm customMenuOption `}
                      onClick={onClick ? onClick : null}
                    >
                      {/* {active ? (
                              <EditActiveIcon
                                className="mr-2 h-5 w-5"
                                aria-hidden="true"
                              />
                            ) : (
                              <EditInactiveIcon
                                className="mr-2 h-5 w-5"
                                aria-hidden="true"
                              />
                            )} */}
                      <div className="mr-2 h-5 w-5" aria-hidden="true">
                        {item.label}
                      </div>
                      {item.value}
                    </button>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}

// function EditInactiveIcon(props) {
//   return (
//     <svg
//       {...props}
//       viewBox="0 0 20 20"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <path
//         d="M4 13V16H7L16 7L13 4L4 13Z"
//         fill="#EDE9FE"
//         stroke="#A78BFA"
//         strokeWidth="2"
//       />
//     </svg>
//   );
// }
