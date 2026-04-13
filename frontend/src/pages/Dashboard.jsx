import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

import TaskForm from "../components/TaskForm";
import StatsCards from "../components/StatsCards";
import FilterBar from "../components/FilterBar";
import EditTaskModal from "../components/EditTaskModal";
import toast from "react-hot-toast";
import "../styles/dashboard.css";
import KanbanBoard from "../components/KanbanBoard";

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({});
  const [editingTask, setEditingTask] = useState(null);
  const [isAddingTask, setIsAddingTask] = useState(false);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");

  useEffect(() => {
    if (!user) navigate("/login");
    else {
      fetchTasks();
      fetchStats();
    }
  }, [user, search, status, priority]);

  const fetchTasks = async () => {
    const { data } = await API.get(
      `/tasks?search=${search}&status=${status}&priority=${priority}`
    );
    setTasks(data.tasks);
  };

  const fetchStats = async () => {
    const { data } = await API.get("/tasks/stats");
    setStats(data);
  };

  const addTask = async (taskData) => {
    await API.post("/tasks", taskData);
    fetchTasks();
    fetchStats();
    setIsAddingTask(false);
    toast.success("Task Added");
  };

  const deleteTask = async (id) => {
    await API.delete(`/tasks/${id}`);
    fetchTasks();
    fetchStats();
    toast.success("Task deleted");
  };

  const saveEdit = async (updatedTask) => {
    await API.put(`/tasks/${updatedTask._id}`, updatedTask);
    setEditingTask(null);
    fetchTasks();
    fetchStats();
    toast.success("Task Updated");
  };

  const handleStatusChange = async (id, status) => {
    await API.put(`/tasks/${id}`, { status });
    fetchTasks();
    fetchStats();
  };

  return (
    <main className="dashboard">
      <header className="dashboard-header">
        <div>
          <h1>Task Dashboard</h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginTop: "0.25rem" }}>
            Drag and drop cards below to update their status.
          </p>
        </div>
        
        <div style={{ flexGrow: 1, marginLeft: "2rem" }}>
          <FilterBar
            search={search}
            setSearch={setSearch}
            status={status}
            setStatus={setStatus}
            priority={priority}
            setPriority={setPriority}
          />
        </div>

        <button 
          className="btn btn-primary" 
          style={{ marginLeft: "1rem", whiteSpace: "nowrap" }}
          onClick={() => setIsAddingTask(true)}
        >
          + Add Task
        </button>
      </header>

      <div className="dashboard-content">
        <section className="dashboard-main" aria-label="Kanban Board">
          <KanbanBoard 
            tasks={tasks} 
            statusFilter={status}
            onStatusChange={handleStatusChange} 
            onEdit={setEditingTask} 
            onDelete={deleteTask} 
          />
        </section>

        <aside className="dashboard-sidebar-right" aria-label="Task Statistics">
          <StatsCards stats={stats} vertical={true} />
        </aside>
      </div>

      {isAddingTask && (
        <div className="modal-overlay" onClick={() => setIsAddingTask(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <TaskForm onAdd={addTask} />
            <div className="modal-actions" style={{ marginTop: "0", display: "flex", justifyContent: "flex-end" }}>
              <button className="btn btn-secondary" onClick={() => setIsAddingTask(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {editingTask && (
        <EditTaskModal
          task={editingTask}
          onSave={saveEdit}
          onClose={() => setEditingTask(null)}
        />
      )}

      <footer className="dashboard-footer" style={{ textAlign: "center", paddingTop: "1rem", color: "var(--text-muted)", fontSize: "0.85rem", borderTop: "1px solid var(--border-color)" }}>
        <p>&copy; {new Date().getFullYear()} Task Flow. All rights reserved.</p>
      </footer>
    </main>
  );
}