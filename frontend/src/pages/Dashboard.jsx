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
  const [dateFilter, setDateFilter] = useState("");
  const [hasShownReminder, setHasShownReminder] = useState(false);

  useEffect(() => {
    if (!user) navigate("/login");
    else {
      fetchTasks();
      fetchStats();
    }
  }, [user, search, status, priority, dateFilter]);

  useEffect(() => {
    if (stats.overdue !== undefined && !hasShownReminder) {
      if (stats.overdue > 0) {
        toast(`You have ${stats.overdue} overdue tasks!`, { icon: '⚠️', style: { border: '1px solid #ff4c4c' } });
      }
      setHasShownReminder(true);
    }
  }, [stats, hasShownReminder]);

  const fetchTasks = async () => {
    try {
      const { data } = await API.get(
        `/tasks?search=${search}&status=${status}&priority=${priority}&dateFilter=${dateFilter}`
      );
      setTasks(data.tasks);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch tasks");
    }
  };

  const fetchStats = async () => {
    try {
      const { data } = await API.get("/tasks/stats");
      setStats(data);
    } catch (error) {
      console.error(error);
    }
  };

  const addTask = async (taskData) => {
    try {
      await API.post("/tasks", taskData);
      fetchTasks();
      fetchStats();
      setIsAddingTask(false);
      toast.success("Task Added");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add task");
    }
  };

  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      fetchTasks();
      fetchStats();
      toast.success("Task deleted");
    } catch (error) {
      toast.error("Failed to delete task");
    }
  };

  const saveEdit = async (updatedTask) => {
    try {
      await API.put(`/tasks/${updatedTask._id}`, updatedTask);
      setEditingTask(null);
      fetchTasks();
      fetchStats();
      toast.success("Task Updated");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update task");
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await API.put(`/tasks/${id}`, { status });
      fetchTasks();
      fetchStats();
    } catch (error) {
      toast.error("Failed to update status");
      fetchTasks(); // Re-fetch to revert UI state if it fails
    }
  };

  return (
    <main className="dashboard">
      <header className="dashboard-header">
        <div className="dashboard-heading">
          <h1>Task Dashboard</h1>
          <p className="dashboard-subtitle">
            Drag and drop cards below to update their status.
          </p>
        </div>

        <div className="dashboard-filters">
          <FilterBar
            search={search}
            setSearch={setSearch}
            status={status}
            setStatus={setStatus}
            priority={priority}
            setPriority={setPriority}
            dateFilter={dateFilter}
            setDateFilter={setDateFilter}
          />
        </div>

        <button
          className="btn btn-primary dashboard-add-button"
          onClick={() => setIsAddingTask(true)}
        >
          + Add Task
        </button>
      </header>

      <section className="dashboard-stats">
        <StatsCards stats={stats} vertical={false} />
      </section>

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
      </div>

      {isAddingTask && (
        <div className="modal-overlay" onClick={() => setIsAddingTask(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <TaskForm onAdd={addTask} />
            <div className="modal-actions modal-actions-compact">
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

      <footer className="dashboard-footer">
        <p>&copy; {new Date().getFullYear()} Task Flow. All rights reserved.</p>
      </footer>
    </main>
  );
}
