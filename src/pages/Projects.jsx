import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ExternalLink, Github } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import projectsData from '@/data/projects.json';

const Projects = () => {

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
        {projectsData.map((project) => (
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
                    {project.github && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        asChild
                        className="h-8 w-8 p-0"
                      >
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          <Github className="h-3 w-3" />
                        </a>
                      </Button>
                    )}
                    {project.demo && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        asChild
                        className="h-8 w-8 p-0"
                      >
                        <a href={project.demo} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </Button>
                    )}
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