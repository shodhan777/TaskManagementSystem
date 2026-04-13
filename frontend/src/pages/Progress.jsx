import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import TaskCard from "../components/TaskCard";
import toast from "react-hot-toast";
import EditTaskModal from "../components/EditTaskModal";
import ProgressCharts from "../components/ProgressCharts";
import "../styles/dashboard.css";

export default function Progress() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [inProgressTasks, setInProgressTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [stats, setStats] = useState({});
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      fetchTasks();
      fetchStats();
    }
  }, [user]);

  const fetchStats = async () => {
    try {
      const { data } = await API.get("/tasks/stats");
      setStats(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchTasks = async () => {
    try {
      const inProgRes = await API.get("/tasks?status=In Progress");
      const doneRes = await API.get("/tasks?status=Done");

      setInProgressTasks(inProgRes.data.tasks);
      setCompletedTasks(doneRes.data.tasks);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Failed to fetch tasks"
      );
    }
  };

  const markAsDone = async (id) => {
    try {
      await API.put(`/tasks/${id}`, {
        status: "Done",
      });

      fetchTasks();
      fetchStats();

      toast.success("Task marked as Done!");
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const markAsInProgress = async (id) => {
    try {
      await API.put(`/tasks/${id}`, {
        status: "In Progress",
      });

      fetchTasks();
      fetchStats();

      toast.success("Task moved to In Progress!");
    } catch (error) {
      toast.error("Failed to update status");
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
      await API.put(
        `/tasks/${updatedTask._id}`,
        updatedTask
      );

      setEditingTask(null);

      fetchTasks();
      fetchStats();

      toast.success("Task Updated");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Failed to update task"
      );
    }
  };
return (
  <main className="dashboard progress-page">
    <header className="dashboard-header progress-header">
      <h1>Progress & Analytics</h1>
      <p className="progress-subtitle">
        Visual insights into your productivity and task history.
      </p>
    </header>

    {/* Pie Chart on Top */}
    <section className="progress-chart-top">
      <ProgressCharts stats={stats} />
    </section>

    {/* Completed Tasks */}
    <section className="progress-column">
      <div className="section-header done-header">
        <h3>Completed Tasks</h3>
      </div>

      {completedTasks.length === 0 ? (
        <p className="empty-text">No completed tasks.</p>
      ) : (
        completedTasks.map((task) => (
          <div
            key={task._id}
            className="progress-task-wrapper"
          >
            <TaskCard
              task={task}
              onEdit={setEditingTask}
              onDelete={deleteTask}
            />

            <button
              onClick={() =>
                markAsInProgress(task._id)
              }
              className="mini-btn secondary"
            >
              Reopen
            </button>
          </div>
        ))
      )}
    </section>

    {/* In Progress Tasks */}
    <section className="progress-column">
      <div className="section-header inprogress-header">
        <h3>In Progress Tasks</h3>
      </div>

      {inProgressTasks.length === 0 ? (
        <p className="empty-text">No tasks in progress.</p>
      ) : (
        inProgressTasks.map((task) => (
          <div
            key={task._id}
            className="progress-task-wrapper"
          >
            <TaskCard
              task={task}
              onEdit={setEditingTask}
              onDelete={deleteTask}
            />

            <button
              onClick={() =>
                markAsDone(task._id)
              }
              className="mini-btn primary"
            >
              Mark Done
            </button>
          </div>
        ))
      )}
    </section>

    {editingTask && (
      <EditTaskModal
        task={editingTask}
        onSave={saveEdit}
        onClose={() =>
          setEditingTask(null)
        }
      />
    )}
  </main>
);
}