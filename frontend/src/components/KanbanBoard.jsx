import {
  DragDropContext,
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";

export default function KanbanBoard({
  tasks,
  onStatusChange,
}) {
  const columns = {
    Todo: tasks.filter(t => t.status === "Todo"),
    "In Progress": tasks.filter(
      t => t.status === "In Progress"
    ),
    Done: tasks.filter(t => t.status === "Done"),
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const taskId = result.draggableId;
    const newStatus = result.destination.droppableId;

    onStatusChange(taskId, newStatus);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3,1fr)",
        gap: "20px",
        marginTop: "30px"
      }}>
        {Object.entries(columns).map(([status, tasks]) => (
          <Droppable droppableId={status} key={status}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={{
                  background: "#eef2ff",
                  padding: "16px",
                  borderRadius: "12px",
                  minHeight: "300px"
                }}
              >
                <h3>{status}</h3>

                {tasks.map((task, index) => (
                  <Draggable
                    draggableId={task._id}
                    index={index}
                    key={task._id}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          background: "white",
                          padding: "14px",
                          marginBottom: "10px",
                          borderRadius: "10px",
                          ...provided.draggableProps.style
                        }}
                      >
                        {task.title}
                      </div>
                    )}
                  </Draggable>
                ))}

                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
}