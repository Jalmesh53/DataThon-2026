import { useState, useCallback } from "react";
// import { StarField } from "./components/StarField";
import Hyperspeed from "./components/Hyperspeed";
import { hyperspeedPresets } from "./components/HyperSpeedPresets";
import { RiskMeter } from "./components/RiskMeter";
import { TrendChart } from "./components/TrendChart";
import { DeclineRadar } from "./components/DeclineRadar";
import { LifecycleTimeline } from "./components/LifecycleTimeline";
import { AIInsightCard } from "./components/AIInsightCard";
import { Search, Zap, Activity, AlertTriangle, TrendingDown, Info, ArrowUpRight, ArrowDownRight, Sparkles, X, Check, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Mock data to prevent crash if backend is offline
const MOCK_RESULT = {
  insight: {
    summary: "Feather.ai detected high volatility in this trend (Offline Mode).",
    riskScore: 85,
    declineRisk: "High",
    actions: ["Pivot immediately", "Reduce ad spend", "Monitor competitors"],
    signals: [
      { metric: "Search Volume", status: "Critical", explanation: "Simulated drop of -45%." },
      { metric: "Sentiment", status: "Warning", explanation: "Negative sentiment detected." }
    ],
    decline_drivers: [
      { label: "Saturation", value: 90, fullMark: 100 },
      { label: "Fatigue", value: 80, fullMark: 100 },
      { label: "Sentiment", value: 70, fullMark: 100 },
      { label: "Algo Shift", value: 50, fullMark: 100 },
      { label: "Disengage", value: 60, fullMark: 100 },
    ]
  },
  trend: {
    history: [
      { timestamp: "Mon", value: 100 },
      { timestamp: "Tue", value: 90 },
      { timestamp: "Wed", value: 40 },
      { timestamp: "Thu", value: 20 },
      { timestamp: "Fri", value: 10 },
    ]
  }
};

// ErrorBoundary components
import { Component, type ErrorInfo, type ReactNode } from "react";

class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean, error: Error | null }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Hyperspeed Crash:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 via-black to-black flex items-center justify-center">
          <div className="absolute top-5 right-5 text-xs text-white/20 font-mono border border-white/10 px-2 py-1 rounded">
            LITE MODE (WebGL Failed)
          </div>
          {/* Context for the user if they look at devtools, but UI remains clean */}
          <div className="hidden">
            {this.state.error?.message}
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

import { SimulationControl } from "./components/SimulationControl";
import { WorldMap } from "./components/WorldMap";
import { ComparisonView } from "./components/ComparisonView";
import { ReportButton } from "./components/ReportButton";
import { PredictionCard } from "./components/PredictionCard";

