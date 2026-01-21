
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { PROJECTS } from '../constants';
import { ProjectSectionType } from '../types';
import ReactMarkdown from 'react-markdown';
import { ArrowLeft, Github, ExternalLink, Layers, Wrench } from 'lucide-react';
import PageNavigation from '../components/PageNavigation';

const ProjectDetail = () => {
  const { slug } = useParams();
  const project = PROJECTS.find(p => p.slug === slug);

  if (!project) {
    return (
      <div className="p-12 text-center animate-fade-in">
        <h2 className="font-serif text-2xl text-ink mb-2">404: Project Not Found</h2>
        <Link to="/projects" className="text-accent hover:underline">Return to Index</Link>
      </div>
    );
  }

  // Extract links for action buttons
  const linksContent = project.sections.find(s => s.title === ProjectSectionType.LINKS)?.content || '';
  const linkRegex = /\[(.*?)\]\((.*?)\)/g;
  const matches = [...linksContent.matchAll(linkRegex)];
  const repoLinkMatch = matches.find(m => m[1].toLowerCase().includes('repo') || m[1].toLowerCase().includes('github'));
  const demoLinkMatch = matches.find(m => m[1].toLowerCase().includes('live') || m[1].toLowerCase().includes('demo'));
  const repoUrl = repoLinkMatch ? repoLinkMatch[2] : null;
  const demoUrl = demoLinkMatch ? demoLinkMatch[2] : null;

  // Filter out Links section from main content as we display it in sidebar/header
  const contentSections = project.sections.filter(s => s.title !== ProjectSectionType.LINKS);

  return (
    <div className="max-w-6xl mx-auto pb-20">
      
      {/* Back Button */}
      <div className="mb-8 animate-fade-in">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-subtle hover:text-ink transition-colors group">
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          Back to Overview
        </Link>
      </div>

      <header className="mb-10 animate-fade-in">
        <h1 className="text-4xl md:text-6xl font-serif text-ink mb-6">{project.title}</h1>
        <p className="text-xl text-subtle font-sans max-w-3xl leading-relaxed border-l-4 border-accent pl-6">
          {project.tagline}
        </p>
      </header>

      {/* Mobile Only: Top Links (Minimal Split Button) */}
      <div className="lg:hidden mb-12 animate-fade-in">
        {(demoUrl || repoUrl) && (
          <div className="flex w-full border border-border rounded-sm bg-white overflow-hidden shadow-sm">
            {demoUrl && (
              <a href={demoUrl} target="_blank" rel="noopener noreferrer" 
                  className={`flex-1 py-3 px-4 text-center text-sm font-medium hover:bg-black/5 transition-colors flex items-center justify-center gap-2 text-ink ${repoUrl ? 'border-r border-border' : ''}`}>
                <ExternalLink size={16} />
                Live Demo
              </a>
            )}
            {repoUrl && (
              <a href={repoUrl} target="_blank" rel="noopener noreferrer" 
                  className="flex-1 py-3 px-4 text-center text-sm font-medium hover:bg-black/5 transition-colors flex items-center justify-center gap-2 text-ink">
                <Github size={16} />
                Source
              </a>
            )}
          </div>
        )}
      </div>

      {/* Grid: Main Content + Right Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12 lg:gap-20">
        
        {/* Left Column: Deep Dive Content */}
        <div className="space-y-16 animate-fade-in-up delay-100">
          {contentSections.map((section, index) => (
            <section key={index} className="relative group">
               {/* Mobile Timeline Line */}
              <div className="absolute left-0 top-0 bottom-0 w-px bg-border md:hidden"></div>
              
              <div className="flex items-baseline gap-4 mb-6 pl-6 md:pl-0">
                <span className="font-mono text-xs text-accent font-bold opacity-50">0{index + 1}</span>
                <h2 className="text-sm font-mono text-subtle uppercase tracking-widest border-b border-border pb-1 flex-grow">
                  {section.title}
                </h2>
              </div>
              
              <div className="pl-6 md:pl-8 prose prose-stone max-w-none prose-p:text-ink prose-p:font-sans prose-p:leading-8 prose-li:text-ink prose-a:text-accent hover:prose-a:underline">
                <ReactMarkdown>{section.content}</ReactMarkdown>
              </div>
            </section>
          ))}
        </div>

        {/* Right Column: Premium Sidebar (Desktop) */}
        <aside className="hidden lg:block animate-slide-in-right">
          <div className="sticky top-24 space-y-8">
            
            {/* Actions: Minimal Split Link - No 'Deployments' container */}
            {(demoUrl || repoUrl) && (
              <div className="flex w-full border border-border rounded-sm bg-white overflow-hidden shadow-sm">
                {demoUrl && (
                  <a href={demoUrl} target="_blank" rel="noopener noreferrer" 
                     className={`flex-1 py-3 px-4 text-center text-sm font-medium hover:bg-black/5 transition-colors flex items-center justify-center gap-2 text-ink ${repoUrl ? 'border-r border-border' : ''}`}>
                    <ExternalLink size={16} />
                    Live Demo
                  </a>
                )}
                {repoUrl && (
                  <a href={repoUrl} target="_blank" rel="noopener noreferrer" 
                     className="flex-1 py-3 px-4 text-center text-sm font-medium hover:bg-black/5 transition-colors flex items-center justify-center gap-2 text-ink">
                    <Github size={16} />
                    Source
                  </a>
                )}
              </div>
            )}

            {/* Tech Stack Widget */}
            <div className="border-t border-border pt-6">
              <div className="flex items-center gap-2 mb-4 text-ink">
                <Layers size={16} />
                <h3 className="font-serif text-lg">Tech Stack</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.tags.map(tag => (
                  <span key={tag} className="text-xs font-mono text-subtle bg-black/5 px-2 py-1 rounded-sm border border-transparent hover:border-accent/30 transition-colors cursor-default">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Stats / Meta (Simulated) */}
            <div className="border-t border-border pt-6">
               <div className="flex items-center gap-2 mb-4 text-ink">
                <Wrench size={16} />
                <h3 className="font-serif text-lg">System Specs</h3>
              </div>
              <ul className="space-y-3 text-sm text-subtle">
                <li className="flex justify-between border-b border-border/50 pb-2">
                  <span>Version</span>
                  <span className="font-mono text-ink">v1.0.0</span>
                </li>
                <li className="flex justify-between border-b border-border/50 pb-2">
                  <span>License</span>
                  <span className="font-mono text-ink">MIT</span>
                </li>
                 <li className="flex justify-between border-b border-border/50 pb-2">
                  <span>Type</span>
                  <span className="font-mono text-ink">Full-Stack</span>
                </li>
              </ul>
            </div>

          </div>
        </aside>
      </div>
      
      {/* Bottom Navigation */}
      <PageNavigation />
    </div>
  );
};

export default ProjectDetail;
