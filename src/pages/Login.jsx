import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, Mail, Lock } from "lucide-react";
import { authApi } from "../api/client";
import Footer from "../components/Footer";

export default function Login() {
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = isRegister
        ? await authApi.register(form.email, form.password)
        : await authApi.login(form.email, form.password);
      localStorage.setItem("forti_token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      if (err.code === "ERR_NETWORK") {
        setError("Can't reach the server. Is your backend running?");
      } else {
        setError(err.response?.data?.error || "Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-forti-black flex flex-col relative overflow-hidden">
      {/* Glowing background orbs */}
      <div className="glow-orb glow-orb-1" />
      <div className="glow-orb glow-orb-2" />
      <div className="scan-line" />

      <div className="flex-1 flex items-center justify-center px-6">

      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-xs sm:max-w-sm bg-forti-panel/90 backdrop-blur-xl border border-forti-cyan/30 rounded-2xl p-6 sm:p-8 space-y-4 mx-auto"
        style={{ boxShadow: "0 0 60px rgba(56,189,248,0.25), inset 0 1px 0 rgba(255,255,255,0.05)" }}
      >
        <div className="flex flex-col items-center gap-2 mb-2">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center border border-forti-cyan/40"
            style={{ boxShadow: "0 0 25px rgba(56,189,248,0.5)" }}
          >
            <ShieldCheck className="text-forti-cyan" size={26} />
          </div>
          <h2 className="text-forti-cyan text-lg tracking-[0.2em] font-bold">
            {isRegister ? "CREATE ACCOUNT" : "WELCOME BACK"}
          </h2>
          <p className="text-forti-cyan/40 text-xs tracking-wide">FORTITRADE AI</p>
        </div>

        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-forti-cyan/40" size={16} />
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full bg-forti-black/60 border border-forti-cyan-dim/50 rounded-lg pl-10 pr-3 py-3 text-sm text-forti-cyan placeholder-forti-cyan/30 focus:border-forti-cyan focus:outline-none focus:shadow-glow transition"
            required
          />
        </div>

        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-forti-cyan/40" size={16} />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full bg-forti-black/60 border border-forti-cyan-dim/50 rounded-lg pl-10 pr-3 py-3 text-sm text-forti-cyan placeholder-forti-cyan/30 focus:border-forti-cyan focus:outline-none focus:shadow-glow transition"
            required
            minLength={6}
          />
        </div>

        {error && (
          <p className="text-forti-danger text-xs text-center bg-forti-danger/10 border border-forti-danger/30 rounded-lg py-2 px-3">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-forti-cyan text-forti-black font-bold tracking-widest text-sm py-3 rounded-lg hover:shadow-glow transition disabled:opacity-50"
        >
          {loading ? "PLEASE WAIT..." : isRegister ? "REGISTER" : "LOGIN"}
        </button>

        <p className="text-center text-xs text-forti-cyan/50">
          {isRegister ? "Already have an account?" : "No account yet?"}{" "}
          <button
            type="button"
            onClick={() => { setIsRegister(!isRegister); setError(null); }}
            className="text-forti-cyan hover:underline"
          >
            {isRegister ? "Login" : "Register"}
          </button>
        </p>
      </form>
      </div>

      <Footer />

      <style>{`
        .glow-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.35;
          animation: float 8s ease-in-out infinite;
        }
        .glow-orb-1 {
          width: 400px;
          height: 400px;
          background: #38bdf8;
          top: -100px;
          left: -100px;
        }
        .glow-orb-2 {
          width: 350px;
          height: 350px;
          background: #0d3b4f;
          bottom: -100px;
          right: -80px;
          animation-delay: 2s;
        }
        .scan-line {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(to right, transparent, rgba(56,189,248,0.8), transparent);
          animation: scanDown 4s linear infinite;
        }
        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(30px, 30px); }
        }
        @keyframes scanDown {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </div>
  );
}