import {
  DragDropContext,
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";
import TaskCard from "./TaskCard";

export default function KanbanBoard({
  tasks,
  statusFilter,
  onStatusChange,
  onEdit,
  onDelete
}) {
  let allColumns = {
    Todo: tasks.filter(t => t.status === "Todo"),
    "In Progress": tasks.filter(t => t.status === "In Progress"),
    Done: tasks.filter(t => t.status === "Done"),
    Overdue: tasks.filter(t => t.status === "Overdue"),
  };

  const columns = statusFilter ? { [statusFilter]: allColumns[statusFilter] } : allColumns;

  // Set the grid template columns to either 1, 2, or 3 based on columns mapping.
  const colCount = Object.keys(columns).length;

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
        gridTemplateColumns: `repeat(${colCount}, minmax(280px, 1fr))`,
        gap: "1rem",
        overflowX: "auto",
        paddingBottom: "1rem"
      }}>
        {Object.entries(columns).map(([status, tasks]) => (
          <Droppable droppableId={status} key={status}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={{
                  background: "var(--card-bg)",
                  border: "1px solid var(--border-color)",
                  padding: "1rem",
                  borderRadius: "16px",
                  minHeight: "300px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem"
                }}
              >
                <div style={{
                  padding: "0.5rem 1rem",
                  background: status === "Todo" ? "var(--todo-color)" : status === "In Progress" ? "var(--inprogress-color)" : status === "Overdue" ? "var(--danger-color, #ff4c4c)" : "var(--done-color)",
                  borderRadius: "8px",
                  marginBottom: "0.5rem"
                }}>
                  <h3 style={{ fontSize: "1rem", color: "var(--text-main)", margin: 0 }}>{status}</h3>
                </div>

                {tasks.map((task, index) => (
                  <Draggable
                    draggableId={task._id}
                    index={index}
                    key={task._id}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          opacity: snapshot.isDragging ? 0.8 : 1,
                          transform: snapshot.isDragging ? "scale(1.02)" : "scale(1)",
                          transition: "transform 0.1s",
                          ...provided.draggableProps.style
                        }}
                      >
                        <TaskCard 
                          task={task} 
                          onEdit={onEdit} 
                          onDelete={onDelete} 
                        />
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