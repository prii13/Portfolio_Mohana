import { motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { socialLinks, resumeLink } from '@/data/social';
import { fadeInUp } from '@/animations';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border bg-primary-50/30">
      <div className="container mx-auto px-6 py-12">
        <motion.div
          className="flex flex-col md:flex-row items-center justify-between gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <div className="flex flex-col items-center md:items-start gap-4">
            <a
              href="#hero"
              className="text-2xl font-display font-bold bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent"
              onClick={(e) => {
                e.preventDefault();
                scrollToTop();
              }}
            >
              Mohana Priya M
            </a>
            <p className="text-sm text-white/50 max-w-xs text-center md:text-left">
              AI Engineer &bull; Generative AI &bull; MLOps &bull; Agentic AI
            </p>
          </div>

          <div className="flex items-center gap-4">
            {socialLinks.map((link) => {
              const IconComponent = link.icon;
              return (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-surface border border-border hover:border-accent/30 hover:bg-surface-hover transition-all duration-300 group"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={link.name}
                >
                  <IconComponent
                    size={20}
                    className="text-white/60 group-hover:text-accent transition-colors"
                  />
                </motion.a>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          className="mt-8 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4"
          variants={fadeInUp}
        >
          <p className="text-sm text-white/40">
            {currentYear} Mohana Priya M. All rights reserved.
          </p>

          <div className="flex items-center gap-6 text-sm text-white/40">
            <a
              href={resumeLink.url}
              className="hover:text-white transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Resume
            </a>
          </div>
        </motion.div>
      </div>

      <motion.button
        onClick={scrollToTop}
        className="absolute right-6 -top-6 w-12 h-12 rounded-full bg-accent shadow-glow-md flex items-center justify-center text-white hover:shadow-glow-lg transition-shadow"
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Scroll to top"
      >
        <ArrowUp size={20} />
      </motion.button>
    </footer>
  );
}
