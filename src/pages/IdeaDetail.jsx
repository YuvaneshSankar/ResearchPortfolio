import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ArrowLeft, Calendar, Tag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import ideasData from '@/data/ideas.json';

const IdeaDetail = () => {
  const { id } = useParams();
  const idea = ideasData.find(p => p.id === id);

  if (!idea) {
    return (
      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <Link to="/ideas" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Ideas
          </Link>
        </div>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-muted-foreground">Idea not found</h1>
          <p className="text-muted-foreground mt-2">The idea you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <Helmet>
        <title>{idea.title} - Ideas</title>
        <meta name="description" content={idea.description} />
        <meta property="og:title" content={`${idea.title} - Ideas`} />
        <meta property="og:description" content={idea.description} />
      </Helmet>

      {/* Navigation */}
      <div className="flex items-center gap-4">
        <Link to="/ideas" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" />
          Back to Ideas
        </Link>
      </div>

      {/* Header */}
      <div className="space-y-6">
        <div className="space-y-4">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            {idea.title}
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
            {idea.description}
          </p>
        </div>

        {/* Metadata */}
        <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-4 sm:gap-6">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span className="text-sm sm:text-base">Created {new Date(idea.createdAt).toLocaleDateString()}</span>
          </div>
          <div className="flex items-start gap-2">
            <Tag className="h-4 w-4 text-muted-foreground mt-1" />
            <div className="flex flex-wrap gap-2">
              {idea.tags.map(tag => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Idea Section */}
      <div className="space-y-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">Main Idea</h2>
          <div className="prose prose-sm sm:prose-lg max-w-none text-muted-foreground">
            {idea.mainIdea.split('\n\n').map((paragraph, index) => (
              <p key={index} className="mb-4 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Work Done Section */}
      <div className="space-y-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">Work Done Till Now</h2>
          <div className="prose prose-sm sm:prose-lg max-w-none text-muted-foreground">
            {idea.workDone.split('\n').map((item, index) => {
              const trimmedItem = item.trim();
              if (trimmedItem === '') return null;

              if (trimmedItem.startsWith('•')) {
                // Handle bullet points
                return (
                  <div key={index} className="flex items-start gap-3 mb-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p className="leading-relaxed">
                      {trimmedItem.substring(1).trim()}
                    </p>
                  </div>
                );
              } else {
                // Handle regular paragraphs
                return (
                  <p key={index} className="mb-4 leading-relaxed">
                    {trimmedItem}
                  </p>
                );
              }
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdeaDetail;