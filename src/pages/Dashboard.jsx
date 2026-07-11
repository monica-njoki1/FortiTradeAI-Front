import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import TradeForm from "../components/TradeForm";
import FraudAlert from "../components/FraudAlert";
import PortfolioCard from "../components/PortfolioCard";
import ProfilePicUpload from "../components/ProfilePicUpload";
import { tradingApi, authApi } from "../api/client";

export default function Dashboard() {
  const [trades, setTrades] = useState([]);
  const [lastResult, setLastResult] = useState(null);
  const [user, setUser] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const navigate = useNavigate();

  const loadTrades = async () => {
    try {
      const res = await tradingApi.listTrades();
      setTrades(res.data);
    } catch (err) {
      console.error("Failed to load trades", err);
    }
  };

  const loadUser = async () => {
    try {
      const res = await authApi.me();
      setUser(res.data);
    } catch (err) {
      console.error("Failed to load user", err);
    }
  };

  useEffect(() => {
    loadTrades();
    loadUser();
    const interval = setInterval(loadTrades, 10000); // refresh trade history every 10s
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleTradeResult = (result) => {
    setLastResult(result);
    if (result.status === "success") {
      loadTrades();
    }
  };

  const handleDeleteTrade = async (id) => {
    try {
      await tradingApi.deleteTrade(id);
      loadTrades();
    } catch (err) {
      console.error("Failed to delete trade", err);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await authApi.deleteAccount();
      localStorage.removeItem("forti_token");
      navigate("/login");
    } catch (err) {
      console.error("Failed to delete account", err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-forti-black">
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 py-10 space-y-6 flex-1 w-full">
        <div className="bg-forti-panel border border-forti-cyan-dim/40 rounded-xl p-6 flex items-center gap-6">
          <ProfilePicUpload user={user} onUpdate={setUser} />
          <div>
            <p className="text-forti-cyan font-bold tracking-wide">{user?.name || user?.email}</p>
            <p className="text-forti-cyan/50 text-xs mt-1">{user?.email}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <TradeForm onTradeResult={handleTradeResult} />
            <FraudAlert result={lastResult} />
          </div>
          <PortfolioCard trades={trades} onDelete={handleDeleteTrade} />
        </div>

        <div className="bg-forti-panel border border-forti-danger/30 rounded-xl p-6">
          <h3 className="text-forti-danger text-sm tracking-widest uppercase mb-2">Danger Zone</h3>
          <p className="text-forti-cyan/50 text-xs mb-4">
            Deleting your account permanently removes your profile and trade history. This cannot be undone.
          </p>

          {!showDeleteConfirm ? (
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="flex items-center gap-2 text-sm text-forti-danger border border-forti-danger/40 rounded-lg px-4 py-2 hover:bg-forti-danger/10 transition"
            >
              <Trash2 size={14} /> Delete Account
            </button>
          ) : (
            <div className="flex items-center gap-3">
              <p className="text-forti-cyan text-xs">Are you sure?</p>
              <button
                onClick={handleDeleteAccount}
                className="text-xs bg-forti-danger text-forti-black font-bold px-3 py-1.5 rounded-md"
              >
                Yes, delete
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="text-xs text-forti-cyan/60 px-3 py-1.5"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}