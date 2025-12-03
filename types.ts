export interface ResumeData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    linkedin: string;
    github: string;
    portfolio: string;
    summary: string;
    role: string;
    location: string;
  };
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: string[];
  projects: ProjectItem[];
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface EducationItem {
  id: string;
  school: string;
  degree: string;
  startDate: string;
  endDate: string;
}

export interface ProjectItem {
  id: string;
  name: string;
  description: string;
  technologies: string;
  link?: string;
}

export enum TemplateType {
  MODERN_TECH = 'Modern Tech',
  MINIMALIST_ATS = 'Minimalist ATS',
  EXECUTIVE_SUITE = 'Executive Suite',
}

export const INITIAL_DATA: ResumeData = {
  personalInfo: {
    fullName: "Alex Chen",
    role: "Senior Full Stack Engineer",
    email: "alex.chen@example.com",
    phone: "(555) 123-4567",
    linkedin: "linkedin.com/in/alexchen",
    github: "github.com/alexchen",
    portfolio: "alexchen.dev",
    location: "San Francisco, CA",
    summary: "Product-minded software engineer with 6+ years of experience in building scalable web applications. Expert in React, TypeScript, and Cloud Architecture. Passionate about developer tooling and performance optimization.",
  },
  experience: [
    {
      id: '1',
      company: "TechFlow Systems",
      role: "Senior Frontend Engineer",
      startDate: "2022-01",
      endDate: "Present",
      current: true,
      description: "• Led the migration of a legacy monolithic frontend to a micro-frontend architecture using React and Module Federation, reducing build times by 40%.\n• Mentored 3 junior developers and established code review guidelines that improved code quality metrics by 25%.\n• Implemented a design system using Tailwind CSS that standardized UI components across 5 different products.",
    },
    {
      id: '2',
      company: "DataSphere Inc",
      role: "Software Engineer",
      startDate: "2019-06",
      endDate: "2021-12",
      current: false,
      description: "• Developed and maintained high-performance data visualization dashboards using D3.js and React, handling real-time data streams of 10k+ events/sec.\n• Optimized application performance, improving First Contentful Paint (FCP) from 1.8s to 0.9s.\n• Collaborated with product managers to define technical requirements for new features.",
    }
  ],
  education: [
    {
      id: '1',
      school: "University of California, Berkeley",
      degree: "B.S. Computer Science",
      startDate: "2015-08",
      endDate: "2019-05",
    }
  ],
  skills: [
    "JavaScript/TypeScript", "React", "Node.js", "Next.js", "GraphQL", 
    "AWS", "Docker", "Kubernetes", "PostgreSQL", "System Design"
  ],
  projects: [
    {
      id: '1',
      name: "OpenSource UI Lib",
      description: "A lightweight, accessible UI component library for React.",
      technologies: "React, TypeScript, Rollup, Storybook"
    }
  ]
};