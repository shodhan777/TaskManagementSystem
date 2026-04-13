import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/navbar.css";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar" aria-label="Main Navigation">
      <div className="nav-left">
        <Link to="/" className="logo">
          <span className="logo-accent">Task</span>Flow
        </Link>
      </div>

      <div className="nav-center">
        {user && (
          <div className="nav-main" role="menubar" aria-label="Primary">
            <Link to="/" className="nav-link">Dashboard</Link>
            <Link to="/progress" className="nav-link">Progress</Link>
          </div>
        )}
      </div>

      <div className="nav-right">
        {!user ? (
          <>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/register" className="btn btn-primary nav-btn">Register</Link>
          </>
        ) : (
          <>
            <span className="user-greeting">Hello, <strong>{user.name}</strong></span>
            <button onClick={logout} className="btn btn-secondary nav-btn">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}
