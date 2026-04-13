import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Progress from "./pages/Progress";
import Navbar from "./components/Navbar";
import { Analytics } from "@vercel/analytics/next"

function App() {
  return (
    <>
    <Navbar />
      <Analytics />
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/progress" element={<Progress />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
    </>
  );
}

export default App;