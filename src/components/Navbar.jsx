import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShieldCheck } from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("forti_token");

  const logout = () => {
    localStorage.removeItem("forti_token");
    navigate("/login");
  };

  return (
    <nav className="flex items-center justify-between px-8 py-4 border-b border-forti-cyan-dim/40 bg-forti-panel/60 backdrop-blur">
      <Link to="/" className="flex items-center gap-2 text-forti-cyan font-bold tracking-widest">
        <ShieldCheck size={22} />
        FORTITRADE AI
      </Link>
      <div className="flex gap-6 text-sm text-forti-cyan/80">
        {isLoggedIn ? (
          <>
            <Link to="/dashboard" className="hover:text-forti-cyan">Dashboard</Link>
            <button onClick={logout} className="hover:text-forti-danger">Logout</button>
          </>
        ) : (
          <Link to="/login" className="hover:text-forti-cyan">Login</Link>
        )}
      </div>
    </nav>
  );
}