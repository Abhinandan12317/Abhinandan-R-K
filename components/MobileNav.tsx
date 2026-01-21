
import React, { useState, useEffect } from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { NAVIGATION_ITEMS } from '../constants';

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <div className="md:hidden">
      <div className="fixed top-0 left-0 right-0 h-14 bg-paper border-b border-border flex items-center justify-between px-4 z-50">
        <span className="font-serif font-bold text-ink">Abhinandan</span>
        <button onClick={() => setIsOpen(!isOpen)} className="text-ink p-1">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 top-14 bg-paper z-40 p-6 overflow-y-auto animate-fade-in">
          {NAVIGATION_ITEMS.map((item) => (
            <div key={item.path} className="mb-6">
              {item.isFolder ? (
                <>
                  <h3 className="text-subtle text-xs font-mono uppercase tracking-widest mb-3 border-b border-border pb-1">{item.label}</h3>
                  <div className="flex flex-col gap-3 pl-2">
                    {item.children?.map(child => (
                      <NavLink
                        key={child.path}
                        to={child.path}
                        className={({ isActive }) =>
                          `text-base ${isActive ? 'text-ink font-medium pl-2 border-l-2 border-accent' : 'text-subtle'}`
                        }
                      >
                        {child.label}
                      </NavLink>
                    ))}
                  </div>
                </>
              ) : (
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `text-lg font-serif ${isActive ? 'text-ink font-bold' : 'text-subtle'}`
                  }
                >
                  {item.label}
                </NavLink>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MobileNav;
