import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle, Info, TrendingDown, TrendingUp, BrainCircuit } from "lucide-react";

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
    summary: string;
    signals: Signal[];
    drivers: Driver[];
}

export const AIInsightCard = ({ riskScore, summary, signals = [], drivers = [] }: AIInsightCardProps) => {

    // Identify the top contributing factor to the risk
    // Safety check: ensure drivers is an array and has items
    const safeDrivers = Array.isArray(drivers) ? drivers : [];
    const topFactor = safeDrivers.length > 0
        ? [...safeDrivers].sort((a, b) => b.value - a.value)[0]
        : null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-black/40 backdrop-blur-md border border-white/10 p-6 rounded-xl relative overflow-hidden"
        >
            {/* Decorative background glow */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-500/20 blur-3xl rounded-full" />

            <div className="flex items-start justify-between mb-4 relative z-10">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-500/20 rounded-lg">
                        <BrainCircuit className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white">Reviewer AI Insight</h3>
                        <p className="text-xs text-gray-400">Explainable Analysis Model v1.0</p>
                    </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-bold border ${riskScore > 75 ? "bg-red-500/20 border-red-500 text-red-400" :
                    riskScore > 40 ? "bg-yellow-500/20 border-yellow-500 text-yellow-400" :
                        "bg-green-500/20 border-green-500 text-green-400"
                    }`}>
                    {riskScore > 75 ? "CRITICAL RISK" : riskScore > 40 ? "MODERATE RISK" : "HEALTHY"}
                </div>
            </div>

            <p className="text-gray-300 mb-6 text-sm leading-relaxed border-l-2 border-purple-500 pl-3">
                {summary}
            </p>

            {/* Primary Signals Analysis */}
            <div className="space-y-3 mb-6">
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Key Signals Detected</h4>
                {signals.length > 0 ? (
                    signals.map((signal, index) => (
                        <div key={index} className="flex items-center justify-between bg-white/5 p-3 rounded-lg border border-white/5 hover:border-white/10 transition-colors">
                            <div className="flex items-center gap-3">
                                {signal.status === "Critical" || signal.status === "Bad" ? (
                                    <AlertTriangle className="w-4 h-4 text-red-400" />
                                ) : signal.status === "Warning" ? (
                                    <Info className="w-4 h-4 text-yellow-400" />
                                ) : (
                                    <CheckCircle className="w-4 h-4 text-green-400" />
                                )}
                                <span className="text-sm font-medium text-gray-200">{signal.metric}</span>
                            </div>
                            <span className="text-xs text-gray-400">{signal.explanation}</span>
                        </div>
                    ))
                ) : (
                    <div className="text-xs text-gray-500 italic p-2 text-center">No specific signal anomalies detected.</div>
                )}
            </div>

            {/* Top Factor Highlight */}
            {topFactor && (
                <div className="bg-gradient-to-r from-purple-900/40 to-blue-900/40 p-4 rounded-lg border border-white/10">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-xs text-blue-200 font-semibold">PRIMARY DRIVER</span>
                        <span className="text-xs text-blue-300">{topFactor.value}% Impact</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex-1">
                            <div className="text-lg font-bold text-white mb-1">{topFactor.label}</div>
                            <div className="w-full bg-black/50 h-1.5 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${topFactor.value}%` }}
                                    transition={{ duration: 1, delay: 0.5 }}
                                    className="h-full bg-blue-500 rounded-full"
                                />
                            </div>
                        </div>
                        {topFactor.label === "Saturation" ? <TrendingDown className="text-red-400" /> : <Info className="text-blue-400" />}
                    </div>
                    <p className="text-[10px] text-gray-400 mt-2">
                        This factor contributes most significantly to the calculated decline probability.
                        {topFactor.value > 80 ? " Corrective action is strictly required." : " Monitoring is advised."}
                    </p>
                </div>
            )}

        </motion.div>
    );
};
