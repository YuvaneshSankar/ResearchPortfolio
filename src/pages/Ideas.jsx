import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ideasData from '@/data/ideas.json';

const Ideas = () => {
  const [ideas] = useState(ideasData);

  return (
    <div className="space-y-8">
      <Helmet>
        <title>Ideas - Portfolio</title>
        <meta name="description" content="Brain dump of research ideas, thoughts, and concepts in GPU computing, machine learning, and computer science. Quick capture and organization of innovative concepts." />
        <meta property="og:title" content="Ideas - Portfolio" />
        <meta property="og:description" content="Brain dump of research ideas, thoughts, and concepts in GPU computing, machine learning, and computer science. Quick capture and organization of innovative concepts." />
      </Helmet>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">
            Ideas
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
            A lightweight brain dump for capturing research ideas, thoughts, and concepts
            as they come to mind.
          </p>
        </div>
      </div>

      {/* Ideas List */}
      <div className="space-y-6">
        <div className="space-y-4">
          {ideas.map((idea, index) => (
              <div key={idea.id}>
                <Card className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">
                      <Link
                        to={`/ideas/${idea.id}`}
                        className="hover:text-primary transition-colors cursor-pointer"
                      >
                        {idea.title}
                      </Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-muted-foreground leading-relaxed">
                      {idea.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

        {ideas.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No ideas yet. Start by adding your first idea!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Ideas;