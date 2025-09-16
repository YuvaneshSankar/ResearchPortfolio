import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Tag, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ideasData from '@/data/ideas.json';

const Ideas = () => {
  const [ideas] = useState(ideasData);
  const [selectedTag, setSelectedTag] = useState('all');

  const allTags = [...new Set(ideas.flatMap(idea => idea.tags))];

  const filteredIdeas = ideas.filter(idea => {
    const matchesTag = selectedTag === 'all' || idea.tags.includes(selectedTag);
    return matchesTag;
  });

  const groupedIdeas = filteredIdeas.reduce((groups, idea) => {
    idea.tags.forEach(tag => {
      if (!groups[tag]) groups[tag] = [];
      groups[tag].push(idea);
    });
    return groups;
  }, {});

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

      {/* Tag Filters */}
      <div>
        <Card>
          <CardContent className="p-6">
            <div>
              <span className="text-sm font-medium text-muted-foreground mb-2 block">Filter by tag</span>
              <div className="flex flex-wrap gap-2">
                <Badge
                  variant={selectedTag === 'all' ? "default" : "outline"}
                  className="cursor-pointer hover:bg-accent"
                  onClick={() => setSelectedTag('all')}
                >
                  All ({ideas.length})
                </Badge>
                {allTags.map(tag => {
                  const count = ideas.filter(idea => idea.tags.includes(tag)).length;
                  return (
                    <Badge
                      key={tag}
                      variant={selectedTag === tag ? "default" : "outline"}
                      className="cursor-pointer hover:bg-accent"
                      onClick={() => setSelectedTag(tag)}
                    >
                      {tag} ({count})
                    </Badge>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Ideas List */}
      <div className="space-y-6">
        {selectedTag === 'all' ? (
          // Show all ideas chronologically
          <div className="space-y-4">
            {filteredIdeas.map((idea, index) => (
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
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {new Date(idea.createdAt).toLocaleDateString()}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-muted-foreground leading-relaxed">
                      {idea.description}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {idea.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        ) : (
          // Show ideas grouped by tags
          <div className="space-y-6">
            {Object.entries(groupedIdeas).map(([tag, tagIdeas]) => (
              <div key={tag} className="space-y-4">
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4" />
                  <h2 className="text-xl font-semibold">{tag}</h2>
                  <Badge variant="outline">{tagIdeas.length}</Badge>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  {tagIdeas.map(idea => (
                    <Card key={idea.id} className="hover:shadow-md transition-shadow">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg">
                          <Link 
                            to={`/ideas/${idea.id}`}
                            className="hover:text-primary transition-colors cursor-pointer"
                          >
                            {idea.title}
                          </Link>
                        </CardTitle>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          {new Date(idea.createdAt).toLocaleDateString()}
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <p className="text-muted-foreground leading-relaxed">
                          {idea.description}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {idea.tags.map(tagName => (
                            <Badge key={tagName} variant="secondary" className="text-xs">
                              {tagName}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredIdeas.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              {selectedTag !== 'all' 
                ? 'No ideas match the selected tag.' 
                : 'No ideas yet. Start by adding your first idea!'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Ideas;