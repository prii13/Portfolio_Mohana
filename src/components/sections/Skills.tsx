import { motion } from 'framer-motion';
import { GlassCard, SectionHeading } from '@/components/ui';
import { SKILL_CATEGORIES } from '@/constants';
import { getSkillLevelPercentage } from '@/lib/utils';
import { fadeInUp, staggerContainer } from '@/animations';
import { cn } from '@/lib/utils';

interface SkillCardProps {
  title: string;
  icon: React.ElementType;
  skills: { name: string; level: string }[];
  color: string;
  index: number;
}

function SkillCard({ title, icon: Icon, skills, color, index }: SkillCardProps) {
  return (
    <motion.div variants={fadeInUp}>
      <GlassCard
        variant="bordered"
        className="p-6 h-full group hover:border-opacity-50"
        style={{ '--accent-color': color } as React.CSSProperties}
      >
        <div className="flex items-center gap-3 mb-6">
          <div
            className="p-2.5 rounded-xl transition-all duration-300 group-hover:scale-110"
            style={{
              background: `linear-gradient(135deg, ${color}20, ${color}10)`,
              boxShadow: `0 0 20px ${color}00`,
            }}
          >
            <Icon size={22} style={{ color }} className="transition-transform" />
          </div>
          <h3 className="text-lg font-display font-semibold text-white">
            {title}
          </h3>
        </div>

        <div className="space-y-3">
          {skills.map((skill, idx) => {
            const percentage = getSkillLevelPercentage(skill.level);
            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                viewport={{ once: true }}
                className="group/skill"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm text-white/70 group-hover/skill:text-white transition-colors">
                    {skill.name}
                  </span>
                  <span className="text-xs text-white/40 capitalise">
                    {skill.level}
                  </span>
                </div>
                <div className="h-1.5 bg-surface rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full relative overflow-hidden"
                    style={{
                      background: `linear-gradient(90deg, ${color}, ${color}80)`,
                    }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${percentage}%` }}
                    transition={{ duration: 1, delay: idx * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="absolute inset-0 bg-white/20 animate-pulse" />
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </GlassCard>
    </motion.div>
  );
}

export function Skills() {
  return (
    <section id="skills" className="relative py-24 lg:py-32">
      <div className="container mx-auto px-6">
        <SectionHeading
          title="Technical Skills"
          subtitle="Technologies I've worked with to build and deploy AI systems"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILL_CATEGORIES.map((category, index) => (
            <SkillCard
              key={category.title}
              title={category.title}
              icon={category.icon}
              skills={category.skills}
              color={category.color}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
