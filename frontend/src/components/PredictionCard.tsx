import { Compass, Clock, AlertTriangle, CheckCircle, HelpCircle } from "lucide-react";

interface PredictionCardProps {
    probability: number;
    timeToDecline: string;
}

export const PredictionCard = ({ probability, timeToDecline }: PredictionCardProps) => {

    // Determine color based on probability
    const getStatusColor = () => {
        if (probability > 0.7) return "text-neon-red border-neon-red/50 shadow-neon-red/20";
        if (probability > 0.4) return "text-yellow-400 border-yellow-400/50 shadow-yellow-400/20";
        return "text-neon-blue border-neon-blue/50 shadow-neon-blue/20";
    };

    const statusColor = getStatusColor();
    const percentage = Math.round(probability * 100);

    return (
        <div className={`relative overflow-hidden group glass-panel p-6 rounded-2xl bg-black/40 border transition-all duration-500 hover:scale-[1.02] ${probability > 0.7 ? "border-red-500/30" : "border-white/10"}`}>

            {/* Background Glow Effect */}
            <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full blur-[50px] opacity-20 ${probability > 0.7 ? "bg-red-600" : "bg-blue-600"}`}></div>

            <div className="flex items-start justify-between mb-4">
                <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2">
                    <Compass className={`w-4 h-4 ${probability > 0.7 ? "text-red-400 animate-spin-slow" : "text-blue-400"}`} />
                    Predictive Model
                </h3>
                <div className="px-2 py-1 bg-white/5 rounded text-[10px] text-gray-500 border border-white/10">
                    Random Forest v1.0
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                {/* Probability Stat */}
                <div className="text-center p-3 bg-white/5 rounded-xl border border-white/5">
                    <div className="text-xs text-gray-400 mb-1 uppercase">Collapse Probability</div>
                    <div className={`text-3xl font-black ${probability > 0.7 ? "text-red-500" : probability > 0.4 ? "text-yellow-400" : "text-green-500"}`}>
                        {percentage}%
                    </div>
                </div>

                {/* Time Estimation */}
                <div className="text-center p-3 bg-white/5 rounded-xl border border-white/5">
                    <div className="text-xs text-gray-400 mb-1 uppercase">Est. Time to Decline</div>
                    <div className="text-lg font-bold text-white flex items-center justify-center gap-1 h-full">
                        <Clock className="w-4 h-4 text-gray-500" />
                        {timeToDecline}
                    </div>
                </div>
            </div>

            {/* Insight Text */}
            <div className="mt-4 text-xs text-center italic text-gray-500 border-t border-white/5 pt-3">
                {probability > 0.7
                    ? "Model forecasts imminent structural failure."
                    : probability > 0.4
                        ? "Model detects growing instability signals."
                        : "Model projects continued organic growth."}
            </div>

        </div>
    );
};
