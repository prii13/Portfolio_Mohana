import { motion } from 'framer-motion';
import { ArrowDown, FileText, Mail } from 'lucide-react';
import { Button } from '@/components/ui';
import { useState, useEffect, useRef } from 'react';
import { fadeInUp, fadeInLeft, fadeInRight } from '@/animations';
import { RESUME_URL } from '@/constants';

const codeSnippets = [
  'model = Sequential([...])',
  'transformer.forward(x)',
  'loss.backward()',
  'optimizer.step()',
  'predictions.argmax()',
  'rag.retrieve(query)',
];

function AIVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * 2;
      canvas.height = canvas.offsetHeight * 2;
      ctx.scale(2, 2);
    };
    resize();
    window.addEventListener('resize', resize);

    const nodes: { x: number; y: number; vx: number; vy: number; size: number; opacity: number }[] = [];
    const connections: { from: number; to: number }[] = [];
    const numNodes = 30;

    for (let i = 0; i < numNodes; i++) {
      nodes.push({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 2,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }

    for (let i = 0; i < numNodes; i++) {
      const numConnections = Math.floor(Math.random() * 3) + 1;
      for (let j = 0; j < numConnections; j++) {
        const target = Math.floor(Math.random() * numNodes);
        if (target !== i) {
          connections.push({ from: i, to: target });
        }
      }
    }

    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > canvas.offsetWidth) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.offsetHeight) node.vy *= -1;
      });

      connections.forEach((conn) => {
        const from = nodes[conn.from];
        const to = nodes[conn.to];
        const dx = to.x - from.x;
        const dy = to.y - from.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 150) {
          ctx.beginPath();
          ctx.moveTo(from.x, from.y);
          ctx.lineTo(to.x, to.y);
          const gradient = ctx.createLinearGradient(from.x, from.y, to.x, to.y);
          gradient.addColorStop(0, `rgba(79, 140, 255, ${0.2 * (1 - distance / 150)})`);
          gradient.addColorStop(1, `rgba(139, 92, 246, ${0.2 * (1 - distance / 150)})`);
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });

      nodes.forEach((node) => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(79, 140, 255, ${node.opacity})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size * 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(79, 140, 255, ${node.opacity * 0.2})`;
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="relative w-full h-[400px] lg:h-[500px]">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />

      {/* Rotating rings */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 lg:w-80 lg:h-80"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      >
        <div className="absolute inset-0 rounded-full border border-accent/20" />
        <div className="absolute inset-4 rounded-full border border-accent-secondary/20" />
        <div className="absolute inset-8 rounded-full border border-accent-highlight/20" />
      </motion.div>

      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 lg:w-64 lg:h-64"
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
      >
        <div className="absolute inset-0 rounded-full border border-dashed border-accent/30" />
      </motion.div>

      {/* Center glass sphere */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 lg:w-40 lg:h-40"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <div className="w-full h-full rounded-full bg-gradient-to-br from-accent/30 via-accent-secondary/20 to-transparent backdrop-blur-xl border border-white/20 shadow-glow-lg" />
      </motion.div>

      {/* Floating code snippets */}
      {[...codeSnippets].slice(0, 4).map((snippet, i) => (
        <motion.div
          key={i}
          className="absolute px-3 py-1.5 rounded-lg bg-primary-100/80 backdrop-blur-sm border border-border text-xs font-mono text-accent/80"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, 1, 1, 0], scale: [0.8, 1, 1, 0.8] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: i * 1.5 + 1,
            repeatDelay: 2,
          }}
          style={{
            top: `${15 + i * 20}%`,
            right: `${5 + i * 8}%`,
          }}
        >
          {snippet}
        </motion.div>
      ))}

      {/* Glowing particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-accent"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            filter: 'blur(1px)',
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.8, 0.3],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.4,
          }}
        />
      ))}
    </div>
  );
}

export function Hero() {
  const [typewriterText, setTypewriterText] = useState('');
  const fullText = 'AI Engineer';

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setTypewriterText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 100);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background grid */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-60" />

      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-accent/20 to-accent-secondary/20 blur-[100px]"
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-accent-highlight/15 to-accent/15 blur-[80px]"
        animate={{
          x: [0, -30, 0],
          y: [0, 40, 0],
          scale: [1, 0.9, 1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left side - Text content */}
          <motion.div
            className="flex flex-col items-start gap-6"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.15 },
              },
            }}
          >
            <motion.div variants={fadeInUp}>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface border border-border text-sm text-white/70">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                Open to opportunities
              </span>
            </motion.div>

            <motion.h1 variants={fadeInUp} className="text-display-lg lg:text-display-xl font-display font-bold">
              <span className="block text-white">Mohana Priya M</span>
              <span className="block mt-2 bg-gradient-to-r from-accent via-accent-secondary to-accent-highlight bg-clip-text text-transparent">
                {typewriterText}
                <span className="inline-block w-[3px] h-[1em] bg-accent ml-1 animate-pulse" />
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-base lg:text-lg text-white/60 max-w-xl leading-relaxed"
            >
              MLOps Engineer &bull; Generative AI Developer &bull; Agentic AI Engineer
            </motion.p>

            <motion.p
              variants={fadeInUp}
              className="text-lg lg:text-xl text-white/50 max-w-xl leading-relaxed"
            >
              Building intelligent systems with Machine Learning, Generative AI, NLP, Computer Vision, and scalable backend technologies.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap gap-4 mt-4"
            >
              <Button
                variant="gradient"
                size="lg"
                leftIcon={<FileText size={18} />}
                onClick={() => {
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                View Projects
              </Button>
              <Button
                variant="outline"
                size="lg"
                leftIcon={<FileText size={18} />}
                onClick={() => window.open(RESUME_URL, '_blank')}
              >
                Download Resume
              </Button>
              <Button
                variant="secondary"
                size="lg"
                leftIcon={<Mail size={18} />}
                onClick={() => {
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Contact Me
              </Button>
            </motion.div>

            <motion.div variants={fadeInUp} className="flex items-center gap-6 mt-4 text-sm text-white/40">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                M.Tech AI
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-secondary" />
                Generative AI
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-highlight" />
                MLOps &bull; Agentic AI
              </span>
            </motion.div>
          </motion.div>

          {/* Right side - AI Visualization */}
          <motion.div
            variants={fadeInRight}
            initial="hidden"
            animate="visible"
            className="relative"
          >
            <AIVisualization />
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-xs text-white/40">Scroll to explore</span>
          <ArrowDown className="text-accent/60" size={20} />
        </motion.div>
      </div>
    </section>
  );
}
