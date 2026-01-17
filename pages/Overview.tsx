
import React from 'react';
import { Link } from 'react-router-dom';
import { PROJECTS, DOC_SECTIONS, PERSONAL_DETAILS } from '../constants';
import { ArrowRight, FileText, Activity, User, Mail } from 'lucide-react';

const Overview = () => {
  // Get recent 2 documentation entries
  const recentDocs = Object.values(DOC_SECTIONS).slice(0, 2);

  return (
    <div className="max-w-4xl mx-auto animate-fade-in pb-20">
      
      {/* Clean Typographic Header */}
      <header className="mb-20 pt-12">
        <h1 className="text-5xl md:text-6xl font-serif text-ink mb-6 tracking-tight">
          {PERSONAL_DETAILS.name}
        </h1>
        <p className="text-xl text-subtle font-sans max-w-2xl leading-relaxed">
          A living technical documentation of work, systems, and decisions.
        </p>
      </header>

      {/* Projects Grid */}
      <section className="mb-24">
        <div className="flex items-baseline justify-between mb-8 border-b border-border pb-2">
          <h2 className="text-sm font-mono text-subtle uppercase tracking-wider">01 // Selected Systems</h2>
          <span className="text-xs text-subtle font-mono">INDEX</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
          {PROJECTS.map((project) => (
            <Link 
              key={project.id} 
              to={`/projects/${project.slug}`}
              className="group block"
            >
              <div className="flex justify-between items-baseline mb-2">
                <h3 className="font-serif text-2xl text-ink group-hover:underline decoration-1 underline-offset-4">
                  {project.title}
                </h3>
                <ArrowRight size={18} className="text-subtle opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
              </div>
              <p className="text-subtle text-sm leading-relaxed mb-3 line-clamp-2">
                {project.tagline}
              </p>
              <div className="flex gap-2">
                {project.tags.slice(0, 3).map(tag => (
                  <span key={tag} className="text-[10px] font-mono text-subtle/70 bg-black/5 px-1.5 py-0.5 rounded-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Insights Section */}
      <section className="mb-24">
        <div className="flex items-baseline justify-between mb-8 border-b border-border pb-2">
          <h2 className="text-sm font-mono text-subtle uppercase tracking-wider">02 // Engineering Notes</h2>
          <Link to="/documentation" className="text-xs text-accent hover:underline font-mono">ARCHIVE</Link>
        </div>

        <div className="space-y-6">
          {recentDocs.map((doc) => (
            <Link 
              key={doc.id}
              to={`/documentation/${doc.id}`}
              className="block group border border-transparent hover:border-border hover:bg-white p-6 -mx-6 rounded-sm transition-all"
            >
              <div className="flex items-center gap-3 text-xs font-mono text-subtle mb-2">
                 <FileText size={14} />
                 <span>{doc.date}</span>
              </div>
              <h3 className="text-xl font-serif text-ink mb-2 group-hover:text-accent transition-colors">
                {doc.title}
              </h3>
              <p className="text-sm text-subtle leading-relaxed line-clamp-2 max-w-3xl">
                {doc.content.replace(/[#*`]/g, '').substring(0, 200)}...
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Mobile-Optimized Directory / Navigation */}
      <section>
        <div className="flex items-baseline justify-between mb-8 border-b border-border pb-2">
           <h2 className="text-sm font-mono text-subtle uppercase tracking-wider">03 // Explore Further</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link 
            to="/activity" 
            className="flex flex-col p-6 border border-border bg-white hover:border-accent/50 transition-all group"
          >
            <Activity size={24} className="text-subtle mb-4 group-hover:text-accent" />
            <span className="font-serif text-lg text-ink">Activity</span>
            <span className="text-xs text-subtle mt-1">Professional timeline & updates</span>
          </Link>

          <Link 
            to="/resume" 
            className="flex flex-col p-6 border border-border bg-white hover:border-accent/50 transition-all group"
          >
            <User size={24} className="text-subtle mb-4 group-hover:text-accent" />
            <span className="font-serif text-lg text-ink">Resume</span>
            <span className="text-xs text-subtle mt-1">Full background & skills</span>
          </Link>

          <Link 
            to="/contact" 
            className="flex flex-col p-6 border border-border bg-white hover:border-accent/50 transition-all group"
          >
            <Mail size={24} className="text-subtle mb-4 group-hover:text-accent" />
            <span className="font-serif text-lg text-ink">Contact</span>
            <span className="text-xs text-subtle mt-1">Communication channels</span>
          </Link>
        </div>
      </section>

    </div>
  );
};

export default Overview;
