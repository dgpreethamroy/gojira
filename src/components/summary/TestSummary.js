import React, { useState, useEffect, useRef } from "react";
import loaderGif from "../../assets/loader.gif";
import {
  RetractIcon,
  expandDownIcon,
  SummaryIconArray,
  piechartColors,
  PriorityIcons,
} from "../../assets/CommonData";
import Avatar from "react-avatar";
import ReactECharts from "echarts-for-react";
import customAxios from "../../api/axios";

import dayjs from "dayjs";
dayjs.locale("en");

export const TestSummary = ({ data, user, project_id, username, projectmembers }) => {
  const [pdetails, setPdetails] = useState(false);
  const [recentData, setRecentData] = useState(null);
  const RecentActivityRef = useRef(null);
  const [maxResults, setMaxResults] = useState(10);
  const [resultsFullyLoaded, setResultsFullyLoaded] = useState(false);
  const [issueStats, setIssueStats] = useState(null);
  const loaderRef = useRef(null);
  const colors = ["bg-purple-200", "text-purple-800", "text-green-800", "text-red-800"];
  useEffect(() => {
    console.log("Summary useEffect");

    if (user && !recentData) fetchRecords().then((res) => setRecentData(res.data));

    if (user && !issueStats) {
      async function loadStats() {
        await customAxios.get(`/issues/stats`).then((res, err) => {
          if (res.status === 200 && !err) {
            setIssueStats(res.data);
          } else {
            alert("Error fetching data");
            console.log(err);
          }
        });
      }
      loadStats();
    }
  }, []);
  async function fetchRecords(maxResults = 10) {
    console.log("fetch Called");
    return await customAxios.get(`/requestrecords?max_results=${maxResults}`);
  }
  function onScrollEnd() {
    // Your code here
    console.log("Reached the end of the div!");

    if (!resultsFullyLoaded) {
      loaderRef.current.style.display = "flex";
      RecentActivityRef.current.scrollTop += 80;
      fetchRecords(maxResults + 10)
        .then((res) => {
          if (res.status === 206 && res.data.error) {
            console.log("inside");
            setResultsFullyLoaded(true);
          } else {
            setRecentData(res.data);
            setMaxResults(maxResults + 10);
          }
          loaderRef.current.style.display = "none";
        })
        .catch((error) => {
          debugger;
          // Handle other errors
          console.error("Error fetching data:", error);
        });
    }
  }
  let addscroll = () => {
    const x =
      RecentActivityRef.current.scrollHeight -
      RecentActivityRef.current.scrollTop -
      RecentActivityRef.current.clientHeight;
    if (x > -2 && x < 2) {
      onScrollEnd();
    }
  };
  return (
    <div className=" mx-20  rounded  ">
      <div className="py-2 my-2 flex flex-col items-center   ">
        <p className="text-center text-xl font-semibold font-myfont skeleton ">
          శుభోదయం, {username.toLowerCase()} ☕️
        </p>
        <br />
        <p className="text-center text-base skeleton ">
          Here's where you'll view a summary of Go to market sample's status, priorities, workload,
          and more.
        </p>
        <br />
        <div className="flex flex-col items-center ">
          <button
            className="hover:underline mb-2 "
            onClick={() => {
              setPdetails((prev) => !prev);
            }}>
            <div className="flex skeleton ">
              <p>Project Details</p>
              {pdetails ? RetractIcon : expandDownIcon}
            </div>
          </button>
          {true && (
            <div
              className={` transition-all duration-1000 overflow-hidden   ease-in-out ${pdetails ? " h-16" : " h-0"
                } bg-white rounded-full `}>
              <div className="p-2 flex rounded-full items-center">
                <Avatar name={username} size="40" round={true} textSizeRatio={1.75} />
                <div className="flex flex-col">
                  <p className="ml-2 text-blue-500">{username}</p>
                  <p className="ml-2">Project Lead</p>
                </div>
                <div className="w-[2px] h-10 mx-5 bg-gray-300 "></div>
                <div className="flex flex-col pr-2">
                  <p className="ml-2 ">Project Key</p>
                  <p className="ml-2 ">{project_id}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="grid lg:grid-cols-4 grid-cols-2 gap-6   ">
        {issueStats?.map((item, index) => (
          <div className="flex bg-white group rounded-lg py-5 px-7 items-center  ">
            <span
              className={`  justify-center items-center flex rounded-full w-14 h-14  bg-${item["bgcolor"]}-200  `}>
              {SummaryIconArray[index]}
            </span>
            <div className="flex flex-col pl-4  skeleton ">
              <p className={`text-xl text-${item["bgcolor"]}-800 font-[500] skeleton `}>
                {item[Object.keys(item)[0]]} {Object.keys(item)[0]}
              </p>
              <p className=""> in the {Object.keys(item)[0] === "due" ? "next" : "last"} 7 days</p>
            </div>
          </div>
        ))}
      </div>
      <br />
      <div className=" grid lg:grid-cols-2 grid-cols-1 gap-6 ">
        <div className="bg-white rounded ">
          <div className="p-8">
            <p className="font-semibold text-gray-900 mb-2  skeleton">Status overview</p>
            <p className=" skeleton">Get a snapshot of the status of your items. View all items</p>

            <div className="h-[300px]">
              <PieChart data={data} />
            </div>
          </div>
        </div>
        <div className="bg-white rounded">
          <div className="p-8">
            <p className="text-gray-900 font-semibold mb-2 skeleton ">Recent Activity</p>

            <p className="skeleton">Stay up to date with what's happening across the project.</p>

            <div className="w-full h-[1px] bg-gray-600 mt-2 " />
            <div
              ref={RecentActivityRef}
              className="h-[300px] overflow-y-auto "
              onScroll={addscroll}>
              {recentData?.map((item, index) => {
                let diff = dayjs()
                  .startOf("day")
                  .diff(dayjs(item.timestamp).startOf("day"), "days");
                return (
                  <div key={index} className=" flex items-center p-1 ">
                    <Avatar
                      name={item.name}
                      round
                      size="35"
                      textSizeRatio={2}
                      className=" skeleton  font-myfont2"
                    />
                    <div className="text-gray-700 flex flex-col m-2 skeleton">
                      <div className="flex  ">
                        <p className=" ">
                          <span className="text-[#0052CC] lowercase skeleton">{item.name}</span>
                          {item.method === "DELETE"
                            ? " removed "
                            : item.method === "PUT"
                              ? " updated "
                              : item.method === "POST"
                                ? " created a new"
                                : " viewed "}
                          {item.path === "/issues/"
                            ? " task "
                            : item.path === "/projects"
                              ? " Project "
                              : " item "}
                          {item.body?.id || item.body.project_id}
                        </p>
                      </div>

                      <div className=" text-xs skeleton">
                        {diff > 0 ? `${diff} ${diff === 1 ? "day" : "days"} ago ` : "today"}
                      </div>
                    </div>
                  </div>
                );
              })}
              <div ref={loaderRef} className="items-center  justify-center hidden">
                <img width={80} height={80} src={loaderGif} alt="Your GIF" />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded">
          <div className="p-8">
            <p className="text-gray-900 font-semibold mb-2 skeleton ">Priority breakdown</p>

            <p className="skeleton">
              <span>Get a holistic view of how work is being prioritized.</span>
              <span className="text-blue-800 hover:underline cursor-pointer">
                See what your team's been focusing on
              </span>
            </p>

            <div className="h-[300px] overflow-y-auto ">
              <BarChart data={data} />
            </div>
          </div>
        </div>
        <div className="bg-white rounded">
          <div className="p-8">
            <p className="text-gray-900 font-semibold mb-2 skeleton ">Workload breakdown</p>

            <p className="skeleton">
              <span>Oversee the capacity of your team. </span>
              <span className="text-blue-800 hover:underline cursor-pointer">
                Re-assign tasks across your team.
              </span>
            </p>
            <div className="py-3 bg-slate-200 px-2 rounded mt-3">
              <table className="w-full">
                <thead>
                  <tr className="text-gray-700 font-semibold skeleton p-1 ">
                    <th className="p-1 text-start">Assignee</th>
                    <th className="p-1 text-start">Work distribution</th>
                    <th className="p-1 text-start">Count</th>
                  </tr>
                </thead>
                <tbody>
                  {projectmembers?.map((item, index) => {
                    let workload = {};
                    let total = 0;
                    Object.values(data.tasks).forEach((item) => {
                      total += 1;
                      if (workload[item.assignee]) workload[item.assignee] += 1;
                      else workload[item.assignee] = 1;
                    });
                    return (
                      <tr key={index} className="p-1">
                        <td className="text-black font-light items-center  skeleton p-1">
                          <Avatar name={item.name} round size="30" textSizeRatio={1.75} />
                          <span className="pl-2">{item.name}</span>
                        </td>
                        <td className="flex items-center justify-between p-1">
                          <div className="w-3/5 bg-gray-400 rounded-full h-3">
                            <div
                              className="bg-blue-900 h-full rounded-full"
                              style={{
                                width: `${parseInt((workload[item.id] * 100) / total)}%`,
                              }}></div>
                          </div>
                          <div className="w-2/5 pl-2 p-1 font-medium">
                            {parseInt((workload[item.id] * 100) / total)}
                            <span>%</span>
                          </div>
                        </td>
                        <td className="text-blue-800 text-center font-medium skeleton">
                          {workload[item.id]}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PieChart = ({ data }) => {
  const chartRef = useRef(null);

  const chartData = Object.keys(data.columns).map((item) => {
    let newObj = {};
    newObj.name = data.columns[item]["title"];
    newObj.value = data.columns[item]["taskIds"].length;
    return newObj;
  });

  // ECharts options
  const option = {
    // tooltip: {
    //   trigger: "item",
    //   formatter: "{a} <br/>{b} : {c} ({d}%)",

    // },
    // legend: {
    //   orient: "vertical",
    //   left: "right",
    //   formatter: "{a}",
    // },
    series: [
      {
        name: "Dummy Data",
        type: "pie",
        radius: ["50%", "80%"],
        data: chartData.map((item) => ({
          value: item.value,
          name: item.name,
        })),
        itemStyle: {
          borderRadius: 10,
        },
        avoidLabelOverlap: false,
        padAngle: 5,
        labelLine: {
          show: false,
        },
        label: {
          formatter: "{d}%\n{b}",
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 20,
            fontWeight: "bold",
          },

          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };

  const triggerHoverOnSlice = (sliceName) => {
    const echartsInstance = chartRef.current.getEchartsInstance();

    // Find the index of the slice with the given name
    // const dataIndex = echartsInstance.getModel().getSeries()[0].data.findIndex(dataItem => dataItem.name === sliceName);
    const dataIndex = chartData.findIndex((dataItem) => dataItem.name === sliceName);

    // Trigger hover event on the slice
    echartsInstance.dispatchAction({
      type: "highlight",
      seriesIndex: 0,
      dataIndex,
    });
  };

  const handleMouseEnter = (sliceName) => {
    triggerHoverOnSlice(sliceName);
  };

  const handleMouseLeave = () => {
    const echartsInstance = chartRef.current.getEchartsInstance();
    echartsInstance.dispatchAction({
      type: "downplay",
    });
  };

  return (
    <div className=" flex justify-center items-center overflow-hidden">
      <div className="w-1/2 ">
        <ReactECharts ref={chartRef} option={option} />
      </div>
      <div className="w-1/2 ">
        <div className="flex flex-col p-5">
          {chartData.map((item, index) => (
            <div
              key={index}
              className="flex justify-between p-1 hover:bg-gray-200 rounded "
              onMouseEnter={() => handleMouseEnter(item.name)}
              onMouseLeave={handleMouseLeave}>
              <div className="flex items-center ">
                <div
                  className=" size-4 rounded  mr-2"
                  style={{ backgroundColor: piechartColors[index] }}
                />
                <p className="text-gray-700 skeleton">{item.name}</p>
              </div>
              <p className="text-blue-700 skeleton">{item.value}</p>
            </div>
          ))}
          <div className="flex justify-between p-1 ">
            <p className=" font-bold skeleton">Total</p>
            <p className=" font-bold text-blue-700 skeleton ">{Object.keys(data?.tasks).length}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const BarChart = ({ data }) => {
  // Structure data for the chart
  let barData = [
    { name: "Lowest", value: 0, color: "#DE350B" },
    { name: "Low", value: 0, color: "#FF7452" },
    { name: "Medium", value: 0, color: "#FFAB00" },
    { name: "High", value: 0, color: "#4C9AFF" },
    { name: "Highest", value: 0, color: "#0065FF" },
  ];
  Object.values(data.tasks).map((item) => {
    item.priority === "Lowest" && barData[0].value++;
    item.priority === "Low" && barData[1].value++;
    item.priority === "Medium" && barData[2].value++;
    item.priority === "High" && barData[3].value++;
    item.priority === "Highest" && barData[4].value++;
  });

  // Configuration options for the chart
  const options = {
    xAxis: {
      type: "category",
      data: barData.map((item) => item.name),
      // axisLabel: {
      //   rotate: -45,
      //   formatter: function (value, index) {
      //     // Access the icon corresponding to the day
      //     var icon = PriorityIcons[index];
      //     // Return the formatted label with icon
      //     return "{title|" + value + "}";
      //   },
      //   rich: {
      //     title: {
      //       lineHeight: 30,
      //       align: "center",
      //       color: "blue",
      //       fontSize: 14,
      //     },
      //   },
      // },
    }
    ,
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: barData.map((item) => ({
          value: item.value,
          itemStyle: {
            color: item.color,
          },
        })),
        type: "bar",
      },
    ],
  };

  return <ReactECharts option={options} className="overflow-hidden" />;
};



// implement issue modal
// implement Create new Project
// mini map
// show priority in task across all tabs
// dragging task to end of main
// List table width not working
// Timeline dragend automatically clicking
