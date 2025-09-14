import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ExternalLink, Github } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const ResearchWorks = () => {

  const researchWorks = [
    {
      id: 'FrugalSOT',
      title: 'FrugalSOT',
      description: 'Adaptive LLM system with dynamic model selection, reducing inference time by 70% through complexity-based routing and cosine similarity thresholding.Extended capabilities with advanced resource optimization and multi-model ensemble techniques for edge computing applications.',
      stack: ['Ollama', 'Raspberry Pi 5', 'Python', 'Shell', 'ReactJS'],
      links: {
        repo: 'https://github.com/HyperKuvid-Labs/FrugalSOT',
        demo: 'https://frugalsot.vercel.app/'
      }
    },
    {
      id: 'multiagent-rl',
      title: 'Multi-Agent Reinforcement Learning in Distributed Systems',
      description: 'Comprehensive study on scalable reinforcement learning frameworks for multi-agent environments with focus on distributed coordination and emergent behaviors.',
      stack: ['Python', 'Ray', 'PyTorch', 'Redis'],
      links: {
        repo: 'https://github.com',
        demo: 'https://demo.com'
      }
    },
    {
      id: 'diffusion-optimization',
      title: 'CUDA-Accelerated Diffusion Model Optimization',
      description: 'Research on custom CUDA kernel implementations for diffusion models, achieving significant speedup in image generation tasks through memory optimization and parallel processing techniques.',
      stack: ['CUDA', 'Python', 'JAX', 'PyTorch'],
      links: {
        repo: 'https://github.com',
        demo: null
      }
    },
    {
      id: 'neural-architecture',
      title: 'Neural Architecture Search for Edge Computing',
      description: 'Investigation of automated neural architecture search techniques optimized for edge computing environments, balancing accuracy and computational efficiency.',
      stack: ['TensorFlow', 'PyTorch', 'Python', 'OpenCV'],
      links: {
        repo: 'https://github.com',
        demo: 'https://demo.com'
      }
    },
    {
      id: 'federated-learning',
      title: 'Privacy-Preserving Federated Learning',
      description: 'Research on federated learning approaches that maintain data privacy while achieving competitive model performance across distributed healthcare datasets.',
      stack: ['Python', 'TensorFlow', 'Cryptography', 'Docker'],
      links: {
        repo: 'https://github.com',
        demo: null
      }
    },
    {
      id: 'quantum-ml',
      title: 'Quantum Machine Learning Algorithms',
      description: 'Exploration of quantum computing applications in machine learning, investigating quantum advantage in specific optimization and pattern recognition tasks.',
      stack: ['Qiskit', 'Python', 'NumPy', 'Cirq'],
      links: {
        repo: 'https://github.com',
        demo: null
      }
    }
  ];

  const handleLinkClick = () => {
    console.log("Link clicked - implementation placeholder");
  };

  return (
    <div className="space-y-8">
      <Helmet>
        <title>Research Works - Portfolio</title>
        <meta name="description" content="Showcase of research works in machine learning, computer vision, natural language processing, and distributed systems. Featuring publications and ongoing research projects." />
        <meta property="og:title" content="Research Works - Portfolio" />
        <meta property="og:description" content="Showcase of research works in machine learning, computer vision, natural language processing, and distributed systems. Featuring publications and ongoing research projects." />
      </Helmet>

      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">
          Research Works
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
          A collection of my research contributions in machine learning, artificial intelligence, 
          and advanced computing systems.
        </p>
      </div>

      {/* Research Works Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {researchWorks.map((work, index) => (
          <div key={work.id} className="group">
            <Card className="h-full transition-all duration-300 hover:shadow-lg border-border/50 hover:border-border">
              <CardHeader>
                <CardTitle className="flex items-start justify-between gap-4">
                  <Link 
                    to={`/research/${work.id}`}
                    className="text-lg font-semibold group-hover:text-primary transition-colors hover:text-blue-400 cursor-pointer"
                  >
                    {work.title}
                  </Link>
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  {work.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {work.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 text-xs rounded-full bg-muted text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2 pt-2">
                  {work.links.repo && (
                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={() => handleLinkClick(work.links.repo, 'repo')}
                    >
                      <Github className="h-4 w-4" />
                    </Button>
                  )}
                  
                  {work.links.demo && (
                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={() => handleLinkClick(work.links.demo, 'demo')}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResearchWorks;