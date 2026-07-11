import React from "react";
import { X } from "lucide-react";

export default function PortfolioCard({ trades, onDelete }) {
  return (
    <div className="bg-forti-panel border border-forti-cyan-dim/40 rounded-xl p-4 sm:p-6">
      <h3 className="text-forti-cyan tracking-widest text-sm uppercase mb-4">Trade History</h3>
      {trades.length === 0 ? (
        <p className="text-forti-cyan/50 text-sm">No trades yet.</p>
      ) : (
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {trades.map((t) => (
            <div
              key={t.id}
              className="grid grid-cols-[1fr_auto] sm:flex sm:items-center sm:justify-between text-xs sm:text-sm border-b border-forti-cyan-dim/20 py-2 gap-x-2 gap-y-1"
            >
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 sm:contents">
                <span className="text-forti-cyan/90">{t.symbol}</span>
                <span className={t.side === "buy" ? "text-forti-safe" : "text-forti-danger"}>
                  {t.side.toUpperCase()}
                </span>
                <span className="text-forti-cyan/70">{t.quantity} @ {t.price}</span>
                <span
                  className={
                    t.risk_decision === "blocked"
                      ? "text-forti-danger"
                      : t.risk_decision === "flagged"
                      ? "text-forti-warn"
                      : "text-forti-safe"
                  }
                >
                  {t.risk_decision}
                </span>
              </div>
              {onDelete && (
                <button
                  onClick={() => onDelete(t.id)}
                  className="text-forti-cyan/30 hover:text-forti-danger transition self-start sm:self-auto"
                  title="Delete trade"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}