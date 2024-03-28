import React, { useEffect, useState } from "react";
import SearchBox from "../ui/filter/Search";
import Popover from "../ui/popover/Popover";
import dayjs from "dayjs"; // You can use any date library you prefer
import "dayjs/locale/en"; // Set locale for dayjs
import { Issuedata } from "../../assets/CommonData";
import {
  Filter_Icon,
  menu_icon_dots,
  Rightarrow_Icon,
  Leftarrow_Icon,
  checkwithCircle_Icon,
  Calendar_Icon,
  Profile_Icon,
  blueCheck_Icon,
  Rightarrow_Medium_Icon,
} from "../../assets/CommonData";
import IssueModal from "../issue/issueModal";
import { useSearchParams } from "react-router-dom";
import { set } from "rsuite/esm/utils/dateUtils";
// Set dayjs locale to English
dayjs.locale("en");

function startingDateAndDaysInRange(startDateStr, endDateStr, checkDateStr) {
  const startDate = new Date(startDateStr);
  const endDate = new Date(endDateStr);
  const checkDate = new Date(checkDateStr);
  startDate.setHours(0, 0, 0, 0);
  endDate.setHours(0, 0, 0, 0);
  checkDate.setHours(0, 0, 0, 0);

  let daysInRange = 0;
  let startingDateInRange = null;

  for (let i = 6; i >= 0; i--) {
    const dateToCheck = new Date(checkDate);
    dateToCheck.setDate(checkDate.getDate() - i);

    if (startDate <= dateToCheck && endDate >= dateToCheck) {
      daysInRange++;
      if (!startingDateInRange) {
        startingDateInRange = new Date(dateToCheck);
      }
    }
  }

  return { daysInRange, startingDateInRange };
}

const renderDays = () => {
  const days = [];
  for (let i = 1; i < 8; i++) {
    days.push(
      <div
        key={i}
        className={`text-center p-2  border-[.5px] border-t-0 border-gray-300 text-gray-600 bg-gray-100  font-semibold ${
          i === 1 ? "border-l-0" : i === 7 ? "border-r-0" : null
        }`}
      >
        {dayjs()
          .day(i % 7)
          .format("ddd")}
      </div>
    );
  }
  return <div className="grid grid-cols-7 z-10 sticky top-0">{days}</div>;
};

const menu_icon_dotsWithText = (
  <div className="flex items-center dark:bg-white">
    <span>{menu_icon_dots}</span>
    <p className="text-black  font-semibold ml-2">Menu</p>
  </div>
);

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function getNextMonday(date = new Date()) {
  const dateCopy = new Date(date.getTime());

  const nextMonday = new Date(
    dateCopy.setDate(
      dateCopy.getDate() + ((7 - dateCopy.getDay() + 1) % 7 || 7)
    )
  );

  return nextMonday;
}
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