function App() {
  const [topic, setTopic] = useState("");
  const [lastAnalyzedTopic, setLastAnalyzedTopic] = useState(""); // Track for simulator

  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null); // Real API result
  const [simulatedResult, setSimulatedResult] = useState<any>(null); // "What-If" result
  const [showSimulator, setShowSimulator] = useState(false);
  const [showBattleMode, setShowBattleMode] = useState(false);

  // Derived state: Use simulated if active, else real
  const displayedResult = showSimulator && simulatedResult ? simulatedResult : result;

  const handleUpdateSimulation = useCallback((simData: any) => {
    setSimulatedResult(simData);
  }, []);

  const handleAnalyze = async () => {
    if (!topic) return;
    setAnalyzing(true);
    setShowSimulator(false); // Reset simulator on new search
    setSimulatedResult(null);
    setLastAnalyzedTopic(topic);

    try {
      const response = await fetch("http://localhost:8000/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, timeWindow: "48h" })
      });

      if (!response.ok) throw new Error("Backend failed");
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.warn("Backend unavailable, using mock data", error);
      setResult(MOCK_RESULT);
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-neon-blue selection:text-black overflow-x-hidden">

      {/* 3D Background - Hyperspeed Restored */}
      <ErrorBoundary>
        <Hyperspeed effectOptions={hyperspeedPresets.one} />
      </ErrorBoundary>


      {/* Hero Crystal - DISABLED */}
      {/* <div className="fixed inset-0 pointer-events-none"> <HeroCrystal /> </div> */}

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 flex flex-col items-center min-h-screen">

        {/* Header Badge */}
        <div className="mb-8 p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-[0_0_30px_rgba(0,243,255,0.15)] flex items-center justify-center gap-2">
          <Activity className="w-5 h-5 text-neon-blue" />
          <span className="text-xs font-mono tracking-[0.4em] text-neon-blue uppercase drop-shadow-[0_0_10px_rgba(0,243,255,0.6)]">
            TrendFall AI
          </span>
        </div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl md:text-8xl font-black tracking-tighter text-center mb-6 drop-shadow-2xl"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/40">
            PREDICT THE
          </span>
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-red via-purple-500 to-neon-blue animate-pulse filter drop-shadow-[0_0_20px_rgba(188,19,254,0.5)]">
            COLLAPSE
          </span>
        </motion.h1>

        {/* Search Input */}
        <div className="w-full max-w-2xl relative group z-50 mt-12">
          <div className="absolute inset-0 bg-gradient-to-r from-neon-blue to-neon-purple rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
          <div className="relative flex items-center bg-black/80 backdrop-blur-md border border-white/10 rounded-xl p-2">
            <Zap className="w-6 h-6 text-neon-blue ml-3 opacity-70" />
            <input
              type="text"
              placeholder="Enter trend (e.g. 'Skibidi Toilet')"
              className="w-full bg-transparent border-none outline-none text-white px-4 py-3 placeholder:text-white/30 text-lg font-medium"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAnalyze()}
            />
            <button
              onClick={handleAnalyze}
              disabled={analyzing}
              className="px-6 py-3 bg-gradient-to-r from-neon-blue to-blue-600 rounded-lg font-bold uppercase tracking-wider text-sm hover:scale-105 active:scale-95 transition-all text-black shadow-[0_0_20px_rgba(0,243,255,0.4)]"
            >
              {analyzing ? "Scanning..." : "Analyze"}
            </button>
          </div>
        </div>

        {/* LOADING STATE - Centered nicely */}
        <AnimatePresence>
          {analyzing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-20 flex flex-col items-center"
            >
              <div className="relative w-24 h-24 mb-6">
                <div className="absolute inset-0 border-4 border-neon-blue/30 rounded-full animate-ping"></div>
                <div className="absolute inset-0 border-4 border-t-neon-blue border-r-transparent border-b-purple-500 border-l-transparent rounded-full animate-spin"></div>
                <Sparkles className="absolute inset-0 m-auto text-white w-8 h-8 animate-pulse" />
              </div>
              <p className="text-neon-blue font-mono tracking-widest text-sm animate-pulse">ANALYZING SIGNAL PATTERNS...</p>
            </motion.div>
          )}
        </AnimatePresence>


        {/* RESULTS DASHBOARD */}
        <AnimatePresence>
          {displayedResult && !analyzing && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full mt-20"
            >

              {/* Simulator Toggle if we have results */}
              <div className="flex justify-end mb-4 gap-4">
                <button
                  onClick={() => setShowBattleMode(!showBattleMode)}
                  className={`px-4 py-2 border rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${showBattleMode
                    ? "bg-orange-500 text-black border-orange-500"
                    : "bg-transparent text-gray-400 border-white/20 hover:border-white/50"
                    }`}
                >
                  {showBattleMode ? "Exit Battle" : "⚔️ Battle Mode"}
                </button>

                <button
                  onClick={() => setShowSimulator(!showSimulator)}
                  disabled={showBattleMode} // Disable sim in battle mode
                  className={`px-4 py-2 border rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${showSimulator
                    ? "bg-neon-blue text-black border-neon-blue"
                    : "bg-transparent text-gray-400 border-white/20 hover:border-white/50"
                    } ${showBattleMode ? "opacity-30 cursor-not-allowed" : ""}`}
                >
                  {showSimulator ? "Exit Simulator" : "Enter God Mode"}
                </button>
              </div>

              {/* BATTLE MODE */}
              {showBattleMode ? (
                <ComparisonView mainTopic={topic} mainData={displayedResult} />
              ) : (
                <>
                  {/* SIMULATION CONTROLS */}
                  {showSimulator && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      className="mb-8"
                    >
                      <SimulationControl
                        initialData={{ slope: -20, sentiment: -0.5, fatigue: 60 }} // Default "Crash" scenario
                        onUpdate={handleUpdateSimulation}
                        onReset={() => setShowSimulator(false)}
                      />
                    </motion.div>
                  )}


                  {/* Insight Header */}
                  <div
                    className={`mb-12 border-l-4 pl-6 ${displayedResult.insight.declineRisk === "High" ? "border-neon-red" :
                      displayedResult.insight.declineRisk === "Medium" ? "border-yellow-500" : "border-neon-blue"
                      }`}
                  >
                    <h3 className="text-neon-purple font-mono text-sm tracking-widest mb-2 flex items-center gap-2">
                      <Sparkles className="w-4 h-4" /> {showSimulator ? "SIMULATED FUTURE OUTCOME" : "FEATHER.AI INTELLIGENCE"}
                    </h3>
                    <p className="text-2xl md:text-3xl font-light text-white leading-relaxed">
                      {displayedResult.insight.summary}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column: Metrics & Radar */}
                    <div className="space-y-6">
                      <RiskMeter score={displayedResult.insight.riskScore} level={displayedResult.insight.declineRisk} />
                      <div className="glass-panel p-6 rounded-2xl bg-white/5 backdrop-blur-xl border-neon-purple/30">
                        <DeclineRadar data={displayedResult.insight.decline_drivers || [
                          { label: "Saturation", value: 50, fullMark: 100 },
                          { label: "Fatigue", value: 50, fullMark: 100 },
                          { label: "Sentiment", value: 50, fullMark: 100 },
                          { label: "Algo Shift", value: 50, fullMark: 100 },
                          { label: "Disengage", value: 50, fullMark: 100 },
                        ]} />
                      </div>
                    </div>

                    {/* Middle Column: Chart & Timeline */}
                    <div className="lg:col-span-2 space-y-6">
                      {/* XAI Insight Card - TOP FEATURE */}
                      <AIInsightCard
                        riskScore={displayedResult.insight.riskScore}
                        summary={displayedResult.insight.summary}
                        signals={displayedResult.insight.signals || []}
                        drivers={displayedResult.insight.decline_drivers || []}
                      />

                      {/* Predictive Model Card - NEW */}
                      <PredictionCard
                        probability={displayedResult.insight.decline_probability || (displayedResult.insight.riskScore / 100)}
                        timeToDecline={displayedResult.insight.predicted_time_to_decline || "Calculating..."}
                      />

                      <div className="bg-black/40 backdrop-blur-md border border-white/10 p-6 rounded-xl min-h-[300px]">
                        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                          <Activity className="w-5 h-5 text-cyan-400" />
                          Trend Velocity {showSimulator && "(Simulated)"}
                        </h3>
                        <TrendChart data={displayedResult.trend.history || displayedResult.trend} color={displayedResult.insight.declineRisk === "High" ? "#ff003c" : "#0aff00"} />
                      </div>

                      <div className="glass-panel p-6 rounded-2xl bg-white/5 backdrop-blur-xl border-white/10">
                        {/* LifecycleTimeline takes 'stage' string, mapped from riskScore for now */}
                        <LifecycleTimeline stage={
                          displayedResult.insight.riskScore > 80 ? "Collapse" :
                            displayedResult.insight.riskScore > 60 ? "Decline" :
                              displayedResult.insight.riskScore > 40 ? "Saturation" :
                                "Growth"
                        } />
                      </div>

                      {/* World Map - Geo Heatmap */}
                      <div className="glass-panel p-6 rounded-2xl bg-white/5 backdrop-blur-xl border-white/10">
                        <WorldMap riskScore={displayedResult.insight.riskScore} />
                      </div>

                      {/* Actions Area */}
                      <div className="glass-panel p-6 rounded-2xl">
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-white/50 mb-4">Strategic Response</h4>
                        <div className="flex gap-4">
                          <button className="px-4 py-2 bg-neon-blue/10 border border-neon-blue/50 rounded hover:bg-neon-blue/20 text-xs text-neon-blue font-bold uppercase tracking-wider transition-all">
                            Pivot Strategy
                          </button>
                          <button className="px-4 py-2 bg-purple-500/10 border border-purple-500/50 rounded hover:bg-purple-500/20 text-xs text-purple-400 font-bold uppercase tracking-wider transition-all">
                            Partner with Creators
                          </button>
                        </div>
                      </div>

                      {/* Report Generation */}
                      <div className="flex justify-center pt-8">
                        <ReportButton topic={topic} riskScore={displayedResult.insight.riskScore} />
                      </div>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}

export default App;
