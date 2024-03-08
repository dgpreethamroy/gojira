import { Tab } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Tabs({ tabs, displays, open = null }) {
  const defaultIndex = open ? tabs.indexOf(open) : 0;
  return (
    <div className="w-full  px-2 ">
      <Tab.Group defaultIndex={defaultIndex}>
        <Tab.List className="flex space-x-1 w-4/5">
          {tabs.map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  "w-full rounded-lg py-2.5 text-sm font-semibold leading-5",
                  "ring-white/60 ring-offset-2  focus:outline-none dark:text-white ",
                  selected
                    ? " text-blue-700  underline"
                    : "text-black  hover:text-orange-800"
                )
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
        <div className="w-full h-[1px] bg-gray-300"></div>
        <Tab.Panels className="mt-2">
          {displays.map((posts, idx) => (
            <Tab.Panel
              key={idx}
              className={classNames("rounded-xl bg-[#eae6ff] dark:bg-inherit")}
            >
              <div>{posts}</div>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