const Calendar = ({ tasks, user, projectmembers }) => {
  console.log("Calendar Component");
  const [inputSearch, setSearchinput] = useState("");
  const currentDate = new Date();
  const [month, setMonth] = useState(monthNames[currentDate.getMonth()]);
  const [year, setYear] = useState(currentDate.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const [filterOptions, setFilterOptions] = useState([false, false, false]);
  const [searchParams, setSearchParams] = useSearchParams({
    selectedIssue: null,
  });
  const [showIssue, setShowIssue] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
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
  const isMonthYearInRange = (startMonth, startYear, endMonth, endYear) => {
    const currentYearMonth = year * 12 + monthNames.indexOf(month) + 1;
    const start = startYear * 12 + startMonth;
    const end = endYear * 12 + endMonth;
    return currentYearMonth >= start && currentYearMonth <= end;
  };

  const searchResults = Object.values(tasks).filter((task) => {
    let createdAt = dayjs(task.createdAt).$d;
    let DueDate = dayjs(task.DueDate).$d;
    return (
      (task.id.toLowerCase().includes(inputSearch.toLowerCase()) ||
        task.summary.toLowerCase().includes(inputSearch.toLowerCase())) &&
      isMonthYearInRange(
        createdAt.getMonth() + 1,
        createdAt.getFullYear(),
        DueDate.getMonth() + 1,
        DueDate.getFullYear()
      )
    );
  });
  const handleprevMonth = () => {
    if (month === monthNames[0]) {
      setYear(year - 1);
      setMonth(monthNames[monthNames.length - 1]);
    } else {
      setMonth(monthNames[monthNames.indexOf(month) - 1]);
    }
    setCurrentMonth(currentMonth.subtract(1, "month"));
  };
  const handlenextMonth = () => {
    if (month === monthNames[monthNames.length - 1]) {
      setYear(year + 1);
      setMonth(monthNames[0]);
    } else {
      setMonth(monthNames[monthNames.indexOf(month) + 1]);
    }
    setCurrentMonth(currentMonth.add(1, "month"));
  };
  const handleTodayButton = () => {
    setMonth(monthNames[currentDate.getMonth()]);
    setYear(currentDate.getFullYear());
    setCurrentMonth(dayjs());
  };

  const searchandfilter = searchResults.map((task) => {
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

  const handleFilteroption = (index) => {
    const newFilterOptions = [...filterOptions];
    newFilterOptions[index] = !newFilterOptions[index];
    setFilterOptions(newFilterOptions);
  };
  const renderCells = () => {
    const startOfMonth = currentMonth.startOf("month").startOf("week");
    const endOfMonth = currentMonth.endOf("month").endOf("week");
    const rows = [];
    let days = [];
    let day = startOfMonth.add(1, "day"); // Start from Monday;
    while (day.isBefore(endOfMonth)) {
      for (let i = 0; i < 7; i++) {
        days.push(
          <div
            className={`border-[.5px] border-gray-300 bg-gray-100 ${
              i === 0 ? "border-l-0" : i == 6 ? "border-r-0" : null
            } `}
          >
            <div
              key={day}
              className={`px-8  text-center ${
                day.month() === currentMonth.month()
                  ? "text-gray-900"
                  : "text-gray-400"
              }  `}
            >
              {day.format("D")}
            </div>
            <div className="days-event relative min-h-6 "></div>
          </div>
        );
        day = day.add(1, "day");
      }
      rows.push(
        <>
          <div key={day} className="grid grid-cols-7 ">
            {days}
          </div>
          <div className="flex flex-col">
            {searchandfilter.map((task) => {
              if (!task) return;
              let taskStartDate = dayjs(task.createdAt).format("YYYY-MM-DD");
              let taskEndDate = dayjs(task.DueDate).format("YYYY-MM-DD");
              let Thisweek = day.subtract(1, "days").format("YYYY-MM-DD");
              let { daysInRange, startingDateInRange } =
                startingDateAndDaysInRange(
                  taskStartDate,
                  taskEndDate,
                  Thisweek
                );
              return (
                <button
                  key={task.id}
                  className={`text-black mt-1 rounded truncate bg-gray-300   text-start relative  w-[${
                    (daysInRange * 100) / 7
                  }%]`}
                  style={{
                    width: `${(daysInRange * 100) / 7}%`,
                    display: daysInRange == 0 ? "none" : "block",
                    left:
                      Math.abs(
                        day.subtract(7, "day").$d - startingDateInRange
                      ) /
                        ((1000 * 3600 * 24 * 7) / 100) +
                      "%",
                  }}
                  onClick={() => {
                    setSearchParams((prev) => {
                      let newParams = new URLSearchParams(prev);
                      newParams.set("selectedIssue", task.id);
                      return newParams;
                    });
                    setSelectedTask(task);
                  }}
                >
                  <span className="py-2 ">
                    {Issuedata.map((data) => {
                      if (data.label === task.issuetype) {
                        return (
                          <span className=" px-2 py-2 text-white">
                            {data.icon}
                          </span>
                        );
                      }
                    })}
                    <span className="px-1 text-sm">
                      {task.id.toUpperCase()}
                    </span>
                    <span className="text-sm"> {task.summary}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </>
      );
      days = [];
    }
    return <div>{rows}</div>;
  };
  const handleClear = () => {
    setFilterOptions([false, false, false]);
  };
  const selectedIssue = searchParams.get("selectedIssue");
  useEffect(() => {
    debugger;
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
      setShowIssue(true);
      setSelectedTask(tasks[selectedIssue]);
    }
  }, [searchParams, tasks, projectmembers]);

  return (
    <>
      <div className="flex m-1 items-center justify-between ">
        <SearchBox
          inputSearch={inputSearch}
          setSearchinput={setSearchinput}
          placeholder={"Calendar"}
        />

        <div id="filter" className="flex items-center dark:text-white">
          <span className="">
            <p className="text-black font-semibold dark:text-white">{month}</p>
          </span>
          <span className="px-2">
            <p className="text-black font-semibold dark:text-white">{year}</p>
          </span>
          <button
            className="hover:bg-slate-300 rounded px-2 py-2 "
            onClick={handleprevMonth}
          >
            <span>{Leftarrow_Icon}</span>
          </button>
          <button
            className="hover:bg-slate-300 rounded px-2 py-2"
            onClick={handlenextMonth}
          >
            <span>{Rightarrow_Icon}</span>
          </button>
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

      <div className="bg-gray-100 rounded-lg">
        <div className="px-2 h-96 overflow-y-auto overflow-x-hidden">
          {renderDays()}
          {renderCells()}
        </div>
      </div>
      {showIssue && (
        <IssueModal
          details={{
            task: selectedTask,
            projectmembers: projectmembers,
          }}
          showIssue={showIssue}
          setShowIssue={setShowIssue}
          setSelectIssue={setSearchParams}
        />
      )}
    </>
  );
};

export default Calendar;
