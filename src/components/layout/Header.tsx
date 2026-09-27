import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { NAV_ITEMS } from '@/constants';
import { useScrollDirection, useActiveSection } from '@/hooks';
import { Button } from '@/components/ui';

export function Header() {
  const { isVisible } = useScrollDirection(50);
  const activeSection = useActiveSection();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  const handleNavClick = (href: string) => {
    setIsMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <motion.header
        className={cn(
          'fixed top-0 left-0 right-0 z-50',
          'transition-all duration-300'
        )}
        initial={{ y: -100 }}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.3 }}
      >
        <div
          className={cn(
            'mx-4 mt-4 rounded-2xl',
            'backdrop-blur-xl border',
            'transition-all duration-300',
            isScrolled
              ? 'bg-primary-100/80 border-border shadow-glass'
              : 'bg-primary-100/40 border-transparent'
          )}
        >
          <nav className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <motion.a
                href="#hero"
                className="text-xl font-display font-bold text-white"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('#hero');
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent">
                  MP
                </span>
              </motion.a>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center gap-1">
                {NAV_ITEMS.map((item) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }}
                    className={cn(
                      'relative px-4 py-2 text-sm font-medium rounded-lg',
                      'transition-colors duration-200',
                      activeSection === item.href.replace('#', '')
                        ? 'text-white'
                        : 'text-white/60 hover:text-white'
                    )}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.label}
                    {activeSection === item.href.replace('#', '') && (
                      <motion.div
                        className="absolute inset-0 bg-surface rounded-lg -z-10"
                        layoutId="activeNav"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </motion.a>
                ))}
              </div>

              <div className="hidden lg:block">
                <Button
                  variant="gradient"
                  size="sm"
                  onClick={() => handleNavClick('#contact')}
                >
                  Let's Connect
                </Button>
              </div>

              {/* Mobile Menu Button */}
              <button
                className="lg:hidden p-2 text-white"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-primary/95 backdrop-blur-xl"
              onClick={() => setIsMenuOpen(false)}
            />
            <motion.nav
              className="absolute right-0 top-0 h-full w-72 bg-primary-100/95 backdrop-blur-xl border-l border-border"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <div className="flex flex-col h-full pt-24 px-6">
                {NAV_ITEMS.map((item, index) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }}
                    className={cn(
                      'py-4 text-lg font-medium border-b border-border',
                      activeSection === item.href.replace('#', '')
                        ? 'text-accent'
                        : 'text-white/70'
                    )}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {item.label}
                  </motion.a>
                ))}
                <div className="mt-6">
                  <Button
                    variant="gradient"
                    size="md"
                    className="w-full"
                    onClick={() => handleNavClick('#contact')}
                  >
                    Let's Connect
                  </Button>
                </div>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
