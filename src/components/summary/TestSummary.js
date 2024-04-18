import React, { useState, useEffect } from "react";
import { RetractIcon, expandDownIcon } from "../../assets/CommonData";
import Avatar from "react-avatar";
import ReactECharts from "echarts-for-react";
import customAxios from "../../api/axios";
export const TestSummary = ({ data, user, project_id, username }) => {
  const [pdetails, setPdetails] = useState(false);
  const [recentData, setRecentData] = useState(null);
  useEffect(() => {
    console.log("Summary useEffect");
    async function fetchRecords() {
      console.log("fetch Called");
      const records = await customAxios.get(`/requestrecords?max_results=20`);
      debugger;
      console.log("response", records.data);
      setRecentData(records.data);
    }
    if (user && !recentData) fetchRecords();
  }, []);

  return (
    <div className=" mx-20  rounded">
      <div className="py-2 my-2 flex flex-col items-center">
        <p className="text-center text-xl font-semibold font-myfont">
          శుభోదయం, {username.toLowerCase()} ☕️
        </p>
        <br />
        <p className="text-center text-base ">
          Here's where you'll view a summary of Go to market sample's status,
          priorities, workload, and more.
        </p>
        <br />
        <div className="flex flex-col items-center ">
          <button
            className="hover:underline mb-2 "
            onClick={() => {
              setPdetails((prev) => !prev);
            }}
          >
            <div className="flex ">
              <p>Project Details</p>
              {pdetails ? RetractIcon : expandDownIcon}
            </div>
          </button>
          {pdetails && (
            <div className=" rounded-full bg-slate-200 transition-max-height">
              <div className="p-2 flex rounded-full items-center">
                <Avatar
                  name={username}
                  size="40"
                  round={true}
                  textSizeRatio={1.75}
                />
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
      <div className="grid lg:grid-cols-4 grid-cols-2 gap-6">
        <div className="flex bg-white hover-div rounded-lg py-5 px-7 items-center">
          <span className=" justify-center items-center flex rounded-full w-14 h-14  bg-green-200">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              role="presentation"
              className="svgHovered"
            >
              <path
                d="M7.356 10.942a.497.497 0 00-.713 0l-.7.701a.501.501 0 00-.003.71l3.706 3.707a.501.501 0 00.705.003l7.712-7.712a.493.493 0 00-.006-.708l-.7-.7a.504.504 0 00-.714 0l-6.286 6.286a.506.506 0 01-.713 0l-2.288-2.287z"
                fill="rgb(22 101 52)"
              ></path>
            </svg>
          </span>
          <div className="flex flex-col pl-4 pr-8 ">
            <p className="text-xl text-green-800 font-[500]">0 done</p>
            <p>in the last 7 days</p>
          </div>
        </div>
        <div className="flex bg-white  hover-div rounded-lg py-5 px-7 items-center">
          <span className=" justify-center items-center flex rounded-full w-14 h-14  bg-blue-200">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              role="presentation"
              className="svgHovered"
            >
              <path
                d="M4.02 19.23a1 1 0 001.18 1.18l3.81-.78-4.21-4.21-.78 3.81zM19.844 6.707l-2.12-2.122A1.997 1.997 0 0016.308 4c-.512 0-1.024.195-1.415.585l-9.757 9.758 4.95 4.95 9.757-9.758a2 2 0 000-2.828z"
                fill="rgb(29 78 216)"
                fill-rule="evenodd"
              ></path>
            </svg>
          </span>
          <div className="flex flex-col pl-4 pr-8">
            <p className="text-xl text-blue-800 font-[500]">0 updated</p>
            <p>in the last 7 days</p>
          </div>
        </div>
        <div className="flex bg-white  hover-div rounded-lg py-5 px-7 items-center">
          <span className=" justify-center items-center flex rounded-full w-14 h-14  bg-purple-200">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              role="presentation"
              className="svgHovered"
            >
              <path
                d="M13 11V7a1 1 0 00-2 0v4H7a1 1 0 000 2h4v4a1 1 0 002 0v-4h4a1 1 0 000-2h-4z"
                fill="rgb(168 85 247)"
                fill-rule="evenodd"
              ></path>
            </svg>
          </span>
          <div className="flex flex-col pl-4 pr-8">
            <p className="text-xl text-purple-800 font-[500]">0 created</p>
            <p>in the last 7 days</p>
          </div>
        </div>
        <div className="flex bg-white  hover-div rounded-lg py-5 px-7 items-center">
          <span className=" justify-center items-center flex rounded-full w-14 h-14  bg-red-200">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              role="presentation"
              className="svgHovered"
            >
              <path
                d="M4.995 5h14.01C20.107 5 21 5.895 21 6.994v12.012A1.994 1.994 0 0119.005 21H4.995A1.995 1.995 0 013 19.006V6.994C3 5.893 3.892 5 4.995 5zM5 9v9a1 1 0 001 1h12a1 1 0 001-1V9H5zm1-5a1 1 0 012 0v1H6V4zm10 0a1 1 0 012 0v1h-2V4zm-9 9v-2.001h2V13H7zm8 0v-2.001h2V13h-2zm-4 0v-2.001h2.001V13H11zm-4 4v-2h2v2H7zm4 0v-2h2.001v2H11zm4 0v-2h2v2h-2z"
                fill="rgb(239 68 68)"
                fill-rule="evenodd"
              ></path>
            </svg>
          </span>
          <div className="flex flex-col pl-4 pr-8">
            <p className="text-xl text-red-800 font-[500]">0 due</p>
            <p>in the last 7 days</p>
          </div>
        </div>
      </div>
      <br />
      <div className=" grid grid-cols-2 gap-6  ">
        <div className="bg-white rounded">
          <div className="p-8">
            <p className="font-semibold text-gray-700">Status overview</p>
            <br />
            <p>Get a snapshot of the status of your items. View all items</p>
            <br />
            <PieChart />
          </div>
        </div>
        <div className="bg-rose-300 rounded">
          <div className="p-8">
            <p className="text-black font-semibold ">Recent Activity</p>
            <br />
            Stay up to date with what's happening across the project.
            <div className="w-full h-[2px] bg-gray-600 mt-2" />
            {recentData?.map((item, index) => (
              <div key={index} className="flex justify-between p-1">
                <p className="text-gray-700">{item.username}</p>
                <p className="text-gray-700">{item.path}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const PieChart = () => {
  // Dummy data
  const data = [
    { name: "Category 1", value: 60 },
    { name: "Category 2", value: 80 },
    { name: "Category 3", value: 40 },
    { name: "Category 4", value: 20 },
  ];

  // ECharts options
  const option = {
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} ({d}%)",
    },
    // legend: {
    //   orient: "vertical",
    //   left: "left",
    // },
    series: [
      {
        name: "Dummy Data",
        type: "pie",
        radius: ["40%", "70%"],
        data: data.map((item) => ({
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

  return (
    <div className=" flex justify-center items-center h-[400px] overflow-hidden">
      <div className="w-1/2">
        <ReactECharts option={option} />
      </div>
      <div className="w-1/2 ">
        <div className="flex flex-col p-5">
          {data.map((item, index) => (
            <div key={index} className="flex justify-between p-1">
              <p className="text-gray-700">{item.name}</p>
              <p className="text-blue-700">{item.value}</p>
            </div>
          ))}
          <div className="flex justify-between p-1">
            <p className=" font-bold">Total</p>
            <p className=" font-bold text-blue-700">200</p>
          </div>
        </div>
      </div>
    </div>
  );
};
