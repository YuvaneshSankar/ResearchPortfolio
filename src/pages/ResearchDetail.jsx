import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ArrowLeft, Github, ExternalLink, FileText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import researchData from '@/data/research.json';

const ResearchDetail = () => {
  const { id } = useParams();
  const research = researchData.find(r => r.id === id);

  if (!research) {
    return (
      <div className="space-y-8">
        <div className="flex items-center gap-3">
          <Link to="/research">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Research Works
            </Button>
          </Link>
        </div>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-4">Research Work Not Found</h1>
          <p className="text-muted-foreground">The requested research work could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <Helmet>
        <title>{research.title} - Research Works</title>
        <meta name="description" content={research.description} />
        <meta property="og:title" content={`${research.title} - Research Works`} />
        <meta property="og:description" content={research.description} />
      </Helmet>

      {/* Navigation */}
      <div className="flex items-center gap-3">
        <Link to="/research">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Research Works
          </Button>
        </Link>
      </div>

      {/* Header */}
      <div className="space-y-6">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">
            {research.title}
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            {research.description}
          </p>
        </div>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2">
          {research.tech.map((tech) => (
            <Badge key={tech} variant="secondary">
              {tech}
            </Badge>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          {research.github && (
            <Button asChild>
              <a href={research.github} target="_blank" rel="noopener noreferrer" className="gap-2">
                <Github className="h-4 w-4" />
                View Code
              </a>
            </Button>
          )}
          {research.demo && (
            <Button variant="outline" asChild>
              <a href={research.demo} target="_blank" rel="noopener noreferrer" className="gap-2">
                <ExternalLink className="h-4 w-4" />
                Live Demo
              </a>
            </Button>
          )}
          {research.paper && (
            <Button variant="outline" asChild>
              <a href={research.paper} target="_blank" rel="noopener noreferrer" className="gap-2">
                <FileText className="h-4 w-4" />
                Research Paper
              </a>
            </Button>
          )}
        </div>
      </div>

      {/* Overview */}
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Research Overview</h2>
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <div className="text-muted-foreground leading-relaxed whitespace-pre-line">
              {research.overview}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResearchDetail;