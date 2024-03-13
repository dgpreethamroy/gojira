import React, { useContext, useEffect, useMemo, useState } from "react";
import SearchBox from "../ui/filter/Search";
import Avatar from "react-avatar";
import axios from "../../api/axios";
import AuthContext from "../../context/AuthProvider";
import { AiOutlineClose, AiOutlineCopy, AiOutlineDelete } from "react-icons/ai";

export const ListIssues = (props) => {
  console.log("ListIssues");
  const { auth, currentUser } = useContext(AuthContext);
  const [inputSearch, setSearchinput] = useState("");
  const [data, setData] = useState(null);
  const [listResponse, setListResponse] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [draggedItem, setDraggedItem] = useState(null);

  const getColumnWidth = (title) => {
    if (title === 'id') return 1000;
    if (title === 'summary') return 180;
    if (title === 'description') return 380;

    if (title === 'issuetype') return 120;
    if (title === 'assignee') return 200;
    if (title === 'labels') return 300;
    if (title === 'createdAt') return 200;
    if (title === 'DueDate') return 200;

  };

  const toggleRowSelection = (id) => {
    setSelectedRows((prevSelectedRows) => {
      if (prevSelectedRows.includes(id)) {
        return prevSelectedRows.filter((rowId) => rowId !== id);
      } else {
        return [...prevSelectedRows, id];
      }
    });
  };
  useEffect(() => {
    console.log("ListIssues useEffect");
    const fetch_projectdetails = async () => {
      if (currentUser) {
        try {
          const response = await axios.get(`/projects/${props.project_id.id}`);

          console.log({
            ...response.data.projectissues,
            ...response.data.projectListOrder,
          });
          if (!listResponse)
            setListResponse({
              ...response.data.projectissues,
              ...response.data.projectListOrder,
            });
        } catch (e) {
          console.log(e);
        }
      }
    };
    fetch_projectdetails();
  }, []);

  const listData = {
    columns:
      listResponse?.columns?.length > 0
        ? listResponse?.columns
        : listResponse
          ? Object.keys(Object.values(listResponse?.tasks)[0])
          : null,

    rows: listResponse && Object.values(listResponse?.tasks),
  };
  if (!data && listResponse) setData(listData);
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
  // const search_results = useMemo(() => {
  //   return data?.filter((item) => {
  //     if (
  //       getValuesForObjectKeys(item, keys)
  //         .join(" ")
  //         .toLowerCase()
  //         .includes(inputSearch.toLowerCase())
  //     ) {
  //       return item;
  //     }
  //   });
  // }, [data, keys, inputSearch]);

  if (!props.state.tasks) return <div>Loading...</div>;
  if (Object.keys(props.state.tasks).length === 0) return <div>No issues</div>;

  const isRowSelected = (id) => selectedRows.includes(id);

  const handleCopyToClipboard = () => {
    // Copy selected rows data to clipboard in JSON format
    const selectedData = selectedRows.map((rowId) => data.rows[rowId]);
    navigator.clipboard.writeText(JSON.stringify(selectedData));
  };

  const handleDeleteRows = () => {
    // Delete selected rows
    const newData = { ...data };
    selectedRows.forEach((rowId) => {
      delete newData.rows[rowId];
    });
    setData(newData);
    setSelectedRows([]);
  };

  const onDragStart = (e, item, type) => {
    setDraggedItem({ ...item, type });
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onDrop = (e, targetItem, type) => {
    const newData = { ...data };

    if (draggedItem.type === "columns") {
      const draggedIndex = newData.columns.findIndex(
        (column) => column === draggedItem.id
      );
      const targetIndex = newData.columns.findIndex(
        (column) => column === targetItem.id
      );

      // Reorder columns
      const tempColumn = newData.columns[draggedIndex];
      newData.columns.splice(draggedIndex, 1);
      newData.columns.splice(targetIndex, 0, tempColumn);
    } else if (draggedItem.type === "rows") {
      const draggedIndex = newData.rows.findIndex((row) => row.id === draggedItem.id);
      const targetIndex = newData.rows.findIndex((row) => row.id === targetItem.id);



      const tempRow = newData.rows[draggedIndex];
      newData.rows.splice(draggedIndex, 1);
      newData.rows.splice(targetIndex, 0, tempRow);

    }

    setData(newData);
    setDraggedItem(null);
  };
  if (!currentUser) return <div>Loading...</div>;
  return (
    <div>
      <div id="Filters" className="flex m-1">
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
                size="30"
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
            size="30"
            round
          />
        </button>
      </div>
      <br />
      <div className="rounded-2xl rounded-r-none bg-white border border-gray-300 h-96 w-full overflow-scroll">
        
          <table>
            <thead className="sticky top-0 bg-slate-100">
              <tr>
                <th className="m-2 p-4 items-center text-center ">
                  <input
                    type="checkbox"
                    checked={selectedRows?.length === data?.rows?.length}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedRows(data.rows.map(row => row.id));
                      } else {
                        setSelectedRows([]);
                      }
                    }}
                  />
                </th>
                {data?.columns?.map((column) => (
                  <th
                    key={column}
                    draggable
                    onDragStart={(e) =>
                      onDragStart(e, { id: column }, "columns")
                    }
                    onDragOver={onDragOver}
                    onDrop={(e) => onDrop(e, { id: column }, "columns")}
                    className={`m-1 border border-t-0 border-gray-300 hover:cursor-move items-center text-center
                    `}
                    style={{ width: getColumnWidth(column) }}
                  >
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-slate-100">
              {data?.rows?.map((row) => (
                <tr
                  key={row.id}
                  draggable
                  onDragStart={(e) => onDragStart(e, { id: row.id }, "rows")}
                  onDragOver={onDragOver}
                  onDrop={(e) => onDrop(e, { id: row.id }, "rows")}
                  style={{
                    backgroundColor: isRowSelected(row.id)
                      ? "lightblue"
                      : "inherit",
                    cursor: "move",
                  }}
                  className="item-center text-center"
                >
                  <td className="border border-gray-300 border-l-0 m-1 p-2">
                    <input
                      type="checkbox"
                      checked={isRowSelected(row.id)}
                      onChange={() => toggleRowSelection(row.id)}
                      onClick={(e) => e.stopPropagation()} // Prevent the row selection from being toggled by the checkbox
                    />
                  </td>
                  {data.columns.map((column) => (
                    <td
                      key={column}
                      className="border border-gray-300 p-2 m-1"

                    >
                      {column === 'labels' ? (
                        <div className="flex">
                          {row[column].map((label) =>
                            <span className="bg-gray-300 rounded mx-1 items-center text-center">
                              <p className="px-2" >{label}</p>
                            </span>)
                          }
                        </div>


                      ) : row[column]}

                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {selectedRows.length > 0 && (
            <div className="fixed bottom-5 left-1/2 transform  translate-x-[-50%] bg-white border p-5 rounded-xl shadow-2xl z-50 flex justify-between items-center">
              <div>{`${selectedRows.length} rows selected`}</div>
              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  style={{ display: "flex", alignItems: "center" }}
                  onClick={handleCopyToClipboard}
                >
                  <AiOutlineCopy />
                  Copy to Clipboard
                </button>
                <button
                  style={{ display: "flex", alignItems: "center" }}
                  onClick={handleDeleteRows}
                >
                  <AiOutlineDelete />
                  Delete
                </button>
              </div>
              <button onClick={() => setSelectedRows([])}>
                <AiOutlineClose />
              </button>
            </div>
          )}
        
      </div>
    </div>
  );
};
