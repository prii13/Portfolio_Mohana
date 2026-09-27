import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'accent' | 'success' | 'warning' | 'outline';
  size?: 'sm' | 'md';
  animated?: boolean;
  className?: string;
}

const variantStyles = {
  default: 'bg-surface text-white/70 border-border',
  accent: 'bg-accent/10 text-accent border-accent/30',
  success: 'bg-green-500/10 text-green-400 border-green-500/30',
  warning: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
  outline: 'bg-transparent text-white/60 border-border',
};

const sizeStyles = {
  sm: 'px-2.5 py-1 text-xs',
  md: 'px-3 py-1.5 text-sm',
};

export function Badge({
  children,
  variant = 'default',
  size = 'sm',
  animated = false,
  className,
}: BadgeProps) {
  const Component = animated ? motion.span : 'span';

  return (
    <Component
      className={cn(
        'inline-flex items-center gap-1.5 rounded-lg border',
        'font-medium backdrop-blur-sm',
        variantStyles[variant],
        sizeStyles[size],
        animated && 'animate-pulse-glow',
        className
      )}
    >
      {children}
    </Component>
  );
}
