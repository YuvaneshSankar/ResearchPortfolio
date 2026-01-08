import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User, FolderOpen, Lightbulb, Search, Menu, X, BookOpen, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Sidebar = ({ collapsed, onToggle, onCommandOpen, mobileMenuOpen, onMobileMenuToggle }) => {
  const location = useLocation();

  const navItems = [
    { path: '/about', icon: User, label: 'About' },
    { path: '/projects', icon: FolderOpen, label: 'Projects' },
    { path: '/research', icon: BookOpen, label: 'Research Works' },
    { path: '/ideas', icon: Lightbulb, label: 'Ideas' },
    { path: '/blogs', icon: FileText, label: 'Blogs' },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onMobileMenuToggle}
        />
      )}

      {/* Sidebar Container */}
      <div className={`
        flex items-center h-screen
        lg:p-12 p-0
        fixed lg:relative
        z-50 lg:z-auto
        transition-transform duration-300 ease-in-out
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <aside
          className={`bg-card/95 backdrop-blur-sm border border-border lg:rounded-2xl rounded-none flex flex-col transition-all duration-200 ease-in-out shadow-lg h-full lg:h-auto ${
            collapsed ? 'lg:w-[60px] w-[220px]' : 'w-[220px]'
          }`}
        >
          {/* Header */}
          <div className="p-4 border-b border-border/50">
            <div className="flex items-center justify-between">
              {!collapsed && (
                <h1 className="text-lg font-semibold">
                  Portfolio
                </h1>
              )}
              <Button
                variant="ghost"
                size="icon"
                onClick={onToggle}
                className="h-8 w-8 hidden lg:flex"
              >
                {collapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={onMobileMenuToggle}
                className="h-8 w-8 lg:hidden"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

        {/* Navigation */}
        <nav className="p-3">
          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path ||
                (item.path === '/about' && location.pathname === '/');

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => {
                    // Close mobile menu when navigating
                    if (mobileMenuOpen) {
                      onMobileMenuToggle();
                    }
                  }}
                >
                  <div className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-accent text-accent-foreground'
                        : 'hover:bg-accent/50'
                    }`}
                  >
                    <Icon className="h-4 w-4 flex-shrink-0" />
                    {!collapsed && (
                      <span className="text-sm font-medium">
                        {item.label}
                      </span>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Search */}
          <div className="mt-6 pb-2">
            <Button
              variant="ghost"
              onClick={onCommandOpen}
              className={`w-full justify-start gap-3 h-10 ${collapsed ? 'px-3' : ''}`}
            >
              <Search className="h-4 w-4 flex-shrink-0" />
              {!collapsed && (
                <div className="flex items-center justify-between w-full">
                  <span className="text-sm text-muted-foreground">Search</span>
                  <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                    <span className="text-xs">⌘</span>K
                  </kbd>
                </div>
              )}
            </Button>
          </div>
        </nav>
      </aside>
    </div>
    </>
  );
};

export default Sidebar;