import { useState } from "react";

export default function EditTaskModal({ task, onSave, onClose }) {
  const [form, setForm] = useState(task);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="modal-overlay">
      <form onSubmit={handleSubmit} className="modal-content">
        <h3 style={{ marginBottom: "1.5rem", color: "var(--primary-color)" }}>Edit Task</h3>

        <div className="form-group">
          <label htmlFor="edit-title">Task Title</label>
          <input
            id="edit-title"
            className="input-field"
            value={form.title}
            onChange={(e)=>
              setForm({...form,title:e.target.value})
            }
          />
        </div>

        <div className="form-group">
          <label htmlFor="edit-desc">Description</label>
          <textarea
            id="edit-desc"
            className="input-field"
            value={form.description}
            onChange={(e)=>
              setForm({...form,description:e.target.value})
            }
          />
        </div>

        <div className="form-group">
          <label htmlFor="edit-dueDate">Due Date</label>
          <input
            type="date"
            id="edit-dueDate"
            className="input-field"
            value={form.dueDate ? form.dueDate.substring(0, 10) : ""}
            onChange={(e) =>
              setForm({ ...form, dueDate: e.target.value })
            }
          />
        </div>

        <div className="form-group">
          <label htmlFor="edit-status">Status</label>
          <select
            id="edit-status"
            className="input-field"
            value={form.status}
            onChange={(e)=>
              setForm({...form,status:e.target.value})
            }
          >
            <option>Todo</option>
            <option>In Progress</option>
            <option>Done</option>
          </select>
        </div>

        <div className="modal-actions">
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">Save Changes</button>
        </div>
      </form>
    </div>
  );
}