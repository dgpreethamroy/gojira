import React, { useState } from "react";
import { initialData } from "./data"; // Adjust the path as needed
import { AiOutlineClose, AiOutlineCopy, AiOutlineDelete } from "react-icons/ai";

const CustomTable = ({}) => {
  const [data, setData] = useState(initialData);
  const [selectedRows, setSelectedRows] = useState([]);
  const [draggedItem, setDraggedItem] = useState(null);

  const toggleRowSelection = (id) => {
    setSelectedRows((prevSelectedRows) => {
      if (prevSelectedRows.includes(id)) {
        return prevSelectedRows.filter((rowId) => rowId !== id);
      } else {
        return [...prevSelectedRows, id];
      }
    });
  };

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
      const keys = Object.keys(newData.rows);
      const draggedIndex = keys.findIndex((key) => key === draggedItem.id);
      const targetIndex = keys.findIndex((key) => key === targetItem.id);
      const targetRow = newData.rows[targetItem.id];

      // Remove dragged row from keys array
      keys.splice(draggedIndex, 1);
      // Insert dragged row at target index
      keys.splice(targetIndex, 0, draggedItem.id);

      // Reorder rows
      const reorderedRows = keys.reduce((acc, key) => {
        acc[key] = newData.rows[key];
        return acc;
      }, {});

      newData.rows = reorderedRows;
    }

    setData(newData);
    setDraggedItem(null);
  };

  return (
    <div>
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th
              style={{
                border: "1px solid black",
                padding: "8px",
                margin: "4px",
              }}
            >
              <input
                type="checkbox"
                checked={selectedRows.length === Object.keys(data.rows).length}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedRows(Object.keys(data.rows));
                  } else {
                    setSelectedRows([]);
                  }
                }}
              />
            </th>
            {data.columns.map((column) => (
              <th
                key={column}
                draggable
                onDragStart={(e) => onDragStart(e, { id: column }, "columns")}
                onDragOver={onDragOver}
                onDrop={(e) => onDrop(e, { id: column }, "columns")}
                style={{
                  border: "1px solid black",
                  padding: "8px",
                  margin: "4px",
                  cursor: "move",
                }}
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.keys(data.rows).map((rowId) => (
            <tr
              key={rowId}
              draggable
              onDragStart={(e) => onDragStart(e, { id: rowId }, "rows")}
              onDragOver={onDragOver}
              onDrop={(e) => onDrop(e, { id: rowId }, "rows")}
              style={{
                backgroundColor: isRowSelected(rowId) ? "lightblue" : "inherit",
                cursor: "move",
              }}
            >
              <td
                style={{
                  border: "1px solid black",
                  padding: "8px",
                  margin: "4px",
                }}
              >
                <input
                  type="checkbox"
                  checked={isRowSelected(rowId)}
                  onChange={() => toggleRowSelection(rowId)}
                  onClick={(e) => e.stopPropagation()} // Prevent the row selection from being toggled by the checkbox
                />
              </td>
              {data.columns.map((column) => (
                <td
                  key={column}
                  style={{
                    border: "1px solid black",
                    padding: "8px",
                    margin: "4px",
                  }}
                >
                  {data.rows[rowId][column]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {selectedRows.length > 0 && (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "white",
            border: "1px solid black",
            padding: "20px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            zIndex: "999",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
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
  );
};

export default CustomTable;
