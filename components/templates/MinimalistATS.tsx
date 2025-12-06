import { ResumeData } from '../../types';

interface Props {
  data: ResumeData;
}

export function MinimalistATS({ data }: Props) {
  return (
    <div className="w-full h-full bg-white text-black p-10 min-h-[1056px] font-serif">
      {/* Header */}
      <div className="text-center border-b-2 border-black pb-6 mb-6">
        <h1 className="text-3xl font-bold uppercase tracking-wider mb-2">
          {data.personalInfo.fullName}
        </h1>
        <p className="text-sm mb-2">
          {data.personalInfo.location} | {data.personalInfo.phone} | {data.personalInfo.email}
        </p>
        <div className="text-sm">
          <a
            href={`https://${data.personalInfo.linkedin}`}
            className="underline mr-3 text-blue-800"
          >
            {data.personalInfo.linkedin}
          </a>
          <a href={`https://${data.personalInfo.github}`} className="underline mr-3 text-blue-800">
            {data.personalInfo.github}
          </a>
        </div>
      </div>

      {/* Summary */}
      <div className="mb-6">
        <h2 className="font-bold text-lg uppercase border-b border-gray-300 mb-3 pb-1">
          Professional Summary
        </h2>
        <p className="text-sm leading-relaxed text-justify">{data.personalInfo.summary}</p>
      </div>

      {/* Skills */}
      <div className="mb-6">
        <h2 className="font-bold text-lg uppercase border-b border-gray-300 mb-3 pb-1">
          Technical Skills
        </h2>
        <p className="text-sm leading-relaxed">
          <strong>Languages & Tools:</strong> {data.skills.join(', ')}
        </p>
      </div>

      {/* Experience */}
      <div className="mb-6">
        <h2 className="font-bold text-lg uppercase border-b border-gray-300 mb-4 pb-1">
          Work Experience
        </h2>
        <div className="flex flex-col gap-5">
          {data.experience.map((exp) => (
            <div key={exp.id}>
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="font-bold text-base">{exp.company}</h3>
                <span className="text-sm italic">
                  {exp.startDate} – {exp.endDate}
                </span>
              </div>
              <div className="text-sm font-semibold mb-2">{exp.role}</div>
              <p className="text-sm leading-relaxed whitespace-pre-wrap pl-2 border-l-2 border-gray-100">
                {exp.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Projects */}
      <div className="mb-6">
        <h2 className="font-bold text-lg uppercase border-b border-gray-300 mb-4 pb-1">Projects</h2>
        <div className="flex flex-col gap-4">
          {data.projects.map((proj) => (
            <div key={proj.id}>
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="font-bold text-base">{proj.name}</h3>
              </div>
              <p className="text-sm mb-1">{proj.description}</p>
              <p className="text-xs italic text-gray-600">Tech Stack: {proj.technologies}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Education */}
      <div>
        <h2 className="font-bold text-lg uppercase border-b border-gray-300 mb-4 pb-1">Education</h2>
        {data.education.map((edu) => (
          <div key={edu.id} className="flex justify-between">
            <div>
              <div className="font-bold text-base">{edu.school}</div>
              <div className="text-sm">{edu.degree}</div>
            </div>
            <div className="text-sm">
              {edu.startDate} – {edu.endDate}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
