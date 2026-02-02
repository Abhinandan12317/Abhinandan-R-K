
import { Project, ProjectSectionType, DocEntry, ActivityItem } from './types';

export const PERSONAL_DETAILS = {
  name: 'Abhinandan',
  profilePicture: '/profile.jpg', // Place this file in your public/ folder
  resumePdf: '/ARK_Resume.pdf',   // Place this file in your public/ folder
};

export const NAVIGATION_ITEMS = [
  { label: 'Overview', path: '/' },
  {
    label: 'Documentation',
    path: '/documentation',
    isFolder: true,
    children: [
      { label: 'Principles', path: '/documentation/principles' },
      { label: 'Systems', path: '/documentation/systems' },
      { label: 'Decisions', path: '/documentation/decisions' },
      { label: 'Evolution', path: '/documentation/evolution' },
    ]
  },
  {
    label: 'Projects',
    path: '/projects',
    isFolder: true,
    children: [
      { label: 'NiyoGenAI', path: '/projects/niyogenai' },
      { label: 'VidhiPath.ai', path: '/projects/vidhipath-ai' },
      { label: 'Execution Ledger', path: '/projects/execution-ledger' },
      { label: 'OpsLensAI', path: '/projects/opslensai' },
    ]
  },
  { label: 'Code Graph', path: '/code-graph' },
  { label: 'Activity', path: '/activity' },
  { label: 'Resume', path: '/resume' },
  { label: 'Contact', path: '/contact' },
];

export const ACTIVITIES: ActivityItem[] = [
  {
    id: '15',
    title: 'DevFest Bengaluru 2025',
    category: 'Community',
    date: 'DEC 2025',
    summary: 'Attended DevFest Bengaluru 2025, a premier Google Developer Groups tech conference focused on scalable solutions, AI, cloud, and developer tools, enabling community engagement and exposure to industry practices.'
  },
  {
    id: '14',
    title: 'Publication – Automated File Classification via WhatsApp Bot',
    category: 'Recognition',
    date: 'DEC 2025',
    summary: 'Published a research journal on an automated file classification system using a WhatsApp bot, demonstrating applied research and real-world automation problem solving.'
  },
  {
    id: '13',
    title: 'Gemini-CLI Demo – Student Workshop',
    category: 'Technical',
    date: 'DEC 2025',
    summary: 'Conducted a hands-on demo of Gemini-CLI for students at ATME College of Engineering, explaining its usage, workflows, and practical tips.'
  },
  {
    id: '12',
    title: 'Bengaluru Tech Summit 2025',
    category: 'Community',
    date: 'NOV 2025',
    summary: 'Participated in Bengaluru Tech Summit 2025 — Asia’s largest tech and innovation summit — gaining insights into emerging technologies and connecting with pioneers in AI and industry.'
  },
  {
    id: '11',
    title: 'Techno Ayurveda ’25',
    category: 'Community',
    date: 'NOV 2025',
    summary: 'Attended Techno Ayurveda ’25, exploring the intersection of technology and traditional health sciences, highlighting interdisciplinary curiosity.'
  },
  {
    id: '10',
    title: 'IEEE Mini Project Symposium – Volunteer',
    category: 'Leadership',
    date: 'OCT 2025',
    summary: 'Volunteered at an IEEE mini project symposium, coordinating logistics and supporting student project showcases to facilitate community engagement.'
  },
  {
    id: '9',
    title: 'TechAvishkar 2.0 – Hackathon Volunteer',
    category: 'Leadership',
    date: 'MAR 2025',
    summary: 'Contributed to the on-ground execution of a 24-hour inter-collegiate hackathon, coordinating logistics, participants, and timelines under IEEE collaboration.'
  },
  {
    id: '8',
    title: 'IEEE Student Intern – Computer Society Bangalore Chapter',
    category: 'Leadership',
    date: 'MAR 2025',
    summary: 'Selected as a student intern under a structured IEEE mentorship program, contributing consistently over a six-month duration.'
  },
  {
    id: '7',
    title: 'IAMPRO’25 Internship Completion',
    category: 'Leadership',
    date: 'FEB 2025',
    summary: 'Completed a long-term mentorship-driven internship focused on professional development, consistency, and community contribution.'
  },
  {
    id: '6',
    title: 'Engineering Through the Eyes of a Disengaged Learner',
    category: 'Speaking',
    date: 'FEB 2025',
    summary: 'Delivered a reflective session examining engineering education from a learner’s perspective, focusing on disengagement, systems, and reform.'
  },
  {
    id: '5',
    title: 'Legal Verdict Prediction Model – Output Layer Improvement',
    category: 'Technical',
    date: 'FEB 2025',
    summary: 'Improved the output reasoning layer of a fine-tuned legal AI model, increasing reliability and prediction confidence in real-world case analysis.'
  },
  {
    id: '4',
    title: 'Secretary – IEEE Student Branch, ATME',
    category: 'Leadership',
    date: 'JAN 2025',
    summary: 'Appointed as Secretary of the IEEE Student Branch, handling coordination, documentation, and institutional communication.'
  },
  {
    id: '3',
    title: 'IEEE Region 10 Student Summit',
    category: 'Service',
    date: 'DEC 2024',
    summary: 'Participated in a regional IEEE student summit, engaging with peers, professionals, and cross-institutional technical discussions.'
  },
  {
    id: '2',
    title: 'Computer Awareness Outreach',
    category: 'Service',
    date: 'NOV 2024',
    summary: 'Contributed to IEEE-led digital literacy outreach programs aimed at improving computer awareness among government school students.'
  },
  {
    id: '1',
    title: 'NPTEL Silver Medal – Joy of Computing Using Python',
    category: 'Recognition',
    date: 'OCT 2024',
    summary: 'Earned Elite + Silver certification in a national-level NPTEL course, demonstrating strong fundamentals and academic discipline.'
  }
];

