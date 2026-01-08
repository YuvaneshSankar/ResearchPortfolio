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

      {/* Hero Section with Image and Header */}
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
        {/* Hero Image - Left Side */}
        <div className="w-full lg:w-2/5 flex-shrink-0 rounded-lg overflow-hidden">
          <div className="hero-image-container">
            <img
              src="/ww.png"
              alt="Hero"
              className="w-full h-auto rounded-lg hero-image-blend"
            />
          </div>
        </div>

        {/* Header Content - Right Side */}
        <div className="flex-1 space-y-4 sm:space-y-6">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            About Me
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Computer science researcher who spends more time debugging than living.
            <i>Passionate about <b>GPU computing, ML, and high-performance systems</b> basically teaching silicon rocks to think faster than me.</i>
            Currently stuck between <b>CUDA</b> kernels and existential dread.
            <b>Reinforcement learning</b> enthusiast well just teaching machines to get rewarded for making fewer mistakes than I do in life. Over-all I just love coding even though my experience is comparatively less still I wanna be the guy who gives it all for any kinda work.
          </p>

          {/* Background content integrated here */}
          <div className="space-y-4 pt-2">

            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              My goto thing is just working on RL (inspired by <i><b>AlphaGo's move 37</b></i>) and building inference engines
              from scratch. Currently exploring CUDA backends and diffusion models while maintaining active research
              in GPU computing. I also work on control and coordination between agents in RL. Need research guidance and have some ideas that need validation. Always open to
              interesting conversations.
            </p>
          </div>

          {/* Contact Links - moved here */}
          <div className="pt-4">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4">Connect</h2>
            <div className="flex flex-wrap gap-4 sm:gap-8">
              <a
                href="https://github.com/YuvaneshSankar"
                className="inline-flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/yuvanesh-sankar/"
                className="inline-flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </a>
              <a
                href="mailto:yuvanesh.skv@gmail.com?subject=Hello there ,  Saw your Portfolio and wanted to have a convo &body=....."
                className="inline-flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Mail className="h-4 w-4" />
                Email
              </a>
              <a
                href="https://x.com/scriptosis"
                className="inline-flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter className="h-4 w-4" />
                X
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;