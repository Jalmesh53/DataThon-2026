import { useState, useEffect } from "react";
import { Sliders, RotateCcw } from "lucide-react";

interface SimulationControlProps {
    initialData: {
        slope: number;
        sentiment: number;
        fatigue: number;
    };
    onUpdate: (simulatedResult: any) => void;
    onReset: () => void;
}

export const SimulationControl = ({ initialData, onUpdate, onReset }: SimulationControlProps) => {
    const [slope, setSlope] = useState(initialData.slope);
    const [sentiment, setSentiment] = useState(initialData.sentiment);
    const [fatigue, setFatigue] = useState(initialData.fatigue);

    // Client-side approximation of the ML Model (Random Forest)
    // We mirror the logic from backend/ml_model.py for instant feedback
    useEffect(() => {
        let riskScore = 50;
        let declineRisk = "Medium";
        let summary = "Simulated Scenario Analysis";

        // Approximate Risk Calculation
        // Base score from slope (inverted: negative slope = high risk)
        // Slope -100 -> +50 risk, Slope +100 -> -50 risk
        const slopeRisk = (slope * -1) * 0.5;

        // Sentiment -1 -> +30 risk, +1 -> -30 risk
        const sentimentRisk = (sentiment * -1) * 30;

        // Fatigue 100 -> +40 risk, 0 -> 0 risk
        const fatigueRisk = (fatigue / 100) * 40;

        // Base baseline
        riskScore = 30 + slopeRisk + sentimentRisk + fatigueRisk;

        // Clamp
        riskScore = Math.max(5, Math.min(98, riskScore));

        // Determine Label
        if (riskScore > 75) {
            declineRisk = "High";
            summary = "SIMULATION: Critical collapse imminent based on these parameters.";
        } else if (riskScore > 40) {
            declineRisk = "Medium";
            summary = "SIMULATION: Trend is unstable.";
        } else {
            declineRisk = "Low";
            summary = "SIMULATION: Trend looks healthy in this scenario.";
        }

        // Construct the simulated "Analysis" object structure expected by App.tsx
        const simulatedAnalysis = {
            insight: {
                riskScore: Math.round(riskScore),
                declineRisk: declineRisk,
                summary: summary,
                signals: [
                    { metric: "Simulated Slope", status: slope < 0 ? "Warning" : "Good", explanation: `Manually set to ${slope}` },
                    { metric: "Simulated Sentiment", status: sentiment < 0 ? "Bad" : "Good", explanation: `Manually set to ${sentiment.toFixed(1)}` }
                ],
                decline_drivers: [
                    { label: "Saturation", value: Math.min(100, Math.max(0, riskScore + 10)), fullMark: 100 },
                    { label: "Fatigue", value: fatigue, fullMark: 100 },
                    { label: "Sentiment", value: (1 - sentiment) * 50, fullMark: 100 }, // Norm logic
                    { label: "Algo Shift", value: 50, fullMark: 100 },
                    { label: "Disengage", value: Math.min(100, Math.max(0, 100 - (slope + 50))), fullMark: 100 },
                ]
            },
            trend: {
                // Generate a dummy history based on slope
                history: Array.from({ length: 24 }, (_, i) => {
                    const val = 1000 + (slope * (23 - i)); // massive simplification
                    return { timestamp: `${i}h`, value: Math.max(0, val) };
                })
            }
        };

        onUpdate(simulatedAnalysis);

    }, [slope, sentiment, fatigue, onUpdate]);

    return (
        <div className="glass-panel p-6 rounded-2xl bg-black/60 border border-neon-blue/50 mb-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-neon-blue" />

            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Sliders className="w-5 h-5 text-neon-blue" />
                    "What-If" Simulator
                </h3>
                <button
                    onClick={onReset}
                    className="text-xs flex items-center gap-1 text-gray-400 hover:text-white transition-colors"
                >
                    <RotateCcw className="w-3 h-3" /> Reset
                </button>
            </div>

            <div className="space-y-6">
                {/* Slope Slider */}
                <div>
                    <div className="flex justify-between text-xs mb-2">
                        <span className="text-gray-400">Trend Velocity (Slope)</span>
                        <span className="text-neon-blue font-mono">{slope}</span>
                    </div>
                    <input
                        type="range" min="-100" max="100" value={slope}
                        onChange={(e) => setSlope(Number(e.target.value))}
                        className="w-full accent-neon-blue h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-gray-600 mt-1">
                        <span>Plummeting</span>
                        <span>Skyrocketing</span>
                    </div>
                </div>

                {/* Sentiment Slider */}
                <div>
                    <div className="flex justify-between text-xs mb-2">
                        <span className="text-gray-400">Public Sentiment</span>
                        <span className="text-purple-400 font-mono">{sentiment.toFixed(1)}</span>
                    </div>
                    <input
                        type="range" min="-1" max="1" step="0.1" value={sentiment}
                        onChange={(e) => setSentiment(Number(e.target.value))}
                        className="w-full accent-purple-500 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-gray-600 mt-1">
                        <span>Hate</span>
                        <span>Love</span>
                    </div>
                </div>

                {/* Fatigue Slider */}
                <div>
                    <div className="flex justify-between text-xs mb-2">
                        <span className="text-gray-400">Audience Fatigue</span>
                        <span className="text-red-400 font-mono">{fatigue}%</span>
                    </div>
                    <input
                        type="range" min="0" max="100" value={fatigue}
                        onChange={(e) => setFatigue(Number(e.target.value))}
                        className="w-full accent-red-500 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-gray-600 mt-1">
                        <span>Fresh</span>
                        <span>Bored</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
