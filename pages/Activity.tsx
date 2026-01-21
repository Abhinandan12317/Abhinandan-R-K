
import React, { useMemo, useState } from 'react';
import { ACTIVITIES } from '../constants';
import { ActivityItem } from '../types';
import { Code, Flag, Mic, Heart, Award, Users, Circle, Filter } from 'lucide-react';
import PageNavigation from '../components/PageNavigation';

interface ActivityGraphProps {
  activities: ActivityItem[];
}

// --- Bezier Curve Helper Functions ---
const line = (pointA: any, pointB: any) => {
  const lengthX = pointB.x - pointA.x;
  const lengthY = pointB.y - pointA.y;
  return {
    length: Math.sqrt(Math.pow(lengthX, 2) + Math.pow(lengthY, 2)),
    angle: Math.atan2(lengthY, lengthX)
  };
};

const controlPoint = (current: any, previous: any, next: any, reverse?: boolean) => {
  const p = previous || current;
  const n = next || current;
  const smoothing = 0.15; // Slightly reduced from 0.2 to minimize overshooting
  const o = line(p, n);
  const angle = o.angle + (reverse ? Math.PI : 0);
  const length = o.length * smoothing;
  const x = current.x + Math.cos(angle) * length;
  const y = current.y + Math.sin(angle) * length;
  return { x, y };
};

const bezierCommand = (point: any, i: number, a: any[]) => {
  const cps = controlPoint(a[i - 1], a[i - 2], point);
  const cpe = controlPoint(point, a[i - 1], a[i + 1], true);

  // CLAMPING: Prevent control points from going below the baseline (y=100) or above top (y=0)
  // This fixes the issue where curves dip below the axis between zero-value points
  cps.y = Math.max(0, Math.min(100, cps.y));
  cpe.y = Math.max(0, Math.min(100, cpe.y));

  return `C ${cps.x},${cps.y} ${cpe.x},${cpe.y} ${point.x},${point.y}`;
};

const svgPath = (points: any[], command: (point: any, i: number, a: any[]) => string) => {
  return points.reduce((acc, point, i, a) => 
    i === 0 
      ? `M ${point.x},${point.y}` 
      : `${acc} ${command(point, i, a)}`
  , '');
};
// -------------------------------------

