import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ExternalLink, Github } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const Projects = () => {
  const projects = [
    {
      id: 'gpu-ml-optimizer',
      title: 'GPU-ML Optimizer',
      description: 'A CUDA-accelerated machine learning library optimizing neural network training and inference through custom kernels and memory management techniques.',
      tech: ['CUDA', 'C++', 'Python', 'PyTorch'],
      category: 'Machine Learning'
    },
    {
      id: 'distributed-rl-system',
      title: 'Distributed RL System',
      description: 'Scalable reinforcement learning framework using distributed computing with MPI and custom communication protocols for large-scale environments.',
      tech: ['Python', 'MPI', 'TensorFlow', 'Docker'],
      category: 'Distributed Systems'
    },
    {
      id: 'cuda-graph-algorithms',
      title: 'CUDA Graph Algorithms',
      description: 'High-performance graph processing library implementing parallel algorithms for shortest path, centrality measures, and community detection on GPU.',
      tech: ['CUDA', 'C++', 'Thrust', 'NetworkX'],
      category: 'GPU Computing'
    },
    {
      id: 'ml-model-compression',
      title: 'ML Model Compression',
      description: 'Research project exploring neural network pruning, quantization, and knowledge distillation techniques for edge device deployment.',
      tech: ['PyTorch', 'TensorRT', 'ONNX', 'Python'],
      category: 'Machine Learning'
    },
    {
      id: 'real-time-object-detection',
      title: 'Real-time Object Detection',
      description: 'Optimized YOLO implementation with CUDA acceleration for real-time inference on edge devices and embedded systems.',
      tech: ['CUDA', 'OpenCV', 'TensorRT', 'C++'],
      category: 'Computer Vision'
    },
    {
      id: 'portfolio-website',
      title: 'Portfolio Website',
      description: 'Modern, responsive portfolio website built with React and Tailwind CSS, featuring smooth animations and dark mode support.',
      tech: ['React', 'Tailwind CSS', 'Framer Motion', 'Vite'],
      category: 'Web Development'
    }
  ];

  const handleLinkClick = () => {
    console.log("Link clicked - implementation placeholder");
  };

  return (
    <div className="space-y-8">
      <Helmet>
        <title>Projects - Portfolio</title>
        <meta name="description" content="Showcase of projects in GPU computing, machine learning, systems programming, and web development. Featuring CUDA, reinforcement learning, and distributed systems work." />
        <meta property="og:title" content="Projects - Portfolio" />
        <meta property="og:description" content="Showcase of projects in GPU computing, machine learning, systems programming, and web development. Featuring CUDA, reinforcement learning, and distributed systems work." />
      </Helmet>

      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">
          Projects
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
          A collection of software engineering projects showcasing my expertise in machine learning, 
          distributed systems, and performance optimization.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="group">
            <Card className="h-full transition-all duration-300 hover:shadow-lg border-border/50 hover:border-border">
              <CardHeader>
                <CardTitle className="flex items-start justify-between gap-4">
                  <Link 
                    to={`/projects/${project.id}`}
                    className="text-lg font-semibold group-hover:text-primary transition-colors hover:text-blue-400 cursor-pointer"
                  >
                    {project.title}
                  </Link>
                  <div className="flex gap-2 flex-shrink-0">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handleLinkClick}
                      className="h-8 w-8 p-0"
                    >
                      <Github className="h-3 w-3" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handleLinkClick}
                      className="h-8 w-8 p-0"
                    >
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1">
                  {project.tech.map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;