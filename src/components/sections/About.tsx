import { motion } from 'framer-motion';
import { Sparkles, Brain, Code2, Database, Cpu, GraduationCap } from 'lucide-react';
import { GlassCard, Badge, SectionHeading } from '@/components/ui';
import { CURRENTLY_EXPLORING } from '@/constants';
import { fadeInUp, staggerContainer } from '@/animations';

const focusAreas = [
  {
    icon: Brain,
    title: 'Artificial Intelligence',
    description: 'Designing intelligent systems that reason, learn, and adapt to complex problems.',
  },
  {
    icon: Cpu,
    title: 'Machine Learning',
    description: 'Building and deploying models that extract patterns from data at scale.',
  },
  {
    icon: Sparkles,
    title: 'Generative AI',
    description: 'Implementing LLMs, RAG systems, and prompt engineering solutions.',
  },
  {
    icon: Code2,
    title: 'NLP',
    description: 'Text classification, summarization, and language understanding systems.',
  },
  {
    icon: Database,
    title: 'Backend AI',
    description: 'Developing scalable APIs and data pipelines for AI applications.',
  },
];

export function About() {
  return (
    <section id="about" className="relative py-24 lg:py-32">
      <div className="container mx-auto px-6">
        <SectionHeading
          title="About Me"
          subtitle="Building practical intelligent systems across AI, ML, and backend engineering"
        />

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main bio card */}
          <motion.div
            className="lg:col-span-2"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <GlassCard variant="elevated" className="p-8 lg:p-10">
              <div className="space-y-6">
                <h3 className="text-2xl font-display font-bold text-white">
                  Engineering Intelligence, One Model at a Time
                </h3>
                <div className="space-y-4 text-white/70 leading-relaxed">
                  <p>
                    I'm currently pursuing an M.Tech in Artificial Intelligence (2026&ndash;2028), having completed my B.Tech in Computer Science and Engineering with a specialization in Artificial Intelligence and Machine Learning (2022&ndash;2026) with a CGPA of 8.75. My focus is on building practical intelligent systems rather than only theoretical models.
                  </p>
                  <p>
                    My experience spans Machine Learning, Deep Learning, Generative AI, NLP, Computer Vision, Data Science, and backend AI application development. From transformer-based news summarization to real-time face recognition and NLP-driven scam detection, I work across the full AI stack.
                  </p>
                  <p>
                    I'm currently developing deeper expertise in MLOps, LLMOps, RAG systems, Agentic AI, Vector Databases, and Multi-Agent Systems &mdash; areas I'm actively exploring to build more robust and scalable AI solutions.
                  </p>
                </div>

                <div className="pt-4 border-t border-border">
                  <p className="text-sm text-white/50 mb-3">Key Expertise</p>
                  <div className="flex flex-wrap gap-2">
                    {['Machine Learning', 'Generative AI', 'NLP', 'Computer Vision', 'Backend AI'].map((skill) => (
                      <Badge key={skill} variant="accent">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-accent/10">
                      <GraduationCap className="text-accent" size={20} />
                    </div>
                    <p className="text-sm text-white/50">Education</p>
                  </div>
                  <div className="space-y-2 text-sm text-white/70">
                    <p><span className="text-white font-medium">M.Tech Artificial Intelligence</span> &mdash; 2026&ndash;2028</p>
                    <p><span className="text-white font-medium">B.Tech CSE (AI &amp; ML)</span> &mdash; 2022&ndash;2026 &bull; CGPA: 8.75</p>
                    <p className="text-white/50">Coimbatore, Tamil Nadu, India</p>
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Currently Exploring */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <GlassCard variant="elevated" className="p-8 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-accent-secondary/20">
                  <Sparkles className="text-accent-secondary" size={24} />
                </div>
                <h3 className="text-xl font-display font-bold text-white">
                  Currently Exploring
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {CURRENTLY_EXPLORING.map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Badge variant="outline" size="md" animated className="hover:border-accent-secondary hover:text-accent-secondary transition-colors cursor-default">
                      {item}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        </div>

        {/* Focus Areas */}
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {focusAreas.map((area, index) => {
            const IconComponent = area.icon;
            return (
              <motion.div key={area.title} variants={fadeInUp}>
                <GlassCard
                  variant="bordered"
                  className="p-5 h-full text-center group hover:border-accent/30 transition-all"
                >
                  <div className="inline-flex p-3 rounded-xl bg-surface mb-3 group-hover:bg-accent/10 transition-colors">
                    <IconComponent
                      size={24}
                      className="text-accent group-hover:text-white transition-colors"
                    />
                  </div>
                  <h4 className="font-display font-semibold text-white mb-2">
                    {area.title}
                  </h4>
                  <p className="text-xs text-white/50 leading-relaxed">
                    {area.description}
                  </p>
                </GlassCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
