import { Github, Linkedin, Mail, FileText, GraduationCap } from 'lucide-react';
import type { SocialLink } from '@/types';

export const socialLinks: SocialLink[] = [
  {
    name: 'GitHub',
    url: 'https://github.com/prii13',
    icon: Github,
    username: '@prii13',
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/mohana-a899992aa',
    icon: Linkedin,
    username: 'Mohana Priya M',
  },
  {
    name: 'Google Scholar',
    url: 'https://scholar.google.com/citations?view_op=list_works&hl=en&hl=en&user=_d3-T8MAAAAJ',
    icon: GraduationCap,
    username: 'Mohana Priya M',
  },
  {
    name: 'Email',
    url: 'mailto:mohanapriyamk2005@gmail.com',
    icon: Mail,
    username: 'mohanapriyamk2005@gmail.com',
  },
];

export const resumeLink: SocialLink = {
  name: 'Resume',
  url: 'https://drive.google.com/file/d/1TQJZP-LjCeXNgZk1otvH4N23nPyHeg_3/view?usp=sharing',
  icon: FileText,
};

export const RESUME_URL = 'https://drive.google.com/file/d/1TQJZP-LjCeXNgZk1otvH4N23nPyHeg_3/view?usp=sharing';
