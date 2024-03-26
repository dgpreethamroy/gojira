import React, { useRef, useState, useEffect } from "react";
import { Issuedata, LinkIcon_Black } from "../../assets/CommonData";
import { useParams } from "react-router-dom";
export const Timeline = ({
  connectionMatrix,
  ids,
  handleNewLinkConnection,
  handleLinkClick,
  data,
}) => {
  console.log("Timeline Componennt");

  const targetRef = useRef(null);
  const [LinkPathRef, setLinkPathRef] = useState("");
  const [showConnection, setShowConnection] = useState(false);
  const [connPosition, setConnPosition] = useState({ left: 0, top: 0 });
  const [connEndPoints, setConnEndPoints] = useState({
    start: null,
    end: null,
  });
  const refs = ids.map((id) => {
    const ref = {
      current: document.getElementById(id),
    };

    return ref;
  });
  const url = useParams();
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

  const [pathRef, setPathRef] = useState(
    Array.from({ length: connectionMatrix.length })
  );
  let timeline = false;
  const handleDownTimeline = (e) => {
    console.log("down");

    timeline = true;
    targetRef.current.style.display = "none";

    document.onmouseup = () => {
      document.onmousemove = null;
      document.onmouseup = null;
    };
    e.preventDefault();
  };

  const handleUpTimeline = () => {
    if (!timeline) return;
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
    timeline = false;
  };

  const handleLinkDown = (e) => {
    console.log("grabbded");
    const startpos = e.currentTarget.closest(".draggable");
    const padding = e.currentTarget.closest(".timelineRef");
    const paddingX = padding.scrollLeft;
    const paddingY = padding.getBoundingClientRect().top - padding.scrollTop;
    const startX = startpos.offsetLeft + startpos.offsetWidth;
    const startY = startpos.offsetTop + startpos.offsetHeight / 2;
    const handleLinkMove = (e) => {
      const MoveAt = (pageX, pageY) => {
        setLinkPathRef(
          `M ${startX} ${startY} L ${
            pageX + paddingX - ((window.innerWidth - 88) / 4 + 44)
          } ${pageY - paddingY - 48}`
        );
      };
      MoveAt(e.pageX, e.pageY);
    };
    const handleLinkUp = (e, startpos) => {
      console.log("released");
      if (e.target.closest(".draggable")?.id.indexOf("task") === 0) {
        handleNewLinkConnection(startpos.id, e.target.closest(".draggable").id);
      }
      document.removeEventListener("mouseup", (e) => handleLinkUp(e, startpos));
      document.removeEventListener("mousemove", handleLinkMove);
      setLinkPathRef("");
    };
    document.addEventListener("mousemove", handleLinkMove);
    document.addEventListener("mouseup", (e) => handleLinkUp(e, startpos), {
      once: true,
    });
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
    timeline = true;
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

  const LinkClick = (e, index) => {
    let start = getIndicesOfOnes(connectionMatrix)[index][0].current;
    let end = getIndicesOfOnes(connectionMatrix)[index][1].current;

    setShowConnection(true);
    setConnPosition({
      left:
        e.clientX +
        start.closest(".timelineRef").scrollLeft -
        ((window.innerWidth - 88) / 4 + 44),
      top:
        e.clientY +
        start.closest(".timelineRef").scrollTop -
        48 -
        start.closest(".timelineRef").offsetTop,
    });

    setConnEndPoints({
      start: start,
      end: end,
    });
    const handleClose = () => {
      setShowConnection(false);
      document.removeEventListener("click", handleClose);
    };
    document.addEventListener("click", handleClose);
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <>
      <svg ref={targetRef} className="absolute top-0 left-0 w-full h-full ">
        {pathRef?.map((_, index) => (
          <path
            className="hover:cursor-pointer"
            d={pathRef[index]}
            stroke={pathRef[index]?.split("M").length == 2 ? "gray" : "#8B0000"}
            fill="none"
            strokeWidth={2}
            onClick={(e) => LinkClick(e, index)}
          />
        ))}
        {LinkPathRef.length > 0 && (
          <path d={LinkPathRef} stroke="red" fill="none" strokeWidth={2}></path>
        )}
      </svg>
      {showConnection && (
        <div
          className="absolute border-2 border-slate-200 shadow-2xl rounded-xl top-0 left-0 w-80 h-44 z-[20] text-black bg-white"
          style={{
            left: connPosition.left,
            top: connPosition.top,
          }}
        >
          <div className="p-2">
            <div className="shadow-2xl p-1 border-2 border-slate-200 rounded w-full h-[60px]">
              <p className="flex">
                {Issuedata.map(
                  (item, index) =>
                    item.value ===
                      data.tasks[connEndPoints.start.id]["issuetype"] && (
                      <p key={index}>{item.icon}</p>
                    )
                )}
                <p className="truncate">
                  {data.tasks[connEndPoints.start.id]["summary"]}
                </p>
              </p>
              <p className="text-sm text-gray-500 flex">
                <p className="px-7">Due date</p>
                {data.tasks[connEndPoints.start.id]["DueDate"]}
              </p>
            </div>
            <div className="justify-around flex h-[35px]">
              <div className="flex items-center">
                <p className="w-1 h-full border-2 border-red-800"></p>
                <svg className="w-5 h-5">{LinkIcon_Black}</svg>
              </div>
              <button
                onClick={() => {
                  handleLinkClick(connEndPoints.start.id, connEndPoints.end.id);
                }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  role="presentation"
                >
                  <path
                    d="M13.721 14.43a.972.972 0 00-1.37-.004l-2.088 2.059a1.928 1.928 0 01-1.37.568c-.588 0-1.135-.26-1.525-.738-.634-.777-.505-1.933.203-2.643l1.321-1.322.002.001.688-.686a.974.974 0 000-1.377l-.002-.003a.972.972 0 00-1.375 0l-2.068 2.07a3.892 3.892 0 000 5.497l.009.01A3.87 3.87 0 008.892 19a3.87 3.87 0 002.746-1.139l2.083-2.085a.951.951 0 000-1.345zm-3.442-4.86a.972.972 0 001.37.004l2.088-2.058c.366-.367.853-.57 1.37-.57.588 0 1.135.26 1.525.739.634.777.505 1.933-.203 2.643l-1.321 1.322-.002-.001-.688.686a.974.974 0 000 1.377l.002.003c.38.38.995.38 1.375 0l2.068-2.07a3.892 3.892 0 000-5.497l-.009-.01A3.87 3.87 0 0015.108 5a3.87 3.87 0 00-2.746 1.139l-2.083 2.085a.951.951 0 000 1.345zM8.924 4.618l.401.968a1 1 0 11-1.848.765l-.4-.968a1 1 0 111.848-.765M5.383 7.076l.968.401a1.001 1.001 0 01-.766 1.848l-.968-.4a1.001 1.001 0 01.766-1.848m9.932 10.413a1.003 1.003 0 00-.542 1.307l.402.968A1 1 0 1017.023 19l-.401-.967a1 1 0 00-1.307-.542zm2.176-2.174a1 1 0 00.54 1.306l.969.401a1.001 1.001 0 00.766-1.848l-.969-.4a1 1 0 00-1.306.542z"
                    fill="currentColor"
                    fill-rule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
            <div className="shadow-2xl border-2 p-2 border-slate-5=200 rounded w-full h-[60px]">
              <p className="flex">
                {Issuedata.map(
                  (item, index) =>
                    item.value ===
                      data.tasks[connEndPoints.end.id]["issuetype"] && (
                      <p key={index}>{item.icon}</p>
                    )
                )}
                <p className="truncate">
                  {data.tasks[connEndPoints.end.id]["summary"]}
                </p>
              </p>
              <p className="text-sm text-gray-500 flex">
                <p className="px-7">created date</p>
                {data.tasks[connEndPoints.end.id]["createdAt"]}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
