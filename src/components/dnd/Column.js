import React from "react";
import { Droppable } from "react-beautiful-dnd";
const Container = ({ children }) => {
  return (
    <div className="bg-slate-100 w-300 h-475 rounded-sm overflow-y-scroll overflow-hidden  border-2 border-gray-400 ">
      {children}
    </div>
  );
};

const Title = ({ children }) => {
  return <h3 className="p-2 bg-pink-200  text-center">{children}</h3>;
};
const TaskList = ({ children }) => {
  return (
    <div className="p-3 bg-red-500 grow min-h-32 transition  hover:bg-gray-500 duration-200 ease-in-out ">
      {children}
    </div>
  );
};
export const Column = ({ title, tasks, id }) => {
  return (
    <Container>
      <Title>{title}</Title>
      <Droppable droppableId={id}>
        {(provided) => (
          <TaskList ref={provided.innerRef} {...provided.droppableProps}>
            {/* {tasks.map((task, index) => (
              <div key={task.id}>{task.content}</div>
            ))} */}
            {provided.placeholder}
          </TaskList>
        )}
      </Droppable>
    </Container>
  );
};