export const PROJECTS: Project[] = [
  {
    id: '1',
    slug: 'niyogenai',
    title: 'NiyoGenAI',
    tagline: 'ATS-friendly resume parser and analyzer powered by OpenAI.',
    tags: ['Python', 'Flask', 'OpenAI API', 'NLP'],
    sections: [
      {
        title: ProjectSectionType.PROBLEM,
        content: 'Job seekers often struggle to know if their resumes are ATS (Applicant Tracking System) friendly. Recruiters need a way to parse unstructured PDF data into structured formats for comparison.'
      },
      {
        title: ProjectSectionType.CONTEXT,
        content: 'The goal was to create a web application that takes a PDF resume and a job description, then extracts key entities (Name, Email, Skills) and ranks the candidate.'
      },
      {
        title: ProjectSectionType.ARCHITECTURE,
        content: 'Built with **Flask** (Python) serving as the backend.\n\n- **Parsing**: Uses `pdfminer.six` and `pyresparser` to extract raw text and metadata.\n- **Intelligence**: Integrated **OpenAI API** to semantically analyze soft skills and technical compatibility.\n- **Output**: Returns structured JSON data for easy integration with frontend displays.'
      },
      {
        title: ProjectSectionType.DECISIONS,
        content: 'Chose to use OpenAI API over local LLMs for initial prototype speed and superior reasoning capabilities on unstructured text. Implemented caching to reduce API costs during development.'
      },
      {
        title: ProjectSectionType.OUTCOME,
        content: 'Successfully parsed complex multi-column resumes with 95% accuracy in extraction tasks. The semantic matching score provided recruiters with a quick way to filter candidates.'
      },
      {
        title: ProjectSectionType.LINKS,
        content: '[GitHub Repo](https://github.com/Abhinandan12317/NiyoGenAI)'
      }
    ]
  },
  {
    id: '2',
    slug: 'vidhipath-ai',
    title: 'VidhiPath.ai',
    tagline: 'AI-driven legal verdict prediction and analysis.',
    tags: ['GenAI', 'Python', 'LegalTech'],
    sections: [
      {
        title: ProjectSectionType.PROBLEM,
        content: 'Legal research is time-consuming and often requires manual scanning of thousands of case files to find precedents.'
      },
      {
        title: ProjectSectionType.ARCHITECTURE,
        content: 'Utilizes Gemini API for processing large legal documents. Implements RAG (Retrieval Augmented Generation) to ground model outputs in actual case law.'
      },
      {
        title: ProjectSectionType.LINKS,
        content: '[GitHub Repo](https://github.com/Abhinandan12317/VidhiPath.ai)'
      }
    ]
  },
  {
    id: '3',
    slug: 'execution-ledger',
    title: 'Execution Ledger',
    tagline: 'Gamified productivity with strict accountability.',
    tags: ['React', 'Firebase', 'Gamification'],
    sections: [
      {
        title: ProjectSectionType.PROBLEM,
        content: 'Personal productivity tools often lack the "teeth" to ensure tasks are actually completed.'
      },
      {
        title: ProjectSectionType.LINKS,
        content: '[Live Demo](https://excecution-ledger.vercel.app/) [GitHub Repo](https://github.com/Abhinandan12317/ExecutionLedger)'
      }
    ]
  },
  {
    id: '4',
    slug: 'opslensai',
    title: 'OpsLensAI',
    tagline: 'Intelligent log analysis and operational insights.',
    tags: ['DevOps', 'AI', 'Observability'],
    sections: [
      {
        title: ProjectSectionType.PROBLEM,
        content: 'Identifying root causes from raw logs during an incident is stressful and error-prone.'
      },
      {
        title: ProjectSectionType.LINKS,
        content: '[Live Demo](https://ops-lens-ai.vercel.app/) [GitHub Repo](https://github.com/Abhinandan12317/OpsLensAI)'
      }
    ]
  }
];

