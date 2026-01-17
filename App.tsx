import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import MobileNav from './components/MobileNav';
import Overview from './pages/Overview';
import ProjectDetail from './pages/ProjectDetail';
import Resume from './pages/Resume';
import Contact from './pages/Contact';
import Documentation from './pages/Documentation';

// Layout wrapper component
const Layout = ({ children }: { children?: React.ReactNode }) => {
  const [easterEgg, setEasterEgg] = useState(false);

  return (
    <div className="min-h-screen bg-paper text-ink font-sans selection:bg-accent/20">
      <Sidebar />
      <MobileNav />
      <main className="md:ml-64 min-h-screen">
        <div className="max-w-5xl mx-auto px-6 py-20 md:py-24">
          {children}
        </div>
      </main>
      
      {/* Subtle Easter Egg: Bottom right corner pixel */}
      <div 
        className="fixed bottom-0 right-0 w-4 h-4 z-50 cursor-default opacity-0 hover:opacity-100 transition-opacity"
        onClick={() => {
            console.log("System Integrity: 100%. Welcome, traveler.");
            setEasterEgg(true);
        }}
        title="v1.0.0"
      >
        <div className="w-1 h-1 bg-subtle/20 m-1 rounded-full"></div>
      </div>
      
      {easterEgg && (
        <div className="fixed bottom-4 right-4 bg-ink text-paper text-[10px] font-mono p-2 rounded animate-fade-in shadow-lg">
           Wait, you actually found this? Nice.
           <button onClick={() => setEasterEgg(false)} className="ml-2 text-subtle hover:text-white underline">Close</button>
        </div>
      )}
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/projects" element={<Overview />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/documentation" element={<Documentation />} />
          <Route path="/documentation/:slug" element={<Documentation />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;