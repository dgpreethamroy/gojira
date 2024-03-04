import React, { useMemo, useState } from "react";
import Table from "../ui/table/Table2";
import SearchBox from "../ui/filter/Search";
import Avatar from "react-avatar";
const getValuesForObjectKeys = (object, keysArray) => {
  return keysArray.map((key) => object[key]);
};

export const ListIssues = (props) => {
  const [inputSearch, setSearchinput] = useState("");
  const keys = ["description", "issuetype", "summary", "assignee"];
  const labels = ["Description", "Type", "Summary", "Lead"];
  const data = Object.values(props.state.tasks);
  const svgString = (
    <svg width="24" height="24" viewBox="0 0 24 24" role="presentation">
      <g fill="currentColor" fill-rule="evenodd">
        <rect x="18" y="5" width="2" height="6" rx="1"></rect>
        <rect x="16" y="7" width="6" height="2" rx="1"></rect>
        <path d="M5 14c0-1.105.902-2 2.009-2h7.982c1.11 0 2.009.894 2.009 2.006v4.44c0 3.405-12 3.405-12 0V14z"></path>
        <circle cx="11" cy="7" r="4"></circle>
      </g>
    </svg>
  );
  const search_results = useMemo(() => {
    return data?.filter((item) => {
      if (
        getValuesForObjectKeys(item, keys)
          .join(" ")
          .toLowerCase()
          .includes(inputSearch.toLowerCase())
      ) {
        return item;
      }
    });
  }, [data, keys, inputSearch]);

  if (!props.state.tasks) return <div>Loading...</div>;
  if (Object.keys(props.state.tasks).length === 0) return <div>No issues</div>;
  return (
    <div>
      <div id="Filters" className="flex">
        <SearchBox
          placeholder="List"
          inputSearch={inputSearch}
          setSearchinput={setSearchinput}
        />
        {props.info?.projectmembers.map((item) => {
          return (
            <button className="rounded-full hover:bg-gray-300 p-1">
              <Avatar
                name={item.name}
                size="40"
                round
                className="font-semibold "
                textSizeRatio={1}
              />
            </button>
          );
        })}
        <button className="rounded-full hover:bg-gray-300 p-1">
          <Avatar
            src="https://www.clipartmax.com/png/middle/41-410441_add-people-comments-add-people-icon.png"
            size="40"
            round
          />
        </button>
      </div>
      <br />
      <div
        className="overflow-y-auto overflow-x-auto"
        style={{ maxHeight: window.innerHeight - 280 }}
      >
        <Table
          data={search_results}
          labels={labels}
          keys={keys}
          sort={true}
          pagesize={200}
          border={true}
          sticky={true}
          search={false}
          checkbox={true}
        />
      </div>
    </div>
  );
};
