import React, { useState, useRef } from 'react';
import { INITIAL_DATA, ResumeData, TemplateType } from './types';
import { ModernTech } from './components/templates/ModernTech';
import { MinimalistATS } from './components/templates/MinimalistATS';
import { ExecutiveSuite } from './components/templates/ExecutiveSuite';
import { Editor } from './components/Editor';
import { TemplateSelector } from './components/TemplateSelector';
import { Download, FileDown, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from 'docx';
import saveAs from 'file-saver';

export default function App() {
  const [data, setData] = useState<ResumeData>(INITIAL_DATA);
  const [template, setTemplate] = useState<TemplateType>(TemplateType.MODERN_TECH);
  const [isExporting, setIsExporting] = useState(false);
  
  const resumeRef = useRef<HTMLDivElement>(null);

  const downloadPDF = async () => {
    if (!resumeRef.current) return;
    setIsExporting(true);
    try {
        // High quality scale
        const canvas = await html2canvas(resumeRef.current, { scale: 2 });
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`${data.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.pdf`);
    } catch (e) {
        console.error("Export failed", e);
    }
    setIsExporting(false);
  };

  const downloadDocx = async () => {
      // Basic DOCX generation logic
      const doc = new Document({
          sections: [{
              properties: {},
              children: [
                  new Paragraph({
                      text: data.personalInfo.fullName.toUpperCase(),
                      heading: HeadingLevel.HEADING_1,
                  }),
                  new Paragraph({
                    text: `${data.personalInfo.email} | ${data.personalInfo.phone} | ${data.personalInfo.location}`,
                  }),
                  new Paragraph({ text: "" }), // Spacing
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
                  ...data.experience.flatMap(exp => [
                      new Paragraph({
                          children: [
                              new TextRun({ text: exp.company, bold: true, size: 24 }),
                              new TextRun({ text: `  ${exp.startDate} - ${exp.endDate}`, italics: true }),
                          ]
                      }),
                      new Paragraph({
                          children: [ new TextRun({ text: exp.role, italics: true }) ]
                      }),
                      new Paragraph({ text: exp.description }),
                      new Paragraph({ text: "" }),
                  ])
              ],
          }],
      });

      const blob = await Packer.toBlob(doc);
      saveAs(blob, `${data.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.docx`);
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#09090b] text-white">
      {/* Sidebar Editor */}
      <motion.div 
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="w-[400px] flex-shrink-0 border-r border-white/10 bg-[#09090b] flex flex-col"
      >
        <div className="p-6 border-b border-white/10">
          <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent flex items-center gap-2">
            <Sparkles className="text-indigo-400" size={20} />
            ResuMotion
          </h1>
          <p className="text-xs text-zinc-500 mt-1">AI-Powered Visual Builder</p>
        </div>
        
        <div className="flex-1 overflow-hidden p-4">
            <Editor data={data} onChange={setData} />
        </div>
      </motion.div>

      {/* Main Preview Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-black/50 relative">
        {/* Toolbar */}
        <div className="h-16 border-b border-white/10 flex items-center justify-between px-8 bg-[#09090b]/80 backdrop-blur-xl z-20 sticky top-0">
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
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-medium transition-colors shadow-lg shadow-indigo-500/20"
                >
                    {isExporting ? <span className="animate-spin">⟳</span> : <Download size={16} />}
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
                    width: '210mm', 
                    minHeight: '297mm',
                    height: 'fit-content',
                    transformOrigin: 'top center'
                }}
            >
                <div ref={resumeRef} className="w-full h-full">
                    {template === TemplateType.MODERN_TECH && <ModernTech data={data} />}
                    {template === TemplateType.MINIMALIST_ATS && <MinimalistATS data={data} />}
                    {template === TemplateType.EXECUTIVE_SUITE && <ExecutiveSuite data={data} />}
                </div>
            </motion.div>
        </div>
      </div>
    </div>
  );
}