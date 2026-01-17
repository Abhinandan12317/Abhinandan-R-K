import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { NAVIGATION_ITEMS, PERSONAL_DETAILS } from '../constants';
import { Folder, FileText, Disc, Terminal } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();

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
    <nav className="w-64 h-screen overflow-y-auto fixed left-0 top-0 border-r border-border bg-paper hidden md:flex flex-col pt-8 pb-4">
      <div className="px-6 mb-6">
        <div className="w-16 h-16 mb-4 rounded-full overflow-hidden border border-border bg-white">
             <img 
              src={PERSONAL_DETAILS.profilePicture}
              alt="Profile" 
              className="w-full h-full object-cover transition-all duration-500"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=Abhinandan&background=ffffff&color=1E1E1E&size=128';
              }}
            />
        </div>
        <h1 className="font-serif text-xl font-bold tracking-tight text-ink">
          {PERSONAL_DETAILS.name}
        </h1>
        <p className="text-xs text-subtle mt-1 font-mono">v1.0.0-stable</p>
      </div>
      
      <div className="flex flex-col gap-1">
        {NAVIGATION_ITEMS.map(item => renderNavItem(item))}
      </div>

      <div className="mt-auto px-6 pt-6 text-[10px] text-subtle font-mono opacity-50">
        <p>SYSTEM: ONLINE</p>
        <p>LOC: MYSURU, IN</p>
      </div>
    </nav>
  );
};

export default Sidebar;