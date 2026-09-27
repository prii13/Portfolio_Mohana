import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send, FileText, CheckCircle, AlertCircle, MapPin } from 'lucide-react';
import { GlassCard, Button, Input, Textarea, SectionHeading } from '@/components/ui';
import { socialLinks, resumeLink } from '@/data/social';
import { fadeInUp, fadeInLeft, fadeInRight } from '@/animations';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const functionUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-contact-email`;
      const response = await fetch(functionUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send message');
      }

      setSubmitStatus('success');
      reset();
    } catch (err) {
      setSubmitStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 lg:py-32">
      <div className="container mx-auto px-6">
        <SectionHeading
          title="Get In Touch"
          subtitle="Let's discuss opportunities, collaborations, or just say hello"
        />

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Left side - Info */}
          <motion.div
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl lg:text-3xl font-display font-bold text-white mb-4">
                Let's Build Something Meaningful
              </h3>
              <p className="text-white/60 leading-relaxed">
                Whether you're looking for an AI engineer to join your team, have a project idea to discuss, or just want to connect &mdash; I'd love to hear from you. I'm particularly interested in opportunities involving machine learning, NLP, Generative AI, and building intelligent systems at scale.
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-sm text-white/40 uppercase tracking-wider">Connect with me</p>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((link) => {
                  const IconComponent = link.icon;
                  return (
                    <motion.a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-4 py-3 rounded-xl bg-surface border border-border hover:border-accent/30 hover:bg-surface-hover transition-all group"
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <IconComponent
                        size={20}
                        className="text-white/60 group-hover:text-accent transition-colors"
                      />
                      <span className="text-sm text-white/70 group-hover:text-white transition-colors">
                        {link.name}
                      </span>
                    </motion.a>
                  );
                })}
                <motion.a
                  href={resumeLink.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-accent/10 border border-accent/30 hover:bg-accent/20 transition-all group"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FileText
                    size={20}
                    className="text-accent"
                  />
                  <span className="text-sm text-accent">
                    Download Resume
                  </span>
                </motion.a>
              </div>
            </div>

            <div className="flex items-center gap-3 text-sm text-white/50">
              <MapPin size={16} className="text-accent" />
              <span>Coimbatore, Tamil Nadu, India</span>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-r from-accent/10 via-accent-secondary/10 to-accent-highlight/10 border border-border">
              <p className="text-sm text-white/70">
                <span className="text-accent font-semibold">Response Time:</span> I typically respond within 24-48 hours. For urgent inquiries, feel free to reach out via LinkedIn.
              </p>
            </div>
          </motion.div>

          {/* Right side - Form */}
          <motion.div
            variants={fadeInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <GlassCard variant="elevated" className="p-8">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <Input
                  label="Name"
                  placeholder="Your name"
                  error={errors.name?.message}
                  {...register('name')}
                />

                <Input
                  label="Email"
                  type="email"
                  placeholder="your@email.com"
                  error={errors.email?.message}
                  {...register('email')}
                />

                <Input
                  label="Subject"
                  placeholder="What's this about?"
                  error={errors.subject?.message}
                  {...register('subject')}
                />

                <Textarea
                  label="Message"
                  placeholder="Tell me about your project, opportunity, or just say hi..."
                  error={errors.message?.message}
                  rows={5}
                  {...register('message')}
                />

                <Button
                  type="submit"
                  variant="gradient"
                  size="lg"
                  className="w-full"
                  isLoading={isSubmitting}
                  disabled={isSubmitting}
                  leftIcon={!isSubmitting && <Send size={18} />}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>

                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 p-3 rounded-lg bg-green-500/10 border border-green-500/20"
                  >
                    <CheckCircle className="text-green-400" size={18} />
                    <span className="text-sm text-green-400">Message sent successfully! I'll get back to you soon.</span>
                  </motion.div>
                )}

                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20"
                  >
                    <AlertCircle className="text-red-400" size={18} />
                    <span className="text-sm text-red-400">{errorMessage || 'Failed to send message. Please try again.'}</span>
                  </motion.div>
                )}
              </form>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
