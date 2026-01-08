import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ArrowLeft, Github, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import projectsData from '@/data/projects.json';

const ProjectDetail = () => {
  const { id } = useParams();
  const project = projectsData.find(p => p.id === id);

  if (!project) {
    return (
      <div className="space-y-8">
        <div className="flex items-center gap-3">
          <Link to="/projects">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Projects
            </Button>
          </Link>
        </div>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
          <p className="text-muted-foreground">The requested project could not be found.</p>
        </div>
      </div>
    );
  }

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
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            {project.title}
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <Badge key={tech} variant="secondary">
              {tech}
            </Badge>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          {project.github && (
            <Button asChild>
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="gap-2">
                <Github className="h-4 w-4" />
                View Code
              </a>
            </Button>
          )}
          {project.demo && (
            <Button variant="outline" asChild>
              <a href={project.demo} target="_blank" rel="noopener noreferrer" className="gap-2">
                <ExternalLink className="h-4 w-4" />
                Website
              </a>
            </Button>
          )}
        </div>
      </div>

      {/* Description */}
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Overview</h2>
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <div className="text-muted-foreground leading-relaxed whitespace-pre-line">
              {project.overview}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;