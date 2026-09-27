import { motion } from 'framer-motion';
import { Award } from 'lucide-react';
import { GlassCard, SectionHeading } from '@/components/ui';
import { certifications } from '@/data/certifications';
import { fadeInUp, staggerContainer } from '@/animations';

export function Certifications() {
  return (
    <section id="certifications" className="relative py-24 lg:py-32">
      <div className="container mx-auto px-6">
        <SectionHeading
          title="Certifications"
          subtitle="Professional credentials and achievements"
        />

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {certifications.map((cert, index) => (
            <motion.div key={cert.id} variants={fadeInUp}>
              <GlassCard variant="elevated" className="p-6 h-full group">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 rounded-xl bg-accent/10 group-hover:bg-accent/20 transition-colors">
                    <Award className="text-accent" size={28} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display font-bold text-white group-hover:text-accent transition-colors">
                      {cert.title}
                    </h3>
                    <p className="text-sm text-white/50 mt-1">{cert.issuer}</p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
