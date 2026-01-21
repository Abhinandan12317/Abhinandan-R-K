
import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { DOC_SECTIONS } from '../constants';
import ReactMarkdown from 'react-markdown';
import PageNavigation from '../components/PageNavigation';
import { FileText, Calendar, Hash, BookOpen, Link as LinkIcon } from 'lucide-react';

const Documentation = () => {
  const { slug } = useParams();

  if (!slug) {
    return <Navigate to="/documentation/principles" replace />;
  }

  const doc = DOC_SECTIONS[slug];

  if (!doc) {
    return (
      <div className="p-12 text-center animate-fade-in">
        <h2 className="font-serif text-2xl text-ink mb-2">404: File Not Found</h2>
        <p className="text-subtle mb-4">The requested documentation entry does not exist.</p>
        <Link to="/documentation" className="text-accent underline">Return to Index</Link>
      </div>
    );
  }

  const isEvolution = doc.id === 'evolution';
  const relatedDocs = doc.relatedDocIds 
    ? doc.relatedDocIds.map(id => DOC_SECTIONS[id]).filter(Boolean)
    : [];

  return (
    <div className="max-w-5xl mx-auto pb-20">
      
      {/* Header Area */}
      <header className="mb-12 border-b border-border pb-8 animate-fade-in">
        <div className="flex items-center gap-3 text-xs font-mono text-accent mb-4">
          <span className="bg-accent/5 px-2 py-1 rounded-sm">DOC-ID: {doc.id.toUpperCase()}</span>
          <span className="text-subtle">///</span>
          <span className="text-subtle">SYSTEM_MANUAL</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-serif text-ink mb-4">{doc.title}</h1>
        <div className="flex items-center gap-6 text-sm text-subtle font-sans">
          <div className="flex items-center gap-2">
            <Calendar size={14} />
            <span>Last Updated: {doc.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <FileText size={14} />
            <span>{Math.ceil(doc.content.length / 500)} min read</span>
          </div>
        </div>
      </header>

      {/* Grid Layout: Left Content, Right Metadata */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-12">
        
        {/* Main Content Column */}
        <article className={`animate-fade-in-up ${isEvolution ? 'pl-6 border-l-2 border-border' : ''}`}>
          <ReactMarkdown
            components={{
              h1: ({node, ...props}) => <h1 className="text-3xl font-serif text-ink mt-12 mb-6" {...props} />,
              h2: ({node, ...props}) => <h2 className="text-2xl font-serif text-ink mt-12 mb-4 pb-2 border-b border-border/50" {...props} />,
              h3: ({node, ...props}) => <h3 className="text-xl font-serif text-ink mt-10 mb-3 font-medium" {...props} />,
              p: ({node, ...props}) => <p className="text-base text-ink font-sans leading-8 mb-6 last:mb-0" {...props} />,
              ul: ({node, ...props}) => <ul className="list-disc pl-5 mb-6 space-y-2 text-ink marker:text-subtle" {...props} />,
              ol: ({node, ...props}) => <ol className="list-decimal pl-5 mb-6 space-y-2 text-ink marker:text-subtle" {...props} />,
              li: ({node, ...props}) => <li className="pl-1 leading-relaxed" {...props} />,
              strong: ({node, ...props}) => <strong className="font-semibold text-ink" {...props} />,
              code: ({node, ...props}) => (
                <code className="font-mono text-xs text-accent bg-black/5 px-1.5 py-0.5 rounded-sm border border-black/5" {...props} />
              ),
              blockquote: ({node, ...props}) => (
                <blockquote className="border-l-4 border-accent/20 pl-6 py-2 italic text-subtle my-8 bg-paper" {...props} />
              )
            }}
          >
            {doc.content}
          </ReactMarkdown>
        </article>

        {/* Right Sidebar: Context & Navigation */}
        <aside className="hidden lg:block animate-slide-in-right">
          <div className="sticky top-24 space-y-8">
            
            {/* Dynamic Context Widget */}
            <div className="border-l border-border pl-6 py-2">
              <div className="flex items-center gap-2 mb-4 text-subtle">
                <BookOpen size={14} />
                <h4 className="text-xs font-mono uppercase tracking-widest">Context</h4>
              </div>
              <p className="text-sm text-subtle leading-relaxed">
                {doc.context || "This document is part of the living technical manual. It reflects current operating procedures and design choices."}
              </p>
            </div>

            {/* Dynamic Related References */}
            {relatedDocs.length > 0 && (
              <div className="border-l border-border pl-6 py-2">
                 <div className="flex items-center gap-2 mb-4 text-subtle">
                   <LinkIcon size={14} />
                   <h4 className="text-xs font-mono uppercase tracking-widest">References</h4>
                 </div>
                 <ul className="space-y-3 text-sm">
                   {relatedDocs.map(d => (
                     <li key={d.id}>
                       <Link to={`/documentation/${d.id}`} className="text-subtle hover:text-accent transition-colors flex items-center gap-2 group">
                         <Hash size={12} className="opacity-50 group-hover:opacity-100" />
                         {d.title}
                       </Link>
                     </li>
                   ))}
                 </ul>
              </div>
            )}

             {/* Status Indicator */}
             <div className="bg-white border border-border p-4 rounded-sm shadow-sm">
               <div className="flex items-center gap-2 mb-2">
                 <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                 <span className="text-xs font-bold text-ink uppercase">Status: Current</span>
               </div>
               <p className="text-[10px] text-subtle">
                 Validated for v1.4.3
               </p>
             </div>

          </div>
        </aside>

      </div>
      
      {/* Bottom Navigation */}
      <PageNavigation />
    </div>
  );
};

export default Documentation;
