import React from 'react';
import { Helmet } from 'react-helmet';
import { ExternalLink, Github, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import researchData from '@/data/research.json';

const ResearchWorks = () => {

  return (
    <div className="space-y-8">
      <Helmet>
        <title>Research Works - Portfolio</title>
        <meta name="description" content="Showcase of research works in machine learning, computer vision, natural language processing, and distributed systems. Featuring publications and ongoing research projects." />
        <meta property="og:title" content="Research Works - Portfolio" />
        <meta property="og:description" content="Showcase of research works in machine learning, computer vision, natural language processing, and distributed systems. Featuring publications and ongoing research projects." />
      </Helmet>

      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
          Research
        </h1>
        <p className="text-muted-foreground">
          Academic research and publications.
        </p>
      </div>

      {/* Research Works List */}
      <div className="space-y-4">
        {researchData.map((work) => (
          <Card key={work.id} className="border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold">
                {work.title}
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground leading-relaxed">
                {work.description}
              </p>

              <div className="flex items-center gap-5">
                {work.demo && (
                  <a
                    href={work.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    Website
                  </a>
                )}
                {work.github && (
                  <a
                    href={work.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Github className="h-3.5 w-3.5" />
                    GitHub
                  </a>
                )}
                {work.paper && (
                  <a
                    href={work.paper}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <FileText className="h-3.5 w-3.5" />
                    Paper
                  </a>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ResearchWorks;