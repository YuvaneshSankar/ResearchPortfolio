import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Github, Linkedin, Mail, BookOpen } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const About = () => {
  const handleLinkClick = (platform) => {
    toast({
      title: "🚧 Link not implemented yet",
      description: "Don't worry! You can request it in your next prompt! 🚀",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <Helmet>
        <title>About - Portfolio</title>
        <meta name="description" content="Computer science researcher focused on GPU computing, CUDA, machine learning, and reinforcement learning. Seeking mentorship and collaboration opportunities." />
        <meta property="og:title" content="About - Portfolio" />
        <meta property="og:description" content="Computer science researcher focused on GPU computing, CUDA, machine learning, and reinforcement learning." />
      </Helmet>

      {/* Header */}
      <div className="space-y-4">
        <motion.h1 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-4xl font-bold tracking-tight"
        >
          About Me
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-muted-foreground max-w-3xl leading-relaxed"
        >
          Computer science researcher with a passion for GPU computing, machine learning, 
          and high-performance systems. Currently exploring the intersection of CUDA 
          programming and ML optimization techniques.
        </motion.p>
      </div>

      {/* Bio Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card>
          <CardContent className="p-8">
            <h2 className="text-2xl font-semibold mb-6">Background</h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-muted-foreground leading-relaxed mb-4">
                I'm a computer science researcher specializing in GPU computing and machine learning. 
                My work focuses on optimizing deep learning algorithms using CUDA and exploring novel 
                approaches to reinforcement learning in high-performance computing environments.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                With experience in both theoretical research and practical implementation, I'm passionate 
                about bridging the gap between academic research and real-world applications. I enjoy 
                tackling complex computational challenges and developing efficient solutions for 
                large-scale problems.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Contact Links */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card>
          <CardContent className="p-8">
            <h2 className="text-2xl font-semibold mb-6">Connect</h2>
            <div className="flex flex-wrap gap-4">
              <Button 
                variant="outline" 
                onClick={() => handleLinkClick('github')}
                className="flex items-center gap-2"
              >
                <Github className="h-4 w-4" />
                GitHub
              </Button>
              <Button 
                variant="outline" 
                onClick={() => handleLinkClick('linkedin')}
                className="flex items-center gap-2"
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </Button>
              <Button 
                variant="outline" 
                onClick={() => handleLinkClick('scholar')}
                className="flex items-center gap-2"
              >
                <BookOpen className="h-4 w-4" />
                Google Scholar
              </Button>
              <Button 
                variant="outline" 
                onClick={() => handleLinkClick('email')}
                className="flex items-center gap-2"
              >
                <Mail className="h-4 w-4" />
                Email
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default About;