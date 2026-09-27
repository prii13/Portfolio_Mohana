import { motion } from 'framer-motion';
import { FileText, ExternalLink, BookOpen } from 'lucide-react';
import { GlassCard, Badge, Button, SectionHeading } from '@/components/ui';
import { publications } from '@/data/publications';
import { fadeInUp } from '@/animations';

export function Publications() {
  return (
    <section id="publications" className="relative py-24 lg:py-32">
      <div className="container mx-auto px-6">
        <SectionHeading
          title="Research"
          subtitle="Research work and academic contributions"
        />

        <div className="max-w-4xl mx-auto space-y-8">
          {publications.map((pub, index) => (
            <motion.div
              key={pub.id}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
            >
              <GlassCard
                variant="elevated"
                className={`p-8 lg:p-10 relative overflow-hidden ${
                  pub.featured ? 'border-accent/30 shadow-glow-sm' : ''
                }`}
              >
                {pub.featured && (
                  <div className="absolute top-0 right-0 px-4 py-2 bg-accent/20 text-accent text-xs font-medium rounded-bl-xl">
                    Featured Research
                  </div>
                )}

                <div className="space-y-6">
                  {/* Header */}
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-accent-secondary/10 flex-shrink-0">
                      <BookOpen className="text-accent-secondary" size={28} />
                    </div>
                    <div>
                      <h3 className="text-xl lg:text-2xl font-display font-bold text-white leading-tight">
                        {pub.title}
                      </h3>
                      <p className="mt-2 text-accent font-medium">{pub.conference}</p>
                    </div>
                  </div>

                  {/* Abstract */}
                  <div className="bg-surface/50 rounded-xl p-4 border-l-2 border-accent">
                    <p className="text-sm text-white/70 leading-relaxed">
                      {pub.abstract}
                    </p>
                  </div>

                  {/* Keywords */}
                  <div className="space-y-2">
                    <p className="text-xs text-white/40 uppercase tracking-wider">Keywords</p>
                    <div className="flex flex-wrap gap-2">
                      {pub.keywords.map((keyword) => (
                        <Badge key={keyword} variant="outline" size="sm">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Technologies */}
                  <div className="space-y-2">
                    <p className="text-xs text-white/40 uppercase tracking-wider">Technologies</p>
                    <div className="flex flex-wrap gap-2">
                      {pub.technologies.map((tech) => (
                        <Badge key={tech} variant="accent" size="sm">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-3 pt-4 border-t border-border">
                    {pub.paperUrl && (
                      <Button
                        variant="primary"
                        size="sm"
                        leftIcon={<ExternalLink size={16} />}
                        onClick={() => window.open(pub.paperUrl, '_blank')}
                      >
                        View on Google Scholar
                      </Button>
                    )}
                    {pub.doi && (
                      <Button
                        variant="secondary"
                        size="sm"
                        leftIcon={<FileText size={16} />}
                        onClick={() => window.open(`https://doi.org/${pub.doi}`, '_blank')}
                      >
                        DOI
                      </Button>
                    )}
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
