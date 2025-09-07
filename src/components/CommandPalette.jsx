import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, User, FolderOpen, Lightbulb, ExternalLink } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';

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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 max-w-lg command-backdrop">
        <div className="bg-popover border border-border rounded-lg shadow-2xl">
          {/* Search Input */}
          <div className="flex items-center border-b border-border px-4">
            <Search className="h-4 w-4 text-muted-foreground mr-3" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type a command or search..."
              className="flex-1 py-4 bg-transparent border-none outline-none text-sm placeholder:text-muted-foreground"
              autoFocus
            />
          </div>

          {/* Commands List */}
          <div className="max-h-80 overflow-y-auto p-2">
            <AnimatePresence>
              {filteredCommands.length > 0 ? (
                filteredCommands.map((command, index) => {
                  const Icon = command.icon;
                  return (
                    <motion.div
                      key={command.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => handleSelect(command)}
                      className="flex items-center gap-3 px-3 py-3 rounded-md hover:bg-accent cursor-pointer transition-colors"
                    >
                      <Icon className="h-4 w-4 text-muted-foreground" />
                      <div className="flex-1">
                        <div className="text-sm font-medium">{command.title}</div>
                        <div className="text-xs text-muted-foreground">{command.subtitle}</div>
                      </div>
                    </motion.div>
                  );
                })
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="px-3 py-8 text-center text-sm text-muted-foreground"
                >
                  No results found.
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CommandPalette;