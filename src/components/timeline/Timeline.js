import React, { useRef, useState } from "react";

export const Timeline = () => {
  console.log("Timeline Component");
  const startRef = useRef(null);
  const endRef = useRef(null);
  const targetRef = useRef(null);

  const [view, setView] = useState([-3.1, -3.1, 6.2, 6.2]);
  const [path, setPath] = useState([-3, 3, 3, 3, -3, -3, 3, -3]);
  const [width, setWidth] = useState(100);
  const [height, setHeight] = useState(100);

  const handleDown = (e) => {
    targetRef.current.style.display = "none";
    const startX = e.clientX - e.target.closest(".draggable").offsetLeft;
    const startY = e.clientY - e.target.closest(".draggable").offsetTop;
    const MoveAt = (pageX, pageY) => {
      e.target.closest(".draggable").style.left = pageX - startX + "px";
      e.target.closest(".draggable").style.top = pageY - startY + "px";
    };
    document.onmousemove = (e) => {
      MoveAt(e.pageX, e.pageY);
    };
    document.onmouseup = () => {
      document.onmousemove = null;
      document.onmouseup = null;
    };
    e.preventDefault();
  };

  const handleUp = () => {
    const {
      right: start_right,
      bottom: start_bottom,
      left: start_left,
      top: start_top,
      height: start_height,
    } = startRef.current.getBoundingClientRect();

    const {
      right: end_right,
      bottom: end_bottom,
      left: end_left,
      top: end_top,
      height: end_height,
      width: end_width,
    } = endRef.current.getBoundingClientRect();

    let left,
      top,
      lwdith,
      lheight,
      dir,
      reverse = false;

    left =
      end_left - start_left >= 0 ? start_right : ((reverse = true), end_left);
    lwdith =
      end_left - start_left >= 0
        ? end_left - start_right
        : start_right - end_right + end_width;
    setWidth(reverse ? lwdith + lwdith * 2 * 0.2096125 : lwdith);

    dir = end_top - start_top >= 0 ? -1 : 1;
    top =
      end_top - start_top >= 0
        ? start_bottom - start_height / 2
        : end_bottom - end_height / 2;
    lheight =
      end_top - start_top >= 0
        ? end_top - start_bottom + start_height / 2 + end_height / 2
        : start_top - end_bottom + start_height / 2 + end_height / 2;
    setHeight(lheight);

    targetRef.current.style.left = left;
    targetRef.current.style.top = top;

    if (reverse) {
      targetRef.current.style.left = left - lwdith * 0.2096125;
      targetRef.current.style.top = top;
    }

    if (dir === -1) {
      setView(
        !reverse
          ? [left - 2, top - 2, lwdith + 4, lheight + 4]
          : [left, top, lwdith, lheight]
      );
      setPath(
        !reverse
          ? [
              left,
              top,
              left + lwdith / 2,
              top,
              left + lwdith / 2,
              top + lheight,
              left + lwdith,
              top + lheight,
            ]
          : [
              left + lwdith,
              top,
              left + 2 * lwdith,
              top + lheight / 2,
              left - lwdith,
              top + lheight / 2,
              left,
              top + lheight,
            ]
      );
    } else {
      setView(
        !reverse
          ? [left - 2, top - 2, lwdith + 4, lheight + 4]
          : [left, top, lwdith, lheight]
      );
      setPath(
        !reverse
          ? [
              left,
              top + lheight,
              left + lwdith / 2,
              top + lheight,
              left + lwdith / 2,
              top,
              left + lwdith,
              top,
            ]
          : [
              left,
              top,
              left - lwdith,
              top + lheight / 2,
              left + 2 * lwdith,
              top + lheight / 2,
              left + lwdith,
              top + lheight,
            ]
      );
    }

    targetRef.current.style.display = "block";
  };

  return (
    <div className="bg-green-200 w-[500%] overflow-x-auto h-96">
      <div
        ref={startRef}
        className="absolute draggable w-40 h-10 rounded bg-blue-800 border-2 border-gray-500 hover:cursor-move"
        onMouseDown={handleDown}
        onMouseUp={handleUp}
      ></div>
      <div
        ref={endRef}
        className="absolute draggable w-40 h-10 rounded bg-red-800 border-2 hover:cursor-move border-gray-500"
        onMouseDown={handleDown}
        onMouseUp={handleUp}
      ></div>
      <svg
        ref={targetRef}
        className="absolute  top-10 left-10 "
        width={width}
        height={height}
        viewBox={`${view[0]} ${view[1]} ${view[2]} ${view[3]}`}
      >
        <path
          d={` M ${path[0]} ${path[1]} C ${path[2]} ${path[3]} ${path[4]} ${path[5]} ${path[6]} ${path[7]}`}
          stroke="#0A1247"
          fill="none"
          strokeWidth={2}
        />
      </svg>
    </div>
  );
};
