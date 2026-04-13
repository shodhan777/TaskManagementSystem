import "../styles/taskCard.css";

export default function TaskCard({
  task,
  onDelete,
  onEdit,
}) {
  return (
    <div className="task-card glass-card">
      <h3 className="task-title">{task.title}</h3>

      <p className="task-description">
        {task.description}
      </p>

      <div className="task-badges">
        <span className={`badge status-${task.status.replace(" ", "")}`}>
          {task.status}
        </span>
        <span className={`badge priority-${task.priority.toLowerCase()}`}>
          {task.priority}
        </span>
      </div>

      <div className="task-actions">
        <button
          className="btn btn-secondary edit-btn"
          onClick={() => onEdit(task)}
        >
          Edit
        </button>

        <button
          className="btn btn-danger delete-btn"
          onClick={() => onDelete(task._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}