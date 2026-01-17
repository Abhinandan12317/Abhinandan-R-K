import React from 'react';
import { Download } from 'lucide-react';
import { PERSONAL_DETAILS } from '../constants';

const Resume = () => {
  return (
    <div className="max-w-3xl h-full flex flex-col animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-serif text-ink">Resume</h1>
        <a 
          href={PERSONAL_DETAILS.resumePdf}
          download
          className="flex items-center gap-2 text-sm text-ink border border-border px-4 py-2 hover:bg-black/5 transition-colors"
        >
          <Download size={14} />
          <span>Download PDF</span>
        </a>
      </div>

      <div className="relative border border-border bg-white p-8 md:p-12 shadow-sm flex-grow overflow-hidden">
        <div className="space-y-8 text-sm md:text-base text-ink font-sans">
          
          <header className="border-b border-black/10 pb-6 flex justify-between items-start">
            <div>
              <h2 className="text-3xl font-serif text-black mb-1">{PERSONAL_DETAILS.name}</h2>
              <p className="text-subtle">AI Engineer | Full-Stack Developer | DevOps Enthusiast</p>
              <p className="text-xs text-subtle mt-2 font-mono">Kuvempunagar, Mysuru • ark45072@gmail.com • +91 9482053968</p>
              <p className="text-xs text-subtle mt-1 font-mono">LinkedIn: abhinandanrk</p>
            </div>
          </header>

          <section>
            <h3 className="font-bold text-black uppercase tracking-wider text-xs mb-4">Summary</h3>
            <p className="text-subtle text-sm leading-relaxed">
              Full-Stack Developer and AI Engineer transitioning into DevOps (2026 Ambitious Role). 
              Passionate about public speaking, documentation, and building "boring" reliable systems. 
              Experienced in Python, React, and GenAI integrations. Proven track record of deploying applications 
              and sharing knowledge through journals and live technical demos.
            </p>
          </section>

          <section>
            <h3 className="font-bold text-black uppercase tracking-wider text-xs mb-4">Technical Skills</h3>
             <div className="grid grid-cols-1 gap-y-2 text-sm text-subtle">
                <p><strong className="text-ink">Languages:</strong> Python, C, JavaScript</p>
                <p><strong className="text-ink">DevOps & Tools:</strong> Docker, Git, CI/CD, N8N, Gemini-CLI</p>
                <p><strong className="text-ink">Web Development:</strong> React, Flask, REST APIs, HTML/CSS</p>
                <p><strong className="text-ink">AI/ML:</strong> OpenAI API, Gemini API, TensorFlow, NLP</p>
                <p><strong className="text-ink">Core Concepts:</strong> OOP, DSA, System Design</p>
             </div>
          </section>

          <section>
            <h3 className="font-bold text-black uppercase tracking-wider text-xs mb-4">Professional Experience & Projects</h3>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-bold">OpsLensAI & Execution Ledger (Live Deployments)</span>
                  <span className="text-subtle font-mono text-xs">2025</span>
                </div>
                <ul className="list-disc list-inside text-subtle text-sm leading-relaxed marker:text-gray-300">
                  <li>Deployed <span className="font-bold">OpsLensAI</span>: A GenAI-powered log analysis tool reducing MTTR for developers.</li>
                  <li>Deployed <span className="font-bold">Execution Ledger</span>: A gamified productivity app with strict discipline mechanics.</li>
                </ul>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-bold">Legal AI Companion – Verdict Prediction System</span>
                  <span className="text-subtle font-mono text-xs">Feb 2025 – Present</span>
                </div>
                <ul className="list-disc list-inside text-subtle text-sm leading-relaxed marker:text-gray-300">
                  <li>Engineered a legal AI tool leveraging Gemini API to predict court verdicts with 78% accuracy.</li>
                  <li>Implemented API-driven inference and index-based data management.</li>
                </ul>
              </div>
               <div>
                <div className="flex justify-between mb-1">
                  <span className="font-bold">AI Resume Compatibility Analyzer</span>
                  <span className="text-subtle font-mono text-xs">Mar 2025</span>
                </div>
                <p className="text-xs text-accent mb-1 font-medium">Hackathon Finalist Project</p>
                <ul className="list-disc list-inside text-subtle text-sm leading-relaxed marker:text-gray-300">
                  <li>Processed over 10,000 resumes reducing screening time by 40% using NLP-based ranking.</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h3 className="font-bold text-black uppercase tracking-wider text-xs mb-4">Education</h3>
             <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-bold block text-sm">B.E IN CSE</span>
                    <span className="text-subtle text-sm">ATME College of Engineering, Mysuru</span>
                  </div>
                  <div className="text-right">
                    <span className="text-subtle font-mono text-xs block">2023 – Present</span>
                    <span className="text-ink text-xs font-medium">CGPA: 8.53</span>
                  </div>
                </div>
              </div>
          </section>

          <section>
            <h3 className="font-bold text-black uppercase tracking-wider text-xs mb-4">Achievements & Leadership</h3>
             <ul className="list-disc list-inside text-subtle text-sm leading-relaxed marker:text-gray-300">
               <li><span className="font-bold">Publication (2025)</span>: Published journal on "Automated file classification and notes sharing using Whatsapp Bot" (N8N Project).</li>
               <li><span className="font-bold">Speaker (2025)</span>: Delivered a live technical demo on <span className="font-bold">Gemini-CLI</span> at a tech event.</li>
               <li><span className="font-bold">Hackathon Finalist</span>: Code-Battle 2k25 Participant & Resume Analyzer Project.</li>
               <li><span className="font-bold">IEEE Student Branch Secretary</span>: Organized tech workshops and events (2023-Present).</li>
             </ul>
          </section>
        </div>

        {/* Fade Out Effect */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white via-white/90 to-transparent flex items-end justify-center pb-8">
           <div className="text-center">
             <a 
               href={PERSONAL_DETAILS.resumePdf}
               download
               className="bg-ink text-white px-6 py-2 text-sm hover:bg-subtle transition-colors"
             >
               Get Full Resume
             </a>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Resume;