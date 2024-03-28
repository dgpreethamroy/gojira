import React, { useEffect, useRef, useState } from "react";
import { XIcon, CheckIcon, PlusIcon } from "@heroicons/react/solid";
import dayjs from "dayjs";
import SearchBox from "../ui/filter/Search";
import Popover from "../ui/popover/Popover";
import customaxios from "../../api/axios";
import {
  LinkIcon,
  Filter_Icon,
  menu_icon_dots,
  checkwithCircle_Icon,
  Calendar_Icon,
  Profile_Icon,
  blueCheck_Icon,
  Rightarrow_Medium_Icon,
} from "../../assets/CommonData";
import { Timeline } from "../timeline/Timeline";
import { useSearchParams } from "react-router-dom";
import IssueModal from "../issue/issueModal";
var customParseFormat = require("dayjs/plugin/customParseFormat");

const Filters = ["Weeks", "Months", "Quaters"];
const menu_icon_dotsWithText = (
  <div className="flex items-center dark:bg-white">
    <span>{menu_icon_dots}</span>
    <p className="text-black  font-semibold ml-2">Menu</p>
  </div>
);
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
export const Gnatt_Chart = ({ data, user, projectmembers }) => {
  dayjs.extend(customParseFormat);
  console.log("Gnatt Component");
  const labelref = useRef(null);
  const timelineRef = useRef(null);
  const container = useRef(null);
  const timelineheaderRef = useRef(null);
  const timelineBodyRef = useRef(null);
  const [currentFilter, setCurrentFilter] = useState(Filters[1]);
  const [timelineheader, setTimelineHeader] = useState(<div>March</div>);
  const [start, setStart] = useState(null);
  const quaters_data = ["JAN-MAR", "APR-JUNE", "JULY-SEP", "OCT-DEC"];
  const [inputSearch, setSearchinput] = useState("");
  const [filterOptions, setFilterOptions] = useState([false, false, false]);
  const [initpos, setInitPos] = useState(0);
  const [open, close] = useState(false);
  const [chartdata, setChartData] = useState(data);
  const [endDate, setEndDate] = useState([]);
  const [startDate, setStartDate] = useState([]);
  const [leftpuller, setLeftPuller] = useState(false);
  const [rightpuller, setRightPuller] = useState(false);
  const [iconsdisplay, setIconsdisplay] = useState(true);
  const [showIssue, setShowIssue] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams({
    rangemode: currentFilter,
    selectedIssue: null,
  });

  const selectedIssue = searchParams.get("selectedIssue");
  const searchfilter = searchParams.get("rangemode");
  if (searchfilter !== currentFilter) {
    setCurrentFilter(searchfilter);
  }
  const handleToggleNew = (e) => {
    document.getElementById("createColumn").style.display = "none";
    document.getElementById("createColumnDiv").style.display = "flex";
    document.getElementById("createColumnInput").focus();
  };

  const handleCancelEdit = (e) => {
    document.getElementById("createColumn").style.display = "flex";
    document.getElementById("createColumnDiv").style.display = "none";
  };

  function getNextMonday(date = new Date()) {
    const dateCopy = new Date(date.getTime());

    const nextMonday = new Date(
      dateCopy.setDate(
        dateCopy.getDate() + ((7 - dateCopy.getDay() + 1) % 7 || 7)
      )
    );

    return nextMonday;
  }
  const Filter_IconWithText = (
    <div className="flex items-center dark:bg-white">
      <span>{Filter_Icon}</span>
      {filterOptions.filter(Boolean).length > 0 ? (
        <p className="text-black text-nowrap  font-semibold ml-2">
          {filterOptions.filter(Boolean).length} Filters applied
        </p>
      ) : (
        <p className="text-black  font-semibold ml-2">Filter</p>
      )}
    </div>
  );
  const handleClear = () => {
    setFilterOptions([false, false, false]);
  };

  const handleFilteroption = (index) => {
    const newFilterOptions = [...filterOptions];
    newFilterOptions[index] = !newFilterOptions[index];
    setFilterOptions(newFilterOptions);
  };
  const handleTodayButton = () => {
    timelineRef.current?.scrollTo({ left: initpos - 400 });
  };
  useEffect(() => {
    if (
      selectedIssue !== null &&
      selectedIssue !== "null" &&
      !showIssue &&
      projectmembers
    ) {
      if (selectedIssue === "false") {
        setSearchParams((prev) => {
          const newParams = new URLSearchParams(prev);
          newParams.delete("selectedIssue");
          return newParams;
        });
        return;
      }
      setSelectedTask(selectedIssue);
      setShowIssue(true);
    }
    if (
      Object.values(chartdata.tasks).length === 0 &&
      Object.values(data.tasks).length !== 0
    )
      setChartData(data);
    if (data.length === 0) return;
    console.log("Gnatt useEffect");
    document.body.style.backgroundColor = "antiquewhite";
    let currentMonth = dayjs().add(1, "years");
    let names = [];
    let initPos = 0;
    if (currentFilter === Filters[1]) {
      //// Months Filters
      for (let i = 0; i < 25; i++) {
        // Add name of current month to the array
        if (currentMonth.format("YYYY") === "2024")
          names.push(
            <div className="px-20 pt-3 h-12 w-[200px] items-center text-center  border-[0.25px] text-sm  border-gray-400">
              {currentMonth.format("MMM")}
            </div>
          );
        else
          names.push(
            <div className="px-20 pt-3 w-[200px] h-12 border-[0.25px] text-sm text-nowrap border-gray-400">
              {currentMonth.format("MMM") + " '" + currentMonth.format("YY")}
            </div>
          );
        if (i == 24) {
          setStart(currentMonth.startOf("month"));
          initPos = dayjs().diff(currentMonth.startOf("month"), "month") * 200;
          initPos += dayjs().diff(dayjs().startOf("month"), "days") * 7;
          setInitPos(initPos);
        }

        // Move to the previous month
        currentMonth = currentMonth.subtract(1, "month");
      }
      setTimelineHeader(names.reverse());
      timelineheaderRef.current.style.width = 25 * 200 + "px";
      timelineBodyRef.current.style.width = 25 * 200 + "px";
      timelineRef.current.scrollTo({ left: initPos - 400 });
    } else if (currentFilter === Filters[2]) {
      ///  Quaters Filters
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
      let names = tempData.slice(index - 4, index + 9).map((Q, index) => {
        if (index === 0) {
          let parts = Q.split(/[-' ]+/);
          let month = parts[0];
          let year = 2000 + Number(parts[2]);
          setStart(dayjs(`${month} ${year}`));
        }
        return (
          <div
            key={index}
            className=" w-[250px] items-center text-center py-2 h-12 pt-3 border-[0.25px] text-nowrap text-sm border-gray-400"
          >
            {Q}
          </div>
        );
      });
      setTimelineHeader(names);
      timelineheaderRef.current.style.width = 13 * 250 + "px";
      timelineBodyRef.current.style.width = 13 * 250 + "px";
      let daydiff = (dayjs().diff(dayjs().startOf("month"), "days") * 250) / 90;
      setInitPos(750 - daydiff + 500);
      timelineRef.current.scrollTo({ left: 750 });
    } else {
      /// Weeks Filter
      let lastyear = dayjs(getPreviousMonday(dayjs().subtract(1, "years").$d));
      setStart(lastyear.$d);
      let initPos =
        dayjs().diff(lastyear, "days") * 28 +
        dayjs().diff(lastyear, "weeks") +
        8;

      setInitPos(initPos);
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
      setTimelineHeader(weeks);
      timelineheaderRef.current.style.width = length + "px";
      timelineBodyRef.current.style.width = length + "px";

      timelineRef.current.scrollTo({ left: initPos - 400 });
    }
    //close(true);
    setTimeout(() => {
      close(true);
    }, 200);
  }, [currentFilter, data, projectmembers, searchParams]);
  if (data.length === 0) return;
  const handleScroll = (e) => {
    timelineRef.current.scrollTop = e.target.scrollTop;
    labelref.current.scrollTop = e.target.scrollTop;
  };
  const handleFilters = (e) => {
    setCurrentFilter(e.target.innerText);
    setSearchParams({ rangemode: e.target.innerText });
    close(false);
  };

  /////
  let isDrag = false;
  let startX;
  let button;
  let buttonInitleft;
  let buttonInitwidth;
  let leftButton = false;
  let rightButton = false;
  const handleDown = (e, targetindex) => {
    isDrag = true;
    button = e.currentTarget;
    if (e.target.classList.contains("rightButton")) rightButton = true;
    if (e.target.classList.contains("leftButton")) leftButton = true;
    setIconsdisplay(false);
    buttonInitleft = Number(
      button.style.left.substring(0, button.style.left.length - 2)
    );
    buttonInitwidth = Number(
      button.style.width.substring(0, button.style.width.length - 2)
    );

    startX = e.clientX;
    document.addEventListener("mousemove", (e) => handleMove(e, targetindex));
    const taskid = e.target.closest(".draggable").id;

    document.addEventListener(
      "mouseup",
      (e) => {
        handleUp(e, taskid);
      },
      { once: true }
    );
  };

  const handleMove = (e, targetindex) => {
    e.preventDefault();
    if (!isDrag) return;
    const MoveAt = (pageX) => {
      if (!rightButton) {
        if (buttonInitwidth - pageX + startX < 37) return;

        button.style.left = pageX - startX + buttonInitleft + "px";
      } else if (rightButton) {
        if (pageX - startX + buttonInitwidth < 37) return;

        button.style.width = pageX - startX + buttonInitwidth + "px";
      }
      if (leftButton) {
        button.style.width = buttonInitwidth - pageX + startX + "px";
      }
      const finalDate = getDatesfromPosition(
        button.offsetLeft,
        button.offsetWidth + button.offsetLeft
      );
      setStartDate((prev) => {
        let newstartdate = [...prev];
        newstartdate[targetindex] = dayjs(finalDate[0]).format("DD/MM/YYYY");
        return newstartdate;
      });
      setEndDate((prev) => {
        let newenddate = [...prev];
        newenddate[targetindex] = dayjs(finalDate[1]).format("DD/MM/YYYY");
        return newenddate;
      });
    };

    MoveAt(e.pageX);
  };

  const updateTaskPositions = async (taskid, startdate, enddate) => {
    try {
      const result = await customaxios.put(`/issues/`, {
        id: taskid,
        createdAt: startdate,
        DueDate: enddate,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const getDatesfromPosition = (startpos, endpos) => {
    let startdate, enddate;
    if (currentFilter === Filters[0]) {
      startdate = dayjs(start)
        .add(Math.floor(startpos / 197), "weeks")
        .add(Math.floor((startpos % 197) / 28), "days")
        .toLocaleString()
        .slice(0, 16);
      enddate = dayjs(start)
        .add(Math.floor(endpos / 197), "weeks")
        .add(Math.floor((endpos % 197) / 28), "days")
        .toLocaleString()
        .slice(0, 16);
    } else if (currentFilter === Filters[1]) {
      const daysinstart = start
        .add(Math.floor(startpos / 200), "months")
        .daysInMonth();
      const daysinend = start
        .add(Math.floor(endpos / 200), "months")
        .daysInMonth();

      startdate = dayjs(start)
        .add(Math.floor(startpos / 200), "months")
        .add(Math.ceil((startpos % 200) * (daysinstart / 200)), "days")
        .toLocaleString()
        .slice(0, 16);
      enddate = dayjs(start)
        .add(Math.floor(endpos / 200), "months")
        .add(Math.ceil((endpos % 200) * (daysinend / 200)), "days")
        .toLocaleString()
        .slice(0, 16);
    } else {
      const daysinstartQ = start
        .add(Math.floor(startpos / 250) * 3 + 3, "months")
        .diff(start.add(Math.floor(startpos / 250) * 3, "months"), "days");
      const daysinendQ = start
        .add(Math.floor(endpos / 250) * 3 + 3, "months")
        .diff(start.add(Math.floor(endpos / 250) * 3, "months"), "days");

      startdate = dayjs(start)
        .add(Math.floor(startpos / 250) * 3, "months")
        .add(Math.ceil((startpos % 250) * (daysinstartQ / 250)), "days")
        .toLocaleString()
        .slice(0, 16);
      enddate = dayjs(start)
        .add(Math.floor(endpos / 250) * 3, "months")
        .add(Math.ceil((endpos % 250) * (daysinendQ / 250)), "days")
        .toLocaleString()
        .slice(0, 16);
    }
    return [startdate, enddate];
  };

  const handleUp = (e, taskid) => {
    //const taskid = e.target.closest(".draggable").id;
    const startpos = document.getElementById(taskid).offsetLeft;
    const endpos = startpos + document.getElementById(taskid).offsetWidth;
    const [startdate, enddate] = getDatesfromPosition(startpos, endpos);

    updateTaskPositions(taskid, startdate, enddate);
    document.removeEventListener("mousemove", handleMove);
    document.removeEventListener("mouseup", handleUp);
    leftButton = false;
    rightButton = false;
    buttonInitwidth = null;
    buttonInitleft = null;
    isDrag = false;
    button = null;
    setIconsdisplay(true);
    e.preventDefault();
    e.stopPropagation();
  };

  if (endDate.length === 0) {
    Object.values(chartdata.tasks).forEach((task) => {
      setEndDate((prev) => {
        let newenddate = [...prev];
        newenddate.push(dayjs(task.DueDate).format("DD/MM/YYYY"));
        return newenddate;
      });
    });
  }
  if (startDate.length === 0) {
    Object.values(chartdata.tasks).forEach((task) => {
      setStartDate((prev) => {
        let newenddate = [...prev];
        newenddate.push(dayjs(task.createdAt).format("DD/MM/YYYY"));
        return newenddate;
      });
    });
  }

  const searchResults = Object.values(chartdata.tasks).filter((task) => {
    return (
      task.id.toLowerCase().includes(inputSearch.toLowerCase()) ||
      task.summary.toLowerCase().includes(inputSearch.toLowerCase())
    );
  });

  const searchandfilter = searchResults.filter((task) => {
    let taskEndDate_dayjs = dayjs(task.DueDate).endOf("day");
    let Doneresult = taskEndDate_dayjs.$d - new Date() < 0 ? true : false;
    let Assigneresult = task.assignee === user ? true : false;
    let Duethisweekresult =
      taskEndDate_dayjs.$d - getPreviousMonday() >= 0 &&
      taskEndDate_dayjs.$d - getNextMonday() < 0;

    let filterResult =
      (filterOptions[0] ? Assigneresult : true) &&
      (filterOptions[2] ? Doneresult : true) &&
      (filterOptions[1] ? Duethisweekresult : true);
    if (filterResult) return task;
  });
  /////

  let ids = [];
  const connectionMatrix = searchandfilter.map((task) => {
    let row = [];
    ids.push(task.id);
    searchandfilter.map((task2) => {
      row.push(task.linkedtasks.includes(task2.id) ? 1 : 0);
    });
    return row;
  });
  const handleNewLinkConnection = (start, end) => {
    if (start === end) return;
    if (chartdata.tasks[start]["linkedtasks"].includes(end)) return;
    const currentLinks = Object.values(data.tasks).filter((task) => {
      if (task.id === start) return true;
      else return false;
    });
    const UpdateLink = async () => {
      try {
        const result = await customaxios.put("/issues", {
          id: start,
          linkedtasks: [...currentLinks[0].linkedtasks, end],
        });
        setChartData((prev) => {
          let newdata = { ...prev };
          newdata.tasks[start]["linkedtasks"] = [
            ...newdata.tasks[start]["linkedtasks"],
            end,
          ];
          return newdata;
        });
      } catch (err) {
        console.log(err);
      }
    };
    UpdateLink();
  };

  const handleLinkClick = (start, end) => {
    const DeleteConnection = async () => {
      try {
        const result = await customaxios.put("/issues", {
          id: start,
          linkedtasks: chartdata.tasks[start]["linkedtasks"].filter(
            (task) => task !== end
          ),
        });
        setChartData((prev) => {
          let newdata = { ...prev };
          newdata.tasks[start]["linkedtasks"] = newdata.tasks[start][
            "linkedtasks"
          ].filter((task) => task !== end);
          return newdata;
        });
      } catch (err) {
        console.log(err);
      }
    };
    DeleteConnection();
  };

  if (data.length === 0) return;

  return (
    <>
      <div className="flex m-1 mx-5 items-center justify-between ">
        <SearchBox
          inputSearch={inputSearch}
          setSearchinput={setSearchinput}
          placeholder={"Calendar"}
        />

        <div id="filter" className="flex items-center dark:text-white">
          <button
            className="px-2 py-2 bg-blue-300 hover:bg-blue-500 rounded m-2"
            onClick={handleTodayButton}
          >
            <span className="text-black font-semibold">TODAY</span>
          </button>
          <Popover label={Filter_IconWithText} dir="right">
            <div className="flex flex-col h-80 overflow-y-auto">
              <div className="w-full  flex justify-between">
                <span className="p-5 font-semibold text-sm">FILTERS</span>
                {filterOptions.includes(true) && (
                  <button className="px-5" onClick={handleClear}>
                    <span className="hover:underline">Clear</span>
                  </button>
                )}
              </div>
              <div className="w-full hover:bg-slate-200 ">
                <button
                  className="px-5 py-3 w-full flex justify-between text-start"
                  onClick={() => {
                    handleFilteroption(0);
                  }}
                >
                  <span className="flex">
                    {Profile_Icon}
                    <span className="pl-2"> Assign to me</span>
                  </span>
                  {filterOptions[0] && (
                    <span className="">{blueCheck_Icon}</span>
                  )}
                </button>
              </div>
              <div className="w-full hover:bg-slate-200">
                <button
                  className="px-5 py-3 w-full flex justify-between text-start"
                  onClick={() => handleFilteroption(1)}
                >
                  <span className="flex">
                    {Calendar_Icon}
                    <span className="pl-2">Due this week</span>
                  </span>
                  {filterOptions[1] && <span>{blueCheck_Icon}</span>}
                </button>
              </div>
              <div className="w-full hover:bg-slate-200">
                <button
                  className="px-5 py-3 w-full text-start flex justify-between"
                  onClick={() => handleFilteroption(2)}
                >
                  <span className="flex">
                    {checkwithCircle_Icon}
                    <span className="pl-2">Done items</span>
                  </span>
                  {filterOptions[2] && <span>{blueCheck_Icon}</span>}
                </button>
              </div>
              <div className="w-full h-[1px] bg-gray-300"></div>
              <div className="w-full flex flex-col">
                <span className="text-sm font-semibold p-3">DATE RANGE</span>
                <div className="flex w-full pl-3 ">
                  <div className="flex flex-col">
                    <label className="text-gray-700 pl-2 ">Start Date</label>
                    <input className="p-2" type="date" />
                  </div>
                  <span className="p-5">{Rightarrow_Medium_Icon}</span>
                  <div className="flex flex-col">
                    <label className="text-gray-700 pl-2 ">Due Date</label>
                    <input className="p-2" type="date" />
                  </div>
                </div>
              </div>
            </div>
          </Popover>
          <Popover label={menu_icon_dotsWithText} dir="right">
            <span className="py-5 px-2">Not yet implemented</span>
          </Popover>
        </div>
      </div>
      <div
        ref={container}
        className="w-auto bg-white  flex flex-rows  overflow-y-auto   mx-5  rounded-2xl"
      >
        <div
          ref={labelref}
          className="w-[25%] overflow-x-hidden   scrollbar-none h-[360px] border-r border-slate-400"
          onScroll={handleScroll}
        >
          <div
            key="labelheader"
            className="  p-2 pt-3 border-[.25px] h-12 text-start text-sm rounded-tl-2xl sticky top-0 border-gray-500 bg-slate-200"
          >
            Items
          </div>
          {searchandfilter.map((task, index) => {
            return (
              <div
                key={"label" + task.id}
                className={`p-2   border-gray-500 ${
                  index % 2 === 0 ? "bg-slate-50" : "bg-slate-200"
                }`}
              >
                <div className="flex">
                  <span className="px-2 text-nowrap">
                    {task.id.toUpperCase()}
                  </span>
                  <span className="truncate"> {task.summary}</span>
                </div>
              </div>
            );
          })}
          <div className=" bg-gray-300 sticky bottom-0">
            <button
              onClick={handleToggleNew}
              id="createColumn"
              className="px-2 rounded-md h-10 flex items-center"
            >
              <span className="px-2">Create</span>
              <PlusIcon className="w-5 h-5" />
            </button>
            <div id="createColumnDiv" className="hidden ">
              <div className="flex">
                <input
                  id="createColumnInput"
                  className=" h-10 border font-semibold text-lg border-gray-300 rounded-md w-[75%] "
                />
                <div className="flex w-1/5 items-center">
                  <button
                    onClick={handleCancelEdit}
                    className="ml-2 p-2 h-10 text-red-600 hover:text-red-700 focus:outline-none"
                  >
                    <XIcon className="w-5 h-5" />
                  </button>
                  <button
                    // onClick={handleSaveChanges}
                    className="ml-2 p-2 h-10 text-green-600 hover:text-green-700 focus:outline-none"
                  >
                    <CheckIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          ref={timelineRef}
          className="w-[75%] timelineRef overflow-x-auto scroll-pb-10 scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-slate-700 scrollbar-track-slate-300 scrollbar-track-hover:slate-900 h-[375px]"
          onScroll={handleScroll}
        >
          <div
            key="timelineheader"
            ref={timelineheaderRef}
            className="bg-slate-200  z-[15] flex sticky top-0"
          >
            {timelineheader}
          </div>
          <div
            ref={timelineBodyRef}
            className="relative"
            style={{ width: timelineheaderRef.current?.style.width }}
          >
            {searchandfilter.map((task, index) => {
              let dueDate = dayjs(task.DueDate);
              let createdAt = dayjs(task.createdAt);
              let startDayjs = dayjs(start);

              let monthsDiffDue = dueDate.diff(startDayjs, "months");
              let daysInMonthDue = dueDate.$d.getDate();
              let endOfMonthDue = dueDate.endOf("month").$d.getDate();

              let monthsDiffCreated = createdAt.diff(startDayjs, "months");
              let daysInMonthCreated = createdAt.$d.getDate();
              let endOfMonthCreated = createdAt.endOf("month").$d.getDate();

              let daysDiffCreated = createdAt.diff(startDayjs, "days");
              let daysDiff = dueDate.diff(createdAt, "days");

              let leftpos =
                currentFilter === Filters[0]
                  ? (dayjs(task.createdAt).diff(dayjs(start), "days") + 1) *
                      28 +
                    (dayjs(task.createdAt).diff(dayjs(start), "days") + 1) / 7
                  : currentFilter === Filters[1]
                  ? dayjs(task.createdAt).diff(dayjs(start), "months") * 200 +
                    (dayjs(task.createdAt).$d.getDate() /
                      dayjs(task.createdAt).endOf("month").$d.getDate()) *
                      200
                  : (daysDiffCreated * 1000) / 365;
              let widthpos =
                currentFilter === Filters[0]
                  ? (dayjs(task.DueDate).diff(dayjs(task.createdAt), "days") +
                      1) *
                    28
                  : currentFilter === Filters[1]
                  ? monthsDiffDue * 200 +
                    (daysInMonthDue / endOfMonthDue) * 200 -
                    monthsDiffCreated * 200 -
                    (daysInMonthCreated / endOfMonthCreated) * 200
                  : (daysDiff * 1000) / 365;

              return (
                <div
                  key={"timeline" + task.id}
                  className={`py-2 w-full border-t-0 border-b-0  h-10 border-[0.25px] border-gray-500  ${
                    index % 2 === 0 ? "bg-slate-50" : "bg-slate-200"
                  }`}
                >
                  <div className="flex  hover-div">
                    <button
                      id={task.id}
                      className="draggable min-h-7 hover-div whitespace-nowrap text-ellipsis  relative z-10 left-0 py-[2px] bg-blue-500 rounded  text-sm hover:cursor-pointer"
                      style={{
                        left: leftpos,
                        width: widthpos,
                      }}
                      onMouseDown={(e) => handleDown(e, index)}
                      onClick={(e) => {
                        setSelectedTask(task.id);
                        setSearchParams((prev) => {
                          const newParams = new URLSearchParams(prev);
                          newParams.set("selectedIssue", task.id);
                          return newParams;
                        });
                      }}
                    >
                      <div className="flex justify-between">
                        <div className="flex flex-row  ">
                          <div className="left-[-85px] w-20 absolute hide-div  ">
                            {startDate[index]}
                          </div>
                          <div className="w-1  px-1 mx-1 rounded leftButton color-div hover:cursor-col-resize "></div>
                          {widthpos > 120 && (
                            <span className={`${!iconsdisplay && "opacity-0"}`}>
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
                          )}
                          <span
                            id={task.id + "startLink"}
                            className="absolute   hide-div top-[-17px] left-[8px] w-5 z-20 puller"
                            onMouseEnter={(e) => {
                              setLeftPuller(true);
                            }}
                            onMouseLeave={(e) => {
                              setLeftPuller(false);
                            }}
                          >
                            {leftpuller ? (
                              LinkIcon
                            ) : (
                              <svg viewBox="0 0 100 100">
                                <circle
                                  cx="50"
                                  cy="50"
                                  r="100"
                                  fill="transparent"
                                />
                                <circle cx="50" cy="50" r="25" fill="blue" />
                              </svg>
                            )}
                          </span>
                        </div>
                        <div className="flex">
                          <div
                            className={` ${
                              (!iconsdisplay || widthpos < 80) && "opacity-0"
                            }  text-ellipsis `}
                          >
                            {LinkIcon}
                          </div>

                          <div className="w-1 px-1 mx-1  rounded color-div rightButton text-ellipsis hover:cursor-col-resize"></div>
                          <div className=" w-20 right-[-90px] absolute z-0 hide-div">
                            {endDate[index]}
                          </div>
                          <span
                            id={task.id + "endLink"}
                            className="absolute hide-div top-[24px] w-5 z-20 puller"
                            onMouseEnter={(e) => {
                              setRightPuller(true);
                            }}
                            onMouseLeave={(e) => {
                              setRightPuller(false);
                            }}
                          >
                            {rightpuller ? (
                              LinkIcon
                            ) : (
                              <svg viewBox="0 0 100 100">
                                <circle
                                  cx="50"
                                  cy="50"
                                  r="100"
                                  fill="transparent"
                                />
                                <circle cx="50" cy="50" r="25" fill="blue" />
                              </svg>
                            )}
                          </span>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              );
            })}
            {showIssue && (
              <IssueModal
                details={{
                  task: data.tasks[selectedTask],
                  projectmembers: projectmembers,
                }}
                showIssue={showIssue}
                setShowIssue={setShowIssue}
                setSelectIssue={setSearchParams}
              />
            )}
            <div
              className={`h-[38px] ${
                searchandfilter.length % 2 !== 0
                  ? "bg-slate-200"
                  : "bg-slate-50"
              }`}
            ></div>
            {/* here */}
            <div className=" z-10 fixed right-0 bottom-0 Filters  shadow-2xl ">
              <div className="  p-1 bg-white rounded-lg  flex">
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
            {open && (
              <Timeline
                connectionMatrix={connectionMatrix}
                ids={ids}
                handleNewLinkConnection={handleNewLinkConnection}
                handleLinkClick={handleLinkClick}
                data={chartdata}
              />
            )}
            <div className="absolute top-0  z-10" style={{ left: initpos }}>
              <div className=" sticky top-12  w-0 h-0 border-[6px] border-transparent border-t-orange-500 border-b-0"></div>
              <div
                className=" ml-[5px] w-[2px] bg-orange-500"
                style={{
                  height: (searchandfilter.length + 1) * 40 + "px",
                  minHeight: "305px",
                }}
              ></div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

//  orange line -today  DONE
//  search filter with connection matrix DONE
//  reload connections for filters DONE
//  task dates outside button
//  DYNAMIC CONNECTION DONE
//  delete connection  **IMP Done
//  DuringSearch button align changes
