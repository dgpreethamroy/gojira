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
const TestData = {
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
const LinkIcon = (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    role="presentation"
    className="bg-blue-500 rounded-full"
  >
    <g fill="white" fill-rule="evenodd">
      <path d="M12.856 5.457l-.937.92a1.002 1.002 0 000 1.437 1.047 1.047 0 001.463 0l.984-.966c.967-.95 2.542-1.135 3.602-.288a2.54 2.54 0 01.203 3.81l-2.903 2.852a2.646 2.646 0 01-3.696 0l-1.11-1.09L9 13.57l1.108 1.089c1.822 1.788 4.802 1.788 6.622 0l2.905-2.852a4.558 4.558 0 00-.357-6.82c-1.893-1.517-4.695-1.226-6.422.47"></path>
      <path d="M11.144 19.543l.937-.92a1.002 1.002 0 000-1.437 1.047 1.047 0 00-1.462 0l-.985.966c-.967.95-2.542 1.135-3.602.288a2.54 2.54 0 01-.203-3.81l2.903-2.852a2.646 2.646 0 013.696 0l1.11 1.09L15 11.43l-1.108-1.089c-1.822-1.788-4.802-1.788-6.622 0l-2.905 2.852a4.558 4.558 0 00.357 6.82c1.893 1.517 4.695 1.226 6.422-.47"></path>
    </g>
  </svg>
);
const LinkIcon_Black = (
  <svg width="22" height="22" viewBox="0 0 24 24" role="presentation">
    <g fill="black" fill-rule="evenodd">
      <path d="M12.856 5.457l-.937.92a1.002 1.002 0 000 1.437 1.047 1.047 0 001.463 0l.984-.966c.967-.95 2.542-1.135 3.602-.288a2.54 2.54 0 01.203 3.81l-2.903 2.852a2.646 2.646 0 01-3.696 0l-1.11-1.09L9 13.57l1.108 1.089c1.822 1.788 4.802 1.788 6.622 0l2.905-2.852a4.558 4.558 0 00-.357-6.82c-1.893-1.517-4.695-1.226-6.422.47"></path>
      <path d="M11.144 19.543l.937-.92a1.002 1.002 0 000-1.437 1.047 1.047 0 00-1.462 0l-.985.966c-.967.95-2.542 1.135-3.602.288a2.54 2.54 0 01-.203-3.81l2.903-2.852a2.646 2.646 0 013.696 0l1.11 1.09L15 11.43l-1.108-1.089c-1.822-1.788-4.802-1.788-6.622 0l-2.905 2.852a4.558 4.558 0 00.357 6.82c1.893 1.517 4.695 1.226 6.422-.47"></path>
    </g>
  </svg>
);

const downArrow = (
  <svg width="24" height="24" viewBox="0 0 24 24" role="presentation">
    <path
      d="M11 6v9.586l-3.793-3.793a.999.999 0 00-1.414 0c-.39.39-.39 1.024 0 1.415l5.5 5.499A.993.993 0 0012 19a.993.993 0 00.707-.293l5.5-5.499a1 1 0 10-1.414-1.415L13 15.586V6a1 1 0 00-2 0z"
      fill="currentColor"
    ></path>
  </svg>
);

const upArrow = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    role="presentation"
    className=" rotate-180"
  >
    <path
      d="M11 6v9.586l-3.793-3.793a.999.999 0 00-1.414 0c-.39.39-.39 1.024 0 1.415l5.5 5.499A.993.993 0 0012 19a.993.993 0 00.707-.293l5.5-5.499a1 1 0 10-1.414-1.415L13 15.586V6a1 1 0 00-2 0z"
      fill="currentColor"
    ></path>
  </svg>
);
const listIssuesLabelIcons = {
  id: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M10 6C9.44772 6 9 6.44772 9 7V9H7C6.44772 9 6 9.44772 6 10C6 10.5523 6.44772 11 7 11H9V13H7C6.44772 13 6 13.4477 6 14C6 14.5523 6.44772 15 7 15H9V17C9 17.5523 9.44772 18 10 18C10.5523 18 11 17.5523 11 17V15H13V17C13 17.5523 13.4477 18 14 18C14.5523 18 15 17.5523 15 17V15H17C17.5523 15 18 14.5523 18 14C18 13.4477 17.5523 13 17 13H15V11H17C17.5523 11 18 10.5523 18 10C18 9.44772 17.5523 9 17 9H15V7C15 6.44772 14.5523 6 14 6C13.4477 6 13 6.44772 13 7V9H11V7C11 6.44772 10.5523 6 10 6ZM13 13V11H11V13H13Z"
        fill="currentColor"
      ></path>
    </svg>
  ),
  summary: (
    <svg width="24" height="24" viewBox="0 0 24 24" role="presentation">
      <path
        d="M7 7h10a1 1 0 010 2H7a1 1 0 110-2zm0 4h10a1 1 0 010 2H7a1 1 0 010-2zm0 4h5a1 1 0 010 2H7a1 1 0 010-2z"
        fill="currentColor"
        fill-rule="evenodd"
      ></path>
    </svg>
  ),
  createdAt: (
    <svg width="24" height="24" viewBox="0 0 24 24" role="presentation">
      <path
        d="M4.995 5h14.01C20.107 5 21 5.895 21 6.994v12.012A1.994 1.994 0 0119.005 21H4.995A1.995 1.995 0 013 19.006V6.994C3 5.893 3.892 5 4.995 5zM5 9v9a1 1 0 001 1h12a1 1 0 001-1V9H5zm1-5a1 1 0 012 0v1H6V4zm10 0a1 1 0 012 0v1h-2V4zm-9 9v-2.001h2V13H7zm8 0v-2.001h2V13h-2zm-4 0v-2.001h2.001V13H11zm-4 4v-2h2v2H7zm4 0v-2h2.001v2H11zm4 0v-2h2v2h-2z"
        fill="currentColor"
        fill-rule="evenodd"
      ></path>
    </svg>
  ),
  DueDate: (
    <svg width="24" height="24" viewBox="0 0 24 24" role="presentation">
      <path
        d="M4.995 5h14.01C20.107 5 21 5.895 21 6.994v12.012A1.994 1.994 0 0119.005 21H4.995A1.995 1.995 0 013 19.006V6.994C3 5.893 3.892 5 4.995 5zM5 9v9a1 1 0 001 1h12a1 1 0 001-1V9H5zm1-5a1 1 0 012 0v1H6V4zm10 0a1 1 0 012 0v1h-2V4zm-9 9v-2.001h2V13H7zm8 0v-2.001h2V13h-2zm-4 0v-2.001h2.001V13H11zm-4 4v-2h2v2H7zm4 0v-2h2.001v2H11zm4 0v-2h2v2h-2z"
        fill="currentColor"
        fill-rule="evenodd"
      ></path>
    </svg>
  ),
  labels: (
    <svg width="24" height="24" viewBox="0 0 24 24" role="presentation">
      <path
        d="M11.433 5.428l-4.207.6A2 2 0 005.53 7.727l-.6 4.207a1 1 0 00.281.849l6.895 6.894a.999.999 0 001.414 0l5.657-5.657a1 1 0 000-1.414L12.282 5.71a.998.998 0 00-.849-.283m-.647 5.858A1.666 1.666 0 118.43 8.929a1.666 1.666 0 012.357 2.357"
        fill="currentColor"
        fill-rule="evenodd"
      ></path>
    </svg>
  ),
  assignee: (
    <svg width="24" height="24" viewBox="0 0 24 24" role="presentation">
      <path
        d="M12.062 13.93c-.904 0-1.451-.734-1.451-1.945 0-1.226.538-1.952 1.466-1.952.928 0 1.422.764 1.422 1.967 0 1.195-.502 1.93-1.438 1.93M12 5c-3.925 0-7 3.075-7 7 0 4.596 3.522 7 7 7 .874 0 1.614-.09 2.26-.279a.751.751 0 00-.42-1.44c-.508.147-1.11.22-1.84.22-2.648 0-5.5-1.722-5.5-5.5 0-3.085 2.417-5.5 5.5-5.5 3.24 0 5.5 1.952 5.5 4.75 0 2.045-1.043 3-1.748 3-.008 0-.752-.11-.752-.75v-4a.75.75 0 10-1.5 0v.187c-.346-.585-1.016-.952-1.795-.952C10.102 8.736 9 10.04 9 11.938c0 1.984 1.103 3.312 2.753 3.312.865 0 1.51-.387 1.865-1.076.334 1.016 1.37 1.576 2.132 1.576 1.598 0 3.25-1.683 3.25-4.5C19 7.628 16.058 5 12 5"
        fill="currentColor"
        fill-rule="evenodd"
      ></path>
    </svg>
  ),
  description: (
    <svg width="24" height="24" viewBox="0 0 24 24" role="presentation">
      <path
        d="M6 12c0-.552.456-1 1.002-1h9.996a.999.999 0 110 2H7.002A.999.999 0 016 12zm0 4c0-.552.456-1 1.002-1h9.996a.999.999 0 110 2H7.002A.999.999 0 016 16zm0-8c0-.552.456-1 1.002-1h9.996a.999.999 0 110 2H7.002A.999.999 0 016 8z"
        fill="currentColor"
      ></path>
    </svg>
  ),
  issuetype: (
    <svg width="24" height="24" viewBox="0 0 24 24" focusable="false">
      <path
        d="M20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12ZM18.2222 12C18.2222 8.56356 15.4364 5.77778 12 5.77778C8.56356 5.77778 5.77778 8.56356 5.77778 12C5.77778 15.4364 8.56356 18.2222 12 18.2222C15.4364 18.2222 18.2222 15.4364 18.2222 12ZM15.3664 11.4518L15.2952 11.3715C15.3267 11.4029 15.3553 11.4362 15.381 11.4708C15.3969 11.4923 15.4118 11.5144 15.4257 11.5372C15.4324 11.5479 15.4386 11.5588 15.4447 11.5697C15.4544 11.5873 15.4637 11.6054 15.4723 11.6239C15.4794 11.639 15.486 11.6544 15.4922 11.6699C15.4993 11.6875 15.5057 11.7051 15.5115 11.7229C15.5158 11.7361 15.5199 11.7498 15.5237 11.7636C15.5291 11.7827 15.5337 11.802 15.5377 11.8215C15.5407 11.837 15.5434 11.8525 15.5457 11.868C15.5483 11.8849 15.5504 11.9024 15.552 11.92C15.5539 11.9416 15.555 11.9626 15.5554 11.9837C15.5555 11.9886 15.5556 11.9943 15.5556 12L15.5554 12.0172C15.555 12.0382 15.5539 12.0593 15.552 12.0802L15.5556 12C15.5556 12.0439 15.5524 12.087 15.5462 12.1292C15.5436 12.1467 15.5404 12.1648 15.5366 12.1829C15.5331 12.1999 15.5293 12.2162 15.5249 12.2323C15.521 12.2463 15.5168 12.2606 15.5122 12.2748C15.5059 12.2943 15.4989 12.3135 15.4913 12.3325C15.4855 12.3467 15.4795 12.3606 15.4731 12.3744C15.4639 12.3941 15.4539 12.4138 15.4431 12.4331C15.438 12.4423 15.4326 12.4517 15.4269 12.461C15.4135 12.4829 15.3993 12.5041 15.3843 12.5246C15.3793 12.5315 15.3743 12.5382 15.3691 12.5448C15.3528 12.5655 15.3393 12.5815 15.3252 12.597L15.2952 12.6285L12.6285 15.2952C12.2814 15.6423 11.7186 15.6423 11.3715 15.2952C11.051 14.9748 11.0264 14.4706 11.2975 14.1219L11.3715 14.0381L12.52 12.8889H9.33333C8.84241 12.8889 8.44444 12.4909 8.44444 12C8.44444 11.5468 8.78355 11.1729 9.22184 11.118L9.33333 11.1111H12.5218L11.3715 9.96187C11.051 9.64144 11.0264 9.13724 11.2975 8.78853L11.3715 8.70479C11.6919 8.38436 12.1961 8.35971 12.5448 8.63085L12.6285 8.70479L15.2977 11.374C15.3221 11.3985 15.345 11.4245 15.3664 11.4518Z"
        fill="currentColor"
      ></path>
    </svg>
  ),
  linkedtasks: (
    <svg width="24" height="24" viewBox="0 0 24 24" focusable="false">
      <path
        d="M12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20ZM12 18.2222C15.4364 18.2222 18.2222 15.4364 18.2222 12C18.2222 8.56356 15.4364 5.77778 12 5.77778C8.56356 5.77778 5.77778 8.56356 5.77778 12C5.77778 15.4364 8.56356 18.2222 12 18.2222ZM14.1219 13.5914L14.0381 13.5174L12 11.48L9.96186 13.5174C9.64143 13.8378 9.13725 13.8625 8.78855 13.5914L8.70481 13.5174C8.38438 13.197 8.35973 12.6928 8.63086 12.3441L8.70481 12.2604L11.3715 9.5937C11.6919 9.27327 12.1961 9.24861 12.5448 9.51975L12.6285 9.5937L15.2952 12.2604C15.6423 12.6075 15.6423 13.1703 15.2952 13.5174C14.9748 13.8378 14.4706 13.8625 14.1219 13.5914Z"
        fill="currentColor"
      ></path>
    </svg>
  ),
};
const waring_Icon = (
  <svg width="24" height="24" viewBox="0 0 24 24" role="presentation">
    <g fill-rule="evenodd">
      <path
        d="M13.416 4.417a2.002 2.002 0 00-2.832 0l-6.168 6.167a2.002 2.002 0 000 2.833l6.168 6.167a2.002 2.002 0 002.832 0l6.168-6.167a2.002 2.002 0 000-2.833l-6.168-6.167z"
        fill="red"
      ></path>
      <path
        d="M12 14a1 1 0 01-1-1V8a1 1 0 012 0v5a1 1 0 01-1 1m0 3a1 1 0 010-2 1 1 0 010 2"
        fill="white"
      ></path>
    </g>
  </svg>
);
const gradientColors = [
  {
    start: "from-blue-500",
    middle: "via-purple-600",
    end: "to-gray-800",
  },
  {
    start: "from-green-500",
    middle: "via-teal-600",
    end: "to-gray-800",
  },
  {
    start: "from-yellow-500",
    middle: "via-orange-600",
    end: "to-gray-800",
  },
  {
    start: "from-red-500",
    middle: "via-pink-600",
    end: "to-gray-800",
  },
  {
    start: "from-cyan-500",
    middle: "via-indigo-600",
    end: "to-red-800",
  },
];
const gradientColorsHexCodes = [
  {
    start: "#4299e1",
    middle: "#9f7aea",
    end: "#2d3748",
  },
  {
    start: "#48bb78",
    middle: "#319795",
    end: "#2d3748",
  },
  {
    start: "#ecc94b",
    middle: "#ed8936",
    end: "#2d3748",
  },
  {
    start: "#f56565",
    middle: "#d53f8c",
    end: "#2d3748",
  },
  {
    start: "#4fd1c5",
    middle: "#667eea",
    end: "#881388",
  },
];

