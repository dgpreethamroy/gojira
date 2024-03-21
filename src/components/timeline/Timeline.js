import React, { useRef, useState, useEffect } from "react";

export const Timeline = ({ connectionMatrix, ids, reload }) => {
  console.log("Timeline Componennt");
  // const [needUpdate, setNeedUpdate] = useState(true);
  // const [color, setColor] = useState("#000");
  const targetRef = useRef(null);
  const [LinkPathRef, setLinkPathRef] = useState("");
  const refs = ids.map((id) => {
    const ref = {
      current: document.getElementById(id),
    };

    return ref;
  });

  function getIndicesOfOnes(matrix, localrefs = refs) {
    const indices = [];
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
        if (matrix[i][j] === 1) {
          indices.push([localrefs[i], localrefs[j]]);
        }
      }
    }
    return indices;
  }

  const ones = getIndicesOfOnes(connectionMatrix);
  const [pathRef, setPathRef] = useState(
    Array.from({ length: connectionMatrix.length })
  );

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
    if (!connectionMatrix.length) {
      targetRef.current.style.display = "none";
      return;
    }

    let Updatedrefs = ids.map((id) => {
      const ref = {
        current: document.getElementById(id),
      };

      return ref;
    });
    let Updatedones = getIndicesOfOnes(connectionMatrix, Updatedrefs);
    Updatedones.map((curve, index) => {
      if (!curve[0].current && !curve[1].current) {
        setPathRef((oldPathRef) => {
          const newpath = [...oldPathRef];
          newpath[index] = null;
          return newpath;
        });
        return;
      }

      let start_left = curve[0].current.offsetLeft;
      let start_top = curve[0].current.offsetTop;
      let start_height = curve[0].current.offsetHeight;
      let start_width = curve[0].current.offsetWidth;
      let start_right = start_left + start_width;
      let start_bottom = start_top + start_height;

      let end_top = curve[1].current.offsetTop;
      let end_left = curve[1].current.offsetLeft;
      let end_height = curve[1].current.offsetHeight;
      let end_width = curve[1].current.offsetWidth;
      let end_right = end_left + end_width;
      let end_bottom = end_top + end_height;

      let left,
        top,
        lwdith,
        lheight,
        dir,
        reverse = false;

      left =
        end_left - start_right >= 0
          ? start_right
          : ((reverse = true), end_left);
      lwdith =
        end_left - start_left >= 0
          ? end_left - start_right
          : start_right - end_right + end_width;
      dir = end_top - start_top >= 0 ? -1 : 1;
      top =
        end_top - start_top >= 0
          ? start_bottom - start_height / 2
          : end_bottom - end_height / 2;
      lheight =
        end_top - start_top >= 0
          ? end_top - start_bottom + start_height / 2 + end_height / 2
          : start_top - end_bottom + start_height / 2 + end_height / 2;
      if (dir === -1) {
        if (!reverse) {
          let newppath = `M ${left} ${top} C ${left + lwdith / 2} ${top} ${
            left + lwdith / 2
          } ${top + lheight} ${left + lwdith} ${top + lheight}`;
          setPathRef((oldPathRef) => {
            const newpath = [...oldPathRef];
            newpath[index] = newppath;
            return newpath;
          });
        } else {
          let s1 = start_right;
          let s2 = start_top + start_height / 2;
          let e1 = end_left;
          let e2 = end_top + end_height / 2;
          let y1 = 20 * ((s2 - e2 + 40) / (s1 - e1 + 40)) - s2 - 20;
          let y2 = e2 - 20 + 20 * ((s2 - e2 + 40) / (s1 - e1 + 40));
          let newppath = `
          M ${s1} ${s2} C ${s1 + 20} ${s2} ${s1 + 20} ${
            s2 + 20
          } ${s1} ${-y1} L ${s1} ${-y1} L ${(s1 + e1) / 2} ${
            (s2 + e2) / 2
          } M ${e1} ${e2} C ${e1 - 20} ${e2} ${e1 - 20} ${
            e2 - 20
          } ${e1} ${y2} L ${e1} ${y2} L ${(s1 + e1) / 2} ${(s2 + e2) / 2}
          `;

          setPathRef((oldPathRef) => {
            const newpath = [...oldPathRef];
            newpath[index] = newppath;
            return newpath;
          });
        }
      } else {
        if (!reverse) {
          let newppath = `M ${left} ${top + lheight} C ${left + lwdith / 2} ${
            top + lheight
          } ${left + lwdith / 2} ${top} ${left + lwdith} ${top}`;
          setPathRef((oldPathRef) => {
            const newpath = [...oldPathRef];
            newpath[index] = newppath;
            return newpath;
          });
        } else {
          let s1 = start_right;
          let s2 = start_top + start_height / 2;
          let e1 = end_left;
          let e2 = end_top + end_height / 2;
          let y1 = 20 * ((-e2 + s2 - 40) / (-e1 + s1 + 40)) + e2 + 20;
          let y2 = s2 - 20 - 20 * ((-e2 + s2 - 40) / (-e1 + s1 + 40));

          let newppath = `
          M ${e1} ${e2}
          C ${e1 - 20} ${e2} ${e1 - 20} ${e2 + 20} ${e1} ${y1}
          L ${e1} ${y1}
          L ${(s1 + e1) / 2} ${(s2 + e2) / 2}
          M ${s1} ${s2}
          C ${s1 + 20} ${s2} ${s1 + 20} ${s2 - 20} ${s1} ${y2}
          L ${s1} ${y2}
          L ${(s1 + e1) / 2} ${(s2 + e2) / 2}
          `;
          setPathRef((oldPathRef) => {
            const newpath = [...oldPathRef];
            newpath[index] = newppath;
            return newpath;
          });
        }
      }
    });

    targetRef.current.style.display = "block";
  };

  const handleLinkDown = (e) => {
    const startpos = e.currentTarget;

    const handleLinkMove = (e) => {
      debugger;
      const MoveAt = (pageX, pageY) => {
        setLinkPathRef(
          `M ${startpos.left} ${startpos.top} L ${pageX} ${pageY - 340}`
        );
      };
      MoveAt(e.clientX, e.clientY);
    };
    const handleLinkUp = () => {
      document.removeEventListener("mousemove", handleLinkMove);
      document.removeEventListener("mouseup", handleLinkUp);
      //setLinkPathRef("");
      return;
    };
    document.addEventListener("mousemove", handleLinkMove);
    document.addEventListener("mouseup", handleLinkUp);
    e.preventDefault();
    e.stopPropagation();
  };

  useEffect(() => {
    console.log("Timeline useEffect");
    setPathRef([]);
    let attachEvent;
    let attachLink;
    ids.map((id) => {
      attachEvent = document.getElementById(id);
      attachLink = document.getElementById(id + "Link");
      if (attachEvent) {
        attachEvent.addEventListener("mousedown", handleDownTimeline);
        attachEvent.addEventListener("mouseup", handleUpTimeline);
      }
      if (attachLink) {
        attachLink.addEventListener("mousedown", handleLinkDown);
      }
    });

    targetRef.current.style.display = "none";
    handleUpTimeline();

    ///cleanup
    return () => {
      let attachEvent;
      let attachLink;
      ids.map((id) => {
        attachEvent = document.getElementById(id);
        if (attachEvent) {
          attachEvent.removeEventListener("mousedown", handleDownTimeline);
          attachEvent.removeEventListener("mouseup", handleUpTimeline);
        }
        if (attachLink) {
          attachLink.removeEventListener("mousedown", handleLinkDown);
        }
      });
    };
  }, [connectionMatrix]);
  return (
    <svg ref={targetRef} className="absolute top-0 left-0 w-full h-full ">
      {pathRef?.map((_, index) => (
        <path
          d={pathRef[index]}
          stroke={pathRef[index]?.split("M").length == 2 ? "gray" : "#8B0000"}
          fill="none"
          strokeWidth={2}
        />
      ))}
      {LinkPathRef.length > 0 && (
        <path d={LinkPathRef} stroke="red" fill="none" strokeWidth={2}></path>
      )}
    </svg>
  );
};
