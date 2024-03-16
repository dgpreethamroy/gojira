import React, { useRef, useState, useEffect } from "react";

export const Timeline = ({ connectionMatrix, ids }) => {
  console.log("Timeline Componennt");
  const targetRef = useRef(null);
  const refs = ids.map((id) => {
    const ref = {
      current: document.getElementById(id),
    };

    return ref;
  });

  function getIndicesOfOnes(matrix) {
    const indices = [];
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
        if (matrix[i][j] === 1) {
          indices.push([refs[i], refs[j]]);
        }
      }
    }
    return indices;
  }

  const ones = getIndicesOfOnes(connectionMatrix);
  const [path, setPath] = useState(() => {
    const n = ones.length; // Number of rows
    const m = 8; // Number of columns
    return Array.from({ length: n }, () => Array(m).fill(0));
  });
  //console.log(path);
  // const boxpathRef = useRef(Array.from({ length: ones.length }));
  const [width, setWidth] = useState(100);
  const [height, setHeight] = useState(100);

  const handleDownTimeline = (e) => {
    console.log("down");
    targetRef.current.style.display = "none";

    document.onmouseup = () => {
      document.onmousemove = null;
      document.onmouseup = null;
    };
    e.preventDefault();
  };

  const handleUpTimeline = () => {
    console.log("up");

    ones.map((curve, index) => {
      let {
        right: start_right,
        bottom: start_bottom,
        left: start_left,
        top: start_top,
        height: start_height,
      } = curve[0].current.getBoundingClientRect();

      let {
        right: end_right,
        bottom: end_bottom,
        left: end_left,
        top: end_top,
        height: end_height,
        width: end_width,
      } = curve[1].current.getBoundingClientRect();

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

      if (dir === -1) {
        if (!reverse) {
          setPath((oldpath) => {
            const newPath = [...oldpath];
            newPath[index] = [
              left,
              top,
              left + lwdith / 2,
              top,
              left + lwdith / 2,
              top + lheight,
              left + lwdith,
              top + lheight,
            ];
            return newPath;
          });
        } else {
          setPath((oldpath) => {
            const newPath = [...oldpath];
            newPath[index] = [
              left + lwdith,
              top,
              left + 2 * lwdith,
              top + lheight / 2,
              left - lwdith,
              top + lheight / 2,
              left,
              top + lheight,
            ];
            //  console.log(index, oldpath[index]);

            return newPath;
          });
        }
      } else {
        if (!reverse) {
          setPath((oldpath) => {
            const newPath = [...oldpath];
            newPath[index] = [
              left,
              top + lheight,
              left + lwdith / 2,
              top + lheight,
              left + lwdith / 2,
              top,
              left + lwdith,
              top,
            ];
            return newPath;
          });
        } else {
          setPath((oldpath) => {
            const newPath = [...oldpath];
            newPath[index] = [
              left,
              top,
              left - lwdith,
              top + lheight / 2,
              left + 2 * lwdith,
              top + lheight / 2,
              left + lwdith,
              top + lheight,
            ];
            return newPath;
          });
        }
      }
    });

    targetRef.current.style.display = "block";
  };
  let attachEvent;
  ids.map((id) => {
    attachEvent = document.getElementById(id);
    if (attachEvent)
      attachEvent.addEventListener("mousedown", handleDownTimeline);
    attachEvent.addEventListener("mouseup", handleUpTimeline);
  });
  useEffect(() => {
    console.log("Timeline useEffect");
  }, [path]);
  return (
    <div className="bg-green-200 w-[500%] overflow-x-auto h-96">
      <svg
        ref={targetRef}
        className="absolute z-0 top-0 left-0 w-[1536px] h-[816px] "
        viewBox="0 0 1536 816 "
      >
        {path?.map((curve, index) => (
          <path
            // ref={boxpathRef[index]}
            d={` M ${curve[0]} ${curve[1]} C ${curve[2]} ${curve[3]} ${curve[4]} ${curve[5]} ${curve[6]} ${curve[7]}`}
            stroke="#0A1247"
            fill="none"
            strokeWidth={3}
          />
        ))}
      </svg>
    </div>
  );
};