export const DOC_SECTIONS: Record<string, DocEntry> = {
  principles: {
    id: 'principles',
    title: 'Engineering Principles',
    date: 'JAN 2025',
    content: `# Core Principles\n\n1. **Simplicity over Complexity**: We prefer boring, reliable solutions over fancy, fragile ones.\n2. **Documentation is Code**: If it isn't documented, it doesn't exist.\n3. **Bias for Action**: Shipping is the heartbeat of engineering.`,
    context: 'The foundational values that guide all technical decisions.'
  },
  systems: {
    id: 'systems',
    title: 'System Architecture',
    date: 'FEB 2025',
    content: `# Architecture Overview\n\nOur systems follow a modular monolith approach, transitioning to microservices only when domain boundaries are strictly defined.\n\n### Tech Stack\n- **Frontend**: React, Tailwind CSS\n- **Backend**: Python (Flask), Node.js\n- **Database**: PostgreSQL, Firebase`,
    context: 'High-level view of the technical landscape.'
  },
  decisions: {
    id: 'decisions',
    title: 'Decision Log',
    date: 'MAR 2025',
    content: `# Key Decisions\n\n## 001. Adopting Gemini API\n**Context**: Needed a multimodal model with large context window.\n**Decision**: Migrated from OpenAI to Gemini 1.5 Pro.\n**Consequence**: Lower costs and better handling of large PDF inputs.`,
    context: 'Chronological record of architectural decisions (ADRs).'
  },
  evolution: {
    id: 'evolution',
    title: 'System Evolution',
    date: 'APR 2025',
    content: `# Roadmap\n\n- **Q2 2025**: Deep integration of AI Agents for automated DevOps.\n- **Q3 2025**: Open-sourcing the core utility libraries.\n- **Q4 2025**: Enterprise readiness and security auditing.`,
    context: 'Future trajectory and past milestones.'
  }
};
