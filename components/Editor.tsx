import React, { useState } from 'react';
import { ResumeData, ExperienceItem, EducationItem, ProjectItem } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, ChevronDown, ChevronUp, Wand2, Loader2 } from 'lucide-react';
import { polishContent, generateSummary } from '../services/geminiService';

interface Props {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
}

const SectionHeader = ({ title, isOpen, toggle }: { title: string, isOpen: boolean, toggle: () => void }) => (
  <button 
    onClick={toggle}
    className="w-full flex justify-between items-center p-4 bg-zinc-900/50 hover:bg-zinc-800/50 transition-colors border-b border-white/5 first:rounded-t-xl"
  >
    <span className="font-medium text-zinc-200">{title}</span>
    {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
  </button>
);

export const Editor: React.FC<Props> = ({ data, onChange }) => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({ personal: true });
  const [polishing, setPolishing] = useState<string | null>(null);

  const toggle = (section: string) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const updatePersonal = (field: string, value: string) => {
    onChange({ ...data, personalInfo: { ...data.personalInfo, [field]: value } });
  };

  const handlePolish = async (id: string, text: string, type: 'summary' | 'bullet', fieldUpdater: (val: string) => void) => {
    if (!text) return;
    setPolishing(id);
    const polished = await polishContent(text, type);
    fieldUpdater(polished);
    setPolishing(null);
  };

  const handleMagicSummary = async () => {
      setPolishing('summary-gen');
      const sum = await generateSummary(data.personalInfo.role, data.skills);
      if(sum) updatePersonal('summary', sum);
      setPolishing(null);
  }

  // Experience Helpers
  const addExperience = () => {
    const newItem: ExperienceItem = {
      id: Date.now().toString(),
      company: 'New Company',
      role: 'Role',
      startDate: '2023',
      endDate: 'Present',
      current: true,
      description: 'Did some cool stuff.'
    };
    onChange({ ...data, experience: [newItem, ...data.experience] });
  };

  const updateExperience = (id: string, field: keyof ExperienceItem, value: any) => {
    const newExp = data.experience.map(e => e.id === id ? { ...e, [field]: value } : e);
    onChange({ ...data, experience: newExp });
  };

  const removeExperience = (id: string) => {
    onChange({ ...data, experience: data.experience.filter(e => e.id !== id) });
  };

  // Generic renderers for simplicity
  return (
    <div className="h-full overflow-y-auto pr-2 pb-20 scrollbar-hide">
      
      {/* Personal Info */}
      <div className="mb-4 rounded-xl border border-white/10 overflow-hidden bg-zinc-900/30">
        <SectionHeader title="Personal Info" isOpen={openSections['personal']} toggle={() => toggle('personal')} />
        <AnimatePresence>
          {openSections['personal'] && (
            <motion.div 
                initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} 
                className="overflow-hidden"
            >
              <div className="p-4 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <Input label="Full Name" value={data.personalInfo.fullName} onChange={v => updatePersonal('fullName', v)} />
                    <Input label="Role Title" value={data.personalInfo.role} onChange={v => updatePersonal('role', v)} />
                </div>
                <Input label="Email" value={data.personalInfo.email} onChange={v => updatePersonal('email', v)} />
                <div className="grid grid-cols-2 gap-4">
                    <Input label="Phone" value={data.personalInfo.phone} onChange={v => updatePersonal('phone', v)} />
                    <Input label="Location" value={data.personalInfo.location} onChange={v => updatePersonal('location', v)} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <Input label="LinkedIn" value={data.personalInfo.linkedin} onChange={v => updatePersonal('linkedin', v)} />
                    <Input label="GitHub" value={data.personalInfo.github} onChange={v => updatePersonal('github', v)} />
                </div>
                <Input label="Portfolio" value={data.personalInfo.portfolio} onChange={v => updatePersonal('portfolio', v)} />
                
                <div className="space-y-1">
                  <div className="flex justify-between items-end">
                    <label className="text-xs text-zinc-500 font-medium ml-1">Summary</label>
                     <div className="flex gap-2">
                        <button 
                            onClick={handleMagicSummary}
                            disabled={!!polishing}
                            className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition-colors"
                        >
                            {polishing === 'summary-gen' ? <Loader2 size={12} className="animate-spin" /> : <Wand2 size={12} />}
                            Generate
                        </button>
                        <button 
                            onClick={() => handlePolish('summary', data.personalInfo.summary, 'summary', (v) => updatePersonal('summary', v))}
                            disabled={!!polishing}
                            className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition-colors"
                        >
                            {polishing === 'summary' ? <Loader2 size={12} className="animate-spin" /> : <Wand2 size={12} />}
                            Polish
                        </button>
                     </div>
                  </div>
                  <textarea 
                    className="w-full bg-black/20 border border-white/10 rounded-lg p-2 text-sm text-zinc-300 focus:outline-none focus:ring-1 focus:ring-indigo-500 min-h-[100px]"
                    value={data.personalInfo.summary}
                    onChange={e => updatePersonal('summary', e.target.value)}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Experience */}
      <div className="mb-4 rounded-xl border border-white/10 overflow-hidden bg-zinc-900/30">
        <div className="flex items-center bg-zinc-900/50 border-b border-white/5 pr-4">
            <SectionHeader title="Experience" isOpen={openSections['experience']} toggle={() => toggle('experience')} />
            <button onClick={addExperience} className="p-1 hover:bg-white/10 rounded"><Plus size={16} className="text-zinc-400" /></button>
        </div>
        <AnimatePresence>
          {openSections['experience'] && (
            <motion.div 
                initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} 
                className="overflow-hidden"
            >
              <div className="p-4 space-y-6">
                {data.experience.map((exp, i) => (
                    <div key={exp.id} className="relative pl-4 border-l border-white/10">
                        <button onClick={() => removeExperience(exp.id)} className="absolute -left-2.5 top-0 bg-zinc-900 p-1 rounded-full text-red-400 hover:text-red-300 border border-white/10">
                            <Trash2 size={12} />
                        </button>
                        <div className="grid grid-cols-2 gap-3 mb-3">
                            <Input label="Company" value={exp.company} onChange={v => updateExperience(exp.id, 'company', v)} />
                            <Input label="Role" value={exp.role} onChange={v => updateExperience(exp.id, 'role', v)} />
                        </div>
                        <div className="grid grid-cols-2 gap-3 mb-3">
                            <Input label="Start" value={exp.startDate} onChange={v => updateExperience(exp.id, 'startDate', v)} />
                            <Input label="End" value={exp.endDate} onChange={v => updateExperience(exp.id, 'endDate', v)} />
                        </div>
                        <div className="space-y-1">
                            <div className="flex justify-between items-end">
                                <label className="text-xs text-zinc-500 font-medium ml-1">Description</label>
                                <button 
                                    onClick={() => handlePolish(exp.id, exp.description, 'bullet', (v) => updateExperience(exp.id, 'description', v))}
                                    disabled={!!polishing}
                                    className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition-colors"
                                >
                                    {polishing === exp.id ? <Loader2 size={12} className="animate-spin" /> : <Wand2 size={12} />}
                                    Polish
                                </button>
                            </div>
                            <textarea 
                                className="w-full bg-black/20 border border-white/10 rounded-lg p-2 text-sm text-zinc-300 focus:outline-none focus:ring-1 focus:ring-indigo-500 min-h-[80px]"
                                value={exp.description}
                                onChange={e => updateExperience(exp.id, 'description', e.target.value)}
                            />
                        </div>
                    </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Skills */}
      <div className="mb-4 rounded-xl border border-white/10 overflow-hidden bg-zinc-900/30">
        <SectionHeader title="Skills" isOpen={openSections['skills']} toggle={() => toggle('skills')} />
        <AnimatePresence>
          {openSections['skills'] && (
            <motion.div 
                initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} 
                className="overflow-hidden"
            >
              <div className="p-4">
                 <textarea 
                    className="w-full bg-black/20 border border-white/10 rounded-lg p-2 text-sm text-zinc-300 focus:outline-none focus:ring-1 focus:ring-indigo-500 min-h-[80px]"
                    value={data.skills.join(', ')}
                    onChange={e => onChange({...data, skills: e.target.value.split(',').map(s => s.trim())})}
                    placeholder="React, TypeScript, Node.js..."
                />
                <p className="text-xs text-zinc-500 mt-2">Separate skills with commas.</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
};

const Input = ({ label, value, onChange }: { label: string, value: string, onChange: (v: string) => void }) => (
    <div className="space-y-1">
        <label className="text-xs text-zinc-500 font-medium ml-1">{label}</label>
        <input 
            type="text" 
            value={value} 
            onChange={e => onChange(e.target.value)}
            className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-zinc-300 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
    </div>
);