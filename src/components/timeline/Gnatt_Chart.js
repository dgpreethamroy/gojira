import React, { useEffect, useRef, useState } from "react";
import { TestData } from "../../assets/CommonData";
import dayjs, { Dayjs } from "dayjs";
const weekOfYear = require("dayjs/plugin/weekOfYear");

const Filters = ["Weeks", "Months", "Quaters"];
function getPreviousMonday(date = new Date()) {
  const today = date.getDay(); // 0 for Sunday, 1 for Monday, and so on

  if (today === 1) {
    // If today is Monday, return today
    return date;
  } else {
    // Calculate the date of the previous Monday
    const dateCopy = new Date(date.getTime());
    const previousMonday = new Date(
      dateCopy.setDate(dateCopy.getDate() - ((dateCopy.getDay() + 6) % 7 || 7))
    );
    return previousMonday;
  }
}
export const Gnatt_Chart = () => {
  const labelref = useRef(null);
  const timelineRef = useRef(null);
  const container = useRef(null);
  const timelineheaderRef = useRef(null);
  const [currentFilter, setCurrentFilter] = useState(Filters[0]);
  const [Length, setLength] = useState(0);
  const [timelineheader, setTimelineHeader] = useState(<div>March</div>);
  const [adjusted, setAdjusted] = useState(null);
  const [start, setStart] = useState(null);
  const quaters_data = ["JAN-MAR", "APR-JUNE", "JULY-SEP", "OCT-DEC"];

  useEffect(() => {
    console.log("Gnatt useEffect");
    document.body.style.backgroundColor = "antiquewhite";
    let currentMonth = dayjs().add(1, "years");
    let names = [];
    if (currentFilter === Filters[1]) {
      for (let i = 0; i < 25; i++) {
        // Add name of current month to the array
        if (currentMonth.format("YYYY") === "2024")
          names.push(
            <div className="px-20 pt-3 h-12  border-[0.25px] text-sm  border-gray-400">
              {currentMonth.format("MMM")}
            </div>
          );
        else
          names.push(
            <div className="px-20 pt-3 h-12 border-[0.25px] text-sm text-nowrap border-gray-400">
              {currentMonth.format("MMM") + " '" + currentMonth.format("YY")}
            </div>
          );

        // Move to the previous month
        currentMonth = currentMonth.subtract(1, "month");
      }
      setTimelineHeader(names.reverse());
      if (!adjusted) {
        setAdjusted(container.current.getBoundingClientRect().top);
      }
    } else if (currentFilter === Filters[2]) {
      let currentMonth = dayjs().$d.getMonth();
      let currentQuater = quaters_data[Math.floor(currentMonth / 3)];
      let currentYear = dayjs().format("YY");
      let tempData = quaters_data
        .map((Q) => Q + " '" + (Number(currentYear) - 1))
        .concat(
          quaters_data,
          quaters_data.map((Q) => Q + " '" + (Number(currentYear) + 1)),
          quaters_data.map((Q) => Q + " '" + (Number(currentYear) + 2))
        );
      let index = tempData.indexOf(currentQuater);
      let names = tempData.slice(index - 4, index + 9).map((Q, index) => (
        <div
          key={index}
          className="px-16 py-2 h-12 pt-3 border-[0.25px] text-nowrap text-sm border-gray-400"
        >
          {Q}
        </div>
      ));
      setTimelineHeader(names);
    } else {
      let lastyear = dayjs(getPreviousMonday(dayjs().subtract(1, "years").$d));
      if (!start) setStart(lastyear.$d);
      let initPos = dayjs().diff(lastyear, "days") * 27;
      let nextyear = dayjs(getPreviousMonday(dayjs().add(2, "years").$d));
      let weeks = [];
      let currentYear = dayjs();
      let length = 0;
      while (true) {
        length += 197;
        weeks.push(
          <div
            key={lastyear.format("DD-MM-YYYY")}
            id={lastyear.format("DD-MM-YYYY")}
            className="  h-12 border-[0.25px] text-nowrap text-sm border-gray-400"
          >
            <div className="text-center text-sm">
              {currentYear.format("YY") === lastyear.format("YY") ? (
                <span>{lastyear.format("MMM")}</span>
              ) : (
                <span>
                  {lastyear.format("MMM") + " '" + lastyear.format("YY")}
                </span>
              )}
            </div>
            <div className="flex text-xs pt-1 text-center">
              <span className="mx-1  w-5 ">{lastyear.format("DD")}</span>
              <span className="mx-1  w-5">
                {lastyear.add(1, "days").format("DD")}
              </span>
              <span className="mx-1  w-5">
                {lastyear.add(2, "days").format("DD")}
              </span>
              <span className="mx-1  w-5">
                {lastyear.add(3, "days").format("DD")}
              </span>
              <span className="mx-1  w-5">
                {lastyear.add(4, "days").format("DD")}
              </span>
              <span className=" mx-1 w-5 bg-slate-400 rounded">
                {lastyear.add(5, "days").format("DD")}
              </span>
              <span className="mx-1  w-5  bg-slate-400 rounded">
                {lastyear.add(6, "days").format("DD")}
              </span>
            </div>
          </div>
        );
        if (lastyear.format("DD-MM-YYYY") === nextyear.format("DD-MM-YYYY"))
          break;
        lastyear = lastyear.add(1, "weeks");
      }
      timelineheaderRef.current.style.width = length + "px";
      setTimelineHeader(weeks);
      timelineRef.current.scrollTo({ left: initPos });
    }
  }, [currentFilter]);

  const handleScroll = (e) => {
    console.log(e.target.scrollTop);
    timelineRef.current.scrollTop = e.target.scrollTop;
    labelref.current.scrollTop = e.target.scrollTop;
  };
  const handleFilters = (e) => {
    setCurrentFilter(e.target.innerText);
  };

  /////
  let isDrag = false;
  let startX;
  let button;
  let buttonInitleft;
  let buttonInitwidth;
  let leftButton = false;
  let rightButton = false;
  const handleDown = (e) => {
    isDrag = true;
    button = e.currentTarget;
    if (e.target.classList.contains("rightButton")) rightButton = true;
    if (e.target.classList.contains("leftButton")) leftButton = true;

    buttonInitleft = Number(
      button.style.left.substring(0, button.style.left.length - 2)
    );
    buttonInitwidth = Number(
      button.style.width.substring(0, button.style.width.length - 2)
    );

    startX = e.clientX;

    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseup", handleUp);
  };

  const handleMove = (e) => {
    console.log("In");
    e.preventDefault();
    if (!isDrag) return;
    const MoveAt = (pageX) => {
      if (!rightButton) {
        if (buttonInitwidth - pageX + startX < 112) return;

        button.style.left = pageX - startX + buttonInitleft + "px";
      }
      //  Math.round((pageX - startX + buttonInitleft) / 28) * 28 + "px"; /// Implement it
      else if (rightButton) {
        if (pageX - startX + buttonInitwidth < 112) return;

        button.style.width = pageX - startX + buttonInitwidth + "px";
      }
      if (leftButton) {
        button.style.width = buttonInitwidth - pageX + startX + "px";

        //console.log( buttonInitwidth - pageX + startX);
      }
    };

    MoveAt(e.pageX);
  };

  const handleUp = (e) => {
    console.log("Out");
    document.removeEventListener("mousemove", handleMove);
    document.removeEventListener("mouseup", handleUp);
    leftButton = false;
    rightButton = false;
    buttonInitwidth = null;
    buttonInitleft = null;
    isDrag = false;
    button = null;
  };

  /////

  return (
    <div
      ref={container}
      className="w-auto  flex flex-rows  overflow-y-auto   m-5 rounded-2xl"
    >
      <div
        ref={labelref}
        className="w-[25%] overflow-x-hidden   scrollbar-none h-[300px] border-r border-slate-400"
        onScroll={handleScroll}
      >
        <div
          key="labelheader"
          className="  p-2 pt-3 border-[.25px] h-12 text-start text-sm rounded-tl-2xl sticky top-0 border-gray-500 bg-slate-200"
        >
          Items
        </div>
        {Object.values(TestData.tasks).map((task, index) => {
          return (
            <div
              key={"label" + task.id}
              className={`p-2   border-gray-500 ${
                index % 2 === 0 ? "bg-slate-50" : "bg-slate-200"
              }`}
            >
              {task.id}
            </div>
          );
        })}
      </div>
      <div
        ref={timelineRef}
        className="w-[75%]  overflow-x-auto scroll-pb-10 scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-slate-700 scrollbar-track-slate-300 scrollbar-track-hover:slate-900 h-[315px]"
        onScroll={handleScroll}
      >
        <div
          key="timelineheader"
          ref={timelineheaderRef}
          className="bg-slate-200  z-10 flex sticky top-0"
        >
          {timelineheader}
        </div>
        <div
          className=""
          style={{ width: timelineheaderRef.current?.scrollWidth + "px" }}
        >
          {Object.values(TestData.tasks).map((task, index) => {
            return (
              <div
                key={"timeline" + task.id}
                className={`py-2 w-full border-t-0 border-b-0  h-10 border-[0.25px] border-gray-500  ${
                  index % 2 === 0 ? "bg-slate-50" : "bg-slate-200"
                }`}
              >
                <button
                  className="draggable hover-div relative left-0 py-[2px] bg-blue-500 rounded truncate text-sm hover:cursor-pointer"
                  style={{
                    left:
                      (dayjs(task.createdAt).diff(dayjs(start), "days") + 1) *
                        28 +
                      (dayjs(task.createdAt).diff(dayjs(start), "days") + 1) /
                        7 +
                      "px",
                    width:
                      (dayjs(task.DueDate).diff(dayjs(task.createdAt), "days") +
                        1) *
                        28 +
                      "px",
                  }}
                  onMouseDown={handleDown}
                  // onPointerMove={handleMove}
                  // onMouseUp={handleUp}
                >
                  <div className="flex justify-between">
                    <div className="flex">
                      <div className="w-1 px-1 mx-1 rounded leftButton color-div hover:cursor-col-resize "></div>
                      <span className="">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          role="presentation"
                          className="border rounded-full ml-1"
                        >
                          <g fill="white" fill-rule="evenodd">
                            <path d="M6 14c0-1.105.902-2 2.009-2h7.982c1.11 0 2.009.894 2.009 2.006v4.44c0 3.405-12 3.405-12 0V14z"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                          </g>
                        </svg>
                      </span>
                    </div>
                    <div className="w-1 px-1 mx-1 rounded color-div rightButton hover:cursor-col-resize"></div>
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </div>
      <div className="fixed  right-0 shadow-2xl ">
        <div
          className="  p-1 absolute bg-white rounded flex"
          style={{ top: adjusted + 260, right: 20 }}
        >
          {Filters.map((filter) => {
            return (
              <button
                key={filter}
                className={`px-2 py-1 mx-[2px] rounded ${
                  currentFilter === filter
                    ? "bg-blue-100 text-blue-500 "
                    : "hover:bg-gray-300"
                } `}
                onClick={handleFilters}
              >
                {filter}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
