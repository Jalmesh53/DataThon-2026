/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "#050505",
                foreground: "#ededed",
                neon: {
                    blue: "#00f3ff",
                    purple: "#bc13fe",
                    green: "#0aff00",
                    red: "#ff003c",
                },
            },
            fontFamily: {
                sans: ["Inter", "sans-serif"],
            },
            animation: {
                "pulse-slow": "pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
            },
            keyframes: {
                "pulse-slow": {
                    "0%, 100%": { opacity: 1, filter: "brightness(1) blur(0px)" },
                    "50%": { opacity: 0.8, filter: "brightness(1.2) blur(1px)" },
                },
            },
        },
    },
    plugins: [],
}
