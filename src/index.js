import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Test from "../src/components/ui/Test";
import { Dnd } from "./components/customdnd/Dnd";
import { Table } from "./components/customdnd/Table";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<App />);
