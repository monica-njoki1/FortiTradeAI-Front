import React from "react";

const LAYERS = [
  { label: "Trade Execution", color: "#0a0e14", icon: "⚙" },
  { label: "Gemma AI Analysis", color: "#0d3b4f", icon: "◈" },
  { label: "Risk Scoring", color: "#0e4a5f", icon: "⚠" },
  { label: "Fraud Detection", color: "#111111", icon: "◉" }, // top layer, black
];

export default function StackAnimation() {
  return (
    <div style={styles.wrapper} className="fortitrade-wrapper">
      <div style={styles.scene} className="fortitrade-scene">
        {/* Scanning beam */}
        <div style={styles.beam} />

        {/* Stacked cubes */}
        <div style={styles.stack}>
          {LAYERS.map((layer, i) => (
            <div
              key={layer.label}
              style={{
                ...styles.cube,
                background: layer.color,
                zIndex: LAYERS.length - i,
                animationDelay: `${i * 0.15}s`,
              }}
            >
              <div style={styles.cubeTop} />
              <div style={styles.cubeFront}>
                <span style={styles.icon}>{layer.icon}</span>
                <span style={styles.label}>{layer.label}</span>
              </div>
              <div style={styles.cubeSide} />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes beamPulse {
          0%, 100% { opacity: 0.3; height: 140px; }
          50% { opacity: 0.9; height: 180px; }
        }
        @keyframes cubeFadeIn {
          from { opacity: 0; transform: translateY(-20px) rotateX(10deg); }
          to { opacity: 1; transform: translateY(0) rotateX(0deg); }
        }
        @keyframes scanLine {
          0% { top: -10%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 110%; opacity: 0; }
        }

        /* Mobile responsiveness — scale the whole scene down so
           fixed-width cubes (260px) never overflow narrow screens */
        .fortitrade-scene {
          transform-origin: center center;
          transition: transform 0.2s ease;
        }

        .fortitrade-wrapper {
          overflow: hidden;
          padding: 0 16px;
        }

        @media (max-width: 480px) {
          .fortitrade-scene {
            transform: scale(0.5);
          }
          .fortitrade-wrapper {
            min-height: 320px !important;
          }
        }

        @media (min-width: 481px) and (max-width: 767px) {
          .fortitrade-scene {
            transform: scale(0.7);
          }
          .fortitrade-wrapper {
            min-height: 400px !important;
          }
        }

        @media (min-width: 768px) and (max-width: 1023px) {
          .fortitrade-scene {
            transform: scale(0.85);
          }
        }
      `}</style>
    </div>
  );
}

const styles = {
  wrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "500px",
    background: "radial-gradient(circle at center, #0a0e14 0%, #000000 100%)",
    fontFamily: "'Orbitron', sans-serif",
  },
  scene: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    perspective: "1000px",
  },
  beam: {
    width: "6px",
    height: "160px",
    background: "linear-gradient(to bottom, rgba(56,189,248,0.9), rgba(56,189,248,0.05))",
    boxShadow: "0 0 20px 4px rgba(56,189,248,0.6)",
    animationName: "beamPulse",
    animationDuration: "2s",
    animationTimingFunction: "ease-in-out",
    animationIterationCount: "infinite",
    marginBottom: "-10px",
  },
  stack: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    transform: "rotateX(15deg) rotateY(-15deg)",
    transformStyle: "preserve-3d",
  },
  cube: {
    position: "relative",
    width: "260px",
    height: "70px",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: "0 20px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)",
    border: "1px solid rgba(56,189,248,0.15)",
    // split from the old shorthand `animation: "cubeFadeIn 0.6s ease forwards"`
    // so it no longer conflicts with the inline `animationDelay` set per-cube below
    animationName: "cubeFadeIn",
    animationDuration: "0.6s",
    animationTimingFunction: "ease",
    animationFillMode: "forwards",
    opacity: 0,
    overflow: "hidden",
  },
  cubeTop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "2px",
    background: "linear-gradient(to right, transparent, rgba(56,189,248,0.8), transparent)",
  },
  cubeFront: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    zIndex: 2,
  },
  cubeSide: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(120deg, transparent 40%, rgba(56,189,248,0.06) 50%, transparent 60%)",
  },
  icon: {
    fontSize: "22px",
    color: "#38bdf8",
    filter: "drop-shadow(0 0 6px rgba(56,189,248,0.7))",
  },
  label: {
    fontSize: "13px",
    letterSpacing: "1px",
    color: "#e2f4ff",
    textTransform: "uppercase",
  },
};