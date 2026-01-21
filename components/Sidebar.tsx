
import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { NAVIGATION_ITEMS, PERSONAL_DETAILS } from '../constants';
import { Folder, FileText, Disc, Terminal, Activity, Settings, ShieldAlert, Eye, Moon, Zap, Power, Code } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  const [clickCount, setClickCount] = useState(0);
  const [isRootAccess, setIsRootAccess] = useState(false);
  const [showControlPanel, setShowControlPanel] = useState(false);
  
  // Easter Egg States
  const [xrayActive, setXrayActive] = useState(false);
  const [nightVisionActive, setNightVisionActive] = useState(false);

  const handleSystemClick = () => {
    if (isRootAccess) {
      // Exit Root Mode
      setIsRootAccess(false);
      setShowControlPanel(false);
      setXrayActive(false);
      setNightVisionActive(false);
      setClickCount(0);
    } else {
      // Enter Root Mode Logic
      if (clickCount + 1 >= 5) {
        setIsRootAccess(true);
        setClickCount(0);
      } else {
        setClickCount(prev => prev + 1);
      }
    }
  };

  // Effect to apply "X-Ray" (Debug Outlines)
  useEffect(() => {
    if (xrayActive) {
      const style = document.createElement('style');
      style.id = 'xray-style';
      style.innerHTML = `
        * { outline: 1px dashed rgba(255, 0, 0, 0.3) !important; }
        *::before { 
          content: '' !important; 
          display: none !important;
        }
      `;
      document.head.appendChild(style);
    } else {
      const style = document.getElementById('xray-style');
      if (style) style.remove();
    }
  }, [xrayActive]);

  // Effect to apply "Night Vision" (Invert)
  useEffect(() => {
    if (nightVisionActive) {
      document.documentElement.style.filter = 'invert(1) hue-rotate(180deg)';
      // Un-invert images to keep them looking normal
      const style = document.createElement('style');
      style.id = 'night-vision-fix';
      style.innerHTML = `img, video { filter: invert(1) hue-rotate(180deg) !important; }`;
      document.head.appendChild(style);
    } else {
      document.documentElement.style.filter = '';
      const style = document.getElementById('night-vision-fix');
      if (style) style.remove();
    }
  }, [nightVisionActive]);

  const renderNavItem = (item: any, depth = 0) => {
    const isActive = location.pathname === item.path || (item.children && location.pathname.startsWith(item.path));
    const isExact = location.pathname === item.path;

    return (
      <div key={item.path} className="flex flex-col">
        {item.isFolder ? (
          <div 
            className={`flex items-center gap-2 py-1.5 px-3 text-sm select-none
              ${isActive ? 'text-ink font-medium' : 'text-subtle'}`}
            style={{ paddingLeft: `${depth * 16 + 12}px` }}
          >
            <Folder size={14} className={isActive ? 'text-accent' : 'text-subtle'} />
            <span>{item.label}</span>
          </div>
        ) : (
          <NavLink
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-2 py-1.5 px-3 text-sm transition-all duration-200 border-l-2
               hover:text-ink hover:bg-black/5
               ${isActive 
                 ? 'border-accent text-ink font-medium bg-black/5' 
                 : 'border-transparent text-subtle'}`
            }
            style={{ paddingLeft: `${depth * 16 + 12}px` }}
          >
            {item.label === 'Resume' ? <FileText size={14} /> : 
             item.label === 'Contact' ? <Disc size={14} /> :
             item.label === 'Overview' ? <Terminal size={14} /> :
             item.label === 'Activity' ? <Activity size={14} /> :
             item.label === 'Code Graph' ? <Code size={14} /> :
             <span className="w-3.5 h-3.5 flex items-center justify-center">
                <span className={`w-1.5 h-1.5 rounded-full ${isExact ? 'bg-accent' : 'bg-subtle/50'}`}></span>
             </span>
            }
            {item.label}
          </NavLink>
        )}
        
        {item.children && (
          <div className="flex flex-col border-l border-black/5 ml-3.5 my-1">
             {item.children.map((child: any) => renderNavItem(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <nav className="w-64 h-screen overflow-y-auto fixed left-0 top-0 border-r border-border bg-paper hidden md:flex flex-col pt-8 pb-4">
        <div className="px-6 mb-6">
          <div className="w-16 h-16 mb-4 rounded-full overflow-hidden border border-border bg-white">
               <img 
                src={PERSONAL_DETAILS.profilePicture}
                alt="Profile" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=Abhinandan&background=ffffff&color=1E1E1E&size=128';
                }}
              />
          </div>
          <h1 className="font-serif text-xl font-bold tracking-tight text-ink">
            {PERSONAL_DETAILS.name}
          </h1>
          <p className="text-xs text-subtle mt-1 font-mono">v1.4.3 · composed</p>
        </div>
        
        <div className="flex flex-col gap-1">
          {NAVIGATION_ITEMS.map(item => renderNavItem(item))}
          
          {/* Secret Menu Item */}
          {isRootAccess && (
            <button
              onClick={() => setShowControlPanel(true)}
              className="flex items-center gap-2 py-1.5 px-3 text-sm transition-all duration-200 border-l-2 border-transparent text-red-600 hover:bg-red-50 mt-4 animate-fade-in"
              style={{ paddingLeft: '12px' }}
            >
              <Settings size={14} className="animate-spin-slow" />
              <span className="font-mono font-bold tracking-tight">CORE_SETTINGS</span>
            </button>
          )}
        </div>

        <div 
          className="mt-auto px-6 pt-6 text-[10px] font-mono cursor-pointer transition-colors select-none group"
          onClick={handleSystemClick}
        >
          {isRootAccess ? (
            <div className="text-red-500 font-bold flex items-center gap-1">
              <ShieldAlert size={10} className="animate-pulse" />
              <span className="group-hover:hidden animate-pulse">ROOT ACCESS GRANTED</span>
              <span className="hidden group-hover:block">TERMINATE SESSION_</span>
            </div>
          ) : (
            <div className="text-subtle opacity-50 hover:opacity-100">
              <p>SYSTEM: ONLINE</p>
              <p>LOC: MYSURU, IN</p>
            </div>
          )}
        </div>
      </nav>

      {/* Easter Egg Control Panel Modal */}
      {showControlPanel && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/20 backdrop-blur-sm animate-fade-in">
          <div className="bg-paper border border-border shadow-2xl p-6 max-w-sm w-full mx-4 rounded-sm relative">
             <button 
                onClick={() => setShowControlPanel(false)}
                className="absolute top-4 right-4 text-subtle hover:text-ink"
             >
               ✕
             </button>

             <div className="flex items-center gap-2 mb-6 text-red-600 border-b border-red-100 pb-2">
               <ShieldAlert size={18} />
               <h2 className="font-mono text-sm font-bold tracking-wider">SYSTEM OVERRIDE</h2>
             </div>

             <div className="space-y-4">
               <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${xrayActive ? 'bg-accent text-white' : 'bg-black/5 text-subtle'}`}>
                      <Eye size={16} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-ink">Structure Scan</p>
                      <p className="text-[10px] text-subtle">Display DOM boundaries</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setXrayActive(!xrayActive)}
                    className={`w-10 h-5 rounded-full relative transition-colors ${xrayActive ? 'bg-accent' : 'bg-gray-200'}`}
                  >
                    <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${xrayActive ? 'left-6' : 'left-1'}`}></div>
                  </button>
               </div>

               <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${nightVisionActive ? 'bg-accent text-white' : 'bg-black/5 text-subtle'}`}>
                      <Moon size={16} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-ink">Night Vision</p>
                      <p className="text-[10px] text-subtle">Invert spectrum display</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setNightVisionActive(!nightVisionActive)}
                    className={`w-10 h-5 rounded-full relative transition-colors ${nightVisionActive ? 'bg-accent' : 'bg-gray-200'}`}
                  >
                    <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${nightVisionActive ? 'left-6' : 'left-1'}`}></div>
                  </button>
               </div>
             </div>

             <div className="mt-8 pt-4 border-t border-border text-center flex justify-between items-center">
               <span className="text-[10px] font-mono text-subtle">
                 DEV_MODE_ENABLED
               </span>
               <button 
                 onClick={handleSystemClick}
                 className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-red-500 hover:bg-red-50 px-2 py-1 rounded transition-colors"
               >
                 <Power size={12} />
                 DISCONNECT
               </button>
             </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
