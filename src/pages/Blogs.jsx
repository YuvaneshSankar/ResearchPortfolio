import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Calendar, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import blogsData from '@/data/blogs.json';

const Blogs = () => {
  return (
    <div className="space-y-8">
      <Helmet>
        <title>Blogs - Portfolio</title>
        <meta name="description" content="Technical blog posts about GPU computing, machine learning, reinforcement learning, and software engineering. Deep dives into CUDA, AI systems, and performance optimization." />
        <meta property="og:title" content="Blogs - Portfolio" />
        <meta property="og:description" content="Technical blog posts about GPU computing, machine learning, reinforcement learning, and software engineering." />
      </Helmet>

      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
          Blogs
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed">
          Technical writings on GPU computing, machine learning, systems programming,
          and software engineering insights from my research and development work.
        </p>
      </div>

      {/* Blogs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {blogsData.map((blog) => (
          <div key={blog.id} className="group">
            <Card className="h-full transition-all duration-300 hover:shadow-lg border-border/50 hover:border-border">
              <CardHeader>
                <CardTitle className="flex items-start justify-between gap-4">
                  <Link
                    to={`/blogs/${blog.id}`}
                    className="text-lg font-semibold group-hover:text-primary transition-colors hover:text-blue-400 cursor-pointer"
                  >
                    {blog.title}
                  </Link>
                </CardTitle>
                <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground pt-2">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{new Date(blog.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{blog.readTime}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {blog.description}
                </p>
                <div className="flex flex-wrap gap-1">
                  {blog.tags.map((tag) => (
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
    </div>
  );
};

export default Blogs;
