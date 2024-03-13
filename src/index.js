import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Test from "../src/components/ui/Test";
import { Dnd } from "./components/customdnd/Dnd";
import { Table } from "./components/customdnd/Table";
import { Gnatt_Chart } from "./components/timeline/Gnatt_Chart";
import { Timeline } from "./components/timeline/Timeline";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<App />);
