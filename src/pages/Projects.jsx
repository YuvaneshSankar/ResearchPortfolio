import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { ExternalLink, Github, Calendar, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const Projects = () => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const allTags = ['CUDA', 'RL', 'ML', 'Diffusion','DataAnalysis'];
  const years = ['2024', '2023', '2022'];
  const statuses = ['Completed', 'In Progress', 'Research'];

  const projects = [
    {
      id: 'gpu-ml-optimizer',
      title: 'GPU ML Optimizer',
      summary: 'High-performance CUDA kernels for optimizing neural network training on GPUs',
      tags: ['CUDA', 'ML', 'Python'],
      stack: ['CUDA', 'Python', 'PyTorch', 'C++'],
      year: '2024',
      status: 'In Progress',
      links: {
        repo: 'https://github.com',
        demo: null
      }
    },
    {
      id: 'rl-distributed',
      title: 'Distributed RL Framework',
      summary: 'Scalable reinforcement learning framework for multi-agent environments',
      tags: ['RL', 'Systems', 'Python'],
      stack: ['Python', 'Ray', 'PyTorch', 'Redis'],
      year: '2024',
      status: 'Research',
      links: {
        repo: 'https://github.com',
        demo: 'https://demo.com'
      }
    },
    {
      id: 'diffusion-cuda',
      title: 'CUDA Diffusion Models',
      summary: 'Optimized diffusion model implementations using custom CUDA kernels',
      tags: ['CUDA', 'Diffusion', 'ML'],
      stack: ['CUDA', 'Python', 'JAX'],
      year: '2023',
      status: 'Completed',
      links: {
        repo: 'https://github.com',
        demo: null
      }
    },
    {
      id: 'portfolio-site',
      title: 'Portfolio Website',
      summary: 'Notion-inspired portfolio built with React and modern web technologies',
      tags: ['Web', 'React'],
      stack: ['React', 'TailwindCSS', 'Framer Motion'],
      year: '2024',
      status: 'Completed',
      links: {
        repo: 'https://github.com',
        demo: 'https://portfolio.com'
      }
    },
    {
      id: 'rust-compute',
      title: 'Rust Compute Engine',
      summary: 'High-performance compute engine written in Rust for scientific computing',
      tags: ['Rust', 'Systems'],
      stack: ['Rust', 'WGPU', 'Tokio'],
      year: '2023',
      status: 'In Progress',
      links: {
        repo: 'https://github.com',
        demo: null
      }
    },
    {
      id: 'go-microservices',
      title: 'Go Microservices',
      summary: 'Microservices architecture for ML model serving and inference',
      tags: ['Go', 'Systems', 'ML'],
      stack: ['Go', 'Docker', 'Kubernetes', 'gRPC'],
      year: '2022',
      status: 'Completed',
      links: {
        repo: 'https://github.com',
        demo: null
      }
    }
  ];

  const handleTagToggle = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleLinkClick = (url, type) => {
    toast({
      title: "🚧 Link not implemented yet",
      description: "Don't worry! You can request it in your next prompt! 🚀",
    });
  };

  const filteredProjects = projects.filter(project => {
    const tagMatch = selectedTags.length === 0 || selectedTags.some(tag => project.tags.includes(tag));
    const yearMatch = selectedYear === 'all' || project.year === selectedYear;
    const statusMatch = selectedStatus === 'all' || project.status === selectedStatus;
    return tagMatch && yearMatch && statusMatch;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <Helmet>
        <title>Projects - Portfolio</title>
        <meta name="description" content="Showcase of projects in GPU computing, machine learning, systems programming, and web development. Featuring CUDA, reinforcement learning, and distributed systems work." />
        <meta property="og:title" content="Projects - Portfolio" />
        <meta property="og:description" content="Showcase of projects in GPU computing, machine learning, systems programming, and web development. Featuring CUDA, reinforcement learning, and distributed systems work." />
      </Helmet>

      {/* Header */}
      <div className="space-y-4">
        <motion.h1 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-4xl font-bold tracking-tight"
        >
          Projects
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-muted-foreground max-w-3xl leading-relaxed"
        >
          A collection of research projects, experiments, and implementations spanning 
          GPU computing, machine learning, and systems programming.
        </motion.p>
      </div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="h-4 w-4" />
              <span className="font-medium">Filters</span>
            </div>
            
            {/* Tags */}
            <div className="space-y-4">
              <div>
                <span className="text-sm font-medium text-muted-foreground mb-2 block">Tags</span>
                <div className="flex flex-wrap gap-2">
                  {allTags.map(tag => (
                    <Badge
                      key={tag}
                      variant={selectedTags.includes(tag) ? "default" : "outline"}
                      className="cursor-pointer hover:bg-accent"
                      onClick={() => handleTagToggle(tag)}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Year and Status */}
              <div className="flex gap-6">
                <div>
                  <span className="text-sm font-medium text-muted-foreground mb-2 block">Year</span>
                  <div className="flex gap-2">
                    <Badge
                      variant={selectedYear === 'all' ? "default" : "outline"}
                      className="cursor-pointer hover:bg-accent"
                      onClick={() => setSelectedYear('all')}
                    >
                      All
                    </Badge>
                    {years.map(year => (
                      <Badge
                        key={year}
                        variant={selectedYear === year ? "default" : "outline"}
                        className="cursor-pointer hover:bg-accent"
                        onClick={() => setSelectedYear(year)}
                      >
                        {year}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-sm font-medium text-muted-foreground mb-2 block">Status</span>
                  <div className="flex gap-2">
                    <Badge
                      variant={selectedStatus === 'all' ? "default" : "outline"}
                      className="cursor-pointer hover:bg-accent"
                      onClick={() => setSelectedStatus('all')}
                    >
                      All
                    </Badge>
                    {statuses.map(status => (
                      <Badge
                        key={status}
                        variant={selectedStatus === status ? "default" : "outline"}
                        className="cursor-pointer hover:bg-accent"
                        onClick={() => setSelectedStatus(status)}
                      >
                        {status}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Projects Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="grid gap-6 md:grid-cols-2"
      >
        {filteredProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + index * 0.1 }}
          >
            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="text-xl">
                      <Link 
                        to={`/projects/${project.id}`}
                        className="hover:text-blue-400 transition-colors"
                      >
                        {project.title}
                      </Link>
                    </CardTitle>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {project.year}
                      </div>
                      <Badge 
                        variant="outline" 
                        className={
                          project.status === 'Completed' ? 'border-green-500/50 text-green-400' :
                          project.status === 'In Progress' ? 'border-blue-500/50 text-blue-400' :
                          'border-yellow-500/50 text-yellow-400'
                        }
                      >
                        {project.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  {project.summary}
                </p>
                
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-medium text-muted-foreground mb-2 block">Tags</span>
                    <div className="flex flex-wrap gap-1">
                      {project.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <span className="text-sm font-medium text-muted-foreground mb-2 block">Tech Stack</span>
                    <div className="flex flex-wrap gap-1">
                      {project.stack.map(tech => (
                        <Badge key={tech} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2 pt-2">
                  {project.links.repo && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleLinkClick(project.links.repo, 'repo')}
                      className="flex items-center gap-1"
                    >
                      <Github className="h-3 w-3" />
                      Code
                    </Button>
                  )}
                  {project.links.demo && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleLinkClick(project.links.demo, 'demo')}
                      className="flex items-center gap-1"
                    >
                      <ExternalLink className="h-3 w-3" />
                      Demo
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {filteredProjects.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <p className="text-muted-foreground">No projects match the selected filters.</p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Projects;