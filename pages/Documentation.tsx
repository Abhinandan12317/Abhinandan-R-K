
import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { DOC_SECTIONS } from '../constants';
import ReactMarkdown from 'react-markdown';

const Documentation = () => {
  const { slug } = useParams();

  // Redirect to first doc if on root /documentation
  if (!slug) {
    return <Navigate to="/documentation/principles" replace />;
  }

  const doc = DOC_SECTIONS[slug];

  if (!doc) {
    return (
      <div className="p-12 text-center">
        <h2 className="font-serif text-2xl text-ink mb-2">404: File Not Found</h2>
        <p className="text-subtle">The requested documentation entry does not exist.</p>
      </div>
    );
  }

  const isEvolution = doc.id === 'evolution';

  // Linear navigation order
  const navOrder = [
    { label: 'Principles', path: '/documentation/principles' },
    { label: 'Systems', path: '/documentation/systems' },
    { label: 'Decisions', path: '/documentation/decisions' },
    { label: 'Evolution', path: '/documentation/evolution' },
    { label: 'Activity', path: '/activity' },
    { label: 'Resume', path: '/resume' },
    { label: 'Projects', path: '/projects/niyogenai' }, // First project
  ];
  const currentIdx = navOrder.findIndex(item => item.path.endsWith(slug || 'principles'));
  const prev = currentIdx > 0 ? navOrder[currentIdx - 1] : null;
  const next = currentIdx < navOrder.length - 1 ? navOrder[currentIdx + 1] : null;

  return (
    <article className="max-w-2xl animate-fade-in pb-20">
      <header className="mb-12 pb-6 border-b border-border">
        <div className="font-mono text-xs text-accent mb-2">DOC-ID: {doc.id.toUpperCase()}</div>
        <h1 className="text-3xl font-serif text-ink mb-2">{doc.title}</h1>
        <time className="text-sm text-subtle font-sans">Last Updated: {doc.date}</time>
      </header>

      <div className={isEvolution ? 'pl-6 border-l-2 border-border' : ''}>
        <ReactMarkdown
          components={{
            // Explicitly style headers to ensure large gap (mt-16 = 64px) before each new point
            h1: ({node, ...props}) => <h1 className="text-3xl font-serif text-ink mt-12 mb-6" {...props} />,
            h2: ({node, ...props}) => <h2 className="text-2xl font-serif text-ink mt-12 mb-4" {...props} />,
            h3: ({node, ...props}) => <h3 className="text-xl font-serif text-ink mt-16 mb-4 font-medium" {...props} />,
            
            // Paragraphs with relaxed leading and standard spacing
            p: ({node, ...props}) => <p className="text-base text-ink font-sans leading-8 mb-8 last:mb-0" {...props} />,
            
            // Lists
            ul: ({node, ...props}) => <ul className="list-disc pl-5 mb-8 space-y-2 text-ink" {...props} />,
            ol: ({node, ...props}) => <ol className="list-decimal pl-5 mb-8 space-y-2 text-ink" {...props} />,
            li: ({node, ...props}) => <li className="pl-1 leading-relaxed" {...props} />,
            
            // Code and decorations
            strong: ({node, ...props}) => <strong className="font-semibold text-ink" {...props} />,
            code: ({node, ...props}) => (
              <code className="font-mono text-sm text-accent bg-black/5 px-1.5 py-0.5 rounded-sm" {...props} />
            ),
            blockquote: ({node, ...props}) => (
              <blockquote className="border-l-4 border-accent/20 pl-4 italic text-subtle my-8" {...props} />
            )
          }}
        >
          {doc.content}
        </ReactMarkdown>
      </div>
      
      <div className="mt-16 pt-8 border-t border-border flex justify-between items-center opacity-50">
        <span className="font-mono text-xs">END OF DOCUMENT</span>
      </div>
      {/* Navigation Controls */}
      <div className="flex justify-between items-center mt-16 pt-8 border-t border-border">
        {prev ? (
          <Link to={prev.path} className="text-accent hover:underline font-mono text-xs">
            ← Previous: {prev.label}
          </Link>
        ) : <span />}
        {next ? (
          <Link to={next.path} className="text-accent hover:underline font-mono text-xs">
            Next: {next.label} →
          </Link>
        ) : <span />}
      </div>
    </article>
  );
};

export default Documentation;
