import { motion } from 'framer-motion';
import { Trophy, CalendarDays } from 'lucide-react';
import { GlassCard, SectionHeading } from '@/components/ui';
import { fadeInUp } from '@/animations';

export function Achievements() {
  return (
    <section id="achievements" className="relative py-24 lg:py-32 bg-primary-50/20">
      <div className="container mx-auto px-6">
        <SectionHeading
          title="Achievements"
          subtitle="Key milestones from my journey"
        />

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto"
        >
          {/* TN Police Hackathon */}
          <GlassCard
            variant="elevated"
            className="p-8 border-accent-secondary/30 shadow-glow-purple"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-4 rounded-2xl bg-accent-secondary/20">
                <Trophy className="text-accent-secondary" size={32} />
              </div>

              <div>
                <h3 className="text-xl font-display font-bold text-white">
                  TN Police Hackathon
                </h3>
                <p className="text-white/50">Participant</p>
              </div>
            </div>

            <p className="text-white/70 leading-relaxed">
              Participated in the TN Police Hackathon as part of my technical
              and problem-solving experience.
            </p>
          </GlassCard>

          {/* Event Head */}
          <GlassCard
            variant="elevated"
            className="p-8 border-accent-primary/30 shadow-glow"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-4 rounded-2xl bg-accent-primary/20">
                <CalendarDays className="text-accent-primary" size={32} />
              </div>

              <div>
                <h3 className="text-xl font-display font-bold text-white">
                  Event Head
                </h3>
                <p className="text-white/50">Technical Event</p>
              </div>
            </div>

            <p className="text-white/70 leading-relaxed">
              Organized and led a project-based technical event, coordinating
              the event activities and supporting participants throughout the
              event.
            </p>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}