import { motion } from "framer-motion";

// Simplified paths for major regions to create a "World Map" aesthetic
// These are not geographically perfect but sufficient for a "War Room" viz
const geoPaths = [
    { id: "NA", name: "North America", d: "M 50 50 L 150 50 L 130 150 L 60 140 Z", cx: 100, cy: 100 }, // Rough Polygon
    { id: "SA", name: "South America", d: "M 120 160 L 180 160 L 160 280 L 130 260 Z", cx: 150, cy: 220 },
    { id: "EU", name: "Europe", d: "M 280 60 L 380 60 L 360 110 L 290 120 Z", cx: 330, cy: 90 },
    { id: "AF", name: "Africa", d: "M 280 140 L 380 140 L 360 260 L 300 240 Z", cx: 330, cy: 200 },
    { id: "AS", name: "Asia", d: "M 400 60 L 550 60 L 530 180 L 420 160 Z", cx: 470, cy: 110 },
    { id: "AU", name: "Oceania", d: "M 480 200 L 560 200 L 540 260 L 490 250 Z", cx: 520, cy: 230 },
];

// Better SVG paths (Still stylized but more recognizable)
const worldPaths = [
    // North America
    { id: "NA", name: "North America", d: "M 20,40 Q 60,10 120,30 T 180,80 L 160,140 L 100,120 L 40,100 Z" },
    // South America
    { id: "SA", name: "South America", d: "M 160,140 L 220,150 L 200,280 L 170,260 Z" },
    // Europe
    { id: "EU", name: "Europe", d: "M 280,40 L 360,40 L 350,90 L 290,100 Z" },
    // Africa
    { id: "AF", name: "Africa", d: "M 280,110 L 370,110 L 350,230 L 300,210 Z" },
    // Asia
    { id: "AS", name: "Asia", d: "M 370,40 L 550,40 L 540,160 L 400,140 Z" },
    // Oceania
    { id: "AU", name: "Oceania", d: "M 480,180 L 560,180 L 540,240 L 490,230 Z" },
];

interface WorldMapProps {
    riskScore: number;
}

export const WorldMap = ({ riskScore }: WorldMapProps) => {

    // Mock regional data based on the overall risk score
    // If risk is high, show high saturation (red) in developed markets
    const getRegionColor = (id: string) => {
        const baseRisk = riskScore;
        let localRisk = baseRisk;

        // Randomize slightly for "Live Data" feel
        if (id === "NA" || id === "EU") localRisk += 10; // Trend starts/dies here first
        if (id === "AF" || id === "SA") localRisk -= 20; // Lags behind

        localRisk = Math.max(0, Math.min(100, localRisk));

        if (localRisk > 80) return "#ef4444"; // Red (Saturated/Dead)
        if (localRisk > 50) return "#eab308"; // Yellow (Warning)
        return "#10b981"; // Green (Growing)
    };

    return (
        <div className="w-full h-[300px] bg-black/40 rounded-xl overflow-hidden relative flex items-center justify-center border border-white/10">
            <div className="absolute top-4 left-4 z-10">
                <h3 className="text-white font-bold text-sm tracking-widest uppercase flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    Global Saturation Heatmap
                </h3>
            </div>

            <svg viewBox="0 0 600 300" className="w-full h-full opacity-80">
                <defs>
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {worldPaths.map((region) => (
                    <motion.path
                        key={region.id}
                        d={region.d}
                        fill={getRegionColor(region.id)}
                        stroke="rgba(255,255,255,0.2)"
                        strokeWidth="1"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        whileHover={{ scale: 1.05, stroke: "#fff", strokeWidth: 2 }}
                        className="cursor-pointer transition-colors duration-300"
                        filter="url(#glow)"
                        onClick={() => alert(`Region: ${region.name}\nStatus: ${getRegionColor(region.id) === "#ef4444" ? "SATURATED" : "ACTIVE"}`)}
                    >
                        <title>{region.name}</title>
                    </motion.path>
                ))}

                {/* Grid Lines for Sci-Fi effect */}
                <path d="M 0 50 L 600 50" stroke="rgba(0,243,255,0.1)" strokeWidth="0.5" />
                <path d="M 0 150 L 600 150" stroke="rgba(0,243,255,0.1)" strokeWidth="0.5" />
                <path d="M 0 250 L 600 250" stroke="rgba(0,243,255,0.1)" strokeWidth="0.5" />
                <path d="M 100 0 L 100 300" stroke="rgba(0,243,255,0.1)" strokeWidth="0.5" />
                <path d="M 300 0 L 300 300" stroke="rgba(0,243,255,0.1)" strokeWidth="0.5" />
                <path d="M 500 0 L 500 300" stroke="rgba(0,243,255,0.1)" strokeWidth="0.5" />
            </svg>

            {/* Legend */}
            <div className="absolute bottom-4 right-4 flex gap-4 text-[10px] text-gray-400">
                <div className="flex items-center gap-1"><div className="w-2 h-2 rounded bg-green-500" /> Growth</div>
                <div className="flex items-center gap-1"><div className="w-2 h-2 rounded bg-yellow-500" /> Peak</div>
                <div className="flex items-center gap-1"><div className="w-2 h-2 rounded bg-red-500" /> Dead</div>
            </div>
        </div>
    );
};
