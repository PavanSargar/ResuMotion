import { ResumeData } from '../../types';

interface Props {
  data: ResumeData;
}

export function ExecutiveSuite({ data }: Props) {
  return (
    <div className="w-full h-full bg-white text-gray-800 min-h-[1056px]">
      {/* Header Banner */}
      <div className="bg-emerald-900 text-white p-10">
        <h1 className="text-4xl font-serif font-bold mb-2 tracking-wide">
          {data.personalInfo.fullName}
        </h1>
        <p className="text-emerald-200 text-lg tracking-widest uppercase font-light mb-6">
          {data.personalInfo.role}
        </p>

        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-emerald-100 opacity-80 font-light">
          <span>{data.personalInfo.email}</span>
          <span>•</span>
          <span>{data.personalInfo.phone}</span>
          <span>•</span>
          <span>{data.personalInfo.location}</span>
          <span>•</span>
          <span>{data.personalInfo.linkedin}</span>
        </div>
      </div>

      <div className="p-10 grid grid-cols-3 gap-10">
        {/* Main Column */}
        <div className="col-span-2 flex flex-col gap-8">
          <section>
            <h3 className="text-emerald-900 font-bold uppercase tracking-widest text-sm border-b-2 border-emerald-900 pb-2 mb-4">
              Executive Summary
            </h3>
            <p className="text-sm leading-7 text-gray-600 text-justify">
              {data.personalInfo.summary}
            </p>
          </section>

          <section>
            <h3 className="text-emerald-900 font-bold uppercase tracking-widest text-sm border-b-2 border-emerald-900 pb-2 mb-4">
              Professional Experience
            </h3>
            <div className="flex flex-col gap-8">
              {data.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="font-bold text-gray-900 text-lg">{exp.company}</h4>
                    <span className="text-sm font-medium text-emerald-700">
                      {exp.startDate} - {exp.endDate}
                    </span>
                  </div>
                  <div className="text-base font-serif italic text-gray-600 mb-3">{exp.role}</div>
                  <div className="text-sm leading-6 text-gray-600 whitespace-pre-wrap">
                    {exp.description}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar Column */}
        <div className="col-span-1 flex flex-col gap-8">
          <section>
            <h3 className="text-emerald-900 font-bold uppercase tracking-widest text-sm border-b-2 border-emerald-900 pb-2 mb-4">
              Core Competencies
            </h3>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill) => (
                <span
                  key={skill}
                  className="bg-emerald-50 text-emerald-900 px-3 py-1.5 rounded-full text-xs font-semibold"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-emerald-900 font-bold uppercase tracking-widest text-sm border-b-2 border-emerald-900 pb-2 mb-4">
              Education
            </h3>
            <div className="flex flex-col gap-4">
              {data.education.map((edu) => (
                <div key={edu.id}>
                  <div className="font-bold text-gray-900">{edu.school}</div>
                  <div className="text-sm text-gray-600 italic">{edu.degree}</div>
                  <div className="text-xs text-gray-400 mt-1">
                    {edu.startDate} - {edu.endDate}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-emerald-900 font-bold uppercase tracking-widest text-sm border-b-2 border-emerald-900 pb-2 mb-4">
              Projects
            </h3>
            <div className="flex flex-col gap-4">
              {data.projects.map((proj) => (
                <div key={proj.id}>
                  <div className="font-bold text-gray-900 text-sm">{proj.name}</div>
                  <p className="text-xs text-gray-600 mt-1">{proj.description}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