const ActivityGraph = ({ activities }: ActivityGraphProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // 1. Process Data: Group by Quarter
  const data = useMemo(() => {
    if (activities.length === 0) return [];

    const monthMap: Record<string, number> = { 
      'JAN': 0, 'FEB': 1, 'MAR': 2, 'APR': 3, 'MAY': 4, 'JUN': 5, 
      'JUL': 6, 'AUG': 7, 'SEP': 8, 'OCT': 9, 'NOV': 10, 'DEC': 11 
    };

    const parseDate = (dateStr: string) => {
      const [m, y] = dateStr.split(' ');
      return new Date(parseInt(y), monthMap[m.toUpperCase()] || 0, 1);
    };

    // Find Range based on filtered activities
    const parsedDates = activities.map(a => parseDate(a.date));
    
    const minDate = new Date(Math.min(...parsedDates.map(d => d.getTime())));
    const maxDate = new Date(Math.max(...parsedDates.map(d => d.getTime())));

    // Normalize start/end to quarter boundaries
    const startYear = minDate.getFullYear();
    const startQ = Math.floor(minDate.getMonth() / 3) + 1;
    
    const endYear = maxDate.getFullYear();
    const endQ = Math.floor(maxDate.getMonth() / 3) + 1;

    const quarters = [];
    let curYear = startYear;
    let curQ = startQ;

    // Generate continuous sequence of quarters
    while (curYear < endYear || (curYear === endYear && curQ <= endQ)) {
      const label = `'${curYear.toString().slice(2)}-Q${curQ}`; // e.g., '24-Q4
      
      const count = activities.filter(a => {
        const d = parseDate(a.date);
        const y = d.getFullYear();
        const q = Math.floor(d.getMonth() / 3) + 1;
        return y === curYear && q === curQ;
      }).length;

      quarters.push({ label, count });

      curQ++;
      if (curQ > 4) {
        curQ = 1;
        curYear++;
      }
    }

    return quarters;
  }, [activities]);

  if (data.length === 0) {
    return (
      <div className="mt-20 pt-12 border-t border-border text-center">
        <p className="text-sm text-subtle font-mono">No activity data for this selection.</p>
      </div>
    );
  }

  const maxCount = Math.max(...data.map(d => d.count), 1);
  
  // Chart dimensions (internal SVG units)
  const height = 100; 
  const width = 100;
  
  // Calculate points
  const points = data.map((d, i) => {
    const x = i === 0 ? 0 : (i / (data.length - 1)) * width;
    // Leave 15% padding at top so peaks aren't cut off
    const y = height - ((d.count / maxCount) * (height * 0.85)); 
    return { x, y, ...d };
  });

  // Calculate Curvy Paths
  const linePathString = svgPath(points, bezierCommand);
  const areaPathString = `${linePathString} L ${width},${height} L 0,${height} Z`;

  return (
    <div className="mt-20 pt-12 border-t border-border select-none animate-fade-in-up delay-200">
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-mono text-xs text-subtle uppercase tracking-wider">Activity Intensity (Quarterly)</h2>
        <div className="h-4">
          {hoveredIndex !== null && (
            <span className="font-mono text-xs text-accent animate-fade-in">
              {data[hoveredIndex].label}: {data[hoveredIndex].count} Entries
            </span>
          )}
        </div>
      </div>
      
      {/* Chart Container - Fixed height, Fluid width */}
      <div 
        className="relative w-full h-48 md:h-56" 
        onMouseLeave={() => setHoveredIndex(null)}
      >
        {/* SVG Graph */}
        <svg 
          viewBox={`0 0 ${width} ${height}`} 
          preserveAspectRatio="none" 
          className="w-full h-full overflow-visible block"
        >
          <defs>
            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3A4F7A" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#3A4F7A" stopOpacity="0" />
            </linearGradient>
          </defs>
          
          <path d={areaPathString} fill="url(#chartGradient)" />
          <path d={linePathString} fill="none" stroke="#3A4F7A" strokeWidth="1.5" strokeLinecap="round" vectorEffect="non-scaling-stroke" className="opacity-80" />
        </svg>

        {/* Overlay for Points & Tooltips (HTML for consistent circle sizing) */}
        <div className="absolute inset-0">
          {points.map((p, i) => (
            <div 
              key={i}
              className="absolute group"
              style={{ left: `${p.x}%`, top: 0, bottom: 0, width: '1px' }}
              onMouseEnter={() => setHoveredIndex(i)}
            >
              {/* Hit Area (Invisible vertical bar) */}
              <div className="absolute top-0 bottom-0 -left-3 w-6 bg-transparent z-10 cursor-crosshair"></div>

              {/* Data Point Dot */}
              <div 
                className={`absolute w-2 h-2 rounded-full border border-white transition-all duration-200 -translate-x-1/2 -translate-y-1/2 z-20
                  ${hoveredIndex === i ? 'bg-accent scale-150' : 'bg-subtle/50 scale-0 md:scale-75'}`}
                style={{ top: `${p.y}%` }}
              ></div>

              {/* Vertical Guide Line */}
              <div 
                className={`absolute top-0 bottom-0 border-l border-dashed border-accent/30 transition-opacity duration-200 pointer-events-none
                  ${hoveredIndex === i ? 'opacity-100' : 'opacity-0'}`}
                style={{ top: `${p.y}%` }}
              ></div>
            </div>
          ))}
        </div>

        {/* X-Axis Labels */}
        <div className="absolute top-full left-0 w-full mt-3 h-6">
          {points.map((p, i) => (
            <div
              key={i}
              className={`absolute -translate-x-1/2 text-[10px] font-mono transition-colors duration-200 whitespace-nowrap
                ${hoveredIndex === i ? 'text-accent font-bold z-20' : 'text-subtle/60'}
                ${/* Hide intermediate labels on small screens if crowded */ 
                  points.length > 5 && i % 2 !== 0 && hoveredIndex !== i ? 'hidden sm:block' : 'block'
                }
              `}
              style={{ left: `${p.x}%` }}
            >
              {p.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Helper for Category Icons
const getCategoryIcon = (category: string, className?: string) => {
  const cls = className || "text-accent"; 
  switch (category) {
    case 'Technical': return <Code size={12} className={cls} />;
    case 'Leadership': return <Flag size={12} className={cls} />;
    case 'Speaking': return <Mic size={12} className={cls} />;
    case 'Service': return <Heart size={12} className={cls} />;
    case 'Recognition': return <Award size={12} className={cls} />;
    case 'Community': return <Users size={12} className={cls} />;
    default: return <Circle size={12} className="text-subtle" />;
  }
};

const Activity = () => {
  const [filter, setFilter] = useState('All');

  // Distinct Categories + All
  const categories = ['All', 'Technical', 'Leadership', 'Speaking', 'Service', 'Recognition', 'Community'];

  const filteredActivities = useMemo(() => {
    return ACTIVITIES.filter(activity => filter === 'All' || activity.category === filter);
  }, [filter]);
  
  return (
    <div className="max-w-3xl animate-fade-in pb-20">
      <header className="mb-8 border-b border-border pb-6">
        <h1 className="text-3xl font-serif text-ink mb-2">Activity Log</h1>
        <p className="text-subtle font-sans max-w-xl leading-relaxed">
          A curated log of professional engagement and ecosystem participation. 
          Reflecting activity beyond the code.
        </p>
      </header>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center gap-3 mb-12 animate-fade-in delay-100">
         <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-subtle opacity-50 mr-2 select-none">
            <Filter size={12} />
            <span>Filter</span>
        </div>
        {categories.map((cat) => {
           const isActive = filter === cat;
           const count = cat === 'All' ? ACTIVITIES.length : ACTIVITIES.filter(a => a.category === cat).length;
           
           return (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider rounded-sm border transition-all duration-200 flex items-center gap-2
                ${isActive 
                  ? 'bg-ink text-white border-ink shadow-sm translate-y-px' 
                  : 'bg-white text-subtle border-border hover:border-accent hover:text-ink hover:bg-paper'
                }`}
            >
              {isActive && <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>}
              
              {cat !== 'All' && getCategoryIcon(cat, isActive ? 'text-white' : 'text-accent')} 
              
              {cat}
              
              <span className={`ml-0.5 text-[9px] font-normal ${isActive ? 'text-white/60' : 'text-subtle/40'}`}>
                  {count}
              </span>
            </button>
           );
        })}
      </div>

      <div key={filter} className="space-y-0 min-h-[300px] animate-fade-in-up">
        {filteredActivities.length > 0 ? (
          filteredActivities.map((activity, idx) => (
            <div 
              key={activity.id} 
              className="group flex flex-col md:flex-row gap-4 md:gap-12 py-8 border-b border-border/40 hover:bg-black/[0.02] transition-colors -mx-4 px-4 rounded-sm"
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              {/* Left Column: Date */}
              <div className="md:w-32 flex-shrink-0 pt-1">
                <span className="font-mono text-xs text-subtle/80 group-hover:text-accent transition-colors">
                  {activity.date}
                </span>
              </div>

              {/* Right Column: Content */}
              <div className="flex-grow">
                <div className="flex items-center gap-3 mb-2">
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 border border-subtle/20 rounded-[2px] text-[10px] font-mono uppercase tracking-wider text-subtle bg-white">
                    {getCategoryIcon(activity.category)}
                    {activity.category}
                  </span>
                </div>
                
                <h3 className="text-xl font-serif text-ink mb-3 leading-tight group-hover:text-black">
                  {activity.title}
                </h3>
                
                <p className="text-sm text-subtle font-sans leading-7 max-w-2xl">
                  {activity.summary}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="py-12 text-center">
             <span className="font-mono text-xs text-subtle">No activities found for category: {filter}</span>
          </div>
        )}
      </div>

      <ActivityGraph activities={filteredActivities} />
      
      <div className="mt-12 mb-8 pt-4 text-center">
        <span className="font-mono text-xs text-subtle opacity-50">END OF LOG</span>
      </div>

      <PageNavigation />
    </div>
  );
};

export default Activity;
