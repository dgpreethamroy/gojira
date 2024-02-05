import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { Column } from "./Column";
import { useState } from "react";
export const Dashboard = () => {
  const [todo, setTodo] = useState([]);
  const [inprogress, setInprogress] = useState([]);
  const [done, setDone] = useState([]);
  return (
    <DragDropContext>
      <p className="text-center">DASHBOARD MAIN COMPONENT</p>
      <div className="flex justify-between  items-center flex-row bg-slate-100">
        <Column title={"To Do"} tasks={inprogress} id={"1"} />
      </div>
    </DragDropContext>
  );
};
