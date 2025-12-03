import React from 'react';
import { motion } from 'framer-motion';
import { TemplateType } from '../types';
import { Layout, FileText, Briefcase } from 'lucide-react';

interface Props {
  currentTemplate: TemplateType;
  onSelect: (t: TemplateType) => void;
}

export const TemplateSelector: React.FC<Props> = ({ currentTemplate, onSelect }) => {
  const templates = [
    { type: TemplateType.MODERN_TECH, icon: Layout, label: 'Modern Tech' },
    { type: TemplateType.MINIMALIST_ATS, icon: FileText, label: 'Minimalist ATS' },
    { type: TemplateType.EXECUTIVE_SUITE, icon: Briefcase, label: 'Executive Suite' },
  ];

  return (
    <div className="flex gap-2 bg-zinc-900/50 p-1.5 rounded-xl border border-white/10 backdrop-blur-md">
      {templates.map((t) => {
        const isActive = currentTemplate === t.type;
        return (
          <button
            key={t.type}
            onClick={() => onSelect(t.type)}
            className={`relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              isActive ? 'text-white' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-white/10 rounded-lg border border-white/5"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <t.icon size={16} className="relative z-10" />
            <span className="relative z-10">{t.label}</span>
          </button>
        );
      })}
    </div>
  );
};