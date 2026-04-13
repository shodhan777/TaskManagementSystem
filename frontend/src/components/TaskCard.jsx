import "../styles/taskCard.css";

export default function TaskCard({
  task,
  onDelete,
  onEdit,
}) {
  return (
    <div className="task-card">
      <h3 className="task-title">{task.title}</h3>

      <p className="task-description">
        {task.description}
      </p>

      <p className="task-meta">
        <strong>Status:</strong> {task.status}
      </p>

      <p className="task-meta">
        <strong>Priority:</strong> {task.priority}
      </p>

      <div className="task-actions">
        <button
          className="edit-btn"
          onClick={() => onEdit(task)}
        >
          Edit
        </button>

        <button
          className="delete-btn"
          onClick={() => onDelete(task._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}