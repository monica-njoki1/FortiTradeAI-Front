import React from "react";
import { ShieldAlert, ShieldX, ShieldCheck } from "lucide-react";

const severityStyles = {
  blocked: { icon: ShieldX, color: "text-forti-danger", border: "border-forti-danger/40" },
  flagged: { icon: ShieldAlert, color: "text-forti-warn", border: "border-forti-warn/40" },
  approved: { icon: ShieldCheck, color: "text-forti-safe", border: "border-forti-safe/40" },
};

export default function FraudAlert({ result }) {
  if (!result) return null;

  const decision = result.risk?.decision || result.status;
  const style = severityStyles[decision] || severityStyles.approved;
  const Icon = style.icon;

  return (
    <div className={`bg-forti-panel border ${style.border} rounded-xl p-5 space-y-3`}>
      <div className={`flex items-center gap-2 ${style.color} font-bold text-sm tracking-widest uppercase`}>
        <Icon size={18} />
        {decision}
      </div>

      {result.risk && (
        <div className="text-xs text-forti-cyan/70 space-y-1">
          <p>Risk score: <span className="text-forti-cyan">{result.risk.score}/100</span></p>
          {result.risk.triggered_factors?.length > 0 && (
            <p>Factors: {result.risk.triggered_factors.join(", ")}</p>
          )}
        </div>
      )}

      {result.gemma_explanation && (
        <div className="bg-forti-black/60 border border-forti-cyan-dim/30 rounded-lg p-3 text-xs">
          <p className="text-forti-cyan/50 mb-1 tracking-widest">GEMMA ANALYSIS</p>
          <p className="text-forti-cyan/90">{result.gemma_explanation.summary}</p>
          <p className="text-forti-cyan/60 mt-2">{result.gemma_explanation.reasoning}</p>
        </div>
      )}
    </div>
  );
}