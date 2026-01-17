
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
        content: 'Chose a **YAML-based configuration** for API keys to keep the setup simple for developers cloning the repo. Implemented a direct file upload mechanism instead of cloud storage to reduce latency for the end-user during the parsing phase.'
      },
      {
        title: ProjectSectionType.OUTCOME,
        content: 'A fully functional parser that extracts full name, email, GitHub/LinkedIn links, employment details, and skills. It provides a compatibility score against job descriptions, helping users optimize their applications.'
      },
      {
        title: ProjectSectionType.LINKS,
        content: '[Repository](https://github.com/Abhinandan12317/niyogenai.git)'
      }
    ]
  },
  {
    id: '2',
    slug: 'vidhipath-ai',
    title: 'VidhiPath.ai',
    tagline: 'Legal assistant for Indian law with document analysis and Q&A.',
    tags: ['Gemini API', 'Flask', 'MySQL', 'Supabase'],
    sections: [
      {
        title: ProjectSectionType.PROBLEM,
        content: 'Legal research is dense and time-consuming. Finding relevant Indian law precedents and understanding complex legal documents requires significant manual effort.'
      },
      {
        title: ProjectSectionType.CONTEXT,
        content: 'Developed a system to upload documents and ask questions in natural language. Required secure user authentication and reliable database storage for user history.'
      },
      {
        title: ProjectSectionType.ARCHITECTURE,
        content: '- **Backend**: Flask (Python).\n- **AI Engine**: **Google Gemini API** for handling legal queries and document summarization.\n- **Database**: Dual setup with **MySQL** (local/relational data) and **Supabase** (auth/cloud storage).\n- **Auth**: Implemented secure login/registration with Email OTP for password resets.'
      },
      {
        title: ProjectSectionType.DECISIONS,
        content: 'Used **Gemini API** for its large context window, essential for processing lengthy legal PDFs. integrated **Supabase** alongside MySQL to leverage its robust authentication and storage APIs while keeping relational data structured in MySQL.'
      },
      {
        title: ProjectSectionType.OUTCOME,
        content: 'A robust legal assistant capable of document processing and context-aware Q&A. Reduces research time by providing instant answers based on uploaded case files.'
      },
      {
        title: ProjectSectionType.LINKS,
        content: '[Repository](https://github.com/Abhinandan12317/VidhiPath.ai.git)'
      }
    ]
  },
  {
    id: '3',
    slug: 'execution-ledger',
    title: 'Execution Ledger',
    tagline: 'Gamified to-do application for children with strict discipline mechanics.',
    tags: ['React', 'Gamification', 'Analytics', 'UI/UX'],
    sections: [
      {
        title: ProjectSectionType.PROBLEM,
        content: 'Standard to-do apps are boring for children and lack immediate consequences for inaction.'
      },
      {
        title: ProjectSectionType.CONTEXT,
        content: 'Designed an immersive UI specifically for younger audiences. The core mechanic is "Day not updated is a day wasted" - encouraging daily interaction.'
      },
      {
        title: ProjectSectionType.ARCHITECTURE,
        content: 'Frontend-heavy application featuring:\n- **Visual Analytics**: Area charts and graphs to show productivity trends.\n- **Immersive UI**: Custom animations and child-friendly aesthetics.\n- **Logic**: Strict date handling where past dates cannot be altered, enforcing discipline.'
      },
      {
        title: ProjectSectionType.DECISIONS,
        content: 'Removed the ability to edit past days to simulate real-life consequences. Prioritized **visual feedback** (graphs/animations) over text lists to keep engagement high.'
      },
      {
        title: ProjectSectionType.OUTCOME,
        content: 'An engaging task management tool that visualizes progress, making productivity feel like a game rather than a chore.'
      },
      {
        title: ProjectSectionType.LINKS,
        content: '[Repository](https://github.com/Abhinandan12317/ExcecutionLedger.git) \n\n [Live Demo](https://excecution-ledger.vercel.app/)'
      }
    ]
  },
  {
    id: '4',
    slug: 'opslensai',
    title: 'OpsLensAI',
    tagline: 'GenAI-powered log analysis and error resolution tool.',
    tags: ['GenAI', 'DevOps', 'Log Analysis', 'Documentation'],
    sections: [
      {
        title: ProjectSectionType.PROBLEM,
        content: 'Server logs are cryptic. Developers spend hours decoding error messages and searching for solutions manually.'
      },
      {
        title: ProjectSectionType.CONTEXT,
        content: 'Created a tool that not only identifies errors but explains them and suggests fixes using Generative AI.'
      },
      {
        title: ProjectSectionType.ARCHITECTURE,
        content: 'Ingests application logs and passes them through a GenAI model. \n- **Analysis**: Classifies errors and severity.\n- **Visualization**: Area charts to show error frequency over time.\n- **Resolution**: Generates specific solution steps, prevention tips, and links to relevant documentation.'
      },
      {
        title: ProjectSectionType.DECISIONS,
        content: 'Focused on **actionable output**. Instead of just highlighting the error, the system generates a "Solution & Prevention" report, effectively acting as an automated senior engineer.'
      },
      {
        title: ProjectSectionType.OUTCOME,
        content: 'Drastically reduces Mean Time To Resolution (MTTR) by providing instant context and fixes for complex log errors.'
      },
      {
        title: ProjectSectionType.LINKS,
        content: '[Repository](https://github.com/Abhinandan12317/OpsLensAI) \n\n [Live Demo](https://ops-lens-ai.vercel.app/)'
      }
    ]
  }
];

