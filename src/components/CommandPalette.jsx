import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, User, FolderOpen, Lightbulb, ExternalLink, BookOpen } from 'lucide-react';
import * as DialogPrimitive from '@radix-ui/react-dialog';

const CommandPalette = ({ open, onOpenChange }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const commands = [
    {
      id: 'about',
      title: 'About',
      subtitle: 'Personal bio and research interests',
      icon: User,
      action: () => navigate('/about'),
    },
    {
      id: 'projects',
      title: 'Projects',
      subtitle: 'View all projects and work',
      icon: FolderOpen,
      action: () => navigate('/projects'),
    },
    {
      id: 'research',
      title: 'Research Works',
      subtitle: 'View research publications and studies',
      icon: BookOpen,
      action: () => navigate('/research'),
    },
    {
      id: 'ideas',
      title: 'Ideas',
      subtitle: 'Brain dump and thoughts',
      icon: Lightbulb,
      action: () => navigate('/ideas'),
    },
    {
      id: 'github',
      title: 'GitHub',
      subtitle: 'View GitHub profile',
      icon: ExternalLink,
      action: () => window.open('https://github.com', '_blank'),
    },
    {
      id: 'linkedin',
      title: 'LinkedIn',
      subtitle: 'Connect on LinkedIn',
      icon: ExternalLink,
      action: () => window.open('https://linkedin.com', '_blank'),
    },
  ];

  const filteredCommands = commands.filter(command =>
    command.title.toLowerCase().includes(query.toLowerCase()) ||
    command.subtitle.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (command) => {
    command.action();
    onOpenChange(false);
    setQuery('');
  };

  useEffect(() => {
    if (!open) {
      setQuery('');
    }
  }, [open]);

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Content
          className="fixed left-[50%] top-[50%] z-50 translate-x-[-50%] translate-y-[-50%] p-0 max-w-lg bg-black border-gray-700 text-white border rounded-lg shadow-2xl"
        >
          <div className="bg-black border border-gray-700 rounded-lg shadow-2xl">
          {/* Search Input */}
          <div className="flex items-center border-b border-gray-700 px-4">
            <Search className="h-4 w-4 text-gray-400 mr-3" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type a command or search..."
              className="flex-1 py-4 bg-transparent border-none outline-none text-sm placeholder:text-gray-500 text-white"
              autoFocus
            />
          </div>

          {/* Commands List */}
          <div className="max-h-80 overflow-y-auto p-2">
            {filteredCommands.length > 0 ? (
              filteredCommands.map((command, index) => {
                const Icon = command.icon;
                return (
                  <div
                    key={command.id}
                    onClick={() => handleSelect(command)}
                    className="flex items-center gap-3 px-3 py-3 rounded-md hover:bg-gray-800 cursor-pointer transition-colors"
                  >
                    <Icon className="h-4 w-4 text-gray-400" />
                    <div className="flex-1">
                      <div className="text-sm font-medium text-white">{command.title}</div>
                      <div className="text-xs text-gray-400">{command.subtitle}</div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div
                className="px-3 py-8 text-center text-sm text-gray-400"
              >
                No results found.
              </div>
            )}
          </div>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};

export default CommandPalette;