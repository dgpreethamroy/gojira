import React from "react";
const Table = (props) => {
  return (
    <table className="w-full">
      <thead>
        <tr className="bg-blue-300">
          {props.header?.map((item, index) => (
            <td
              className="px-4 py-2  text-black font-bold dark:text-slate-50"
              key={index}
            >
              <div className="flex items-center">
                <span>{item}</span>
                <span>
                  {props.sort && (
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        d="M11 6v9.586l-3.793-3.793a.999.999 0 00-1.414 0c-.39.39-.39 1.024 0 1.415l5.5 5.499A.993.993 0 0012 19a.993.993 0 00.707-.293l5.5-5.499a1 1 0 10-1.414-1.415L13 15.586V6a1 1 0 00-2 0z"
                        fill="currentColor"
                      />
                    </svg>
                  )}
                </span>
              </div>
            </td>
          ))}
        </tr>
      </thead>
      <tbody>
        {props.body?.map((items, index) => (
          <tr key={index} className="bg-slate-300 ">
            {props.header.map((item) => (
              <td className="px-4 py-2">{items[item]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
