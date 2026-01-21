
import React, { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { NAVIGATION_ITEMS } from '../constants';

const PageNavigation = () => {
  const location = useLocation();

  // Flatten the navigation tree into a linear list
  const flatNav = useMemo(() => {
    const list: { label: string; path: string }[] = [];
    NAVIGATION_ITEMS.forEach(item => {
      if (item.isFolder && item.children) {
        item.children.forEach(child => list.push(child));
      } else {
        list.push({ label: item.label, path: item.path });
      }
    });
    return list;
  }, []);

  const currentIndex = flatNav.findIndex(item => item.path === location.pathname);

  if (currentIndex === -1) return null;

  const prev = currentIndex > 0 ? flatNav[currentIndex - 1] : null;
  const next = currentIndex < flatNav.length - 1 ? flatNav[currentIndex + 1] : null;

  return (
    <div className="mt-20 pt-8 border-t border-border flex flex-row justify-between items-center animate-fade-in-up">
      <div className="flex-1">
        {prev ? (
          <Link 
            to={prev.path}
            className="group inline-flex flex-col items-start gap-1"
          >
            <div className="flex items-center gap-2 text-subtle text-xs font-mono uppercase tracking-wider group-hover:text-accent transition-colors">
              <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform" />
              Previous
            </div>
            <span className="font-serif text-lg text-ink group-hover:text-accent transition-colors hover:underline underline-offset-4 decoration-1">
              {prev.label}
            </span>
          </Link>
        ) : <div />}
      </div>

      <div className="flex-1 text-right">
        {next ? (
          <Link 
            to={next.path}
            className="group inline-flex flex-col items-end gap-1"
          >
            <div className="flex items-center gap-2 text-subtle text-xs font-mono uppercase tracking-wider group-hover:text-accent transition-colors">
              Next
              <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
            </div>
            <span className="font-serif text-lg text-ink group-hover:text-accent transition-colors hover:underline underline-offset-4 decoration-1">
              {next.label}
            </span>
          </Link>
        ) : <div />}
      </div>
    </div>
  );
};

export default PageNavigation;
