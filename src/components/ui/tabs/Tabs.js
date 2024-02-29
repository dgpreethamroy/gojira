import { Tab } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Tabs({ tabs, displays, open = null }) {
  const defaultIndex = open ? tabs.indexOf(open) : 0
  return (
    <div className="w-full  px-2 ">
      <Tab.Group defaultIndex={defaultIndex}>
        <Tab.List className="flex space-x-1">
          {tabs.map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  "w-full rounded-lg py-2.5 text-sm font-semibold leading-5",
                  "ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                  selected
                    ? "bg-white text-blue-700  underline"
                    : "text-black  hover:text-orange-800"
                )
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          {displays.map((posts, idx) => (
            <Tab.Panel
              key={idx}
              className={classNames("rounded-xl bg-[#eae6ff]")}
            >
              <div>{posts}</div>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
