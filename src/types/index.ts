import { LucideIcon } from 'lucide-react';

export type SkillLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';

export interface Skill {
  name: string;
  level: SkillLevel;
  icon?: LucideIcon;
}

export interface SkillCategory {
  title: string;
  icon: LucideIcon;
  skills: Skill[];
  color: string;
}

export interface Experience {
  id: string;
  role: string;
  organization: string;
  location?: string;
  duration: string;
  type: 'internship' | 'full-time' | 'part-time' | 'contract';
  achievements: string[];
  technologies: string[];
  logo?: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  image: string;
  technologies: string[];
  category: ProjectCategory;
  features: string[];
  challenges: string[];
  learnings: string[];
  architecture?: string;
  githubUrl?: string;
  liveUrl?: string;
  metrics?: {
    label: string;
    value: string;
  }[];
  highlight: string;
}

export type ProjectCategory = 'all' | 'ai' | 'ml' | 'backend' | 'computer-vision';

export interface Publication {
  id: string;
  title: string;
  conference: string;
  date?: string;
  abstract: string;
  keywords: string[];
  technologies: string[];
  doi?: string;
  paperUrl?: string;
  citeUrl?: string;
  featured: boolean;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  credentialUrl?: string;
  image?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  value?: number;
  suffix?: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: LucideIcon;
  username?: string;
}

export interface NavItem {
  label: string;
  href: string;
  icon?: LucideIcon;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export type ThemeColor = 'blue' | 'purple' | 'cyan' | 'green';

export interface AnimationConfig {
  duration: number;
  delay: number;
  ease: string;
}

export interface CursorState {
  x: number;
  y: number;
  isHovering: boolean;
  cursorType: 'default' | 'pointer' | 'text';
}
