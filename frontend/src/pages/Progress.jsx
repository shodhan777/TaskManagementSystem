import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import TaskCard from "../components/TaskCard";
import toast from "react-hot-toast";
import EditTaskModal from "../components/EditTaskModal";
import "../styles/dashboard.css"; // Reuse dashboard base styles

export default function Progress() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [inProgressTasks, setInProgressTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    if (!user) navigate("/login");
    else fetchTasks();
  }, [user]);

  const fetchTasks = async () => {
    try {
      // Fetch In Progress
      const inProgRes = await API.get("/tasks?status=In Progress");
      setInProgressTasks(inProgRes.data.tasks);

      // Fetch Done
      const doneRes = await API.get("/tasks?status=Done");
      setCompletedTasks(doneRes.data.tasks);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch tasks");
    }
  };

  const markAsDone = async (id) => {
    try {
      await API.put(`/tasks/${id}`, { status: "Done" });
      fetchTasks();
      toast.success("Task marked as Done!");
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const markAsInProgress = async (id) => {
    try {
      await API.put(`/tasks/${id}`, { status: "In Progress" });
      fetchTasks();
      toast.success("Task moved to In Progress!");
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      fetchTasks();
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
      toast.success("Task Updated");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update task");
    }
  };

  return (
    <main className="dashboard" style={{ marginTop: "80px", minHeight: "calc(100vh - 80px)" }}>
      <header className="dashboard-header" style={{ flexDirection: "column", alignItems: "flex-start" }}>
        <h1>Progress & Completed</h1>
        <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginTop: "0.25rem" }}>
          Track and manage your ongoing and finished tasks directly.
        </p>
      </header>

      <div className="dashboard-content" style={{ marginTop: "2rem" }}>
        {/* In Progress Section */}
        <section className="dashboard-main" style={{ flex: 1, minWidth: "300px" }}>
          <div style={{
            padding: "0.5rem 1rem",
            background: "var(--inprogress-color)",
            borderRadius: "8px",
            marginBottom: "1rem"
          }}>
            <h3 style={{ fontSize: "1.2rem", color: "var(--text-main)", margin: 0 }}>In Progress</h3>
          </div>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {inProgressTasks.length === 0 ? (
              <p style={{ color: "var(--text-muted)" }}>No tasks in progress.</p>
            ) : (
              inProgressTasks.map((task) => (
                <div key={task._id} style={{ position: "relative" }}>
                  <TaskCard 
                    task={task} 
                    onEdit={setEditingTask} 
                    onDelete={deleteTask} 
                  />
                  <button 
                    onClick={() => markAsDone(task._id)}
                    className="btn btn-primary"
                    style={{ position: "absolute", top: "1rem", right: "1rem", padding: "0.3rem 0.6rem", fontSize: "0.75rem" }}
                  >
                    Mark Done
                  </button>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Completed Section */}
        <section className="dashboard-sidebar-right" style={{ flex: 1, minWidth: "300px" }}>
          <div style={{
            padding: "0.5rem 1rem",
            background: "var(--done-color)",
            borderRadius: "8px",
            marginBottom: "1rem"
          }}>
            <h3 style={{ fontSize: "1.2rem", color: "var(--text-main)", margin: 0 }}>Completed</h3>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {completedTasks.length === 0 ? (
              <p style={{ color: "var(--text-muted)" }}>No completed tasks yet.</p>
            ) : (
              completedTasks.map((task) => (
                <div key={task._id} style={{ position: "relative" }}>
                  <TaskCard 
                    task={task} 
                    onEdit={setEditingTask} 
                    onDelete={deleteTask} 
                  />
                  <button 
                    onClick={() => markAsInProgress(task._id)}
                    className="btn btn-secondary"
                    style={{ position: "absolute", top: "1rem", right: "1rem", padding: "0.3rem 0.6rem", fontSize: "0.75rem" }}
                  >
                    Reopen
                  </button>
                </div>
              ))
            )}
          </div>
        </section>
      </div>

      {editingTask && (
        <EditTaskModal
          task={editingTask}
          onSave={saveEdit}
          onClose={() => setEditingTask(null)}
        />
      )}
    </main>
  );
}
