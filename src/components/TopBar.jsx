import React from 'react';

const TopBar = () => {
  return (
    <header className="h-14 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center justify-between h-full px-6">
        <div className="flex items-center gap-4">
          {/* Breadcrumb could go here */}
        </div>

        <div className="flex items-center gap-2">
          {/* Search button removed */}
        </div>
      </div>
    </header>
  );
};

export default TopBar;