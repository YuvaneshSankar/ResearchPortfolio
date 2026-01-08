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
import ResearchDetail from '@/pages/ResearchDetail';
import Ideas from '@/pages/Ideas';
import IdeaDetail from '@/pages/IdeaDetail';
import Blogs from '@/pages/Blogs';
import BlogDetail from '@/pages/BlogDetail';
import Toaster from '@/components/ui/toaster';

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    // Default to dark mode when there's no saved preference
    return saved ? JSON.parse(saved) : true;
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

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  return (
    <Router>
      <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
        <Helmet>
          <title>Portfolio - Developer & Researcher</title>
          <meta name="description" content="Personal portfolio showcasing projects, research interests, and ideas in computer science, GPU computing, and machine learning." />
          <meta property="og:title" content="Portfolio - Developer & Researcher" />
          <meta property="og:description" content="Personal portfolio showcasing projects, research interests, and ideas in computer science, GPU computing, and machine learning." />
        </Helmet>

        {/* Background image with fade effect */}
        <div className="fixed inset-0 bg-image-fade pointer-events-none z-0" />

        <div className="flex h-screen bg-background text-foreground relative z-10">
          <Sidebar
            collapsed={sidebarCollapsed}
            onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
            onCommandOpen={() => setCommandOpen(true)}
            mobileMenuOpen={mobileMenuOpen}
            onMobileMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
          />

          <div className="flex-1 flex flex-col overflow-hidden w-full lg:w-auto">
            <TopBar
              onCommandOpen={() => setCommandOpen(true)}
              onMobileMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
            />

            <main className="flex-1 overflow-auto">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
                <Routes>
                  <Route path="/" element={<About />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/projects/:id" element={<ProjectDetail />} />
                  <Route path="/research" element={<ResearchWorks />} />
                  <Route path="/research/:id" element={<ResearchDetail />} />
                  <Route path="/ideas" element={<Ideas />} />
                  <Route path="/ideas/:id" element={<IdeaDetail />} />
                  <Route path="/blogs" element={<Blogs />} />
                  <Route path="/blogs/:id" element={<BlogDetail />} />
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