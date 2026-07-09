import React from "react";
import { ShieldCheck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-forti-cyan-dim/40 bg-forti-panel/60 backdrop-blur mt-auto">
      <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-forti-cyan font-bold tracking-widest text-sm">
          <ShieldCheck size={18} />
          FORTITRADE AI
        </div>

        <p className="text-forti-cyan/50 text-xs text-center">
          Built for AMD Developer Hackathon: ACT II — Unicorn Track
        </p>

        <div className="flex gap-4 text-xs text-forti-cyan/60">
          <a
            href="https://github.com/monica-njoki1"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-forti-cyan transition"
          >
            GitHub
          </a>
          <a href="#" className="hover:text-forti-cyan transition">
            Docs
          </a>
        </div>
      </div>

      <p className="text-center text-forti-cyan/30 text-[11px] pb-4">
        © {new Date().getFullYear()} FortiTrade AI. Simulated trading for demo purposes only — not financial advice.
      </p>
    </footer>
  );
}