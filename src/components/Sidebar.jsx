import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User, FolderOpen, Lightbulb, Search, Menu, X, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Sidebar = ({ collapsed, onToggle, onCommandOpen }) => {
  const location = useLocation();

  const navItems = [
    { path: '/about', icon: User, label: 'About' },
    { path: '/projects', icon: FolderOpen, label: 'Projects' },
    { path: '/research', icon: BookOpen, label: 'Research Works' },
    { path: '/ideas', icon: Lightbulb, label: 'Ideas' },
  ];

  return (
    <aside 
      className={`bg-card border-r border-border flex flex-col transition-all duration-200 ease-in-out ${
        collapsed ? 'w-[60px]' : 'w-[240px]'
      }`}
    >
      {/* Header */}
      <div className="p-4 border-b border-border">
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
            className="h-8 w-8"
          >
            {collapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2">
        <div className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path || 
              (item.path === '/about' && location.pathname === '/');
            
            return (
              <Link key={item.path} to={item.path}>
                <div className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors hover:scale-105 ${
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
        <div className="mt-6">
          <Button
            variant="ghost"
            onClick={onCommandOpen}
            className={`w-full justify-start gap-3 ${collapsed ? 'px-3' : ''}`}
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
  );
};

export default Sidebar;