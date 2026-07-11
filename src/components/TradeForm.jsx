import React, { useState, useEffect, useRef } from "react";
import { Zap, RefreshCw } from "lucide-react";
import { tradingApi } from "../api/client";
import client from "../api/client";

const POLL_INTERVAL_MS = 8000; // refresh signal every 8 seconds

export default function TradeForm({ onTradeResult }) {
  const [form, setForm] = useState({ symbol: "BTCUSDT", side: "buy", quantity: "" });
  const [signal, setSignal] = useState(null);
  const [loadingSignal, setLoadingSignal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [live, setLive] = useState(true);
  const intervalRef = useRef(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const fetchSignal = async (silent = false) => {
    if (!silent) setLoadingSignal(true);
    try {
      const res = await client.get(`/trades/signal?symbol=${form.symbol}`);
      setSignal(res.data);
      setError(null);
    } catch (err) {
      if (!silent) setError("Could not fetch AI signal");
    } finally {
      if (!silent) setLoadingSignal(false);
    }
  };

  // Poll automatically while "live" is on
  useEffect(() => {
    if (live) {
      fetchSignal(); // immediate fetch on mount / toggle-on
      intervalRef.current = setInterval(() => fetchSignal(true), POLL_INTERVAL_MS);
    }
    return () => clearInterval(intervalRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [live, form.symbol]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await tradingApi.createTrade({
        symbol: form.symbol,
        side: form.side,
        quantity: parseFloat(form.quantity),
      });
      onTradeResult(res.data);
    } catch (err) {
      if (err.response?.status === 403) {
        onTradeResult(err.response.data);
      } else {
        setError(err.response?.data?.error || "Trade failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-forti-panel border border-forti-cyan-dim/40 rounded-xl p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-forti-cyan tracking-widest text-sm uppercase">Place Trade</h3>
        <button
          type="button"
          onClick={() => setLive(!live)}
          className={`flex items-center gap-1.5 text-[10px] tracking-widest uppercase px-2.5 py-1 rounded-full border transition ${
            live
              ? "border-forti-safe/50 text-forti-safe"
              : "border-forti-cyan-dim/50 text-forti-cyan/40"
          }`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${live ? "bg-forti-safe animate-pulse" : "bg-forti-cyan/30"}`} />
          {live ? "Live" : "Paused"}
        </button>
      </div>

      <div>
        <label className="text-xs text-forti-cyan/60">Symbol</label>
        <input
          name="symbol"
          value={form.symbol}
          onChange={handleChange}
          className="w-full mt-1 bg-forti-black border border-forti-cyan-dim/40 rounded-md px-3 py-2 text-sm"
        />
      </div>

      <button
        type="button"
        onClick={() => fetchSignal()}
        disabled={loadingSignal}
        className="w-full flex items-center justify-center gap-2 border border-forti-cyan/40 text-forti-cyan text-xs tracking-widest uppercase py-2 rounded-md hover:bg-forti-cyan/10 transition disabled:opacity-50"
      >
        <RefreshCw size={13} className={loadingSignal ? "animate-spin" : ""} />
        {loadingSignal ? "Refreshing..." : "Refresh Now"}
      </button>

      {signal && (
        <div className="bg-forti-black/60 border border-forti-cyan-dim/30 rounded-lg p-3 text-xs space-y-1">
          <div className="flex items-center gap-1.5 text-forti-cyan">
            <Zap size={12} />
            <span>Signal: <span className="font-bold uppercase">{signal.signal}</span></span>
            {signal.price && <span className="text-forti-cyan/60"> @ {signal.price}</span>}
          </div>
          <p className="text-forti-cyan/60">{signal.reason}</p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-forti-cyan/60">Side</label>
          <select
            name="side"
            value={form.side}
            onChange={handleChange}
            className="w-full mt-1 bg-forti-black border border-forti-cyan-dim/40 rounded-md px-3 py-2 text-sm"
          >
            <option value="buy">Buy</option>
            <option value="sell">Sell</option>
          </select>
        </div>
        <div>
          <label className="text-xs text-forti-cyan/60">Quantity</label>
          <input
            name="quantity"
            type="number"
            step="any"
            value={form.quantity}
            onChange={handleChange}
            className="w-full mt-1 bg-forti-black border border-forti-cyan-dim/40 rounded-md px-3 py-2 text-sm"
            required
          />
        </div>
      </div>

      <p className="text-forti-cyan/40 text-[11px]">
        Price is fetched live from Binance testnet at execution time — no need to enter one.
      </p>

      {error && <p className="text-forti-danger text-sm">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-forti-cyan text-forti-black font-bold tracking-widest text-sm py-2 rounded-md hover:shadow-glow transition disabled:opacity-50"
      >
        {loading ? "PROCESSING..." : "SUBMIT TRADE"}
      </button>
    </form>
  );
}