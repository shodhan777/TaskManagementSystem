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
      <div
        className="kanban-grid"
        style={{
          gridTemplateColumns: `repeat(${colCount}, minmax(280px, 1fr))`,
        }}
      >
        {Object.entries(columns).map(([status, tasks]) => (
          <Droppable droppableId={status} key={status}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="kanban-column"
              >
                <div
                  className={`kanban-column-header kanban-column-${status.replace(" ", "-").toLowerCase()}`}
                >
                  <h3 className="kanban-column-title">{status}</h3>
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
