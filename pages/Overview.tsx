import React from 'react';
import { Link } from 'react-router-dom';
import { PROJECTS, PERSONAL_DETAILS } from '../constants';
import { ArrowRight } from 'lucide-react';

const Overview = () => {
  return (
    <div className="max-w-3xl animate-fade-in">
      <header className="mb-16 flex flex-col md:flex-row gap-8 items-start">
        <div className="flex-1">
          <h1 className="text-4xl md:text-5xl font-serif font-medium text-ink mb-6 leading-tight">
            {PERSONAL_DETAILS.name} <br/>
            <span className="text-2xl text-subtle font-sans font-normal block mt-2">AI Engineer & Full-Stack Developer</span>
          </h1>
          <p className="text-lg text-subtle leading-relaxed max-w-2xl font-sans">
            I build systems powered by natural language processing and modern web technologies. 
            Experienced in Python, TensorFlow, and building AI models that solve real-world problems 
            like legal verdict prediction and automated resume screening.
          </p>
        </div>
        <div className="w-32 h-32 md:w-40 md:h-40 flex-shrink-0 bg-white p-1 border border-border shadow-sm rotate-3 hover:rotate-0 transition-transform duration-500">
          <img 
            src={PERSONAL_DETAILS.profilePicture}
            alt={PERSONAL_DETAILS.name}
            className="w-full h-full object-cover transition-all duration-500"
            onError={(e) => {
              // Fallback if image not found
              (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=Abhinandan&background=F6F5F2&color=1E1E1E&size=128';
            }}
          />
        </div>
      </header>

      <section className="mb-20">
        <div className="flex items-baseline justify-between mb-8 border-b border-border pb-2">
          <h2 className="text-sm font-mono text-subtle uppercase tracking-wider">Project Index</h2>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {PROJECTS.map((project) => (
            <Link 
              key={project.id} 
              to={`/projects/${project.slug}`}
              className="group block p-6 border border-transparent hover:border-border hover:bg-white/50 transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-serif text-xl text-ink group-hover:text-accent transition-colors">
                  {project.title}
                </h3>
                <ArrowRight size={16} className="text-subtle opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
              </div>
              <p className="text-subtle mb-4 font-sans text-sm leading-relaxed">
                {project.tagline}
              </p>
              <div className="flex gap-2">
                {project.tags.map(tag => (
                  <span key={tag} className="text-[10px] font-mono text-subtle bg-black/5 px-2 py-1 rounded-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-baseline justify-between mb-8 border-b border-border pb-2">
          <h2 className="text-sm font-mono text-subtle uppercase tracking-wider">Status</h2>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm font-sans">
          <div>
            <span className="text-subtle block mb-1">Current Focus</span>
            <span className="text-ink">DevOps & AI Scalability</span>
          </div>
          <div>
            <span className="text-subtle block mb-1">Location</span>
            <span className="text-ink">Mysuru, Karnataka</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Overview;