import { useState, useRef, lazy, Suspense } from "react";
import { INITIAL_DATA, ResumeData, TemplateType } from "../types";
import { Editor } from "../components/Editor";
import { TemplateSelector } from "../components/TemplateSelector";
import { Download, FileDown, Sparkles, Home } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from "docx";
import { saveAs } from "file-saver";

// Lazy load templates for code splitting
const ModernTech = lazy(() =>
  import("../components/templates/ModernTech").then((module) => ({
    default: module.ModernTech,
  }))
);
const MinimalistATS = lazy(() =>
  import("../components/templates/MinimalistATS").then((module) => ({
    default: module.MinimalistATS,
  }))
);
const ExecutiveSuite = lazy(() =>
  import("../components/templates/ExecutiveSuite").then((module) => ({
    default: module.ExecutiveSuite,
  }))
);

function TemplateLoader() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-white">
      <div className="text-gray-400 animate-pulse">Loading template...</div>
    </div>
  );
}

export function ResumeBuilder() {
  const navigate = useNavigate();
  const [data, setData] = useState<ResumeData>(INITIAL_DATA);
  const [template, setTemplate] = useState<TemplateType>(
    TemplateType.MODERN_TECH
  );
  const [isExporting, setIsExporting] = useState(false);

  const resumeRef = useRef<HTMLDivElement>(null);

  const downloadPDF = async () => {
    if (!resumeRef.current) return;
    setIsExporting(true);

    try {
      const canvas = await html2canvas(resumeRef.current, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${data.personalInfo.fullName.replace(/\s+/g, "_")}_Resume.pdf`);
    } catch (error) {
      console.error("PDF export failed:", error);
    } finally {
      setIsExporting(false);
    }
  };

  const downloadDocx = async () => {
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              text: data.personalInfo.fullName.toUpperCase(),
              heading: HeadingLevel.HEADING_1,
            }),
            new Paragraph({
              text: `${data.personalInfo.email} | ${data.personalInfo.phone} | ${data.personalInfo.location}`,
            }),
            new Paragraph({ text: "" }),
            new Paragraph({
              text: "SUMMARY",
              heading: HeadingLevel.HEADING_2,
            }),
            new Paragraph({ text: data.personalInfo.summary }),
            new Paragraph({ text: "" }),
            new Paragraph({
              text: "EXPERIENCE",
              heading: HeadingLevel.HEADING_2,
            }),
            ...data.experience.flatMap((exp) => [
              new Paragraph({
                children: [
                  new TextRun({ text: exp.company, bold: true, size: 24 }),
                  new TextRun({
                    text: `  ${exp.startDate} - ${exp.endDate}`,
                    italics: true,
                  }),
                ],
              }),
              new Paragraph({
                children: [new TextRun({ text: exp.role, italics: true })],
              }),
              new Paragraph({ text: exp.description }),
              new Paragraph({ text: "" }),
            ]),
          ],
        },
      ],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(
      blob,
      `${data.personalInfo.fullName.replace(/\s+/g, "_")}_Resume.docx`
    );
  };

  const renderTemplate = () => {
    switch (template) {
      case TemplateType.MODERN_TECH:
        return <ModernTech data={data} />;
      case TemplateType.MINIMALIST_ATS:
        return <MinimalistATS data={data} />;
      case TemplateType.EXECUTIVE_SUITE:
        return <ExecutiveSuite data={data} />;
      default:
        return <ModernTech data={data} />;
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-zinc-950 text-white">
      {/* Sidebar Editor */}
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="w-[400px] flex-shrink-0 border-r border-white/10 bg-zinc-950 flex flex-col"
      >
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent flex items-center gap-2">
              <Sparkles className="text-indigo-400" size={20} />
              ResuMotion
            </h1>
            <button
              onClick={() => navigate("/")}
              className="p-2 hover:bg-white/5 rounded-lg transition-colors group"
              title="Back to home"
            >
              <Home size={18} className="text-zinc-400 group-hover:text-white" />
            </button>
          </div>
          <p className="text-xs text-zinc-500">AI-Powered Visual Builder</p>
        </div>

        <div className="flex-1 overflow-hidden p-4">
          <Editor data={data} onChange={setData} />
        </div>
      </motion.div>

      {/* Main Preview Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-black/50 relative">
        {/* Toolbar */}
        <div className="h-16 border-b border-white/10 flex items-center justify-between px-8 bg-zinc-950/80 backdrop-blur-xl z-20 sticky top-0">
          <TemplateSelector currentTemplate={template} onSelect={setTemplate} />

          <div className="flex gap-3">
            <button
              onClick={downloadDocx}
              className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-sm font-medium transition-colors border border-white/5"
            >
              <FileDown size={16} />
              Export DOCX (ATS)
            </button>
            <button
              onClick={downloadPDF}
              disabled={isExporting}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-medium transition-colors shadow-lg shadow-indigo-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isExporting ? (
                <span className="animate-spin">⟳</span>
              ) : (
                <Download size={16} />
              )}
              Export PDF
            </button>
          </div>
        </div>

        {/* Resume Preview Canvas */}
        <div className="flex-1 overflow-auto p-8 flex justify-center bg-zinc-950/50">
          <motion.div
            layout
            className="bg-white shadow-2xl relative"
            style={{
              width: "210mm",
              minHeight: "297mm",
              height: "fit-content",
              transformOrigin: "top center",
            }}
          >
            <div ref={resumeRef} className="w-full h-full">
              <Suspense fallback={<TemplateLoader />}>
                {renderTemplate()}
              </Suspense>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
