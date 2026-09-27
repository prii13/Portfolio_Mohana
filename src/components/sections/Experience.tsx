import { motion } from 'framer-motion';
import { Building2, MapPin, Calendar } from 'lucide-react';
import { GlassCard, Badge, SectionHeading } from '@/components/ui';
import { experiences } from '@/data/experience';
import { fadeInUp, fadeInLeft, fadeInRight } from '@/animations';

export function Experience() {
  return (
    <section id="experience" className="relative py-24 lg:py-32 bg-primary-50/20">
      <div className="container mx-auto px-6">
        <SectionHeading
          title="Experience"
          subtitle="My professional journey in AI and data science"
        />

        <div className="relative max-w-4xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent via-accent-secondary to-transparent" />

          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              className={`relative flex items-center mb-16 last:mb-0 ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              }`}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={fadeInUp}
            >
              {/* Timeline dot */}
              <div className="absolute left-4 lg:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-accent shadow-glow-sm z-10">
                <div className="absolute inset-0 rounded-full bg-accent animate-ping opacity-50" />
              </div>

              {/* Content card */}
              <motion.div
                className={`w-full lg:w-[calc(50%-2rem)] ml-12 lg:ml-0 ${
                  index % 2 === 0 ? 'lg:mr-auto lg:pr-8' : 'lg:ml-auto lg:pl-8'
                }`}
                variants={index % 2 === 0 ? fadeInLeft : fadeInRight}
              >
                <GlassCard variant="elevated" className="p-6 group hover:shadow-glow-sm transition-shadow">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 rounded-xl bg-accent/10">
                      <Building2 className="text-accent" size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-display font-bold text-white">
                        {exp.role}
                      </h3>
                      <p className="text-accent font-medium">{exp.organization}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mb-4 text-sm text-white/50">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={14} />
                      {exp.duration}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-surface border border-border text-xs capitalise">
                      {exp.type}
                    </span>
                  </div>

                  <div className="space-y-3 mb-4">
                    {exp.achievements.map((achievement, idx) => (
                      <motion.div
                        key={idx}
                        className="flex items-start gap-2"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-secondary mt-2 flex-shrink-0" />
                        <span className="text-sm text-white/70">{achievement}</span>
                      </motion.div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
                    {exp.technologies.map((tech) => (
                      <Badge key={tech} variant="outline" size="sm">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>

              {/* Empty space for timeline balance */}
              <div className="hidden lg:block w-[calc(50%-2rem)]" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
