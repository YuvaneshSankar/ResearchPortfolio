import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Tag, Calendar, Search, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Ideas = () => {
  const [ideas, setIdeas] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('all');

  // Load ideas from localStorage on component mount
  useEffect(() => {
    const savedIdeas = localStorage.getItem('portfolio-ideas');
    if (savedIdeas) {
      setIdeas(JSON.parse(savedIdeas));
    } else {
      // Initialize with some sample ideas
      const sampleIdeas = [
        {
          id: '1',
          title: 'GPU Memory Pool Optimization',
          content: 'Explore dynamic memory pool allocation strategies for CUDA applications to reduce memory fragmentation and improve performance.',
          tags: ['CUDA', 'Performance', 'Memory'],
          createdAt: new Date('2024-01-15').toISOString()
        },
        {
          id: '2',
          title: 'RL for Compiler Optimization',
          content: 'Use reinforcement learning to optimize compiler passes and instruction scheduling for better code generation.',
          tags: ['RL', 'Compilers', 'Optimization'],
          createdAt: new Date('2024-01-10').toISOString()
        },
        {
          id: '3',
          title: 'Distributed Attention Mechanism',
          content: 'Design a distributed attention mechanism that can scale across multiple GPUs while maintaining numerical stability.',
          tags: ['ML', 'Distributed', 'Attention'],
          createdAt: new Date('2024-01-05').toISOString()
        }
      ];
      setIdeas(sampleIdeas);
      localStorage.setItem('portfolio-ideas', JSON.stringify(sampleIdeas));
    }
  }, []);

  // Save ideas to localStorage whenever ideas change
  useEffect(() => {
    localStorage.setItem('portfolio-ideas', JSON.stringify(ideas));
  }, [ideas]);

  const handleDeleteIdea = (id) => {
    setIdeas(prev => prev.filter(idea => idea.id !== id));
  };

  const allTags = [...new Set(ideas.flatMap(idea => idea.tags))];

  const filteredIdeas = ideas.filter(idea => {
    const matchesSearch = idea.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         idea.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         idea.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesTag = selectedTag === 'all' || idea.tags.includes(selectedTag);
    
    return matchesSearch && matchesTag;
  });

  const groupedIdeas = filteredIdeas.reduce((groups, idea) => {
    idea.tags.forEach(tag => {
      if (!groups[tag]) groups[tag] = [];
      groups[tag].push(idea);
    });
    return groups;
  }, {});

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <Helmet>
        <title>Ideas - Portfolio</title>
        <meta name="description" content="Brain dump of research ideas, thoughts, and concepts in GPU computing, machine learning, and computer science. Quick capture and organization of innovative concepts." />
        <meta property="og:title" content="Ideas - Portfolio" />
        <meta property="og:description" content="Brain dump of research ideas, thoughts, and concepts in GPU computing, machine learning, and computer science. Quick capture and organization of innovative concepts." />
      </Helmet>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-4">
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-bold tracking-tight"
          >
            Ideas
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-muted-foreground max-w-3xl leading-relaxed"
          >
            A lightweight brain dump for capturing research ideas, thoughts, and concepts 
            as they come to mind.
          </motion.p>
        </div>
      </div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search ideas..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Tag Filter */}
              <div>
                <span className="text-sm font-medium text-muted-foreground mb-2 block">Filter by tag</span>
                <div className="flex flex-wrap gap-2">
                  <Badge
                    variant={selectedTag === 'all' ? "default" : "outline"}
                    className="cursor-pointer hover:bg-accent"
                    onClick={() => setSelectedTag('all')}
                  >
                    All ({ideas.length})
                  </Badge>
                  {allTags.map(tag => {
                    const count = ideas.filter(idea => idea.tags.includes(tag)).length;
                    return (
                      <Badge
                        key={tag}
                        variant={selectedTag === tag ? "default" : "outline"}
                        className="cursor-pointer hover:bg-accent"
                        onClick={() => setSelectedTag(tag)}
                      >
                        {tag} ({count})
                      </Badge>
                    );
                  })}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Ideas List */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="space-y-6"
      >
        {selectedTag === 'all' ? (
          // Show all ideas chronologically
          <div className="space-y-4">
            <AnimatePresence>
              {filteredIdeas.map((idea, index) => (
                <motion.div
                  key={idea.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-lg">{idea.title}</CardTitle>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteIdea(idea.id)}
                          className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {new Date(idea.createdAt).toLocaleDateString()}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-muted-foreground leading-relaxed">
                        {idea.content}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {idea.tags.map(tag => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          // Show ideas grouped by tags
          <div className="space-y-6">
            {Object.entries(groupedIdeas).map(([tag, tagIdeas]) => (
              <motion.div
                key={tag}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4" />
                  <h2 className="text-xl font-semibold">{tag}</h2>
                  <Badge variant="outline">{tagIdeas.length}</Badge>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  {tagIdeas.map(idea => (
                    <Card key={idea.id} className="hover:shadow-md transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <CardTitle className="text-lg">{idea.title}</CardTitle>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteIdea(idea.id)}
                            className="h-8 w-8 text-muted-foreground hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          {new Date(idea.createdAt).toLocaleDateString()}
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <p className="text-muted-foreground leading-relaxed">
                          {idea.content}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {idea.tags.map(tagName => (
                            <Badge key={tagName} variant="secondary" className="text-xs">
                              {tagName}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {filteredIdeas.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-muted-foreground">
              {searchQuery || selectedTag !== 'all' 
                ? 'No ideas match your search criteria.' 
                : 'No ideas yet. Start by adding your first idea!'}
            </p>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Ideas;