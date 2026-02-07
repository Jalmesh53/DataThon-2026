import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, Html, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

// Market hotspots with coordinates (Lat, Long converted to Euler for visualization)
const markets = [
    { id: "NA", name: "North America", position: [1, 0.5, 1], label: "NA" },
    { id: "SA", name: "South America", position: [0.8, -0.6, 0.8], label: "SA" },
    { id: "EU", name: "Europe", position: [0.3, 0.8, 1.2], label: "EU" },
    { id: "AF", name: "Africa", position: [0.2, -0.2, 1.4], label: "AF" },
    { id: "AS", name: "Asia", position: [-0.8, 0.6, 1], label: "AS" },
    { id: "AU", name: "Australia", position: [-1, -0.8, 0.6], label: "AU" },
];

const GlobeScene = ({ riskScore }: { riskScore: number }) => {
    const globeRef = useRef<THREE.Group>(null);

    // Auto-rotation
    useFrame((_, delta) => {
        if (globeRef.current) {
            globeRef.current.rotation.y += delta * 0.15;
        }
    });

    const getMarketColor = (id: string) => {
        let localRisk = riskScore;
        if (id === "NA" || id === "EU") localRisk += 10;
        if (id === "AF" || id === "SA") localRisk -= 20;
        localRisk = Math.max(0, Math.min(100, localRisk));

        if (localRisk > 80) return "#ef4444"; // Saturated
        if (localRisk > 50) return "#eab308"; // Warning
        return "#10b981"; // Growth
    };

    // Create a dot-grid effect for the globe
    const dots = useMemo(() => {
        const temp = [];
        const count = 1500;
        for (let i = 0; i < count; i++) {
            const phi = Math.acos(-1 + (2 * i) / count);
            const theta = Math.sqrt(count * Math.PI) * phi;
            const x = Math.cos(theta) * Math.sin(phi);
            const y = Math.sin(theta) * Math.sin(phi);
            const z = Math.cos(phi);
            temp.push(new THREE.Vector3(x * 1.5, y * 1.5, z * 1.5));
        }
        return temp;
    }, []);

    return (
        <>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1.5} color="#00f3ff" />

            <group ref={globeRef} scale={1.3}>
                {/* Core Sphere */}
                <Sphere args={[1.48, 64, 64]}>
                    <meshStandardMaterial
                        color="#050505"
                        roughness={0.1}
                        metalness={0.9}
                        transparent
                        opacity={0.8}
                    />
                </Sphere>

                {/* Wireframe Globe Overlay */}
                <Sphere args={[1.5, 32, 32]}>
                    <meshBasicMaterial
                        color="#ffffff"
                        wireframe
                        transparent
                        opacity={0.05}
                    />
                </Sphere>

                {/* Particle Dot Grid */}
                <group>
                    {dots.map((pos, i) => (
                        <mesh key={i} position={pos}>
                            <sphereGeometry args={[0.008, 4, 4]} />
                            <meshBasicMaterial color="#ffffff" transparent opacity={0.1} />
                        </mesh>
                    ))}
                </group>

                {/* Markets / Hotspots */}
                {markets.map((m) => (
                    <group
                        key={m.id}
                        position={new THREE.Vector3(...m.position).normalize().multiplyScalar(1.5)}
                    >
                        <Sphere args={[0.06, 16, 16]}>
                            <meshBasicMaterial color={getMarketColor(m.id)} />
                        </Sphere>
                        <Sphere args={[0.12, 16, 16]}>
                            <meshBasicMaterial color={getMarketColor(m.id)} transparent opacity={0.2} />
                        </Sphere>
                        {/* Label */}
                        <Html distanceFactor={10} position={[0, 0.15, 0]}>
                            <div className="flex flex-col items-center">
                                <span className="text-[8px] font-black text-white/40 uppercase tracking-tighter whitespace-nowrap bg-black/40 px-1 rounded border border-white/5 backdrop-blur-sm">
                                    {m.name}
                                </span>
                            </div>
                        </Html>
                    </group>
                ))}
            </group>

            <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} />
        </>
    );
};

interface WorldMapProps {
    riskScore: number;
}

export const WorldMap = ({ riskScore }: WorldMapProps) => {
    return (
        <div className="w-full h-[350px] bg-black/40 rounded-xl overflow-hidden relative border border-white/10 group">
            <div className="absolute top-4 left-4 z-20 flex flex-col gap-1">
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-neon-blue animate-pulse shadow-[0_0_10px_#00f3ff]" />
                    <h3 className="text-white font-black text-[10px] tracking-[0.3em] uppercase">
                        Global Operational Vector Mapping
                    </h3>
                </div>
                <p className="text-[8px] font-mono text-white/30 uppercase tracking-widest pl-4">
                    Real-time Market Saturation Intelligence
                </p>
            </div>

            <div className="w-full h-full cursor-grab active:cursor-grabbing">
                <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                    <GlobeScene riskScore={riskScore} />
                </Canvas>
            </div>

            {/* Matrix HUD elements */}
            <div className="absolute inset-0 pointer-events-none border-[20px] border-transparent border-t-white/5 border-b-white/5 opacity-50" />
            <div className="absolute top-0 right-0 p-4 font-mono text-[8px] text-white/20 text-right leading-tight">
                COORD_X: 42.921<br />
                COORD_Y: 88.102<br />
                VECTOR_ROT: TRUE
            </div>

            {/* Legend */}
            <div className="absolute bottom-4 right-4 flex gap-4 text-[9px] font-bold tracking-widest uppercase text-white/40 bg-black/40 backdrop-blur-md p-2 rounded-lg border border-white/5">
                <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_5px_#10b981]" />
                    Growth
                </div>
                <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 shadow-[0_0_5px_#eab308]" />
                    Peak
                </div>
                <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_5px_#ef4444]" />
                    Saturated
                </div>
            </div>
        </div>
    );
};
