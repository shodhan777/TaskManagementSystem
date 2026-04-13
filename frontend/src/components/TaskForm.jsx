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
    <form onSubmit={handleSubmit} style={{
      background: "white",
      padding: "20px",
      borderRadius: "12px"
    }}>
      <h3>Add Task</h3>

      <input
        placeholder="Task Title"
        value={form.title}
        onChange={(e) =>
          setForm({ ...form, title: e.target.value })
        }
        required
      />

      <br /><br />

      <textarea
        placeholder="Description"
        value={form.description}
        onChange={(e) =>
          setForm({ ...form, description: e.target.value })
        }
      />

      <br /><br />

      <select
        value={form.priority}
        onChange={(e) =>
          setForm({ ...form, priority: e.target.value })
        }
      >
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>

      <select
        value={form.status}
        onChange={(e) =>
          setForm({ ...form, status: e.target.value })
        }
      >
        <option>Todo</option>
        <option>In Progress</option>
        <option>Done</option>
      </select>

      <br /><br />

      <button type="submit">Add Task</button>
    </form>
  );
}