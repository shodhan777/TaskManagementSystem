import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/navbar.css";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar" aria-label="Main Navigation">
      <Link to="/" className="logo">
        <span style={{ color: "var(--primary-color)" }}>Task</span>Flow
      </Link>

      <div className="nav-links">
        {user && (
          <div className="nav-main">
            <Link to="/" className="nav-link">Dashboard</Link>
            <Link to="/progress" className="nav-link">Progress</Link>
          </div>
        )}

        {!user ? (
          <>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/register" className="btn btn-primary" style={{ padding: "0.5rem 1rem" }}>Register</Link>
          </>
        ) : (
          <>
            <span className="user-greeting">Hello, <strong>{user.name}</strong></span>
            <button onClick={logout} className="btn btn-secondary" style={{ padding: "0.5rem 1rem" }}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}