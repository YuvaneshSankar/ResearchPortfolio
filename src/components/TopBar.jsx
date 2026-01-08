import React from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

const TopBar = ({ onMobileMenuToggle }) => {
  return (
    <header className="h-14 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border/50">
      <div className="flex items-center justify-between h-full px-4 sm:px-6">
        <div className="flex items-center gap-4">
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onMobileMenuToggle}
            className="lg:hidden h-9 w-9"
          >
            <Menu className="h-5 w-5" />
          </Button>

          {/* Logo/Title for mobile */}
          <h1 className="text-base font-semibold lg:hidden">
            Portfolio
          </h1>
        </div>

        <div className="flex items-center gap-2">
          {/* Future: Search or other controls */}
        </div>
      </div>
    </header>
  );
};

export default TopBar;