const solidColors = [
  "bg-gray-100",
  "bg-gray-200",
  "bg-gray-300",
  "bg-gray-400",
  "bg-gray-500",
  "bg-gray-600",
  "bg-gray-700",
  "bg-gray-800",
  "bg-gray-900",
  "bg-red-100",
  "bg-red-200",
  "bg-red-300",
  "bg-red-400",
  "bg-red-500",
  "bg-red-600",
  "bg-red-700",
  "bg-red-800",
  "bg-red-900",
  "bg-yellow-100",
  "bg-yellow-200",
  "bg-yellow-300",
  "bg-yellow-400",
  "bg-yellow-500",
  "bg-yellow-600",
  "bg-yellow-700",
  "bg-yellow-800",
  "bg-yellow-900",
  "bg-green-100",
  "bg-green-200",
  "bg-green-300",
  "bg-green-400",
  "bg-green-500",
  "bg-green-600",
  "bg-green-700",
  "bg-green-800",
  "bg-green-900",
  "bg-blue-100",
  "bg-blue-200",
  "bg-blue-300",
  "bg-blue-400",
];
const solidColorsHexCodes = [
  "#f7fafc",
  "#edf2f7",
  "#e2e8f0",
  "#cbd5e0",
  "#a0aec0",
  "#718096",
  "#4a5568",
  "#2d3748",
  "#1a202c",
  "#fff5f5",
  "#fed7d7",
  "#feb2b2",
  "#fc8181",
  "#f56565",
  "#e53e3e",
  "#c53030",
  "#9b2c2c",
  "#742a2a",
  "#fffff0",
  "#fefcbf",
  "#faf089",
  "#f6e05e",
  "#ecc94b",
  "#d69e2e",
  "#b7791f",
  "#975a16",
  "#744210",
  "#f0fff4",
  "#c6f6d5",
  "#9ae6b4",
  "#68d391",
  "#48bb78",
  "#38a169",
  "#2f855a",
  "#276749",
  "#22543d",
  "#ebf8ff",
  "#bee3f8",
  "#90cdf4",
  "#63b3ed",
];

const colorPallete = [
  "#FF6F61", // VividTangerine
  "#FFD700", // Gold
  "#FF1493", // DeepPink
  "#00FF00", // Lime
  "#00BFFF", // DeepSkyBlue
  "#EE82EE", // Violet
  "#7FFF00", // Chartreuse
  "#FF00FF", // Magenta
  "#FF5733", // OrangeRed
  "#FFC300", // FluorescentYellow
];

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
  LinkIcon_Black,
  Rightarrow_Medium_Icon,
  TestData,
  LinkIcon,
  upArrow,
  downArrow,
  listIssuesLabelIcons,
  waring_Icon,
  colorPallete,
  gradientColors,
  solidColors,
  solidColorsHexCodes,
  gradientColorsHexCodes,
};
// Path: src/assets/CommonData.js
