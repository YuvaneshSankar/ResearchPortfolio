import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { ExternalLink, Github, Calendar, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const ResearchWorks = () => {
  const [selectedTags, setSelectedTags] = useState([]);

  const allTags = ['NLP', 'Computer Vision', 'ML', 'Deep Learning','Data Science'];

  const researchWorks = [
    {
      id: 'FrugalSOT',
      title: 'FrugalSOT',
      summary: 'Adaptive LLM system with dynamic model selection, reducing inference time by 70% through complexity-based routing and cosine similarity thresholding.Extended capabilities with advanced resource optimization and multi-model ensemble techniques for edge computing applications.',
      tags: ['CUDA', 'ML', 'Python'],
      stack: ['Ollama', 'Raspberry Pi 5', 'Python', 'Shell', 'ReactJS'],
      year: '2024',
      status: 'In Progress',
      links: {
        repo: 'https://github.com/HyperKuvid-Labs/FrugalSOT',
        demo: 'https://frugalsot.vercel.app/'
      }
    },
    {
      id: 'multiagent-rl',
      title: 'Multi-Agent Reinforcement Learning in Distributed Systems',
      summary: 'Comprehensive study on scalable reinforcement learning frameworks for multi-agent environments with focus on distributed coordination and emergent behaviors.',
      tags: ['ML', 'Deep Learning', 'Systems'],
      stack: ['Python', 'Ray', 'PyTorch', 'Redis'],
      year: '2024',
      status: 'In Progress',
      links: {
        repo: 'https://github.com',
        demo: 'https://demo.com'
      }
    },
    {
      id: 'diffusion-optimization',
      title: 'CUDA-Accelerated Diffusion Model Optimization',
      summary: 'Research on custom CUDA kernel implementations for diffusion models, achieving significant speedup in image generation tasks through memory optimization and parallel processing techniques.',
      tags: ['Computer Vision', 'Deep Learning', 'ML'],
      stack: ['CUDA', 'Python', 'JAX', 'PyTorch'],
      year: '2023',
      status: 'Published',
      links: {
        repo: 'https://github.com',
        demo: null
      }
    },
    {
      id: 'neural-architecture',
      title: 'Neural Architecture Search for Edge Computing',
      summary: 'Investigation of automated neural architecture search techniques optimized for edge computing environments, balancing accuracy and computational efficiency.',
      tags: ['ML', 'Deep Learning', 'Computer Vision'],
      stack: ['TensorFlow', 'PyTorch', 'Python', 'OpenCV'],
      year: '2024',
      status: 'Published',
      links: {
        repo: 'https://github.com',
        demo: 'https://demo.com'
      }
    },
    {
      id: 'federated-learning',
      title: 'Privacy-Preserving Federated Learning',
      summary: 'Research on federated learning approaches that maintain data privacy while achieving competitive model performance across distributed healthcare datasets.',
      tags: ['ML', 'Data Science', 'Privacy'],
      stack: ['Python', 'TensorFlow', 'Cryptography', 'Docker'],
      year: '2023',
      status: 'Under Review',
      links: {
        repo: 'https://github.com',
        demo: null
      }
    },
    {
      id: 'quantum-ml',
      title: 'Quantum Machine Learning Algorithms',
      summary: 'Exploration of quantum computing applications in machine learning, investigating quantum advantage in specific optimization and pattern recognition tasks.',
      tags: ['ML', 'Quantum Computing', 'Algorithms'],
      stack: ['Qiskit', 'Python', 'NumPy', 'Cirq'],
      year: '2022',
      status: 'Published',
      links: {
        repo: 'https://github.com',
        demo: null
      }
    }
  ];

  const handleTagToggle = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleLinkClick = (url, type) => {
    toast({
      title: "🚧 Link not implemented yet",
      description: "Don't worry! You can request it in your next prompt! 🚀",
    });
  };

  const filteredResearchWorks = researchWorks.filter(research => {
    const tagMatch = selectedTags.length === 0 || selectedTags.some(tag => research.tags.includes(tag));
    return tagMatch;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <Helmet>
        <title>Research Works - Portfolio</title>
        <meta name="description" content="Showcase of research works in machine learning, computer vision, natural language processing, and distributed systems. Featuring publications and ongoing research projects." />
        <meta property="og:title" content="Research Works - Portfolio" />
        <meta property="og:description" content="Showcase of research works in machine learning, computer vision, natural language processing, and distributed systems. Featuring publications and ongoing research projects." />
      </Helmet>

      {/* Header */}
      <div className="space-y-4">
        <motion.h1 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-4xl font-bold tracking-tight"
        >
          Research Works
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-muted-foreground max-w-3xl leading-relaxed"
        >
          A collection of research publications, ongoing studies, and experimental work spanning 
          machine learning, computer vision, natural language processing, and distributed systems.
        </motion.p>
      </div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="h-4 w-4" />
              <span className="font-medium">Filters</span>
            </div>
            
            {/* Tags */}
            <div className="space-y-4">
              <div>
                <span className="text-sm font-medium text-muted-foreground mb-2 block">Tags</span>
                <div className="flex flex-wrap gap-2">
                  {allTags.map(tag => (
                    <Badge
                      key={tag}
                      variant={selectedTags.includes(tag) ? "default" : "outline"}
                      className="cursor-pointer hover:bg-accent"
                      onClick={() => handleTagToggle(tag)}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Research Works Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="grid gap-6 md:grid-cols-2"
      >
        {filteredResearchWorks.map((research, index) => (
          <motion.div
            key={research.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + index * 0.1 }}
          >
            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="text-xl">
                      <Link 
                        to={`/research/${research.id}`}
                        className="hover:text-blue-400 transition-colors"
                      >
                        {research.title}
                      </Link>
                    </CardTitle>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  {research.summary}
                </p>
                
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-medium text-muted-foreground mb-2 block">Tags</span>
                    <div className="flex flex-wrap gap-1">
                      {research.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <span className="text-sm font-medium text-muted-foreground mb-2 block">Tech Stack</span>
                    <div className="flex flex-wrap gap-1">
                      {research.stack.map(tech => (
                        <Badge key={tech} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2 pt-2">
                  {research.links.repo && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleLinkClick(research.links.repo, 'repo')}
                      className="flex items-center gap-1"
                    >
                      <Github className="h-3 w-3" />
                      Code
                    </Button>
                  )}
                  {research.links.demo && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleLinkClick(research.links.demo, 'demo')}
                      className="flex items-center gap-1"
                    >
                      <ExternalLink className="h-3 w-3" />
                      Demo
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {filteredResearchWorks.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <p className="text-muted-foreground">No research works match the selected filters.</p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ResearchWorks;