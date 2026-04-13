export default function TaskCard({
  task,
  onDelete,
  onEdit,
}) {
  return (
    <div style={{
      background: "white",
      padding: "18px",
      borderRadius: "12px"
    }}>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p>Status: {task.status}</p>
      <p>Priority: {task.priority}</p>

      <button onClick={() => onEdit(task)}>
        Edit
      </button>

      <button onClick={() => onDelete(task._id)}>
        Delete
      </button>
    </div>
  );
}