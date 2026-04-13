import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";
import StatsCards from "../components/StatsCards";
import FilterBar from "../components/FilterBar";
import EditTaskModal from "../components/EditTaskModal";
import toast from "react-hot-toast";
import "../styles/dashboard.css";
import KanbanBoard from "../components/KanbanBoard";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({});
  const [editingTask, setEditingTask] = useState(null);

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
    toast.success("task Updated");
  };

  const handleStatusChange = async (id, status) => {
  await API.put(`/tasks/${id}`, { status });
  fetchTasks();
  fetchStats();
};

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Task Dashboard</h1>
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>

      <StatsCards stats={stats} />

      <KanbanBoard
     tasks={tasks}
   onStatusChange={handleStatusChange}
    />
      <TaskForm onAdd={addTask} />

      <FilterBar
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
        priority={priority}
        setPriority={setPriority}
      />

      <div className="task-grid">
        {tasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            onDelete={deleteTask}
            onEdit={setEditingTask}
          />
        ))}
      </div>

      {editingTask && (
        <EditTaskModal
          task={editingTask}
          onSave={saveEdit}
          onClose={() => setEditingTask(null)}
        />
      )}
    </div>
  );
}