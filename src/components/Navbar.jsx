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
    <nav className="flex items-center justify-between px-4 sm:px-6 md:px-8 py-3 sm:py-4 border-b border-forti-cyan-dim/40 bg-forti-panel/60 backdrop-blur">
      <Link to="/" className="flex items-center gap-1.5 sm:gap-2 text-forti-cyan font-bold tracking-widest text-xs sm:text-sm">
        <ShieldCheck size={18} className="sm:w-[22px] sm:h-[22px]" />
        <span className="hidden xs:inline">FORTITRADE AI</span>
        <span className="xs:hidden">FORTITRADE</span>
      </Link>
      <div className="flex gap-3 sm:gap-6 text-xs sm:text-sm text-forti-cyan/80">
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