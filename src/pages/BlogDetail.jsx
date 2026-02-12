import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MDXProvider } from '@mdx-js/react';
import { mdxComponents } from '@/components/MDXComponents';
import { getBlogBySlug } from '@/lib/blogLoader';
import 'highlight.js/styles/github-dark.css';
import 'katex/dist/katex.min.css';

const BlogDetail = () => {
  const { id } = useParams();
  const blog = getBlogBySlug(id);

  if (!blog) {
    return (
      <div className="space-y-8">
        <div className="flex items-center gap-3">
          <Link to="/blogs">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Blogs
            </Button>
          </Link>
        </div>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-4">Blog Post Not Found</h1>
          <p className="text-muted-foreground">The requested blog post could not be found.</p>
        </div>
      </div>
    );
  }

  const { Component } = blog;

  return (
    <div className="space-y-8">
      <Helmet>
        <title>{blog.title} - Blog</title>
        <meta name="description" content={blog.description} />
        <meta property="og:title" content={`${blog.title} - Blog`} />
        <meta property="og:description" content={blog.description} />
      </Helmet>

      {/* Navigation */}
      <div className="flex items-center gap-3">
        <Link to="/blogs">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Blogs
          </Button>
        </Link>
      </div>

      {/* Header */}
      <div className="space-y-6">
        <div className="space-y-4">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            {blog.title}
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
            {blog.description}
          </p>
        </div>

        {/* Metadata */}
        <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-4 sm:gap-6 pb-4 border-b border-border">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span className="text-sm sm:text-base">
              {new Date(blog.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span className="text-sm sm:text-base">{blog.readTime}</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {blog.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* Blog Content — rendered via MDX */}
      <div className="prose prose-lg dark:prose-invert max-w-none markdown-content">
        <MDXProvider components={mdxComponents}>
          <Component />
        </MDXProvider>
      </div>
    </div>
  );
};

export default BlogDetail;
