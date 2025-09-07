import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { ArrowLeft, Github, ExternalLink, Calendar, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const ProjectDetail = () => {
  const { id } = useParams();

  // Mock project data - in a real app this would come from an API or database
  const project = {
    id: 'gpu-ml-optimizer',
    title: 'GPU ML Optimizer',
    summary: 'High-performance CUDA kernels for optimizing neural network training on GPUs',
    description: `This project focuses on developing custom CUDA kernels to accelerate machine learning workloads, 
    specifically targeting neural network training optimization. The implementation includes memory-efficient 
    attention mechanisms, optimized matrix operations, and distributed training strategies.`,
    tags: ['CUDA', 'ML', 'Python'],
    stack: ['CUDA', 'Python', 'PyTorch', 'C++'],
    year: '2024',
    status: 'In Progress',
    links: {
      repo: 'https://github.com',
      demo: null
    },
    highlights: [
      '40% reduction in training time for transformer models',
      'Memory usage optimization reducing GPU memory requirements by 25%',
      'Custom CUDA kernels for attention mechanism acceleration',
      'Distributed training support across multiple GPUs'
    ],
    learnings: [
      'Deep understanding of GPU memory hierarchy and optimization strategies',
      'Advanced CUDA programming techniques for machine learning workloads',
      'Performance profiling and bottleneck identification in ML pipelines',
      'Distributed computing patterns for large-scale model training'
    ]
  };

  const handleLinkClick = (url, type) => {
    toast({
      title: "🚧 Link not implemented yet",
      description: "Don't worry! You can request it in your next prompt! 🚀",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <Helmet>
        <title>{project.title} - Projects</title>
        <meta name="description" content={project.summary} />
        <meta property="og:title" content={`${project.title} - Projects`} />
        <meta property="og:description" content={project.summary} />
      </Helmet>

      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Link to="/projects">
          <Button variant="ghost" className="flex items-center gap-2 mb-4">
            <ArrowLeft className="h-4 w-4" />
            Back to Projects
          </Button>
        </Link>
      </motion.div>

      {/* Header */}
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <h1 className="text-4xl font-bold tracking-tight">{project.title}</h1>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
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

          <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
            {project.summary}
          </p>

          <div className="flex gap-2">
            {project.links.repo && (
              <Button 
                variant="outline"
                onClick={() => handleLinkClick(project.links.repo, 'repo')}
                className="flex items-center gap-2"
              >
                <Github className="h-4 w-4" />
                View Code
              </Button>
            )}
            {project.links.demo && (
              <Button 
                variant="outline"
                onClick={() => handleLinkClick(project.links.demo, 'demo')}
                className="flex items-center gap-2"
              >
                <ExternalLink className="h-4 w-4" />
                Live Demo
              </Button>
            )}
          </div>
        </motion.div>
      </div>

      {/* Project Image Placeholder */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card>
          <CardContent className="p-0">
            <div className="aspect-video bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center">
              <img  alt="GPU ML Optimizer project visualization" src="https://images.unsplash.com/photo-1625296276703-3fbc924f07b5" />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              {project.description}
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Highlights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Key Highlights</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {project.highlights.map((highlight, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-muted-foreground leading-relaxed">{highlight}</span>
                </motion.li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </motion.div>

      {/* Tech Stack */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Technology Stack</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech, index) => (
                <motion.div
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                >
                  <Badge variant="secondary" className="text-sm py-1 px-3">
                    {tech}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Learnings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Notes & Learnings</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {project.learnings.map((learning, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-muted-foreground leading-relaxed">{learning}</span>
                </motion.li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default ProjectDetail;