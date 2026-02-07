import { Compass, Clock } from "lucide-react";

interface PredictionCardProps {
    probability: number;
    timeToDecline: string;
}

export const PredictionCard = ({ probability, timeToDecline }: PredictionCardProps) => {
    const percentage = Math.round(probability * 100);

    return (
        <div className={`relative overflow-hidden group glass-panel p-6 rounded-2xl bg-black/40 border transition-all duration-500 hover:scale-[1.02] ${probability > 0.7 ? "border-red-500/30" : "border-white/10"}`}>

            {/* Background Glow Effect */}
            <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full blur-[50px] opacity-20 ${probability > 0.7 ? "bg-red-600" : "bg-blue-600"}`}></div>

            <div className="flex items-start justify-between mb-6">
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white/60 flex items-center gap-2">
                    <Compass className={`w-4 h-4 ${probability > 0.7 ? "text-neon-red shadow-[0_0_10px_rgba(255,0,60,0.5)]" : "text-neon-blue"}`} />
                    Decline Risk Engine
                </h3>
                <div className="px-2 py-1 bg-white/5 rounded text-[10px] text-gray-500 border border-white/10 font-mono">
                    PROT_V4.2
                </div>
            </div>

            <div className="space-y-6">
                {/* 1. Decline Risk Status */}
                <div className="flex justify-between items-center bg-white/5 p-4 rounded-xl border border-white/5">
                    <span className="text-xs text-white/40 uppercase font-bold tracking-widest">Decline Risk:</span>
                    <span className={`text-lg font-black uppercase tracking-tighter ${probability > 0.7 ? "text-neon-red" : probability > 0.4 ? "text-yellow-400" : "text-neon-green"
                        }`}>
                        {probability > 0.7 ? "HIGH" : probability > 0.4 ? "MODERATE" : "LOW"}
                    </span>
                </div>

                {/* 2. Score */}
                <div className="flex justify-between items-center bg-white/5 p-4 rounded-xl border border-white/5">
                    <span className="text-xs text-white/40 uppercase font-bold tracking-widest">Score:</span>
                    <span className="text-2xl font-black text-white tracking-widest">
                        {percentage} <span className="text-xs text-white/20">/ 100</span>
                    </span>
                </div>

                {/* 3. Time Window */}
                <div className="flex justify-between items-center bg-white/5 p-4 rounded-xl border border-white/5">
                    <span className="text-xs text-white/40 uppercase font-bold tracking-widest">Time Window:</span>
                    <div className="flex items-center gap-2 text-white font-bold">
                        <Clock className="w-4 h-4 text-neon-blue opacity-50" />
                        Next {timeToDecline.replace("< ", "")}
                    </div>
                </div>
            </div>

            {/* Insight Text */}
            <div className="mt-6 text-[10px] text-center font-mono uppercase tracking-[0.2em] text-white/20 pt-4 border-t border-white/5">
                Model Defense Readiness: 98.4%
            </div>

        </div>
    );
};
