import React from 'react';
import { ResumeData } from '../../types';
import { Mail, Phone, MapPin, Linkedin, Github, Globe } from 'lucide-react';

interface Props {
  data: ResumeData;
}

export const ModernTech: React.FC<Props> = ({ data }) => {
  return (
    <div className="w-full h-full bg-white text-slate-800 p-8 grid grid-cols-12 gap-8 min-h-[1056px]">
      {/* Left Column - 4 cols */}
      <div className="col-span-4 flex flex-col gap-6 border-r border-slate-200 pr-6">
        <div className="flex flex-col gap-1">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 leading-tight uppercase font-grotesk">{data.personalInfo.fullName}</h1>
            <p className="text-indigo-600 font-semibold text-sm uppercase tracking-wider">{data.personalInfo.role}</p>
        </div>

        <div className="flex flex-col gap-3 text-xs text-slate-600 mt-4">
          <div className="flex items-center gap-2">
            <Mail size={14} className="text-slate-400" />
            <span>{data.personalInfo.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone size={14} className="text-slate-400" />
            <span>{data.personalInfo.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={14} className="text-slate-400" />
            <span>{data.personalInfo.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Linkedin size={14} className="text-slate-400" />
            <span>{data.personalInfo.linkedin}</span>
          </div>
          <div className="flex items-center gap-2">
            <Github size={14} className="text-slate-400" />
            <span>{data.personalInfo.github}</span>
          </div>
          <div className="flex items-center gap-2">
            <Globe size={14} className="text-slate-400" />
            <span>{data.personalInfo.portfolio}</span>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3 border-b border-slate-100 pb-1">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, i) => (
              <span key={i} className="bg-slate-100 text-slate-700 px-2 py-1 rounded text-[10px] font-medium border border-slate-200">
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3 border-b border-slate-100 pb-1">Education</h3>
          <div className="flex flex-col gap-4">
            {data.education.map((edu) => (
              <div key={edu.id}>
                <div className="font-bold text-sm text-slate-800">{edu.school}</div>
                <div className="text-xs text-slate-600">{edu.degree}</div>
                <div className="text-[10px] text-slate-400 mt-0.5">{edu.startDate} - {edu.endDate}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column - 8 cols */}
      <div className="col-span-8 flex flex-col gap-6 pl-2">
        <section>
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Profile</h3>
          <p className="text-sm leading-relaxed text-slate-700">
            {data.personalInfo.summary}
          </p>
        </section>

        <section>
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
            Experience
            <span className="flex-1 h-px bg-slate-100"></span>
          </h3>
          <div className="flex flex-col gap-6">
            {data.experience.map((exp) => (
              <div key={exp.id} className="group">
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="font-bold text-slate-900 text-base">{exp.role}</h4>
                  <span className="text-xs font-mono text-slate-500 bg-slate-50 px-2 py-0.5 rounded">{exp.startDate} — {exp.endDate}</span>
                </div>
                <div className="text-sm font-semibold text-indigo-600 mb-2">{exp.company}</div>
                <div className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">
                  {exp.description}
                </div>
              </div>
            ))}
          </div>
        </section>
        
        <section>
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
            Projects
            <span className="flex-1 h-px bg-slate-100"></span>
          </h3>
          <div className="grid grid-cols-1 gap-4">
             {data.projects.map(proj => (
               <div key={proj.id}>
                  <div className="flex justify-between items-baseline">
                    <h4 className="font-bold text-slate-900 text-sm">{proj.name}</h4>
                  </div>
                  <p className="text-xs text-slate-600 mt-1">{proj.description}</p>
                  <p className="text-[10px] text-slate-400 mt-1 font-mono">{proj.technologies}</p>
               </div>
             ))}
          </div>
        </section>
      </div>
    </div>
  );
};