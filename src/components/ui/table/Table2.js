import React, { useState, useMemo, useCallback } from "react";

const Table = (props) => {
  const [searchinput, setSearchinput] = useState("");
  const PAGESIZE = props.pagesize ? props.pagesize : 5;
  const [CURRENTPAGE, setCurrentPage] = useState(1);
  const [sort, setSort] = useState("asec");
  const [value, setValue] = useState(props.keys[0]);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseOver = () => {
    setIsHovered(true);
  };

  const handleMouseOut = () => {
    setIsHovered(false);
  };

  const handleSort = useCallback(
    (label) => {
      if (props.sort === false) return;
      if (sort === "asec") {
        setSort("desc");
      } else {
        setSort("asec");
      }
      setValue(props.keys[props.labels.indexOf(label)]);
    },
    [props.sort, sort, props.keys, props.labels]
  );

  const getValuesForObjectKeys = (object, keysArray) => {
    return keysArray.map((key) => object[key]);
  };

  const search_results = useMemo(() => {
    return props.data?.filter((item) => {
      if (
        getValuesForObjectKeys(item, props.keys)
          .join(" ")
          .toLowerCase()
          .includes(searchinput.toLowerCase())
      ) {
        return item;
      }
    });
  }, [props.data, props.keys, searchinput]);

  const sortProjects = useMemo(() => {
    if (props.sort !== true) return search_results;
    if (sort === "asec") {
      console.log("asec");
      const sorted = search_results.sort((a, b) => {
        return a[value].localeCompare(b[value]);
      });
      return sorted;
    } else {
      console.log("desc");
      const sorted = search_results.sort((a, b) => {
        return b[value].localeCompare(a[value]);
      });
      return sorted;
    }
  }, [props.sort, search_results, sort, value]);

  const filtered_results = sortProjects?.slice(
    (CURRENTPAGE - 1) * PAGESIZE,
    CURRENTPAGE * PAGESIZE
  );

  const sortingIcons = useMemo(
    () => (label) => {
      return (
        <div
          className="flex items-center"
          onClick={() => handleSort(label)}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        >
          <span>{label}</span>
          {props.sort &&
            (sort === "asec" ? (
              <svg
                className={`${
                  props.keys[props.labels.indexOf(label)] === value
                    ? "opacity-100"
                    : isHovered
                    ? "opacity-50"
                    : "opacity-0"
                }`}
                width="20"
                height="20"
                viewBox="0 0 22 22"
                role="presentation"
              >
                <path
                  d="M11 6v9.586l-3.793-3.793a.999.999 0 00-1.414 0c-.39.39-.39 1.024 0 1.415l5.5 5.499A.993.993 0 0012 19a.993.993 0 00.707-.293l5.5-5.499a1 1 0 10-1.414-1.415L13 15.586V6a1 1 0 00-2 0z"
                  fill="currentColor"
                ></path>
              </svg>
            ) : (
              <svg
                className={`${
                  props.keys[props.labels.indexOf(label)] === value
                    ? "opacity-100"
                    : isHovered
                    ? "opacity-50"
                    : "opacity-0"
                }  rotate-180`}
                width="20"
                height="20"
                viewBox="0 0 22 22"
                role="presentation"
              >
                <path
                  d="M11 6v9.586l-3.793-3.793a.999.999 0 00-1.414 0c-.39.39-.39 1.024 0 1.415l5.5 5.499A.993.993 0 0012 19a.993.993 0 00.707-.293l5.5-5.499a1 1 0 10-1.414-1.415L13 15.586V6a1 1 0 00-2 0z"
                  fill="currentColor"
                ></path>
              </svg>
            ))}
        </div>
      );
    },
    [handleSort, isHovered, props.keys, props.labels, props.sort, sort, value]
  );

  return (
    <div className="">
      <input
        className={`px-4 py-2 border shadow-md rounded-lg  my-2 sticky top-2 ${
          !props.search && "hidden"
        }   `}
        value={searchinput}
        onChange={(e) => setSearchinput(e.target.value)}
        placeholder="Search"
      />
      <table className="w-full table-auto">
        <thead className="sticky top-0 ">
          <tr className="bg-blue-300 ">
            {props.checkbox && (
              <td className="rounded-tl-xl ">
                <input type="checkbox" className=" ml-4 " />
              </td>
            )}
            {props.labels?.map((label, index) => (
              <td
                className={`px-4 py-2  text-black font-bold dark:text-slate-50 ${
                  props.border && "border border-gray-600 "
                }`}
                key={index}
              >
                {sortingIcons(label)}
              </td>
            ))}
          </tr>
        </thead>
        <tbody>
          {filtered_results?.map((items, index) => (
            <tr
              key={index}
              className={`bg-slate-300 ${
                props.border && "border border-gray-600"
              }`}
              id={props.id ? items[props.id] : null}
            >
              {props.checkbox && (
                <td>
                  <input type="checkbox" className=" ml-4 " />
                </td>
              )}
              {props.keys.map((item, index) => (
                <td
                  className={`px-4 py-2 ${
                    props.onClick && props.onClick[index]
                      ? "hover:cursor-pointer underline text-blue-600"
                      : null
                  }  ${props.border && "border border-gray-600"}`}
                  onClick={
                    props.onClick && props.onClick[index]
                      ? props.onClick[index]
                      : null
                  }
                >
                  {items[item]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {props.pagesize < 50 && (
        <nav
          className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4"
          aria-label="Table navigation"
        >
          <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
            <li>
              <button
                id="prev"
                disabled={CURRENTPAGE === 1}
                onClick={() => {
                  setCurrentPage(CURRENTPAGE - 1);
                }}
                className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                {"<"}
              </button>
            </li>
            <li>
              <button className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                {CURRENTPAGE}
              </button>
            </li>

            <li>
              <button
                id="next"
                disabled={
                  CURRENTPAGE === Math.ceil(search_results.length / PAGESIZE)
                }
                onClick={() => {
                  setCurrentPage(CURRENTPAGE + 1);
                }}
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                {">"}
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default Table;
