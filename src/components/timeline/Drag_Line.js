import React, { useState } from "react";

export const Drag_Line = () => {
  const [pathRef, setPathRef] = useState("");
  let startpos = {};

  const handleDown = (e) => {
    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseup", handleUp);
    startpos = e.target.getBoundingClientRect();
  };
  const handleMove = (e) => {
    const MoveAt = (pageX, pageY) => {
        setPathRef(`M ${startpos.left} ${startpos.right} L ${pageX} ${pageY}`);
      };
      MoveAt(e.clientX, e.clientY);
  };
  const handleUp = () => {
    document.removeEventListener("mousemove", handleMove);
    document.removeEventListener("mouseup", handleUp);
  };

  return (
    <div>
      <p
        className="hover:cursor-pointer absolute z-10"
        onMouseDown={handleDown}
      >
        §
      </p>
      <svg className="absolute top-0 left-0 w-full h-full z-5 ">
        <path d={pathRef} stroke={"gray"} fill="none" strokeWidth={2} />
      </svg>
    </div>
  );
};
