import { useState } from "react";
import { FileText, Download, Loader2 } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface ReportButtonProps {
    topic: string;
    riskScore: number;
}

export const ReportButton = ({ topic, riskScore }: ReportButtonProps) => {
    const [generating, setGenerating] = useState(false);

    const handleGenerateReport = async () => {
        setGenerating(true);

        // Slight delay to allow UI to settle (if any animations are running)
        await new Promise(resolve => setTimeout(resolve, 500));

        const element = document.body; // Capture the whole page for now, or specific ID

        try {
            const canvas = await html2canvas(element, {
                scale: 2, // Retain high quality
                useCORS: true,
                ignoreElements: (element) => element.tagName === 'BUTTON' || element.tagName === 'INPUT', // Clean up the PDF
                windowWidth: 1920
            });

            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF({
                orientation: "landscape",
                unit: "px",
                format: [canvas.width, canvas.height]
            });

            pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
            pdf.save(`${topic.replace(/\s+/g, '_')}_TrendFall_Report.pdf`);

        } catch (err) {
            console.error("PDF Generation failed:", err);
            alert("Could not generate report. Try maximizing the window.");
        }

        setGenerating(false);
    };

    return (
        <button
            onClick={handleGenerateReport}
            disabled={generating}
            className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/20 text-white px-4 py-2 rounded-lg text-xs uppercase tracking-widest font-bold transition-all"
        >
            {generating ? (
                <>
                    <Loader2 className="w-4 h-4 animate-spin text-neon-blue" />
                    Generating...
                </>
            ) : (
                <>
                    <FileText className="w-4 h-4 text-neon-blue" />
                    Download Intel
                </>
            )}
        </button>
    );
};
