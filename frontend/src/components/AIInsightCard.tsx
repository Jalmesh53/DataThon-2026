import { motion } from "framer-motion";
import { BrainCircuit, ShieldAlert, Target, FileText } from "lucide-react";

interface Signal {
    metric: string;
    status: string;
    explanation: string;
}

interface Driver {
    label: string;
    value: number;
    fullMark: number;
}

interface AIInsightCardProps {
    riskScore: number;
    signals: Signal[];
    drivers: Driver[];
    primaryDriver?: string;
}

export const AIInsightCard = ({ riskScore, signals = [], drivers = [], primaryDriver }: AIInsightCardProps) => {
    // Decision logic based on risk score
    const getDecision = (score: number) => {
        if (score > 75) return {
            action: "REDUCE EXPOSURE",
            reason: "High probability of trend collapse. Immediate reallocation of marketing budget recommended.",
            color: "text-red-500",
            bg: "bg-red-500/10",
            border: "border-red-500/20"
        };
        if (score > 40) return {
            action: "HOLD CAPITAL",
            reason: "Market saturation signals detected. Pause incremental spend and monitor velocity.",
            color: "text-amber-500",
            bg: "bg-amber-500/10",
            border: "border-amber-500/20"
        };
        return {
            action: "ALLOCATE CAPITAL",
            reason: "Strong growth efficacy. Trend allows for high ROI on new campaign spend.",
            color: "text-green-500",
            bg: "bg-green-500/10",
            border: "border-green-500/20"
        };
    };

    const decision = getDecision(riskScore);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full bg-black/40 backdrop-blur-2xl border border-white/5 rounded-2xl overflow-hidden shadow-2xl"
        >
            {/* Header: AI Decision Core */}
            <div className="flex items-center justify-between p-6 border-b border-white/5">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-neon-blue/10 rounded-xl border border-neon-blue/20">
                        <BrainCircuit className="w-6 h-6 text-neon-blue" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white tracking-tight">Strategic Decision Core</h3>
                        <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Model: Enterprise-Risk-v5.0</p>
                    </div>
                </div>
                <div className={`px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest border uppercase ${riskScore > 75 ? "bg-red-500/20 border-red-500/50 text-red-400" :
                    riskScore > 40 ? "bg-amber-500/20 border-amber-500/50 text-amber-400" :
                        "bg-green-500/20 border-green-500/50 text-green-400"
                    }`}>
                    {riskScore > 75 ? "CRITICAL_RISK" : riskScore > 40 ? "ELEVATED_RISK" : "LOW_RISK"}
                </div>
            </div>

            <div className="p-6 space-y-8">
                {/* 1. What is the decision? */}
                <section>
                    <div className="flex items-center gap-2 mb-4">
                        <Target className="w-4 h-4 text-neon-blue" />
                        <h4 className="text-xs font-bold text-white/60 uppercase tracking-widest">Strategic Recommendation</h4>
                    </div>
                    <div className={`p-5 rounded-xl border ${decision.border} ${decision.bg}`}>
                        <div className={`text-2xl font-black mb-2 tracking-tighter ${decision.color}`}>
                            {decision.action}
                        </div>
                        <p className="text-white/80 text-sm leading-relaxed font-light italic">
                            "{decision.reason}"
                        </p>
                    </div>
                </section>

                {/* 2. Why? (Justification for Leadership) */}
                <section>
                    <div className="flex items-center gap-2 mb-4">
                        <ShieldAlert className="w-4 h-4 text-neon-blue" />
                        <h4 className="text-xs font-bold text-white/60 uppercase tracking-widest">Risk Drivers & Signals</h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {signals.map((signal, i) => {
                            const isPrimary = (primaryDriver && signal.metric === primaryDriver);
                            return (
                                <div key={i} className={`p-4 transition-all relative overflow-hidden rounded-xl border ${isPrimary ? "bg-red-500/10 border-red-500/40 ring-1 ring-red-500/20 shadow-[0_0_20px_rgba(239,68,68,0.1)]" : "bg-white/5 border-white/10"
                                    }`}>
                                    {isPrimary && (
                                        <div className="absolute top-0 right-0 bg-red-500 text-white text-[7px] font-black px-1.5 py-0.5 uppercase tracking-tighter">
                                            PRIMARY_DRIVER
                                        </div>
                                    )}
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider">{signal.metric}</span>
                                        <span className={`text-[8px] font-black px-1.5 py-0.5 rounded ${isPrimary || signal.status === "Critical" ? "bg-red-500/20 text-red-400" : "bg-neon-blue/20 text-neon-blue"
                                            }`}>
                                            {signal.status.toUpperCase()}
                                        </span>
                                    </div>
                                    <p className="text-xs text-white/70 leading-relaxed font-light">
                                        {signal.explanation}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* 3. Core Risk Driver (Business Impact) */}
                <section className="pt-4 border-t border-white/5">
                    <div className="flex items-center gap-2 mb-4">
                        <FileText className="w-4 h-4 text-neon-blue" />
                        <h4 className="text-xs font-bold text-white/60 uppercase tracking-widest">Core Risk Driver Analysis</h4>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="flex-1">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-bold text-white uppercase tracking-tighter">
                                    {drivers.length > 0 ? drivers.sort((a, b) => b.value - a.value)[0].label : "Saturation Index"}
                                </span>
                                <span className="text-lg font-black text-neon-blue">
                                    {drivers.length > 0 ? drivers.sort((a, b) => b.value - a.value)[0].value : riskScore}%
                                </span>
                            </div>
                            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${drivers.length > 0 ? drivers.sort((a, b) => b.value - a.value)[0].value : riskScore}%` }}
                                    className="h-full bg-gradient-to-r from-neon-blue to-neon-purple shadow-[0_0_10px_rgba(0,243,255,0.5)]"
                                />
                            </div>
                        </div>
                        <div className="w-1/3 text-[10px] text-white/40 font-mono italic leading-tight">
                            "Primary driver for the {riskScore > 50 ? "predicted decline" : "growth outlook"}."
                        </div>
                    </div>
                </section>
            </div>
        </motion.div>
    );
};
