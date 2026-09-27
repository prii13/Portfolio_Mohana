import { forwardRef } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlassCardProps extends Omit<HTMLMotionProps<'div'>, 'ref' | 'children'> {
  variant?: 'default' | 'elevated' | 'bordered';
  hover?: boolean;
  glow?: boolean;
  glowColor?: string;
  children?: React.ReactNode;
}

const variantStyles = {
  default: 'bg-surface backdrop-blur-md',
  elevated: 'bg-surface backdrop-blur-lg shadow-card',
  bordered: 'bg-surface/50 backdrop-blur-sm border border-border',
};

const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  (
    {
      variant = 'default',
      hover = true,
      glow = false,
      glowColor = 'rgba(79, 140, 255, 0.15)',
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <motion.div
        ref={ref}
        className={cn(
          'rounded-2xl relative overflow-hidden',
          variantStyles[variant],
          glow && 'shadow-glow-sm',
          hover && 'hover:shadow-card hover:bg-surface-hover',
          'transition-all duration-300',
          className
        )}
        initial="rest"
        whileHover={hover ? 'hover' : undefined}
        {...props}
      >
        {glow && (
          <div
            className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background: `radial-gradient(circle at center, ${glowColor} 0%, transparent 70%)`,
            }}
          />
        )}
        <div className="relative z-10">{children}</div>
      </motion.div>
    );
  }
);

GlassCard.displayName = 'GlassCard';

export { GlassCard, type GlassCardProps };
