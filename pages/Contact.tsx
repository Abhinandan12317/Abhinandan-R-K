// Fix for Vite env types
declare global {
  interface ImportMeta {
    env: {
      VITE_EMAILJS_SERVICE_ID: string;
      VITE_EMAILJS_TEMPLATE_ID: string;
      VITE_EMAILJS_USER_ID: string;
    };
  }
}

import React, { useState, useEffect } from 'react';
// @ts-ignore: emailjs/browser may not have types installed
import emailjs from '@emailjs/browser';
import { Send, Terminal, Mail, Linkedin, Copy, Radio, Zap, Activity } from 'lucide-react';
import PageNavigation from '../components/PageNavigation';


const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'transmitting' | 'sent'>('idle');
  const [copied, setCopied] = useState(false);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);

  const myEmail = "ark45072@gmail.com";
  const myLinkedin = "https://linkedin.com/in/abhinandanrk";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(myEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const addLog = (log: string) => {
    setTerminalLogs(prev => [...prev, `> ${log}`]);
  };

  const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const USER_ID = import.meta.env.VITE_EMAILJS_USER_ID;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('transmitting');
    setTerminalLogs([]);

    setTimeout(() => addLog("Initializing secure handshake..."), 100);
    setTimeout(() => addLog("Packetizing message payload..."), 600);
    setTimeout(() => addLog("Resolving mail client protocol..."), 1200);
    setTimeout(() => {
      addLog("Transmitting data...");
      emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
        USER_ID
      )
      .then(() => {
        addLog("Message sent successfully!");
        setStatus('sent');
      })
      .catch(() => {
        addLog("Failed to send message. Please try again later.");
        setStatus('idle');
      });
    }, 2000);
  };

  // Pulse effect for the "Online" status
  const [pulse, setPulse] = useState(true);
  useEffect(() => {
    const interval = setInterval(() => setPulse(p => !p), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-4xl mx-auto pb-20 animate-fade-in">
      <header className="mb-12 border-b border-border pb-6 flex items-end justify-between">
        <div>
           <div className="flex items-center gap-2 text-accent mb-2">
             <Radio size={16} className="animate-pulse" />
             <span className="font-mono text-xs uppercase tracking-widest">Uplink Console</span>
           </div>
           <h1 className="text-4xl font-serif text-ink">Establish Connection</h1>
        </div>
        <div className="hidden sm:block text-right">
           <div className="font-mono text-xs text-subtle mb-1">SYSTEM_STATUS</div>
           <div className="flex items-center justify-end gap-2 text-green-600 font-bold text-sm">
             <div className={`w-2 h-2 rounded-full bg-green-500 ${pulse ? 'opacity-100' : 'opacity-40'} transition-opacity`}></div>
             ONLINE
           </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-8">
        
        {/* Main Transmission Form */}
        <div className="bg-white border border-border p-1 rounded-sm shadow-sm relative overflow-hidden group animate-fade-in-up">
           {/* Decorative scanning line */}
           <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-[2s]"></div>

           <div className="bg-paper/30 p-8 h-full">
            {status === 'transmitting' || status === 'sent' ? (
               <div className="h-full flex flex-col items-start justify-center font-mono text-sm p-4 min-h-[400px]">
                 <Terminal size={32} className="text-ink mb-6" />
                 <div className="space-y-2 w-full">
                    {terminalLogs.map((log, i) => (
                      <div key={i} className="text-subtle animate-fade-in">{log}</div>
                    ))}
                    {status === 'transmitting' && (
                       <div className="w-2 h-4 bg-accent animate-pulse inline-block align-middle ml-1"></div>
                    )}
                 </div>
                 {status === 'sent' && (
                    <button 
                      onClick={() => { setStatus('idle'); setTerminalLogs([]); }}
                      className="mt-8 text-xs text-accent underline hover:text-ink"
                    >
                      Initialize New Transmission
                    </button>
                 )}
               </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-[10px] font-mono uppercase tracking-widest text-subtle">Operator Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-transparent border-b border-border py-2 text-ink focus:outline-none focus:border-accent transition-colors font-sans"
                        placeholder="Identify yourself"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-[10px] font-mono uppercase tracking-widest text-subtle">Return Frequency (Email)</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-transparent border-b border-border py-2 text-ink focus:outline-none focus:border-accent transition-colors font-sans"
                        placeholder="freq@domain.com"
                      />
                    </div>
                 </div>

                 <div className="space-y-2">
                    <label htmlFor="subject" className="text-[10px] font-mono uppercase tracking-widest text-subtle">Transmission Header</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-border py-2 text-ink focus:outline-none focus:border-accent transition-colors font-sans"
                      placeholder="Subject of inquiry..."
                    />
                 </div>

                 <div className="space-y-2">
                    <label htmlFor="message" className="text-[10px] font-mono uppercase tracking-widest text-subtle">Payload Data</label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-border py-2 text-ink focus:outline-none focus:border-accent transition-colors font-sans resize-none"
                      placeholder="Input message content..."
                    ></textarea>
                 </div>

                 <div className="pt-4">
                    <button
                      type="submit"
                      className="w-full bg-ink text-white py-4 px-6 text-sm font-mono tracking-wider hover:bg-accent transition-all flex items-center justify-between group rounded-sm"
                    >
                      <span>INITIATE_SEND_SEQUENCE</span>
                      <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </button>
                 </div>
              </form>
            )}
           </div>
        </div>

        {/* Status Side Panel */}
        <aside className="space-y-6 animate-slide-in-right">
          
          {/* Signal Card */}
          <div className="bg-ink text-white p-6 rounded-sm relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10">
               <Activity size={80} />
             </div>
             
             <h3 className="font-mono text-xs text-white/60 mb-1 uppercase tracking-widest">Active Channel</h3>
             <p className="font-sans text-lg mb-6 break-all relative z-10">{myEmail}</p>
             
             <button 
                onClick={handleCopyEmail}
                className="w-full border border-white/20 py-2 flex items-center justify-center gap-2 text-xs font-mono hover:bg-white/10 transition-colors"
             >
               {copied ? (
                 <>COPIED_TO_CLIPBOARD</>
               ) : (
                 <>
                   <Copy size={12} />
                   COPY_ADDRESS
                 </>
               )}
             </button>
          </div>

          {/* Network Link */}
          <a 
            href={myLinkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="block border border-border bg-white p-6 rounded-sm hover:border-accent/50 transition-colors group relative"
          >
             <div className="flex items-center justify-between mb-4">
               <div className="flex items-center gap-2 text-ink">
                 <Linkedin size={20} />
                 <span className="font-serif text-lg">LinkedIn</span>
               </div>
               <Zap size={14} className="text-subtle group-hover:text-[#0077b5] transition-colors" />
             </div>
             <p className="text-xs text-subtle font-mono">
                Connect to professional network<br/>
                View extended profile
             </p>
          </a>

          <div className="text-[10px] text-subtle font-mono text-center opacity-60">
             SECURE CONNECTION ESTABLISHED
             <br />
             ENCRYPTION: TLS 1.3
          </div>

        </aside>

      </div>

      <PageNavigation />
    </div>
  );
};

export default Contact;
