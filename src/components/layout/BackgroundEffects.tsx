import { motion } from 'framer-motion';
import { blobAnimation } from '@/animations';

export function FloatingBlob({
  color = 'rgba(79, 140, 255, 0.15)',
  size = 400,
  className = '',
}: {
  color?: string;
  size?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={`absolute rounded-full blur-3xl pointer-events-none ${className}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
      }}
      variants={blobAnimation}
      animate="animate"
    />
  );
}

export function GridPattern({ className = '' }: { className?: string }) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{
        backgroundImage: `
          linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
      }}
    />
  );
}

export function GradientOrb({
  className = '',
  color1 = 'rgba(79, 140, 255, 0.1)',
  color2 = 'rgba(139, 92, 246, 0.1)',
}: {
  className?: string;
  color1?: string;
  color2?: string;
}) {
  return (
    <div
      className={`absolute rounded-full blur-3xl pointer-events-none ${className}`}
      style={{
        background: `radial-gradient(circle at 30% 30%, ${color1}, ${color2})`,
      }}
    />
  );
}

export function NoiseOverlay({ opacity = 0.02 }: { opacity?: number }) {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-10"
      style={{
        opacity,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      }}
    />
  );
}
