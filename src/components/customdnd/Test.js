import React, { useRef } from "react";

export const Dnd = () => {
  const ballRef = useRef(null);

  const handleMouseDown = (event) => {
    const ball = ballRef.current;

    if (!ball) return;

    let shiftX = event.clientX - ball.getBoundingClientRect().left;
    let shiftY = event.clientY - ball.getBoundingClientRect().top;

    ball.style.position = "absolute";
    ball.style.zIndex = 1000;

    const moveAt = (pageX, pageY) => {
      ball.style.left = pageX - shiftX + "px";
      ball.style.top = pageY - shiftY + "px";
    };

    moveAt(event.pageX, event.pageY);
    // potential droppable that we're flying over right now
    let currentDroppable = null;

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

    ball.onmouseup = () => {
      document.removeEventListener("mousemove", onMouseMove);
      ball.onmouseup = null;
    };
    ball.ondragstart = function () {
      return false;
    };
  };

  return (
    <>
      <p className="droppable">Drag and Drop Here</p>
      <img
        src="https://js.cx/clipart/ball.svg"
        className="hover:cursor-pointer absolute z-50 left-1 top-10"
        width="40"
        height="40"
        id="ball"
        onMouseDown={handleMouseDown}
        ref={ballRef}
      />
    </>
  );
};
