import React, { useRef, useState } from "react";

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

export const Table = () => {
  const [columnLabels, setColumnLabels] = useState(Object.keys(rows[0]));

  let columnData = {};
  rows.map((row) => {
    columnLabels.map((label) => {
      columnData[label]
        ? columnData[label].push(row[label])
        : (columnData[label] = [row[label]]);
    });
  });

  const dragRef1 = useRef(null);
  const dragRef2 = useRef(null);
  const dragRef3 = useRef(null);
  const dragRef4 = useRef(null);

  const dragRefList = [dragRef1, dragRef2, dragRef3, dragRef4];

  // Define currentDroppable outside handleMouseDown
  let currentDroppable = null;

  const handleSort = (event) => {
    const column = event.target.getAttribute("data-column");
    const direction = event.target.getAttribute("data-direction");

    const sortedRows = [...rows].sort((a, b) => {
      if (a[column] < b[column]) {
        return direction === "ascending" ? -1 : 1;
      }
      if (a[column] > b[column]) {
        return direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
  };

  const handleMouseDown = (event, index) => {
    event.preventDefault();
    //event.stopPropagation();

    const ball = dragRefList[index].current;

    if (!ball) return;

    let initialPositionX = ball.getBoundingClientRect().left;
    let initialPositionY = ball.getBoundingClientRect().top;

    let shiftX = event.clientX - ball.getBoundingClientRect().left;
    let shiftY = event.clientY - ball.getBoundingClientRect().top;

    let paddingX = ball.getBoundingClientRect().top - ball.offsetTop;
    let paddingY = ball.getBoundingClientRect().left - ball.offsetLeft;

    ball.style.position = "absolute";
    ball.style.zIndex = 1000;
    ball.style.border = "1px solid black";
    ball.style.background = "white";

    const moveAt = (pageX, pageY) => {
      ball.style.left = pageX - shiftX + "px";
      ball.style.top = pageY - shiftY + "px";
    };

    moveAt(event.pageX, event.pageY);

    function enterDroppable(elem) {
      elem.style.background = "pink";
    }

    function leaveDroppable(elem) {
      elem.style.background = "";
    }

    const onMouseMove = (event) => {
      moveAt(event.pageX, event.pageY);

      ball.hidden = true;
      let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
      ball.hidden = false;
      if (!elemBelow) return;
      let droppableBelow = elemBelow.closest(".droppable");
      if (currentDroppable != droppableBelow) {
        if (currentDroppable) {
          // null out currentDroppable
          leaveDroppable(currentDroppable);
        }
        currentDroppable = droppableBelow;
        if (currentDroppable) {
          // null out currentDroppable
          enterDroppable(currentDroppable);
        }
      }
    };

    document.addEventListener("mousemove", onMouseMove);

    ball.onmouseup = (event) => {
      document.removeEventListener("mousemove", onMouseMove);
      if (currentDroppable) {
        ball.style.top = currentDroppable.getBoundingClientRect().top + "px";
        ball.style.left = currentDroppable.getBoundingClientRect().left + "px";
        leaveDroppable(currentDroppable);
        currentDroppable = null;
      } else {
        ball.style.top = initialPositionY - paddingY + "px";
        ball.style.left = initialPositionX - paddingX + "px";
      }
      ball.onmouseup = null;
    };
    ball.ondragstart = function () {
      return false;
    };
  };

  return (
    <div className="bg-gray-200">
      <h2 className="text-black text-center bg-slate-500">Table</h2>
      <div className="top-0 left-0  text-black  font-bold  text-xl w-11/12 min-h-[500px] mx-auto  text-center overflow-x-auto  drop-shadow-2xl bg-white ">
        {columnLabels.map((label, index) => (
          <div
            name={label}
            className={` w-[400px] border absolute top-0  droppable `}
            style={{
              left: `${400 * index}px`,
            }}
          >
            <div
              className={`bg-blue-500 text-white font-bold px-2 py-2 hover:cursor-grab relative flex`}
              ref={dragRefList[index]}
              onMouseDown={(event) => handleMouseDown(event, index)}
              id="ball"
            >
              <span className=" z-50 hover:cursor-pointer">
                {label.toUpperCase()}
              </span>
              <span className="z-50 hover:cursor-pointer" onClick={handleSort}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  role="presentation"
                >
                  <path
                    d="M11.293 5.293l-5.5 5.499a1.002 1.002 0 000 1.415.999.999 0 001.414 0L11 8.414V18a1 1 0 002 0V8.414l3.793 3.793a1 1 0 101.414-1.415l-5.5-5.499A.993.993 0 0012 5a.993.993 0 00-.707.293z"
                    fill="currentColor"
                    fill-rule="evenodd"
                  ></path>
                </svg>
              </span>
            </div>
            {columnData[label].map((data) => (
              <div className="  px-2 py-2 border">{data ? data : <br />}</div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
