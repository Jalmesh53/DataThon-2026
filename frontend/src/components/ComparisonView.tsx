import { useState } from "react";
import { ArrowRight, Trophy, AlertTriangle, TrendingUp, Swords } from "lucide-react";
import { RiskMeter } from "./RiskMeter";

interface ComparisonViewProps {
    mainTopic: string;
    mainData: any;
}

export const ComparisonView = ({ mainTopic, mainData }: ComparisonViewProps) => {
    const [competitorTopic, setCompetitorTopic] = useState("");
    const [competitorData, setCompetitorData] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const handleCompare = async () => {
        if (!competitorTopic) return;
        setLoading(true);
        try {
            // Reuse the main API logic
            const response = await fetch("http://localhost:8000/analyze", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ topic: competitorTopic })
            });
            const data = await response.json();
            setCompetitorData(data);
        } catch (e) {
            console.error("Comparison failed", e);
            // Mock fallback if offline
            setCompetitorData({
                insight: {
                    riskScore: 45,
                    declineRisk: "Medium",
                    summary: "Mock Comparison Data (Offline)",
                    decline_drivers: []
                }
            });
        }
        setLoading(false);
    };

    return (
        <div className="w-full animate-in fade-in duration-700">

            {/* Battle Header */}
            <div className="flex items-center justify-center gap-4 mb-8">
                <h2 className="text-3xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600 flex items-center gap-3">
                    <Swords className="w-8 h-8 text-orange-500" /> BATTLE MODE
                </h2>
            </div>

            {/* Input Area */}
            {!competitorData && (
                <div className="max-w-md mx-auto mb-12 flex gap-2">
                    <input
                        type="text"
                        placeholder="Enter Competitor (e.g. 'Ethereum')"
                        className="flex-1 bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white outline-none focus:border-orange-500 transition-colors"
                        value={competitorTopic}
                        onChange={(e) => setCompetitorTopic(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleCompare()}
                    />
                    <button
                        onClick={handleCompare}
                        disabled={loading}
                        className="px-6 py-2 bg-orange-600 hover:bg-orange-500 text-white font-bold uppercase tracking-wider rounded-lg transition-all"
                    >
                        {loading ? "FIGHT..." : "VS"}
                    </button>
                </div>
            )}

            {/* The Arena */}
            {competitorData && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">

                    {/* VS Badge */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 hidden md:flex items-center justify-center w-16 h-16 bg-black border-2 border-orange-500 rounded-full font-black text-xl text-orange-500 italic">
                        VS
                    </div>

                    {/* Left Corner (Main) */}
                    <div className={`p-6 rounded-2xl border ${mainData.insight.riskScore < competitorData.insight.riskScore ? "border-green-500/50 bg-green-900/10" : "border-red-500/50 bg-red-900/10"}`}>
                        <h3 className="text-xl font-bold mb-4 text-center uppercase tracking-widest">{mainTopic}</h3>
                        <div className="flex justify-center mb-6">
                            <RiskMeter score={mainData.insight.riskScore} level={mainData.insight.declineRisk} />
                        </div>
                        <div className="text-center">
                            <div className="text-xs text-gray-400 uppercase">Risk Score</div>
                            <div className="text-4xl font-black">{mainData.insight.riskScore}</div>
                        </div>

                        {mainData.insight.riskScore < competitorData.insight.riskScore && (
                            <div className="mt-6 flex items-center justify-center gap-2 text-green-400 font-bold bg-green-500/10 p-2 rounded">
                                <Trophy className="w-5 h-5" /> WINNER
                            </div>
                        )}
                    </div>

                    {/* Right Corner (Competitor) */}
                    <div className={`p-6 rounded-2xl border ${competitorData.insight.riskScore < mainData.insight.riskScore ? "border-green-500/50 bg-green-900/10" : "border-red-500/50 bg-red-900/10"}`}>
                        <h3 className="text-xl font-bold mb-4 text-center uppercase tracking-widest">{competitorTopic}</h3>
                        <div className="flex justify-center mb-6">
                            <RiskMeter score={competitorData.insight.riskScore} level={competitorData.insight.declineRisk} />
                        </div>
                        <div className="text-center">
                            <div className="text-xs text-gray-400 uppercase">Risk Score</div>
                            <div className="text-4xl font-black">{competitorData.insight.riskScore}</div>
                        </div>

                        {competitorData.insight.riskScore < mainData.insight.riskScore && (
                            <div className="mt-6 flex items-center justify-center gap-2 text-green-400 font-bold bg-green-500/10 p-2 rounded">
                                <Trophy className="w-5 h-5" /> WINNER
                            </div>
                        )}
                    </div>

                </div>
            )}

            {/* Reset Button */}
            {competitorData && (
                <div className="flex justify-center mt-12">
                    <button
                        onClick={() => { setCompetitorData(null); setCompetitorTopic(""); }}
                        className="text-sm text-gray-500 hover:text-white transition-colors"
                    >
                        Reset Battle
                    </button>
                </div>
            )}

        </div>
    );
};
