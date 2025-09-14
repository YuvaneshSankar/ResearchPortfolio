import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Sidebar from '@/components/Sidebar';
import TopBar from '@/components/TopBar';
import CommandPalette from '@/components/CommandPalette';
import About from '@/pages/About';
import Projects from '@/pages/Projects';
import ProjectDetail from '@/pages/ProjectDetail';
import ResearchWorks from '@/pages/ResearchWorks';
import Ideas from '@/pages/Ideas';
import Toaster from '@/components/ui/toaster';

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  // Save dark mode preference to localStorage
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandOpen(true);
      }
      if (e.key === 'Escape') {
        setCommandOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <Router>
      <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
        <Helmet>
          <title>Portfolio - Developer & Researcher</title>
          <meta name="description" content="Personal portfolio showcasing projects, research interests, and ideas in computer science, GPU computing, and machine learning." />
          <meta property="og:title" content="Portfolio - Developer & Researcher" />
          <meta property="og:description" content="Personal portfolio showcasing projects, research interests, and ideas in computer science, GPU computing, and machine learning." />
        </Helmet>
        
        <div className="flex h-screen bg-background text-foreground">
          <Sidebar 
            collapsed={sidebarCollapsed} 
            onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
            onCommandOpen={() => setCommandOpen(true)}
          />
          
          <div className="flex-1 flex flex-col overflow-hidden">
            <TopBar 
              darkMode={darkMode}
              onToggleDarkMode={() => setDarkMode(!darkMode)}
              onCommandOpen={() => setCommandOpen(true)}
            />
            
            <main className="flex-1 overflow-auto">
              <div className="max-w-4xl mx-auto px-6 py-8">
                <Routes>
                  <Route path="/" element={<About />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/projects/:id" element={<ProjectDetail />} />
                  <Route path="/research" element={<ResearchWorks />} />
                  <Route path="/research/:id" element={<ProjectDetail />} />
                  <Route path="/ideas" element={<Ideas />} />
                </Routes>
              </div>
            </main>
          </div>
        </div>

        <CommandPalette 
          open={commandOpen} 
          onOpenChange={setCommandOpen}
        />
        
        <Toaster />
      </div>
    </Router>
  );
}

export default App;