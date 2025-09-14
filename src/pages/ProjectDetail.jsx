import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ArrowLeft, Github, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const ProjectDetail = () => {
  // Mock project data - in a real app this would come from an API or database
  const project = {
    title: "CUDA Memory Pool Optimizer",
    description: "Advanced memory pool allocation system for CUDA applications with automatic fragmentation detection and optimization strategies for improved GPU memory utilization.",
    longDescription: `This project implements a sophisticated memory pool management system specifically designed for CUDA applications. The system automatically detects memory fragmentation patterns and applies optimization strategies to improve GPU memory utilization efficiency.

Key innovations include dynamic pool resizing based on allocation patterns, predictive memory allocation using machine learning models, and automatic garbage collection optimization for CUDA contexts. The system has been tested with deep learning workloads and shows significant improvements in memory efficiency and training speed.

The implementation includes comprehensive benchmarking tools, integration with popular deep learning frameworks, and detailed documentation for adoption in production environments.`,
    technologies: ["CUDA", "C++", "Python", "CMake", "Docker"],
    github: "https://github.com/username/cuda-memory-optimizer",
    demo: "https://cuda-optimizer-demo.com",
    keyFeatures: [
      "Dynamic memory pool allocation with 40% efficiency improvement",
      "Machine learning-based predictive allocation algorithms", 
      "Automatic fragmentation detection and defragmentation",
      "Integration with TensorFlow, PyTorch, and CuDNN",
      "Comprehensive benchmarking and profiling tools"
    ],
    technicalDetails: [
      "Implemented custom CUDA memory allocator with pool-based strategy",
      "Developed fragmentation analysis algorithms for real-time monitoring",
      "Created Python bindings for seamless integration with ML frameworks",
      "Built comprehensive testing suite with automated benchmarks",
      "Designed modular architecture for easy extension and customization"
    ]
  };

  return (
    <div className="space-y-8">
      <Helmet>
        <title>{project.title} - Portfolio</title>
        <meta name="description" content={project.description} />
        <meta property="og:title" content={`${project.title} - Portfolio`} />
        <meta property="og:description" content={project.description} />
      </Helmet>

      {/* Navigation */}
      <div className="flex items-center gap-3">
        <Link to="/projects">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Projects
          </Button>
        </Link>
      </div>

      {/* Header */}
      <div className="space-y-6">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">
            {project.title}
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <Badge key={tech} variant="secondary">
              {tech}
            </Badge>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button asChild>
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="gap-2">
              <Github className="h-4 w-4" />
              View Code
            </a>
          </Button>
          <Button variant="outline" asChild>
            <a href={project.demo} target="_blank" rel="noopener noreferrer" className="gap-2">
              <ExternalLink className="h-4 w-4" />
              Live Demo
            </a>
          </Button>
        </div>
      </div>

      {/* Description */}
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Overview</h2>
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <div className="text-muted-foreground leading-relaxed whitespace-pre-line">
              {project.longDescription}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;