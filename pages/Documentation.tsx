import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
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

  return (
    <article className="max-w-2xl animate-fade-in">
      <header className="mb-12 pb-6 border-b border-border">
        <div className="font-mono text-xs text-accent mb-2">DOC-ID: {doc.id.toUpperCase()}</div>
        <h1 className="text-3xl font-serif text-ink mb-2">{doc.title}</h1>
        <time className="text-sm text-subtle font-sans">Last Updated: {doc.date}</time>
      </header>

      {/* 
        Custom styling: 
        1. Increased paragraph spacing to prose-p:mb-16 (64px)
        2. Added prose-h3:mt-16 to spacing before headings
        3. Increased list item spacing to prose-li:mb-6
      */}
      <div className={`prose prose-stone prose-headings:font-serif prose-headings:font-normal prose-p:text-ink prose-p:font-sans prose-p:leading-8 prose-p:mb-16 prose-h3:mt-16 prose-li:mb-6 prose-li:text-ink prose-strong:text-ink prose-code:text-accent prose-code:bg-black/5 prose-code:px-1 prose-code:py-0.5 prose-code:rounded-sm prose-code:font-normal before:prose-code:content-[''] after:prose-code:content-['']
        ${isEvolution ? 'pl-6 border-l-2 border-border prose-p:pl-2' : ''}
      `}>
        <ReactMarkdown>{doc.content}</ReactMarkdown>
      </div>
    </article>
  );
};

export default Documentation;