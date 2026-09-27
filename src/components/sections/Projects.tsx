import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, Layers, ChevronRight, Zap } from 'lucide-react';
import { GlassCard, Badge, Button, SectionHeading } from '@/components/ui';
import { projects } from '@/data/projects';
import { PROJECT_CATEGORIES } from '@/constants';
import { fadeInUp, staggerContainer } from '@/animations';
import type { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

function ProjectCard({ project, onClick }: ProjectCardProps) {
  return (
    <motion.div
      layout
      variants={fadeInUp}
      whileHover={{ y: -5 }}
      className="group"
    >
      <GlassCard
        variant="elevated"
        className="overflow-hidden cursor-pointer h-full"
        onClick={onClick}
      >
        {/* Project image placeholder */}
        <div className="relative h-52 overflow-hidden bg-gradient-to-br from-accent/10 via-accent-secondary/10 to-accent-highlight/10">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="p-6 rounded-full bg-surface border border-border group-hover:border-accent/30 transition-colors">
              <Layers className="text-accent/50 group-hover:text-accent transition-colors" size={40} />
            </div>
          </div>
          <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-primary-100 to-transparent" />
        </div>

        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-lg font-display font-bold text-white group-hover:text-accent transition-colors">
                {project.title}
              </h3>
              <p className="text-sm text-white/50 mt-1">{project.subtitle}</p>
            </div>
            <ChevronRight className="text-white/20 group-hover:text-accent group-hover:translate-x-1 transition-all" size={20} />
          </div>

          <p className="text-sm text-white/60 line-clamp-2 mb-4">
            {project.description}
          </p>

          {project.highlight && (
            <div className="flex items-center gap-2 mb-4 px-3 py-2 rounded-lg bg-accent/10 border border-accent/20">
              <Zap className="text-accent" size={14} />
              <span className="text-xs text-accent font-medium">{project.highlight}</span>
            </div>
          )}

          <div className="flex flex-wrap gap-1.5">
            {project.technologies.slice(0, 4).map((tech) => (
              <Badge key={tech} variant="outline" size="sm">
                {tech}
              </Badge>
            ))}
            {project.technologies.length > 4 && (
              <Badge variant="outline" size="sm">
                +{project.technologies.length - 4}
              </Badge>
            )}
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'features' | 'challenges'>('overview');

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'features', label: 'Features' },
    { id: 'challenges', label: 'Challenges' },
  ] as const;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-primary/90 backdrop-blur-xl" />
      <motion.div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-primary-100 rounded-2xl border border-border shadow-2xl"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-primary-100/95 backdrop-blur-sm border-b border-border p-6">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-display font-bold text-white">
                {project.title}
              </h2>
              <p className="text-white/50 mt-1">{project.subtitle}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-surface hover:bg-surface-hover text-white/60 hover:text-white transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mt-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-accent text-white'
                    : 'bg-surface text-white/60 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {activeTab === 'overview' && (
            <>
              <p className="text-white/70 leading-relaxed">
                {project.longDescription}
              </p>

              {project.metrics && (
                <div className="grid grid-cols-2 gap-4">
                  {project.metrics.map((metric) => (
                    <div key={metric.label} className="p-4 rounded-xl bg-surface border border-border">
                      <p className="text-2xl font-bold text-accent">{metric.value}</p>
                      <p className="text-sm text-white/50">{metric.label}</p>
                    </div>
                  ))}
                </div>
              )}

              {project.architecture && (
                <div className="p-4 rounded-xl bg-surface/50 border-l-2 border-accent-secondary">
                  <p className="text-xs text-white/40 uppercase tracking-wider mb-1">Architecture</p>
                  <p className="text-sm text-white/70">{project.architecture}</p>
                </div>
              )}
            </>
          )}

          {activeTab === 'features' && (
            <div className="space-y-3">
              {project.features.map((feature, idx) => (
                <motion.div
                  key={idx}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-surface/50 transition-colors"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <span className="w-2 h-2 rounded-full bg-accent mt-2" />
                  <span className="text-white/70">{feature}</span>
                </motion.div>
              ))}
            </div>
          )}

          {activeTab === 'challenges' && (
            <div className="space-y-3">
              {project.challenges.map((challenge, idx) => (
                <motion.div
                  key={idx}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-surface/50 transition-colors"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <span className="w-2 h-2 rounded-full bg-accent-secondary mt-2" />
                  <span className="text-white/70">{challenge}</span>
                </motion.div>
              ))}
            </div>
          )}

          {/* Technologies */}
          <div className="pt-4 border-t border-border">
            <p className="text-xs text-white/40 uppercase tracking-wider mb-3">Technologies Used</p>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <Badge key={tech} variant="accent" size="md">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3 pt-4">
            {project.githubUrl && (
              <Button
                variant="secondary"
                leftIcon={<Github size={18} />}
                onClick={() => window.open(project.githubUrl, '_blank')}
              >
                View Code
              </Button>
            )}
            {project.liveUrl && (
              <Button
                variant="primary"
                leftIcon={<ExternalLink size={18} />}
                onClick={() => window.open(project.liveUrl, '_blank')}
              >
                Live Demo
              </Button>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Projects() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = projects.filter((project) => {
    if (activeFilter === 'all') return true;
    return project.category === activeFilter;
  });

  return (
    <section id="projects" className="relative py-24 lg:py-32 bg-primary-50/20">
      <div className="container mx-auto px-6">
        <SectionHeading
          title="Featured Projects"
          subtitle="AI systems and applications I've built and deployed"
        />

        {/* Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {PROJECT_CATEGORIES.map((category) => (
            <button
              key={category.value}
              onClick={() => setActiveFilter(category.value)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                activeFilter === category.value
                  ? 'bg-accent text-white shadow-glow-sm'
                  : 'bg-surface border border-border text-white/60 hover:text-white hover:border-border-hover'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Projects grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Project modal */}
        <AnimatePresence>
          {selectedProject && (
            <ProjectModal
              project={selectedProject}
              onClose={() => setSelectedProject(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
