import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Table from "./components/ui/Table";
import Modal from "./components/ui/modal/Modal";
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
  // <Modal>
  //   <Modal.Header close={true} minimize={true}>
  //     This is Header
  //   </Modal.Header>
  //   <p>This is Modal Body</p>
  //   <p>This is Modal Body</p>
  //   <p>This is Modal Body</p>
  //   <p>This is Modal Body</p>
  //   <p>This is Modal Body</p>
  //   <p>This is Modal Body</p>
  //   <p>This is Modal Body</p>
  //   <p>This is Modal Body</p>
  //   <p>This is Modal Body</p>
  //   <p>This is Modal Body</p>
  //   <p>This is Modal Body</p>
  //   <p>This is Modal Body</p>
  //   <p>This is Modal Body</p>
  //   <p>This is Modal Body</p>
  //   <p>This is Modal Body</p>
  //   <p>This is Modal Body</p>
  //   <p>This is Modal Body</p>
  //   <p>This is Modal Body</p>
  //   <p>This is Modal Body</p>
  //   <p>This is Modal Body</p>
  //   <p>This is Modal Body</p>
  //   <Modal.Footer close={true} />
  // </Modal>

  <App />
);
