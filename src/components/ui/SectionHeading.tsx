import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { fadeInUp } from '@/animations';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeading({
  title,
  subtitle,
  align = 'center',
  className,
}: SectionHeadingProps) {
  return (
    <motion.div
      className={cn(
        'mb-12',
        align === 'center' ? 'text-center' : 'text-left',
        className
      )}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={fadeInUp}
    >
      <h2
        className={cn(
          'text-display-sm md:text-display-md font-display font-bold',
          'bg-gradient-to-r from-white via-white to-white/70',
          'bg-clip-text text-transparent',
          'mb-4'
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg text-white/60 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
