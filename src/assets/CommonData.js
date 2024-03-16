import React from "react";

const menu_icon_dots = (
  <svg
    className="TaskMenu"
    width="28"
    height="28"
    viewBox="0 0 24 24"
    role="presentation"
  >
    <g fill="black" fill-rule="evenodd">
      <circle cx="5" cy="12" r="2"></circle>
      <circle cx="12" cy="12" r="2"></circle>
      <circle cx="19" cy="12" r="2"></circle>
    </g>
  </svg>
);
const Issuedata = [
  {
    value: "Bug",
    label: "Bug",
    option: "Bug",
    icon: (
      <img
        width="25"
        height="25"
        alt="Bug"
        className="inline"
        src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjE2cHgiIGhlaWdodD0iMTZweCIgdmlld0JveD0iMCAwIDE2IDE2IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnNrZXRjaD0iaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoL25zIj4KICAgIDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggMy41LjIgKDI1MjM1KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5idWc8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZGVmcz48L2RlZnM+CiAgICA8ZyBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBza2V0Y2g6dHlwZT0iTVNQYWdlIj4KICAgICAgICA8ZyBpZD0iYnVnIiBza2V0Y2g6dHlwZT0iTVNBcnRib2FyZEdyb3VwIj4KICAgICAgICAgICAgPGcgaWQ9IkJ1ZyIgc2tldGNoOnR5cGU9Ik1TTGF5ZXJHcm91cCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMS4wMDAwMDAsIDEuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICA8cmVjdCBpZD0iUmVjdGFuZ2xlLTM2IiBmaWxsPSIjRTU0OTNBIiBza2V0Y2g6dHlwZT0iTVNTaGFwZUdyb3VwIiB4PSIwIiB5PSIwIiB3aWR0aD0iMTQiIGhlaWdodD0iMTQiIHJ4PSIyIj48L3JlY3Q+CiAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMTAsNyBDMTAsOC42NTcgOC42NTcsMTAgNywxMCBDNS4zNDMsMTAgNCw4LjY1NyA0LDcgQzQsNS4zNDMgNS4zNDMsNCA3LDQgQzguNjU3LDQgMTAsNS4zNDMgMTAsNyIgaWQ9IkZpbGwtMiIgZmlsbD0iI0ZGRkZGRiIgc2tldGNoOnR5cGU9Ik1TU2hhcGVHcm91cCI+PC9wYXRoPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4="
      />
    ),
  },
  {
    value: "Task",
    label: "Task",
    option: "Task",
    icon: (
      <img
        width="25"
        height="25"
        alt="Task"
        className="inline"
        src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjE2cHgiIGhlaWdodD0iMTZweCIgdmlld0JveD0iMCAwIDE2IDE2IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnNrZXRjaD0iaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoL25zIj4KICAgIDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggMy41LjIgKDI1MjM1KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT50YXNrPC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGRlZnM+PC9kZWZzPgogICAgPGcgaWQ9IlBhZ2UtMSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc2tldGNoOnR5cGU9Ik1TUGFnZSI+CiAgICAgICAgPGcgaWQ9InRhc2siIHNrZXRjaDp0eXBlPSJNU0FydGJvYXJkR3JvdXAiPgogICAgICAgICAgICA8ZyBpZD0iVGFzayIgc2tldGNoOnR5cGU9Ik1TTGF5ZXJHcm91cCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMS4wMDAwMDAsIDEuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICA8cmVjdCBpZD0iUmVjdGFuZ2xlLTM2IiBmaWxsPSIjNEJBREU4IiBza2V0Y2g6dHlwZT0iTVNTaGFwZUdyb3VwIiB4PSIwIiB5PSIwIiB3aWR0aD0iMTQiIGhlaWdodD0iMTQiIHJ4PSIyIj48L3JlY3Q+CiAgICAgICAgICAgICAgICA8ZyBpZD0iUGFnZS0xIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg0LjAwMDAwMCwgNC41MDAwMDApIiBzdHJva2U9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBza2V0Y2g6dHlwZT0iTVNTaGFwZUdyb3VwIj4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMiw1IEw2LDAiIGlkPSJTdHJva2UtMSI+PC9wYXRoPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0yLDUgTDAsMyIgaWQ9IlN0cm9rZS0zIj48L3BhdGg+CiAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg=="
      />
    ),
  },
  {
    value: "Story",
    label: "Story",
    option: "Story",
    icon: (
      <img
        width="25"
        height="25"
        alt="Story"
        className="inline"
        src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjE2cHgiIGhlaWdodD0iMTZweCIgdmlld0JveD0iMCAwIDE2IDE2IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnNrZXRjaD0iaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoL25zIj4KICAgIDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggMy41LjIgKDI1MjM1KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5zdG9yeTwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxkZWZzPjwvZGVmcz4KICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHNrZXRjaDp0eXBlPSJNU1BhZ2UiPgogICAgICAgIDxnIGlkPSJzdG9yeSIgc2tldGNoOnR5cGU9Ik1TQXJ0Ym9hcmRHcm91cCI+CiAgICAgICAgICAgIDxnIGlkPSJTdG9yeSIgc2tldGNoOnR5cGU9Ik1TTGF5ZXJHcm91cCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMS4wMDAwMDAsIDEuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICA8cmVjdCBpZD0iUmVjdGFuZ2xlLTM2IiBmaWxsPSIjNjNCQTNDIiBza2V0Y2g6dHlwZT0iTVNTaGFwZUdyb3VwIiB4PSIwIiB5PSIwIiB3aWR0aD0iMTQiIGhlaWdodD0iMTQiIHJ4PSIyIj48L3JlY3Q+CiAgICAgICAgICAgICAgICA8cGF0aCBkPSJNOSwzIEw1LDMgQzQuNDQ4LDMgNCwzLjQ0OCA0LDQgTDQsMTAuNSBDNCwxMC43NzYgNC4yMjQsMTEgNC41LDExIEM0LjY3NSwxMSA0LjgyMSwxMC45MDUgNC45MSwxMC43NjkgTDQuOTE0LDEwLjc3IEw2Ljg0LDguNTQgQzYuOTIsOC40MzQgNy4wOCw4LjQzNCA3LjE2LDguNTQgTDkuMDg2LDEwLjc3IEw5LjA5LDEwLjc2OSBDOS4xNzksMTAuOTA1IDkuMzI1LDExIDkuNSwxMSBDOS43NzYsMTEgMTAsMTAuNzc2IDEwLDEwLjUgTDEwLDQgQzEwLDMuNDQ4IDkuNTUyLDMgOSwzIiBpZD0iUGFnZS0xIiBmaWxsPSIjRkZGRkZGIiBza2V0Y2g6dHlwZT0iTVNTaGFwZUdyb3VwIj48L3BhdGg+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg=="
      ></img>
    ),
  },
];
const status_data = [
  {
    value: "To Do",
    label: "To Do",
    option: "To Do",
  },
  {
    value: "In Progress",
    label: "In Progress",
    option: "In Progress",
  },
  {
    value: "In Review",
    label: "In Review",
    option: "In Review",
  },

  {
    value: "Done",
    label: "Done",
    option: "Done",
  },
];
const labels_data = [
  {
    value: "content",
    label: "content",
  },
  {
    value: "customer-access",
    label: "customer-access",
  },
  {
    value: "customer-support",
    label: "customer-support",
  },
  {
    value: "design",
    label: "design",
  },
  {
    value: "marketing",
    label: "marketing",
  },
  {
    value: "product",
    label: "product",
  },
  {
    value: "research",
    label: "research",
  },
  {
    value: "sales",
    label: "sales",
  },
  {
    value: "security",
    label: "security",
  },
  {
    value: "support",
    label: "support",
  },
  {
    value: "technical",
    label: "technical",
  },
  {
    value: "testing",
    label: "testing",
  },
  {
    value: "ux",
    label: "ux",
  },
  {
    value: "visual-design",
    label: "visual-design",
  },
];
const checkIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="-10 -10 48 48"
    className="w-8 h-8 border rounded shadow-2xl bg-white hover:bg-slate-200 hover:cursor-pointer "
  >
    <path
      fillRule="evenodd"
      d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z"
      clipRule="evenodd"
    />
  </svg>
);
const closeIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="-12 -12  48 48"
    className="w-8 h-8 bg-white border hover:bg-slate-200 rounded shadow-2xl m-2 hover:cursor-pointer "
  >
    <path
      fillRule="evenodd"
      d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
      clipRule="evenodd"
    />
  </svg>
);
const Delete_Icon = (
  <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect
      x="5"
      y="6"
      width="10"
      height="10"
      fill="#EDE9FE"
      stroke="#A78BFA"
      strokeWidth="2"
    />
    <path d="M3 6H17" stroke="#A78BFA" strokeWidth="2" />
    <path d="M8 6V4H12V6" stroke="#A78BFA" strokeWidth="2" />
  </svg>
);
const Plus_Icon = (
  <img
    width="30"
    height="30"
    src="https://img.icons8.com/ios-glyphs/30/000000/plus-math.png"
    alt="plus-math"
  />
);
const Calendar_Filter_Data = [
  {
    label: (
      <span>
        <svg
          role="presentation"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path
            d="M12 3a9 9 0 014.78 16.627c-.154.19-.375.323-.628.361A8.978 8.978 0 0112 21a8.961 8.961 0 01-4.151-1.013.993.993 0 01-.628-.36A9 9 0 0112 3zm1 13h-2l-.15.006a2 2 0 00-1.844 1.837L9 18v.326c.91.432 1.927.674 3 .674a6.972 6.972 0 003-.674V18l-.005-.15a2 2 0 00-1.838-1.844L13 16zM12 5a7 7 0 00-4.88 12.02 4.004 4.004 0 013.673-3.015L11 14h2l.2.005a4.002 4.002 0 013.679 3.013A7 7 0 0012 5zm0 2a3 3 0 110 6 3 3 0 010-6zm0 2a1 1 0 100 2 1 1 0 000-2z"
            fill="currentColor"
          ></path>
        </svg>
      </span>
    ),
    value: "Assign to me",
  },
  {
    label: (
      <span>
        <svg
          role="presentation"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M8 6a1 1 0 012 0h4a1 1 0 112 0h1a2 2 0 012 2v8a2 2 0 01-2 2H7a2 2 0 01-2-2V8a2 2 0 012-2h1zm6 2a1 1 0 102 0h1v2H7V8h1a1 1 0 002 0h4zm-7 4v4h10v-4H7z"
            fill="currentColor"
          ></path>
        </svg>
      </span>
    ),
    value: "Due this week ",
  },
  {
    label: (
      <span>
        <svg
          role="presentation"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path
            d="M12 20a8 8 0 100-16.001A8 8 0 0012 20zm0 2C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"
            fill="currentColor"
          ></path>
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M9.707 11.293a1 1 0 10-1.414 1.414l2 2a1 1 0 001.414 0l4-4a1 1 0 10-1.414-1.414L11 12.586l-1.293-1.293z"
            fill="currentColor"
          ></path>
        </svg>
      </span>
    ),
    value: "Done items",
  },
];
const Filter_Icon = (
  <svg width="24" height="24" viewBox="0 0 24 24" role="presentation">
    <path
      d="M7 13h10l1-2H6zM3.993 6c-.548 0-.79.405-.546.895L4 8h16l.553-1.105C20.8 6.4 20.555 6 20.007 6H3.993zm6.785 11.556a.87.87 0 00.727.444h.99c.279 0 .605-.2.727-.444L14 16h-4l.778 1.556z"
      fill=""
      fill-rule="evenodd"
    ></path>
  </svg>
);
const Leftarrow_Icon = (
  <svg width="24" height="24" viewBox="0 0 24 24" role="presentation">
    <path
      fill="currentColor"
      fill-rule="evenodd"
      d="M9.005 10.995l4.593-4.593a.99.99 0 111.4 1.4l-3.9 3.9 3.9 3.9a.99.99 0 01-1.4 1.4L9.005 12.41a1 1 0 010-1.414z"
    ></path>
  </svg>
);
const Rightarrow_Icon = (
  <svg width="24" height="24" viewBox="0 0 24 24" role="presentation">
    <path
      fill="currentColor"
      fill-rule="evenodd"
      d="M14.995 10.995a1 1 0 010 1.414l-4.593 4.593a.99.99 0 01-1.4-1.4l3.9-3.9-3.9-3.9a.99.99 0 011.4-1.4l4.593 4.593z"
    ></path>
  </svg>
);
const checkwithCircle_Icon = (
  <svg
    role="presentation"
    fill="none"
    viewBox="0 0 24 24"
    width="24"
    height="24"
  >
    <path
      d="M12 20a8 8 0 100-16.001A8 8 0 0012 20zm0 2C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"
      fill="currentColor"
    ></path>
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M9.707 11.293a1 1 0 10-1.414 1.414l2 2a1 1 0 001.414 0l4-4a1 1 0 10-1.414-1.414L11 12.586l-1.293-1.293z"
      fill="currentColor"
    ></path>
  </svg>
);
const Calendar_Icon = (
  <svg
    role="presentation"
    fill="none"
    viewBox="0 0 24 24"
    width="24"
    height="24"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M8 6a1 1 0 012 0h4a1 1 0 112 0h1a2 2 0 012 2v8a2 2 0 01-2 2H7a2 2 0 01-2-2V8a2 2 0 012-2h1zm6 2a1 1 0 102 0h1v2H7V8h1a1 1 0 002 0h4zm-7 4v4h10v-4H7z"
      fill="currentColor"
    ></path>
  </svg>
);
const Profile_Icon = (
  <svg
    role="presentation"
    width="24"
    height="24"
    fill="none"
    viewBox="0 0 24 24"
  >
    <path
      d="M12 3a9 9 0 014.78 16.627c-.154.19-.375.323-.628.361A8.978 8.978 0 0112 21a8.961 8.961 0 01-4.151-1.013.993.993 0 01-.628-.36A9 9 0 0112 3zm1 13h-2l-.15.006a2 2 0 00-1.844 1.837L9 18v.326c.91.432 1.927.674 3 .674a6.972 6.972 0 003-.674V18l-.005-.15a2 2 0 00-1.838-1.844L13 16zM12 5a7 7 0 00-4.88 12.02 4.004 4.004 0 013.673-3.015L11 14h2l.2.005a4.002 4.002 0 013.679 3.013A7 7 0 0012 5zm0 2a3 3 0 110 6 3 3 0 010-6zm0 2a1 1 0 100 2 1 1 0 000-2z"
      fill="currentColor"
    ></path>
  </svg>
);
const blueCheck_Icon = (
  <svg width="24" height="24" viewBox="0 0 24 24" role="presentation">
    <path
      d="M6.735 12.322a1 1 0 00-1.47 1.356l3.612 3.919c.537.526 1.337.526 1.834.03l.364-.359a2335.638 2335.638 0 003.939-3.883l.04-.04a492.598 492.598 0 003.658-3.643 1 1 0 00-1.424-1.404 518.42 518.42 0 01-3.64 3.625l-.04.04a2049.114 2049.114 0 01-3.775 3.722l-3.098-3.363z"
      fill="blue"
    ></path>
  </svg>
);
const Rightarrow_Medium_Icon = (
  <svg width="24" height="24" viewBox="0 0 24 24" role="presentation">
    <path
      d="M11.793 5.793a.999.999 0 000 1.414L15.586 11H6a1 1 0 000 2h9.586l-3.793 3.793a.999.999 0 000 1.414c.39.39 1.024.39 1.415 0l5.499-5.5a.997.997 0 00.293-.679v-.057a.996.996 0 00-.293-.678l-5.499-5.5a1 1 0 00-1.415 0z"
      fill="currentColor"
      fill-rule="evenodd"
    ></path>
  </svg>
);
const 
TestData = {
  tasks: {
    "task-23": {
      id: "task-23",
      summary: "New Release",
      description: "To be released soon",
      issuetype: "Story",
      assignee: "65c12653308c67170f17e2e0",
      labels: ["design", "research"],
      createdAt: "Thu Feb 29 2024",
      DueDate: "Wed Mar 13 2024",
    },
    "task-24": {
      id: "task-24",
      summary: "Table Checkbox",
      description: "Multiselect check box",
      issuetype: "Task",
      assignee: "65b3adff112f8c8b512da4f5",
      labels: ["ux", "visual-design"],
      createdAt: "Thu Feb 1 2024",
      DueDate: "Tue Feb 6 2024",
    },
    "task-25": {
      id: "task-25",
      summary: "Table scroll",
      description: "Make thead sticky tbody scrollable",
      issuetype: "Task",
      assignee: "65b3adff112f8c8b512da4f5",
      labels: ["design", "research"],
      createdAt: "Mon Feb 12 2024",
      DueDate: "Fri Feb 23 2024",
    },
    "task-26": {
      id: "task-26",
      summary: "Access Denied",
      description: "Pavan stopped working",
      issuetype: "Story",
      assignee: "65b3adff112f8c8b512da4f5",
      labels: ["product"],
      createdAt: "Mon Feb 5 2024",
      DueDate: "Fri Feb 9 2024",
    },
    "task-27": {
      id: "task-27",
      summary: "Dnd Scroll",
      description: "Made item headers sticky ",
      issuetype: "Bug",
      assignee: "65c12653308c67170f17e2e0",
      labels: ["design", "research"],
      createdAt: "Tue Feb 6 2024",
      DueDate: "Thu Feb 8 2024",
    },
    "task-28": {
      id: "task-28",
      summary: "Sidebar",
      description: "Need to provide links upon components creations",
      issuetype: "Task",
      assignee: "65b3adff112f8c8b512da4f5",
      labels: ["marketing", "customer-support"],
      createdAt: "Mon Feb 12 2024",
      DueDate: "Wed Feb 21 2024",
    },
    "task-29": {
      id: "task-29",
      summary: "Version",
      description: "Git needs to be updated with care",
      issuetype: "Bug",
      assignee: "65c12653308c67170f17e2e0",
      labels: ["product", "sales", "security"],
      createdAt: "Tue Feb 22 2024",
      DueDate: "Fri Mar 1 2024",
    },
    "task-31": {
      id: "task-31",
      summary: "CSE",
      description: "No Hopes this year",
      issuetype: "Story",
      assignee: "65b3adff112f8c8b512da4f5",
      labels: ["security"],
      createdAt: "Mon Feb 26 2024",
      DueDate: "Mon Mar 4 2024",
    },
    "task-32": {
      id: "task-32",
      summary: "Too much rendering",
      description:
        "table component re-renders upon Hover of labels....This is too much",
      issuetype: "Bug",
      assignee: "65c12653308c67170f17e2e0",
      labels: ["marketing", "design", "research"],
      createdAt: "Sun Mar 2 2024",
      DueDate: "Thu Mar 7 2024",
    },
    "task-33": {
      id: "task-33",
      summary: "TO do task",
      description: "to do",
      issuetype: "Story",
      assignee: "65c12653308c67170f17e2e0",
      labels: ["product", "support"],
      createdAt: "Tue Mar 5 2024",
      DueDate: "Wed Mar 20 2024",
    },
    "task-34": {
      id: "task-34",
      summary: "Checking time",
      description: "Createdat, due date ",
      issuetype: "Task",
      assignee: "65b3adff112f8c8b512da4f5",
      labels: ["content"],
      createdAt: "Mon Mar 4 2024",
      DueDate: "Sat Mar 9 2024",
    },
    "task-35": {
      id: "task-35",
      summary: "Verify Dates",
      description: "Both Creation and due Date have default values",
      issuetype: "Bug",
      assignee: "65b3adff112f8c8b512da4f5",
      labels: ["content", "design"],
      createdAt: "Thu Mar 7 2024",
      DueDate: "Wed Mar 13 2024",
    },
    "task-36": {
      id: "task-36",
      summary: "Checking issue Controller",
      description: "Updating dueDate and createdAt",
      issuetype: "Bug",
      assignee: "65b3adff112f8c8b512da4f5",
      labels: ["design"],
      createdAt: "Mon Mar 11 2024",
      DueDate: "Mon Mar 18 2024",
    },
    "task-37": {
      id: "task-37",
      summary: "Check",
      description: "Check",
      issuetype: "Task",
      assignee: "65b3adff112f8c8b512da4f5",
      labels: ["content"],
      createdAt: "Wed Mar 13 2024",
      DueDate: "Thu Mar 14 2024",
    },
    "task-38": {
      id: "task-38",
      summary: "Implemented createdAt, DueDate",
      description: "Changes in both issues and projectmeta controller",
      issuetype: "Task",
      assignee: "65b3adff112f8c8b512da4f5",
      labels: ["support"],
      createdAt: "Wed Mar 6 2024",
      DueDate: "Mon Apr 1 2024",
    },
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "To Do",
      taskIds: ["task-23", "task-33", "task-24", "task-28", "task-36"],
      _id: {
        $oid: "65e899d8e7036c72bc50dc84",
      },
    },
    "column-2": {
      id: "column-2",
      title: "In Progress",
      taskIds: ["task-32", "task-25", "task-34"],
      _id: {
        $oid: "65e89602b04b39075d3d3d5c",
      },
    },
    "column-3": {
      id: "column-3",
      title: "Done",
      taskIds: ["task-27", "task-29", "task-31", "task-35", "task-38"],
      _id: {
        $oid: "65e89b6ac0e2c8c226c9f46a",
      },
    },
    "column-4": {
      id: "column-4",
      title: "In Review",
      taskIds: ["task-26", "task-37"],
      _id: {
        $oid: "65e89a8a2297887944464285",
      },
    },
    "column-5": {
      id: "column-5",
      title: "not yet implemented",
      taskIds: [],
      _id: {
        $oid: "65e6f935609236065e6dfa6e",
      },
    },
  },
  columnOrder: ["column-1", "column-2", "column-4", "column-3", "column-5"],
};
export {
  Issuedata,
  status_data,
  labels_data,
  checkIcon,
  closeIcon,
  menu_icon_dots,
  Delete_Icon,
  Plus_Icon,
  Calendar_Filter_Data,
  Filter_Icon,
  Leftarrow_Icon,
  Rightarrow_Icon,
  checkwithCircle_Icon,
  Calendar_Icon,
  Profile_Icon,
  blueCheck_Icon,
  Rightarrow_Medium_Icon,
  TestData,
};
// Path: src/assets/CommonData.js
