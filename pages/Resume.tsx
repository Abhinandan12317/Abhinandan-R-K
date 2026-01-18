import React from 'react';
import { Download } from 'lucide-react';
import { PERSONAL_DETAILS } from '../constants';

const Resume = () => {
  return (
    <div className="max-w-3xl h-full flex flex-col animate-fade-in">
      {/* Page Header */}
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

      {/* Resume Sheet */}
      <div className="relative border border-border bg-white shadow-sm flex-grow overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-[60%_40%] h-full">

          {/* ================= LEFT COLUMN ================= */}
          <div className="p-8 md:p-12 space-y-8">

            {/* Identity */}
            <header className="border-b border-black/10 pb-6">
              <h2 className="text-3xl font-serif text-black mb-1">
                {PERSONAL_DETAILS.name}
              </h2>
              <p className="text-subtle">
                DevOps & GenAI Engineer | Full-Stack Systems Builder
              </p>
              <p className="text-xs text-subtle mt-2 font-mono">
                Mysuru, India • ark45072@gmail.com
              </p>
              <p className="text-xs text-subtle mt-1 font-mono">
                +91 9482053968 • GitHub: Abhinandan12317
              </p>
            </header>

            {/* Profile */}
            <section>
              <h3 className="font-bold uppercase tracking-wider text-xs mb-4">
                Profile
              </h3>
              <p className="text-subtle leading-relaxed">
                Engineer focused on building reliable, automation-first systems
                at the intersection of DevOps, GenAI, and product infrastructure.
                Experienced in translating complex real-world domains into
                deployable systems with clear architectural trade-offs.
              </p>
            </section>

            {/* Experience & Projects */}
            <section>
              <h3 className="font-bold uppercase tracking-wider text-xs mb-4">
                Experience & Projects
              </h3>

              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="font-semibold">
                      NiyoGenAI — AI Recruitment Platform
                    </span>
                    <span className="text-subtle font-mono text-xs">2025</span>
                  </div>
                  <ul className="list-disc list-inside text-subtle marker:text-gray-300">
                    <li>
                      Designed ATS-friendly resume parsing and semantic
                      compatibility scoring using LLMs.
                    </li>
                    <li>
                      Focused on explainability and production readiness.
                    </li>
                  </ul>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="font-semibold">
                      VidhiPath AI — Legal Intelligence System
                    </span>
                    <span className="text-subtle font-mono text-xs">2025</span>
                  </div>
                  <ul className="list-disc list-inside text-subtle marker:text-gray-300">
                    <li>
                      Built a legal AI companion for case analysis and verdict
                      prediction (78% accuracy).
                    </li>
                  </ul>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="font-semibold">
                      OpsLensAI — AI Log Analysis Platform
                    </span>
                    <span className="text-subtle font-mono text-xs">2025</span>
                  </div>
                  <ul className="list-disc list-inside text-subtle marker:text-gray-300">
                    <li>
                      Developed a GenAI-powered observability tool for parsing
                      logs and surfacing insights.
                    </li>
                  </ul>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="font-semibold">
                      Execution Ledger — Productivity System
                    </span>
                    <span className="text-subtle font-mono text-xs">2024</span>
                  </div>
                  <ul className="list-disc list-inside text-subtle marker:text-gray-300">
                    <li>
                      Designed a notebook-style task system with visual progress
                      tracking.
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Education */}
            <section>
              <h3 className="font-bold uppercase tracking-wider text-xs mb-4">
                Education
              </h3>
              <div className="flex justify-between">
                <div>
                  <p className="font-semibold">B.E in Computer Science</p>
                  <p className="text-subtle">
                    ATME College of Engineering, Mysuru
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-subtle font-mono text-xs">
                    2023 – Present
                  </p>
                  <p className="text-xs font-medium">CGPA: 8.53</p>
                </div>
              </div>
            </section>
          </div>

          {/* ================= RIGHT COLUMN ================= */}
          <aside className="p-8 md:p-12 space-y-8 border-l border-black/10">

            {/* Technical Skills */}
            <section>
              <h3 className="font-bold uppercase tracking-wider text-xs mb-4">
                Technical Skills
              </h3>

              <div className="space-y-4 text-sm">
                <div>
                  <p className="font-semibold">Languages</p>
                  <p className="text-subtle">Python, JavaScript, C</p>
                </div>

                <div>
                  <p className="font-semibold">Web & Backend</p>
                  <p className="text-subtle">React, Flask, REST APIs</p>
                </div>

                <div>
                  <p className="font-semibold">DevOps & Automation</p>
                  <p className="text-subtle">Docker, Git, CI/CD, n8n</p>
                </div>

                <div>
                  <p className="font-semibold">GenAI & ML</p>
                  <p className="text-subtle">
                    OpenAI API, Gemini API, NLP, Prompt Engineering
                  </p>
                </div>
              </div>
            </section>

            {/* Leadership & Roles */}
            <section>
              <h3 className="font-bold uppercase tracking-wider text-xs mb-4">
                Leadership & Roles
              </h3>

              <p className="font-semibold">Secretary — IEEE Student Branch</p>
              <p className="text-subtle">
                ATME College of Engineering • 2024–2025
              </p>

              <p className="font-semibold mt-3">Student Intern</p>
              <p className="text-subtle">
                IEEE Computer Society, Bangalore Chapter • 2025
              </p>

              <p className="font-semibold mt-3">Volunteer</p>
              <p className="text-subtle">
                IEEE Hackathons & Symposiums • 2024–2025
              </p>
            </section>

            {/* Research & Publication */}
            <section>
              <h3 className="font-bold uppercase tracking-wider text-xs mb-4">
                Research & Publication
              </h3>
              <p className="font-semibold">
                Automated File Classification Using WhatsApp Bot
              </p>
              <p className="text-subtle">
                Journal Publication • Dec 2025
              </p>
            </section>

            {/* Recognition & Activities */}
            <section>
              <h3 className="font-bold uppercase tracking-wider text-xs mb-4">
                Recognition & Activities
              </h3>
              <p className="text-subtle text-sm leading-relaxed">
                NPTEL Elite + Silver — Joy of Computing Using Python<br />
                DevFest Bengaluru 2025<br />
                Bengaluru Tech Summit 2025<br />
                IEEE Region 10 Student Summit<br />
                Techno Ayurveda ’25
              </p>
            </section>
          </aside>
        </div>

        {/* ================= FADE FROM 50% ================= */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2
          bg-gradient-to-t from-white via-white/90 to-transparent
          flex items-end justify-center pb-6"
        >
          <a
            href={PERSONAL_DETAILS.resumePdf}
            download
            className="pointer-events-auto bg-ink text-white px-6 py-2 text-sm hover:bg-subtle transition-colors"
          >
            Get Full Resume
          </a>
        </div>
      </div>
    </div>
  );
};

export default Resume;
