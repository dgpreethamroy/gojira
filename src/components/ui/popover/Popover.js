import { useState, useEffect } from "react";

export default function Popover({
  label,
  children,
  dir,
  target = false,
  plain = false,
  width = false,
}) {
  const [open, setOpen] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        open &&
        !buttonClicked &&
        (!event.target.closest(".popover") ||
          event.target.closest(".closePopover"))
      ) {
        setOpen(false);
      }
      setButtonClicked(false);
    };

    document.body.addEventListener("click", handleClickOutside);

    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, [open, buttonClicked]);

  const handleOpentoggle = () => {
    setOpen(!open);
    setButtonClicked(true);
  };

  return (
    <div className="w-full max-w-sm px-2">
      <div className="relative">
        <>
          {plain ? (
            <button
              className={`
            inline-flex items-center max-h-10 bg-inherit  text-slate-300  text-base font-medium`}
              onClick={handleOpentoggle}
            >
              {label}
            </button>
          ) : (
            <button
              className={`
                 inline-flex items-center max-h-10 ${
                   target !== false && "hidden"
                 } rounded-md bg-inherit dark:bg-white hover:bg-gray-100  text-slate-300 px-3 py-2 text-base font-medium hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75`}
              onClick={handleOpentoggle}
            >
              {label}
            </button>
          )}
          {open && (
            <div
              className={`popover absolute  z-20 mt-3 ${
                width ? width : "w-screen"
              } max-w-sm  px-4 sm:px-0 ${dir ? dir + "-0" : "right-0"}`}
            >
              <div className="overflow-hidden rounded shadow-lg ring-1 ring-black/5">
                <div className="relative grid gap-8 bg-white  ">{children}</div>
              </div>
            </div>
          )}
        </>
      </div>
    </div>
  );
}
