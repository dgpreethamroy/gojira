import React, { useContext, useEffect, useState } from "react";
import SearchBox from "../ui/filter/Search";
import Avatar from "react-avatar";
import AuthContext from "../../context/AuthProvider";
import IssueModal from "../issue/issueModal";
import { useSearchParams } from "react-router-dom";
import { AiOutlineClose, AiOutlineCopy, AiOutlineDelete } from "react-icons/ai";
import {
  upArrow,
  downArrow,
  waring_Icon,
  listIssuesLabelIcons,
} from "../../assets/CommonData";
import Modal from "../ui/modal/Modal";
import customAxios from "../../api/axios";
import { useNotification } from "../Notifications/NotificationProvider";
import { Scrollbar } from "react-scrollbars-custom";

export const ListIssues = (props) => {
  console.log("ListIssues");
  const { currentUser } = useContext(AuthContext);
  const [arrow, setArrow] = useState("asec");
  const [inputSearch, setSearchinput] = useState("");
  const [data, setData] = useState(null);
  const [listResponse, setListResponse] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [draggedItem, setDraggedItem] = useState(null);
  const [tablewidth, setTableWidth] = useState(0);
  const [showIssue, setShowIssue] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [label, setLabel] = useState("id");
  const [isOpen, setIsOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams({
    selectedIssue: null,
  });
  const dispatch = useNotification();

  useEffect(() => {
    if (props.info.projectmembers && props.state.tasks) {
      let selectedIssue = searchParams.get("selectedIssue");
      if (selectedIssue === "false") {
        setSearchParams((prev) => {
          const newParams = new URLSearchParams(prev);
          newParams.delete("selectedIssue");
          return newParams;
        });
        return;
      }

      if (selectedIssue !== "null" && selectedIssue !== null) {
        setShowIssue(true);
        setSelectedTask(selectedIssue);
      }
    }
  }, [searchParams, data]);

  const handleSort = (column) => {
    debugger;
    if (arrow === "asec") {
      setArrow("desc");
    } else {
      setArrow("asec");
    }
    setLabel(column);
  };

  const getColumnWidth = (title) => {
    if (title === "id") return 100;
    if (title === "summary") return 180;
    if (title === "description") return 380;
    if (title === "issuetype") return 120;
    if (title === "assignee") return 200;
    if (title === "labels") return 300;
    if (title === "createdAt") return 200;
    if (title === "DueDate") return 200;
    if (title === "linkedtasks") return 300;
    return 100;
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
  if (props.info.projectissues && !listResponse) {
    setListResponse({
      ...props.info.projectissues,
      ...props.info.projectListOrder,
    });
  }

  const listData = {
    columns:
      listResponse?.columns?.length > 0
        ? listResponse?.columns
        : listResponse
        ? Object.keys(Object.values(listResponse?.tasks)[0])
        : null,

    rows: listResponse && Object.values(listResponse?.tasks),
  };
  if (!data && listResponse) {
    setData(listData);
    setTableWidth(
      listData?.columns?.reduce((acc, curr) => acc + getColumnWidth(curr), 48)
    );
  }

  if (!props.state.tasks) return <div>Loading...</div>;
  if (Object.keys(props.state.tasks).length === 0) return <div>No issues</div>;

  const isRowSelected = (id) => selectedRows.includes(id);

  const handleCopyToClipboard = () => {
    // Copy selected rows data to clipboard in JSON format
    debugger;

    const selectedData = selectedRows.map((rowId) => props.state.tasks[rowId]);

    // Prepare CSV content
    var csvContent = "";

    // Add headers
    csvContent += Object.keys(selectedData[0]).join(" \t") + "\n";

    // Add rows
    selectedData.forEach(function (obj) {
      var row = Object.values(obj).join(" \t");
      csvContent += row + "\n";
    });
    navigator.clipboard.writeText(csvContent);
    dispatch({
      type: "SUCCESS",
      message: ` ${selectedData.length} ${
        selectedData.length > 1 ? "items" : "item"
      } copied to Clipboard`,
    });
  };

  const handleDeleteRows = () => {
    // Delete selected rows
    debugger;
    async function deleterows() {
      try {
        const result = await customAxios.delete(`/issues/`, {
          data: {
            id: selectedRows,
            project_id: props.info._id,
          },
        });
        debugger;
        console.log(result.data);
        let newData = { ...data };
        selectedRows.forEach((rowId) => {
          newData.rows = newData.rows.filter((row) => row.id !== rowId);
        });
        setData(newData);
        setSelectedRows([]);
        setIsOpen(false);
      } catch (error) {
        console.error(error);
      }
    }
    deleterows();
    dispatch({
      type: "Fail",
      message: ` ${selectedRows.length} ${
        selectedRows.length > 1 ? "items" : "item"
      } deleted`,
    });
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
      const draggedIndex = newData.rows.findIndex(
        (row) => row.id === draggedItem.id
      );
      const targetIndex = newData.rows.findIndex(
        (row) => row.id === targetItem.id
      );

      const tempRow = newData.rows[draggedIndex];
      newData.rows.splice(draggedIndex, 1);
      newData.rows.splice(targetIndex, 0, tempRow);
    }

    setData(newData);
    setDraggedItem(null);
  };
  const search_results = data?.rows?.filter((row) => {
    return (
      row.id.toLowerCase().includes(inputSearch.toLowerCase()) ||
      row.summary.toLowerCase().includes(inputSearch.toLowerCase()) ||
      row.description.toLowerCase().includes(inputSearch.toLowerCase()) ||
      row.issuetype.toLowerCase().includes(inputSearch.toLowerCase()) ||
      row.assignee.toLowerCase().includes(inputSearch.toLowerCase()) ||
      row.createdAt.toLowerCase().includes(inputSearch.toLowerCase()) ||
      row.DueDate.toLowerCase().includes(inputSearch.toLowerCase())
    );
  });

  const search_sorted_results = () => {
    if (arrow === "asec") {
      console.log("asec");
      const sorted = search_results?.sort((a, b) => {
        return a[label].localeCompare(b[label]);
      });
      return sorted;
    } else {
      console.log("desc");
      const sorted = search_results?.sort((a, b) => {
        return b[label].localeCompare(a[label]);
      });
      return sorted;
    }
  };

  const handlecustomScroll = (e) => {
    const initPos = { left: e.clientX };
    const shiftX = initPos.left - e.currentTarget.getBoundingClientRect().left;
    const target = e.target; //initPos.left+100-shiftX
    const handleMove = (e) => {
      function moveAt(pageX) {
        if (pageX - shiftX > 0 && window.innerWidth - 60 > pageX + 100 - shiftX)
          target.style.left = pageX - shiftX + "px";
      }
      moveAt(e.pageX);
    };

    const handleUp = (e) => {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseup", handleUp);
    };
    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseup", handleUp);
  };
  if (!currentUser) return <div>Loading...</div>;

  return (
    <div>
      <div id="Filters" className="flex ">
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
      <Scrollbar
        style={{ height: window.innerHeight - 285, borderRadius: "8px" }}
        trackYProps={{
          renderer: (props) => {
            let newprops = { ...props };
            newprops.style.top = 50;
            newprops.style.right = 10;
            newprops.style.height = window.innerHeight - 345;

            const { elementRef, ...restProps } = newprops;
            return <span {...restProps} ref={elementRef} className="trackY" />;
          },
        }}
        trackXProps={{
          renderer: (props) => {
            let newprops = { ...props };
            newprops.style.left = 0;
            newprops.style.bottom = 10;
            newprops.style.width = window.innerWidth - 66;
            const { elementRef, ...restProps } = newprops;

            return <span {...restProps} ref={elementRef} className="TrackX" />;
          },
        }}
        wrapperProps={{
          renderer: (props) => {
            let newprops = { ...props };
            newprops.style.borderRadius = 8;
            newprops.style.paddingLeft = 10;
            const { elementRef, ...restProps } = newprops;
            return (
              <span
                {...restProps}
                ref={elementRef}
                className="MyAwesomeScrollbarsWrapper"
              />
            );
          },
        }}
      >
        <div className="rounded-lg  bg-white border border-gray-300 ">
          {
            // document.getElementsByClassName('ScrollbarsCustom-Track ScrollbarsCustom-TrackY')[0].style.top = '50px'
          }

          <table style={{ width: tablewidth + "px" }}>
            <thead className="sticky top-0 bg-slate-100">
              <tr>
                <th className="m-2 p-3 items-center w-12  text-center">
                  <input
                    type="checkbox"
                    checked={selectedRows?.length === data?.rows?.length}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedRows(data.rows.map((row) => row.id));
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
                    className={`m-1 border border-t-0 border-gray-300 font-normal hover:cursor-grab hover-div text-gray-700 items-center text-center
                    `}
                    style={{ width: getColumnWidth(column) }}
                  >
                    <div className="flex justify-start pl-1">
                      {listIssuesLabelIcons[column]}
                      {column === "issuetype"
                        ? "Type"
                        : column === "id"
                        ? "Key"
                        : column.charAt(0).toUpperCase() + column.slice(1)}
                      {(column !== "labels") ^
                      (column !== "linkedtasks") ? null : (
                        <div
                          onClick={() => handleSort(column)}
                          className={`${
                            label === column
                              ? "opacity-100"
                              : "opacity-0 toggle-div"
                          }  cursor-pointer  `}
                        >
                          {arrow === "asec" ? downArrow : upArrow}
                        </div>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-slate-50 h-10">
              {search_sorted_results()?.map((row) => (
                <tr
                  key={row.id}
                  // draggable
                  // onDragStart={(e) => onDragStart(e, { id: row.id }, "rows")}
                  // onDragOver={onDragOver}
                  // onDrop={(e) => onDrop(e, { id: row.id }, "rows")}
                  style={{
                    backgroundColor: isRowSelected(row.id)
                      ? "lightblue"
                      : "inherit",
                  }}
                  className=" h-10"
                >
                  <td className="border border-gray-300 border-l-0 m-1 p-2  items-center text-center">
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
                      className="border border-gray-300 p-2 m-1 "
                    >
                      {column === "labels" ? (
                        <div className="flex justify-start">
                          {row[column].map((label) => (
                            <span className="bg-gray-300 rounded mx-1  ">
                              <p className="px-2">{label}</p>
                            </span>
                          ))}
                        </div>
                      ) : column === "linkedtasks" ? (
                        <div className="flex justify-center">
                          {row[column].map((linkedtask) => (
                            <span className="bg-gray-300 rounded mx-1 items-center ">
                              <p className="px-2">{linkedtask}</p>
                            </span>
                          ))}
                        </div>
                      ) : column === "id" ? (
                        <button
                          onClick={() => {
                            setSelectedTask(row[column]);
                            setSearchParams((prev) => {
                              const newParams = new URLSearchParams(prev);
                              newParams.set("selectedIssue", row[column]);
                              return newParams;
                            });
                          }}
                        >
                          <p className="underline">{row[column]}</p>
                        </button>
                      ) : (
                        row[column]
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          <Modal isOpen={isOpen} setIsOpen={setIsOpen} medium>
            <Modal.Header className="h-12">
              <p className="font-semibold flex items-center">
                {waring_Icon}
                Delete {selectedRows.length}{" "}
                {selectedRows.length > 1 ? "items" : "item"} ?
              </p>
            </Modal.Header>
            <p>
              You’re about to permanently delete this {selectedRows.length}{" "}
              {selectedRows.length > 1 ? "items" : "item"}. All comments,
              attachments, data and associated subtasks will be deleted.
            </p>
            <br />
            <p>
              If you’re not sure, you can resolve or close these items instead.
            </p>
            <Modal.Footer>
              <button
                className="p-2 m-2 rounded font-medium"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
              <button
                className="py-2 px-3 bg-red-700 text-white rounded"
                onClick={handleDeleteRows}
              >
                Delete
              </button>
            </Modal.Footer>
          </Modal>

          {showIssue && (
            <IssueModal
              details={{
                task: props.state.tasks[selectedTask],
                projectmembers: props.info.projectmembers,
              }}
              showIssue={showIssue}
              setShowIssue={setShowIssue}
              setSelectIssue={setSearchParams}
            />
          )}
          {selectedRows.length > 0 && (
            <div className="fixed bottom-5 left-1/2 transform  translate-x-[-50%] bg-white border p-5 rounded-xl shadow-2xl z-50 flex justify-between items-center">
              <div className="border-r-2 border-gray-800 px-2">{`${
                selectedRows.length
              } ${selectedRows.length > 1 ? "rows" : "row"}  selected`}</div>
              <div style={{ display: "flex" }}>
                <button
                  style={{ display: "flex", alignItems: "center" }}
                  className="px-2"
                  onClick={handleCopyToClipboard}
                >
                  <AiOutlineCopy />
                  Copy to Clipboard
                </button>
                <button
                  className="px-2"
                  style={{ display: "flex", alignItems: "center" }}
                  onClick={() => setIsOpen(true)}
                >
                  <AiOutlineDelete />
                  Delete
                </button>
              </div>
              <button onClick={() => setSelectedRows([])} className="px-2">
                <AiOutlineClose />
              </button>
            </div>
          )}
        </div>
        {/* <div id="cc" className="relative top-[-10px] ">
        <div
          className="absolute track rounded-2xl w-full h-[10px] z-10 bg-transparent hover:bg-gray-300 hover-div hover:opacity-50"
          onClick={(e) => {
            if (e.target.closest(".thumb")) return;
            alert("Parent");
          }}
        >
          <div
            className=" absolute thumb rounded-2xl w-[100px] h-[10px] thumb-div bg-gray-400 z-10 "
           
            onMouseDown={handlecustomScroll}
          ></div>
        </div>
      </div> */}
      </Scrollbar>
    </div>
  );
};
