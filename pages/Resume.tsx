
import React, { useRef, useState } from 'react';
import { Download } from 'lucide-react';
import { PERSONAL_DETAILS } from '../constants';
import PageNavigation from '../components/PageNavigation';

const Resume = () => {
  // Human verification state
  const [showVerify, setShowVerify] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [verified, setVerified] = useState(false);
  const [preparing, setPreparing] = useState(false);
  const [pendingAction, setPendingAction] = useState<'download' | 'full' | null>(null);
  const downloadRef = useRef<HTMLAnchorElement>(null);
  const options = [
    'Flashy UI animations',
    'Reliable systems & tools',
    'Social media apps',
  ];
  const correct = 'Reliable systems & tools';

  // Keyboard accessibility: focus modal when opened
  const modalRef = useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (showVerify && modalRef.current) {
      modalRef.current.focus();
    }
  }, [showVerify]);

  // Handle option select
  function handleSelect(option: string) {
    setSelected(option);
    setError('');
  }

  // Handle submit
  function handleVerify(e?: React.FormEvent) {
    if (e) e.preventDefault();
    if (selected === correct) {
      setPreparing(true);
      setError('');
      setTimeout(() => {
        setPreparing(false);
        setVerified(true);
        setShowVerify(false);
        // Trigger download for either button
        setTimeout(() => {
          downloadRef.current?.click();
        }, 100);
      }, 2500);
    } else {
      setError('Not quite. Take another look around.');
    }
  }

  return (
    <div className="max-w-3xl h-full flex flex-col animate-fade-in pb-20">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-serif text-ink">Resume</h1>
        <button
          type="button"
          className="flex items-center gap-2 text-sm text-ink border border-border px-4 py-2 hover:bg-black/5 transition-colors rounded-sm focus:outline-none focus:ring-2 focus:ring-accent/40"
          onClick={() => { setShowVerify(true); setPendingAction('download'); }}
          disabled={verified}
          aria-haspopup="dialog"
          aria-expanded={showVerify}
        >
          <Download size={14} />
          <span>Download PDF</span>
        </button>
        {/* Hidden anchor for download trigger */}
        <a
          href={PERSONAL_DETAILS.resumePdf}
          download
          ref={downloadRef}
          style={{ display: 'none' }}
          tabIndex={-1}
        >Download</a>
      </div>

      {/* Modal for human verification */}
      {showVerify && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 transition-opacity animate-fade-in"
          aria-modal="true"
          role="dialog"
        >
          <div
            ref={modalRef}
            tabIndex={-1}
            className="bg-white border border-border rounded-md shadow-lg p-6 w-full max-w-xs outline-none animate-fade-in"
            style={{ minWidth: 280 }}
            onKeyDown={e => {
              if (e.key === 'Escape') setShowVerify(false);
            }}
          >
            <form onSubmit={handleVerify}>
              <div className="mb-4">
                <div className="font-serif text-lg mb-1">One small thing before you download.</div>
                <div className="text-sm text-ink mb-2">What do I mostly enjoy building?</div>
                <fieldset>
                  {options.map(option => (
                    <label
                      key={option}
                      className={`block px-2 py-1 rounded transition-colors cursor-pointer mb-1 ${selected === option ? 'bg-accent/10 border border-accent' : 'hover:bg-black/5'}`}
                    >
                      <input
                        type="radio"
                        name="verify"
                        value={option}
                        checked={selected === option}
                        onChange={() => handleSelect(option)}
                        className="mr-2 align-middle"
                        tabIndex={0}
                      />
                      {option}
                    </label>
                  ))}
                </fieldset>
              </div>
              {error && (
                <div className="text-xs text-ink/70 mb-2" style={{ opacity: 0.85 }}>{error}</div>
              )}
              <div className="flex justify-end gap-2 mt-2">
                <button
                  type="button"
                  className="text-xs px-3 py-1 border border-border rounded hover:bg-black/5 transition-colors focus:outline-none"
                  onClick={() => setShowVerify(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="text-xs px-3 py-1 border border-accent bg-accent/10 rounded hover:bg-accent/20 transition-colors focus:outline-none"
                  disabled={!selected || preparing}
                >
                  {preparing ? 'Preparing file…' : 'Continue'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="relative border border-border bg-white p-8 md:p-12 shadow-sm flex-grow overflow-hidden animate-fade-in-up">
        <div className="space-y-8 text-sm md:text-base text-ink font-sans" style={{ height: '50%', overflow: 'hidden', position: 'relative' }} aria-hidden={showVerify ? 'true' : undefined}>
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
        </div>
        {/* Fade Out Effect */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white via-white/90 to-transparent flex items-end justify-center pb-8 pointer-events-none select-none">
        </div>
        <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center pb-8">
          <div className="text-center">
            <button
              type="button"
              className="bg-ink text-white px-6 py-2 text-sm hover:bg-subtle transition-colors shadow-lg rounded focus:outline-none focus:ring-2 focus:ring-accent/40"
              onClick={() => { setShowVerify(true); setPendingAction('full'); }}
              disabled={verified}
              aria-haspopup="dialog"
              aria-expanded={showVerify}
            >
              Get Full Resume
            </button>
          </div>
        </div>
      </div>

      <PageNavigation />
    </div>
  );
};

export default Resume;
