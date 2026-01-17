import React, { useState } from 'react';
import { Eye, EyeOff, Copy, Check } from 'lucide-react';

const Contact = () => {
  const [revealed, setRevealed] = useState(false);
  const [copied, setCopied] = useState(false);

  const contactData = {
    email: "ark45072@gmail.com",
    phone: "+91 9482053968",
    github: "github.com/Abhinandan12317",
    linkedin: "linkedin.com/in/abhinandanrk"
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-2xl h-full flex flex-col justify-center animate-fade-in">
      <h1 className="text-3xl font-serif text-ink mb-6">Communication Channels</h1>
      <p className="text-subtle mb-12 text-lg font-sans leading-relaxed">
        I am currently open to discussing roles in AI Engineering, Full-Stack Development, 
        and Data Science.
      </p>

      {!revealed ? (
        <button 
          onClick={() => setRevealed(true)}
          className="group flex items-center gap-4 border border-border p-6 hover:bg-white transition-all duration-300 w-full md:w-auto text-left"
        >
          <div className="w-12 h-12 flex items-center justify-center bg-black/5 rounded-full group-hover:bg-accent/10 transition-colors">
            <Eye size={20} className="text-subtle group-hover:text-accent" />
          </div>
          <div>
            <span className="block font-medium text-ink">Reveal Contact Information</span>
            <span className="text-xs text-subtle">Click to decrypt details</span>
          </div>
        </button>
      ) : (
        <div className="space-y-6 animate-fade-in-up">
           <div className="border border-border bg-white p-8 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-[100px_1fr_auto] gap-4 items-center">
                 <span className="text-xs font-mono text-subtle uppercase tracking-wider">Email</span>
                 <a href={`mailto:${contactData.email}`} className="text-ink hover:text-accent text-lg font-medium break-all">{contactData.email}</a>
                 <button onClick={() => handleCopy(contactData.email)} className="text-subtle hover:text-ink p-2" aria-label="Copy email">
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                 </button>
              </div>

              <div className="w-full h-px bg-border"></div>

              <div className="grid grid-cols-1 md:grid-cols-[100px_1fr_auto] gap-4 items-center">
                 <span className="text-xs font-mono text-subtle uppercase tracking-wider">GitHub</span>
                 <a href={`https://${contactData.github}`} target="_blank" rel="noopener noreferrer" className="text-ink hover:text-accent font-mono break-all">{contactData.github}</a>
                 <div className="w-8"></div> {/* Spacer */}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-[100px_1fr_auto] gap-4 items-center">
                 <span className="text-xs font-mono text-subtle uppercase tracking-wider">LinkedIn</span>
                 <a href={`https://${contactData.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-ink hover:text-accent font-mono break-all">{contactData.linkedin}</a>
                 <div className="w-8"></div> {/* Spacer */}
              </div>

              <div className="w-full h-px bg-border"></div>

               <div className="grid grid-cols-1 md:grid-cols-[100px_1fr_auto] gap-4 items-center">
                 <span className="text-xs font-mono text-subtle uppercase tracking-wider">Phone</span>
                 <a href={`tel:${contactData.phone}`} className="text-ink hover:text-accent font-mono">{contactData.phone}</a>
                 <div className="w-8"></div> {/* Spacer */}
              </div>
           </div>
           
           <button 
             onClick={() => setRevealed(false)}
             className="text-sm text-subtle hover:text-ink flex items-center gap-2 mt-4"
           >
             <EyeOff size={14} />
             <span>Hide details</span>
           </button>
        </div>
      )}
    </div>
  );
};

export default Contact;