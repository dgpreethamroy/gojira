import React, { useEffect, useRef } from "react";

const DragDropContext = ({ children }) => {
  return <div className="bg-green-500 w-full h-[400px] flex">{children}</div>;
};

const Draggable = ({ children, dragRef, handleMouseDown, className }) => {
  return (
    <div
      ref={dragRef}
      className={`bg-blue-500 hover:cursor-grab z-50  h-[fit-content] ${
        className && className
      }`}
      onMouseDown={handleMouseDown}
      id="ball"
    >
      {children}
    </div>
  );
};
const Droppable = ({ children, className, style }) => {
  return (
    <div
      className={`bg-red-500 absolute w-[200px] h-[350px] border  ${
        className ? className : " top-5 left-5"
      }`}
      style={style}
    >
      {children}
    </div>
  );
};

export const Dnd = () => {
  const dragRef1 = useRef(null);
  const dragRef2 = useRef(null);
  const dragRef3 = useRef(null);

  const dragRefList = [dragRef1, dragRef2, dragRef3];

  // Define currentDroppable outside handleMouseDown
  let currentDroppable = null;

  const handleMouseDown = (event, index) => {
    const ball = dragRefList[index].current;

    if (!ball) return;

    let initialPositionX = ball.getBoundingClientRect().left;
    let initialPositionY = ball.getBoundingClientRect().top;

    let initeventX = event.pageX;
    let initeventY = event.pageY;

    let shiftX = event.clientX - ball.getBoundingClientRect().left;
    let shiftY = event.clientY - ball.getBoundingClientRect().top;

    let paddingX = ball.getBoundingClientRect().top - ball.offsetTop;
    let paddingY = ball.getBoundingClientRect().left - ball.offsetLeft;

    ball.style.position = "absolute";
    ball.style.zIndex = 1000;

    const moveAt = (pageX, pageY) => {
      if (!currentDroppable) return;

      const droppableRect = currentDroppable.getBoundingClientRect();
      const droppableLeft = droppableRect.left + window.scrollX;
      const droppableTop = droppableRect.top + window.scrollY;

      ball.style.left = pageX - droppableLeft - shiftX + "px";
      ball.style.top = pageY - droppableTop - shiftY + "px";
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

  const labels = ["Name", "Type", "Lead"];

  return (
    <DragDropContext>
      <p className="font-bold text-white">Main Container</p>
      {labels.map((label, index) => (
        <Droppable className="droppable" style={{ left: index * 200 + "px" }}>
          <p className="text-white font-bold">
            Droppable -- Column {index + 1}
          </p>
          <Draggable
            dragRef={dragRefList[index]}
            handleMouseDown={(e) => handleMouseDown(e, index)}
          >
            <p className="text-white font-bold px-2 py-2">Drag This {label}</p>
          </Draggable>
          <p className="text-white font-bold px-2 py-2">
            Sample-{index + 1} data-1{" "}
          </p>
          <p className="text-white font-bold px-2 py-2">
            Sample-{index + 1} data-2{" "}
          </p>
          <p className="text-white font-bold px-2 py-2">
            Sample-{index + 1} data-3{" "}
          </p>
          <p className="text-white font-bold px-2 py-2">
            Sample-{index + 1} data-4{" "}
          </p>
          <p className="text-white font-bold px-2 py-2">
            Sample-{index + 1} data-5{" "}
          </p>
          <p className="text-white font-bold px-2 py-2">
            Sample-{index + 1} data-6{" "}
          </p>
        </Droppable>
      ))}
    </DragDropContext>
  );
};
