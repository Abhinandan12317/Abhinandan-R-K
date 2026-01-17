import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { PROJECTS } from '../constants';
import { ProjectSectionType } from '../types';
import ReactMarkdown from 'react-markdown';
import { ArrowLeft, Github, ExternalLink, Code } from 'lucide-react';

const ProjectDetail = () => {
  const { slug } = useParams();
  const project = PROJECTS.find(p => p.slug === slug);

  if (!project) {
    return (
      <div className="p-12 text-center">
        <h2 className="font-serif text-2xl text-ink mb-2">404: Project Not Found</h2>
        <Link to="/projects" className="text-accent hover:underline">Return to Index</Link>
      </div>
    );
  }

  // Extract links from the LINKS section
  const linksContent = project.sections.find(s => s.title === ProjectSectionType.LINKS)?.content || '';
  
  // Regex to find Markdown links: [Label](Url)
  const linkRegex = /\[(.*?)\]\((.*?)\)/g;
  const matches = [...linksContent.matchAll(linkRegex)];

  // Helper to find specific link types based on label
  const repoLinkMatch = matches.find(m => m[1].toLowerCase().includes('repo') || m[1].toLowerCase().includes('github'));
  const demoLinkMatch = matches.find(m => m[1].toLowerCase().includes('live') || m[1].toLowerCase().includes('demo') || m[1].toLowerCase().includes('deploy'));

  const repoUrl = repoLinkMatch ? repoLinkMatch[2] : null;
  const demoUrl = demoLinkMatch ? demoLinkMatch[2] : null;

  return (
    <div className="max-w-3xl pb-20 animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-subtle hover:text-ink transition-colors group">
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          Back to Overview
        </Link>
        
        {/* Action Buttons Logic */}
        <div className="flex items-center">
            {demoUrl && repoUrl ? (
              // Split Button Idea: Left = Live, Right = Repo
              <div className="inline-flex h-9 rounded-sm border border-border shadow-sm overflow-hidden group">
                 <a 
                   href={demoUrl} 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="flex items-center gap-2 px-4 bg-white hover:bg-accent hover:text-white text-ink transition-colors border-r border-border text-sm font-medium"
                   title="Go to Live Demo"
                 >
                   <ExternalLink size={14} />
                   <span>Live Demo</span>
                 </a>
                 <a 
                   href={repoUrl} 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="flex items-center justify-center px-3 bg-gray-50 hover:bg-ink hover:text-white text-ink transition-colors"
                   title="View Repository"
                 >
                   <Github size={14} />
                 </a>
              </div>
            ) : repoUrl ? (
              // Standard Repo Button (NiyoGen, VidhiPath)
              <a 
                href={repoUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-ink border border-border px-4 py-2 rounded-sm hover:bg-black/5 transition-colors"
              >
                <Github size={16} />
                <span>Repository</span>
              </a>
            ) : null}
        </div>
      </div>

      <header className="mb-12">
        <div className="flex gap-2 mb-4 flex-wrap">
           {project.tags.map(tag => (
              <span key={tag} className="text-[10px] font-mono text-accent border border-accent/20 px-2 py-0.5 rounded-sm">
                {tag.toUpperCase()}
              </span>
           ))}
        </div>
        <h1 className="text-4xl font-serif text-ink mb-4">{project.title}</h1>
        <p className="text-lg text-subtle font-sans leading-relaxed">{project.tagline}</p>
      </header>

      <div className="space-y-16">
        {project.sections.map((section, index) => (
          <section key={index} className="relative pl-6 md:pl-0">
             {/* Timeline line for mobile visual aid, mostly hidden on desktop for cleaner look */}
            <div className="absolute left-0 top-0 bottom-0 w-px bg-border md:hidden"></div>
            
            <h2 className="text-sm font-mono text-subtle uppercase tracking-widest mb-4">
              {String(index + 1).padStart(2, '0')} // {section.title}
            </h2>
            
            <div className="prose prose-stone max-w-none prose-headings:font-serif prose-p:text-ink prose-p:font-sans prose-p:leading-8 prose-li:text-ink prose-a:text-accent hover:prose-a:underline">
              <ReactMarkdown>{section.content}</ReactMarkdown>
            </div>
          </section>
        ))}
      </div>
      
      <div className="mt-20 pt-8 border-t border-border flex justify-between items-center text-sm">
         <span className="text-subtle font-mono">END OF FILE</span>
         <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="text-accent hover:underline">
           Return to Top
         </button>
      </div>
    </div>
  );
};

export default ProjectDetail;