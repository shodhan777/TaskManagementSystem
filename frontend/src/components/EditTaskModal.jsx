import { useState } from "react";

export default function EditTaskModal({ task, onSave, onClose }) {
  const [form, setForm] = useState(task);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.4)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <form onSubmit={handleSubmit} style={{
        background: "white",
        padding: "24px",
        borderRadius: "12px",
        width: "90%",
        maxWidth: "400px"
      }}>
        <h3>Edit Task</h3>

        <input
          value={form.title}
          onChange={(e)=>
            setForm({...form,title:e.target.value})
          }
        />

        <br /><br />

        <textarea
          value={form.description}
          onChange={(e)=>
            setForm({...form,description:e.target.value})
          }
        />

        <br /><br />

        <select
          value={form.status}
          onChange={(e)=>
            setForm({...form,status:e.target.value})
          }
        >
          <option>Todo</option>
          <option>In Progress</option>
          <option>Done</option>
        </select>

        <br /><br />

        <button type="submit">Save</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
}