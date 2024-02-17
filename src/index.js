import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Table from "./components/ui/Table";
import { useState } from "react";
import { Test } from "./components/ui/Test";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  // <div>
  //   <Table
  //     header={["Name", "Type"]}
  //     body={[
  //       { Name: "preetham", Type: "Person" },
  //       { Name: "pavan", Type: "Dog" },
  //     ]}
  //     sort={true}
  //   />
  // </div>

  <Test />
  //<App />
);