export const DOC_SECTIONS: Record<string, DocEntry> = {
  principles: {
    id: 'principles',
    title: 'Engineering Principles',
    date: '2026-02-15',
    content: `
### 1. Boring is Better

I prefer boring technologies. They fail in predictable ways. Innovation should be spent on the domain problem, not the infrastructure, unless the infrastructure *is* the problem. This "boring" foundation keeps the work exciting because it actually ships.

### 2. Knowledge Redistribution (Teaching)

I am passionate about public speaking and sharing knowledge. I believe that if you cannot explain a concept simply on stage (like I did with **Gemini-CLI**), you do not understand it well enough.

### 3. Documentation as Code

If it isn't documented, it doesn't exist. I love documenting everything. Systems degrade when the mental model of the maintainer diverges from the reality of the code.
    `
  },
  systems: {
    id: 'systems',
    title: 'System Design Philosophy',
    date: '2023-11-12',
    content: `
My approach to system design centers on **observability first**. 

I admit I am not a database wizard—I focus on **application logic** and **user outcomes**. I prefer to work with my laptop, building interfaces and automations, rather than wrestling with physical infrastructure.

I tend to favor:

- **Event-Driven Architectures** for decoupling services.
- **Actionable Logs** (See OpsLensAI).
- **Fail-Fast** mechanisms to prevent cascading failures.
    `
  },
  decisions: {
    id: 'decisions',
    title: 'Decision Framework',
    date: '2024-01-15',
    content: `
### Passion over Trends

I don't run behind trends; I do what I am passionate about. 

I use a simple heuristic: **Type 1 vs. Type 2 Decisions**.

- **Type 1 (Irreversible)**: Take time, write a Request for Comment (RFC), prototype.
- **Type 2 (Reversible)**: Decide fast, execute, iterate.

Documentation of the *Why* is more important than the *What*. Code shows the *What*. The commit message or design doc must explain the *Why*.
    `
  },
  evolution: {
    id: 'evolution',
    title: 'Timeline & Evolution',
    date: '2026-03-01',
    content: `
**2021**

Started with Web Development basics (HTML/CSS).

**2024**

The Year of Deployment. Deployed multiple full-stack websites. Realized that code on a local machine provides zero value to the world.

**2025**

The Year of Expression.

- Participated in **Code-Battle 2k25** Hackathon.
- Published a journal on *"Automated file classification and notes sharing using Whatsapp Bot"* (n8n project).
- Delivered a live demo on **Gemini-CLI** (combining my love for CLI tools and public speaking).
- Launched **Execution Ledger** and **OpsLensAI**.

**2026 (Present)**

The DevOps Era. My most ambitious role yet. Focusing deeply on **DevOps tools**, CI/CD pipelines, and scalability. Moving from building apps to building the systems that run them.
    `
  }
};
