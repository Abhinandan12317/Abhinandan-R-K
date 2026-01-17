import React, { useEffect, useState } from 'react';
import { PERSONAL_DETAILS } from '../constants';

const SKILLS = [
  { text: "DevOps", type: "mono" },
  { text: "System Design", type: "sans" },
  { text: "Engineering", type: "serif" },
  { text: "GenAI", type: "mono" },
  { text: "Cloud Native", type: "mono" },
  { text: "Documentation", type: "serif" },
  { text: "Scalability", type: "sans" },
  { text: "CI/CD", type: "mono" },
  { text: "Python", type: "mono" }
];

const Hero3D = () => {
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });

  useEffect(() => {
    let animationFrameId: number;
    
    const animate = () => {
      setRotation(prev => ({
        x: (prev.x + 0.15) % 360,
        y: (prev.y + 0.25) % 360,
        z: (prev.z + 0.05) % 360
      }));
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div className="relative w-full h-[450px] flex items-center justify-center overflow-hidden mb-16 bg-paper select-none">
      
      {/* 3D Scene Container */}
      <div className="relative w-64 h-64 perspective-1000">
        <div 
          className="w-full h-full relative preserve-3d"
          style={{
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) rotateZ(${rotation.z}deg)`,
            transformStyle: 'preserve-3d'
          }}
        >
          {/* Orbiting Skills */}
          {SKILLS.map((skill, index) => {
            // Distribute points evenly on a sphere (Fibonacci Sphere algorithm)
            const phi = Math.acos(-1 + (2 * index) / SKILLS.length);
            const theta = Math.sqrt(SKILLS.length * Math.PI) * phi;
            const radius = 150; 

            const x = radius * Math.cos(theta) * Math.sin(phi);
            const y = radius * Math.sin(theta) * Math.sin(phi);
            const z = radius * Math.cos(phi);

            return (
              <div
                key={index}
                className="absolute left-1/2 top-1/2 flex items-center justify-center"
                style={{
                  transform: `translate3d(${x}px, ${y}px, ${z}px)`,
                }}
              >
                {/* 
                   Counter-rotate the text container so it always faces the screen (billboarding).
                   We apply the inverse of the scene rotation.
                */}
                <div 
                    style={{
                        transform: `rotateZ(${-rotation.z}deg) rotateY(${-rotation.y}deg) rotateX(${-rotation.x}deg)`
                    }}
                    className={`
                      bg-white/90 backdrop-blur-sm border border-black/10 px-3 py-1.5 rounded-sm shadow-sm 
                      text-xs text-ink whitespace-nowrap hover:bg-ink hover:text-white transition-colors duration-300
                      ${skill.type === 'mono' ? 'font-mono' : 'font-sans'}
                      ${skill.type === 'serif' ? 'font-serif italic' : ''}
                    `}
                >
                  {skill.text}
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Central Anchor Image - Static in DOM, visually center of orbit */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 z-10">
            <div className="w-full h-full rounded-full border-2 border-border bg-white p-1 shadow-xl overflow-hidden relative">
                <img 
                  src="/favicon.jpeg" 
                  alt="Core"
                  className="w-full h-full object-cover rounded-full"
                  onError={(e) => {
                      // Fallback if favicon.jpeg is missing
                      e.currentTarget.style.display = 'none';
                      const parent = e.currentTarget.parentElement;
                      if(parent) parent.innerHTML = '<div class="w-full h-full flex items-center justify-center bg-gray-100 text-2xl">⚡</div>';
                  }}
                />
            </div>
            {/* Pulsing ring effect */}
            <div className="absolute inset-0 rounded-full border border-accent/20 animate-ping opacity-20"></div>
        </div>
      </div>

      {/* Static Name Overlay */}
      <div className="absolute bottom-0 left-0 md:bottom-10 md:left-4 z-20 pointer-events-none">
         <h1 className="text-4xl md:text-5xl font-serif font-medium text-ink leading-tight drop-shadow-sm bg-paper/50 backdrop-blur-[2px] pr-4 rounded-r-lg inline-block">
            {PERSONAL_DETAILS.name}
          </h1>
          <p className="text-sm text-subtle font-mono mt-2 pl-1 uppercase tracking-widest bg-paper/50 backdrop-blur-[2px] inline-block">
            System Documentation
          </p>
      </div>
    </div>
  );
};

export default Hero3D;