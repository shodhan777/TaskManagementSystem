import { useState } from "react";

export default function TaskForm({ onAdd }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "Medium",
    status: "Todo",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(form);

    setForm({
      title: "",
      description: "",
      priority: "Medium",
      status: "Todo",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="glass-card" style={{ padding: "1.5rem" }}>
      <h3 style={{ marginBottom: "1.5rem", color: "var(--primary-color)" }}>Add New Task</h3>
      
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <div className="form-group">
          <label htmlFor="task-title">Task Title</label>
          <input
            id="task-title"
            className="input-field"
            placeholder="What needs to be done?"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="task-desc">Description</label>
          <textarea
            id="task-desc"
            className="input-field"
            style={{ minHeight: "80px", resize: "none" }}
            placeholder="Add details..."
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />
        </div>

        <div className="form-group">
          <label htmlFor="task-priority">Priority</label>
          <select
            id="task-priority"
            className="input-field"
            value={form.priority}
            onChange={(e) =>
              setForm({ ...form, priority: e.target.value })
            }
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="task-status">Status</label>
          <select
            id="task-status"
            className="input-field"
            value={form.status}
            onChange={(e) =>
              setForm({ ...form, status: e.target.value })
            }
          >
            <option>Todo</option>
            <option>In Progress</option>
            <option>Done</option>
          </select>
        </div>
      </div>

      <div style={{ marginTop: "1rem" }}>
        <button type="submit" className="btn btn-primary" style={{ width: "100%" }}>Add Task</button>
      </div>
    </form>
  );
}