import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });
  }
};

function Dnd(props) {
  const taskStatus = {
    toDo: {
      name: "TO DO",
      items: props.td,
    },
    inProgress: {
      name: "IN PROGRESS",
      items: props.inprogress,
    },
    done: {
      name: "DONE",
      items: props.done,
    },
  };
  const [columns, setColumns] = useState(taskStatus);
  return (
    <div>
      <div style={{ display: "flex" }}>
        <DragDropContext
          onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
        >
          <Droppable
            droppableId="all-columns"
            direction="horizontal"
            type="column"
          >
            {(provided) =>
              Object.entries(columns).map(([columnId, column], index) => {
                return (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                    key={columnId}
                    index={index}
                  >
                    <Draggable draggableId={columnId} index={index}>
                      {(provided) => (
                        <div
                          style={{ margin: 8 }}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                        >
                          <Droppable
                            droppableId={columnId}
                            key={columnId}
                            type="task"
                          >
                            {(provided, snapshot) => {
                              return (
                                <div
                                  className="border-2 border-gray-200  rounded-lg dark:border-gray-700"
                                  {...provided.droppableProps}
                                  ref={provided.innerRef}
                                  style={{
                                    background: snapshot.isDraggingOver
                                      ? "#F4F5F7"
                                      : "#F4F5F7",
                                    padding: 4,
                                    width: 250,
                                    minHeight: 300,
                                  }}
                                >
                                  <p className="font-bold px-2 py-4 text-black">
                                    {column.name}
                                  </p>

                                  {column.items.map((item, index) => {
                                    return (
                                      <Draggable
                                        key={item._id}
                                        draggableId={item._id}
                                        index={index}
                                      >
                                        {(provided, snapshot) => {
                                          return (
                                            <div
                                              ref={provided.innerRef}
                                              {...provided.draggableProps}
                                              {...provided.dragHandleProps}
                                              style={{
                                                userSelect: "none",
                                                padding: 16,
                                                margin: "0 0 8px 0",
                                                minHeight: "50px",
                                                backgroundColor:
                                                  snapshot.isDragging
                                                    ? "white"
                                                    : "white",
                                                color: "white",
                                                ...provided.draggableProps
                                                  .style,
                                              }}
                                            >
                                              <p className="text-black">
                                                {item.summary}{" "}
                                              </p>
                                              <p className="text-black">
                                                {item.issuetype}
                                              </p>
                                              <p className="text-black">
                                                {item.labels}
                                              </p>
                                            </div>
                                          );
                                        }}
                                      </Draggable>
                                    );
                                  })}
                                  {provided.placeholder}
                                </div>
                              );
                            }}
                          </Droppable>
                        </div>
                      )}
                    </Draggable>
                  </div>
                );
              })
            }
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
}

export default Dnd;
