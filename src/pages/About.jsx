import React from 'react';
import { Helmet } from 'react-helmet';
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';

const About = () => {
  return (
    <div className="space-y-8">
      <Helmet>
        <title>About - Portfolio</title>
        <meta name="description" content="Computer science researcher focused on GPU computing, CUDA, machine learning, and reinforcement learning. Seeking mentorship and collaboration opportunities." />
        <meta property="og:title" content="About - Portfolio" />
        <meta property="og:description" content="Computer science researcher focused on GPU computing, CUDA, machine learning, and reinforcement learning." />
      </Helmet>

      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">
          About Me
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
          Computer science researcher who spends more time debugging than living. 
          Passionate about GPU computing, ML, and high-performance systems basically teaching silicon rocks to think faster than me. 
          Currently stuck between CUDA kernels and existential dread.
          Reinforcement learning enthusiast well just teaching machines to get rewarded for making fewer mistakes than I do in life. Over-all I just love coding even though my experience is comparatively less still I wanna be the guy who gives it all for any kinda work.
        </p>
      </div>

      {/* Bio Section */}
      <div>
        <h2 className="text-2xl font-semibold mb-6">Background</h2>
        <div className="pl-0">
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
            <p className="text-muted-foreground leading-relaxed mt-4">
              My goto thing is just working on RL (inspired by AlphaGo's move 37) and building inference engines 
              from scratch. Currently exploring CUDA backends and diffusion models while maintaining active research 
              in GPU computing. Need research guidance and have some ideas that need validation. Always open to 
              interesting conversations.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Links */}
      <div>
        <h2 className="text-2xl font-semibold mb-6">Connect</h2>
        <div className="flex flex-wrap gap-4">
          <a 
            href="https://github.com/YuvaneshSankar" 
            className="inline-flex items-center gap-2 border border-current rounded-md px-3 py-2 text-sm font-medium"
          >
            <Github className="h-4 w-4" />
            GitHub
          </a>
          <a 
            href="https://www.linkedin.com/in/yuvanesh-sankar/" 
            className="inline-flex items-center gap-2 border border-current rounded-md px-3 py-2 text-sm font-medium"
          >
            <Linkedin className="h-4 w-4" />
            LinkedIn
          </a>
          <a 
            href="mailto:yuvanesh.skv@gmail.com?subject=Hello there ,  Saw your Portfolio and wanted to have a convo &body=....." 
            className="inline-flex items-center gap-2 border border-current rounded-md px-3 py-2 text-sm font-medium"
          >
            <Mail className="h-4 w-4" />
            Email
          </a>
          <a 
            href="https://x.com/noxair56945" 
            className="inline-flex items-center gap-2 border border-current rounded-md px-3 py-2 text-sm font-medium"
          >
            <Twitter className="h-4 w-4" />
            X
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;