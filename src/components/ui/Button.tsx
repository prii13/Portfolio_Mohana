import { forwardRef } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'gradient' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'ref' | 'children'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children?: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: `
    bg-accent text-white font-medium
    hover:bg-accent/90 active:bg-accent/80
    shadow-glow-sm hover:shadow-glow-md
    transition-all duration-300
  `,
  secondary: `
    bg-surface text-white/90 font-medium
    border border-border hover:border-border-hover
    hover:bg-surface-hover active:bg-surface-active
    backdrop-blur-md
    transition-all duration-300
  `,
  ghost: `
    bg-transparent text-white/80
    hover:text-white hover:bg-surface
    transition-all duration-300
  `,
  gradient: `
    bg-gradient-to-r from-accent via-accent-secondary to-accent-highlight
    text-white font-semibold
    bg-[length:200%_100%] animate-gradient-shift
    shadow-glow-sm hover:shadow-glow-md
    transition-all duration-300
  `,
  outline: `
    bg-transparent text-accent
    border-2 border-accent/50
    hover:border-accent hover:bg-accent/10
    transition-all duration-300
  `,
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm rounded-lg',
  md: 'px-6 py-3 text-base rounded-xl',
  lg: 'px-8 py-4 text-lg rounded-xl',
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading,
      leftIcon,
      rightIcon,
      children,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <motion.button
        ref={ref}
        className={cn(
          'relative inline-flex items-center justify-center gap-2',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2',
          'focus-visible:ring-offset-primary disabled:opacity-50 disabled:cursor-not-allowed',
          'overflow-hidden',
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        disabled={disabled || isLoading}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        {...props}
      >
        {isLoading && (
          <span className="absolute inset-0 flex items-center justify-center bg-inherit">
            <svg
              className="animate-spin h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </span>
        )}
        <span className={cn('flex items-center gap-2', isLoading && 'opacity-0')}>
          {leftIcon}
          {children}
          {rightIcon}
        </span>
        <motion.div
          className="absolute inset-0 bg-white/20"
          initial={{ scale: 0, opacity: 0 }}
          whileTap={{ scale: 2, opacity: [0.5, 0], transition: { duration: 0.4 } }}
          style={{ borderRadius: 'inherit' }}
        />
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export { Button, type ButtonProps };
