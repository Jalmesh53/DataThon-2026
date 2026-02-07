import { motion } from "framer-motion";
import { Zap, TrendingDown, Shield, BarChart3, ArrowRight } from "lucide-react";
import StarBorder from "./StarBorder";

interface LandingPageProps {
    onStart: () => void;
}

export const LandingPage = ({ onStart }: LandingPageProps) => {
    return (
        <div className="relative z-20 min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
            {/* Hero Badge */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-8 p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-[0_0_30px_rgba(0,243,255,0.15)] flex items-center justify-center gap-2"
            >
                <Zap className="w-5 h-5 text-neon-blue" />
                <span className="text-xs font-mono tracking-[0.4em] text-neon-blue uppercase drop-shadow-[0_0_10px_rgba(0,243,255,0.6)]">
                    The Future of Trend Analysis
                </span>
            </motion.div>

            {/* Hero Content */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="max-w-4xl"
            >
                <div className="mb-6 flex justify-center">
                    <span className="px-3 py-1 rounded-full border border-neon-blue/30 bg-neon-blue/10 text-neon-blue text-[10px] font-mono uppercase tracking-widest">
                        For Enterprise Marketing & Strategy Teams
                    </span>
                </div>
                <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[1.1] uppercase">
                    <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/40">
                        Know When to <br />
                    </span>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-red via-purple-500 to-neon-blue animate-pulse-slow filter drop-shadow-[0_0_30px_rgba(0,243,255,0.3)]">
                        Stop Investing.
                    </span>
                </h1>

                <p className="text-xl md:text-2xl text-white/60 font-light leading-relaxed mb-12 max-w-2xl mx-auto backdrop-blur-sm px-4">
                    An AI-powered early warning system for marketing and investment teams
                    to <span className="text-white font-medium">avoid wasted spend</span> on declining social trends.
                </p>
            </motion.div>

            {/* Main Action */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="group z-50 mt-12"
            >
                <StarBorder
                    as="button"
                    onClick={onStart}
                    color="#00f3ff"
                    speed="4s"
                    className="hover:scale-105 transition-transform active:scale-95"
                    innerClassName="!bg-gradient-to-r !from-neon-blue !to-blue-600 !text-black !border-none !font-black !px-12 !py-6"
                >
                    <span className="flex items-center gap-3 text-xl uppercase tracking-widest">
                        Let's Get Started
                        <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    </span>
                </StarBorder>
            </motion.div>

            {/* Feature Grids */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl"
            >
                <div className="glass-panel p-8 rounded-3xl text-left hover:border-neon-blue/40 transition-colors">
                    <Shield className="w-10 h-10 text-neon-blue mb-4" />
                    <h3 className="text-lg font-bold mb-2">Capital Protection</h3>
                    <p className="text-white/40 text-sm leading-relaxed">Prevent budget wastage by identifying market saturation signals before competitors.</p>
                </div>

                <div className="glass-panel p-8 rounded-3xl text-left hover:border-neon-purple/40 transition-colors">
                    <TrendingDown className="w-10 h-10 text-neon-purple mb-4" />
                    <h3 className="text-lg font-bold mb-2">Risk Scoring</h3>
                    <p className="text-white/40 text-sm leading-relaxed">Institutional-grade algorithms quantify decline probability and audience fatigue.</p>
                </div>

                <div className="glass-panel p-8 rounded-3xl text-left hover:border-neon-red/40 transition-colors">
                    <BarChart3 className="w-10 h-10 text-neon-red mb-4" />
                    <h3 className="text-lg font-bold mb-2">Scenario Modeling</h3>
                    <p className="text-white/40 text-sm leading-relaxed">Simulate market variables to forecast trend longevity and exit timing windows.</p>
                </div>
            </motion.div>

            {/* Trust Line */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                transition={{ delay: 1 }}
                className="mt-20 text-[10px] uppercase tracking-[0.5em] text-white/50"
            >
                Encryption Protocol Active // Decision Core V2.4 Connected
            </motion.div>
        </div>
    );
};
