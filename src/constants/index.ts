import {
  Brain,
  Code2,
  Database,
  Server,
  Wrench,
  Sparkles,
  Eye,
  Cpu,
  Cloud,
  Bot,
  Network,
  Terminal,
} from 'lucide-react';
import type { SkillCategory, NavItem, ProjectCategory } from '@/types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Research', href: '#publications' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Contact', href: '#contact' },
];

export const PROJECT_CATEGORIES: { label: string; value: ProjectCategory }[] = [
  { label: 'All Projects', value: 'all' },
  { label: 'AI', value: 'ai' },
  { label: 'Machine Learning', value: 'ml' },
  { label: 'Backend', value: 'backend' },
  { label: 'Computer Vision', value: 'computer-vision' },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Programming',
    icon: Code2,
    color: '#4F8CFF',
    skills: [
      { name: 'Python', level: 'expert' },
      { name: 'Java', level: 'advanced' },
      { name: 'C', level: 'advanced' },
      { name: 'SQL', level: 'advanced' },
      { name: 'JavaScript', level: 'intermediate' },
    ],
  },
  {
    title: 'AI / Machine Learning',
    icon: Brain,
    color: '#00D4FF',
    skills: [
      { name: 'Machine Learning', level: 'advanced' },
      { name: 'Deep Learning', level: 'advanced' },
      { name: 'TensorFlow', level: 'advanced' },
      { name: 'Scikit-learn', level: 'advanced' },
      { name: 'PyTorch', level: 'intermediate' },
      { name: 'Computer Vision', level: 'advanced' },
    ],
  },
  {
    title: 'Generative AI / NLP',
    icon: Sparkles,
    color: '#8B5CF6',
    skills: [
      { name: 'Generative AI', level: 'advanced' },
      { name: 'LLMs', level: 'advanced' },
      { name: 'RAG', level: 'intermediate' },
      { name: 'Prompt Engineering', level: 'advanced' },
      { name: 'NLP', level: 'advanced' },
      { name: 'PEGASUS', level: 'advanced' },
      { name: 'BERT', level: 'advanced' },
      { name: 'NLTK', level: 'intermediate' },
    ],
  },
  {
    title: 'Data Science',
    icon: Cpu,
    color: '#10B981',
    skills: [
      { name: 'NumPy', level: 'expert' },
      { name: 'Pandas', level: 'expert' },
      { name: 'Data Preprocessing', level: 'advanced' },
      { name: 'Exploratory Data Analysis', level: 'advanced' },
      { name: 'Statistical Analysis', level: 'advanced' },
    ],
  },
  {
    title: 'Computer Vision',
    icon: Eye,
    color: '#F59E0B',
    skills: [
      { name: 'OpenCV', level: 'advanced' },
      { name: 'YOLOv5', level: 'advanced' },
      { name: 'MTCNN', level: 'intermediate' },
    ],
  },
  {
    title: 'Backend',
    icon: Server,
    color: '#EF4444',
    skills: [
      { name: 'FastAPI', level: 'advanced' },
      { name: 'Flask', level: 'advanced' },
      { name: 'REST APIs', level: 'expert' },
    ],
  },
  {
    title: 'Databases',
    icon: Database,
    color: '#4F8CFF',
    skills: [
      { name: 'MySQL', level: 'advanced' },
      { name: 'MongoDB', level: 'intermediate' },
      { name: 'FAISS', level: 'intermediate' },
    ],
  },
  {
    title: 'Developer Tools',
    icon: Wrench,
    color: '#8B5CF6',
    skills: [
      { name: 'Git', level: 'advanced' },
      { name: 'GitHub', level: 'advanced' },
      { name: 'Visual Studio Code', level: 'expert' },
      { name: 'Replit', level: 'intermediate' },
      { name: 'Netlify', level: 'intermediate' },
    ],
  },
  {
    title: 'AI Tools',
    icon: Bot,
    color: '#00D4FF',
    skills: [
      { name: 'GitHub Copilot', level: 'advanced' },
      { name: 'Hugging Face', level: 'advanced' },
      { name: 'Claude Code', level: 'advanced' },
      { name: 'Gemini', level: 'intermediate' },
    ],
  },
  {
    title: 'Core Computer Science',
    icon: Terminal,
    color: '#10B981',
    skills: [
      { name: 'Data Structures & Algorithms', level: 'advanced' },
      { name: 'Computer Networks', level: 'intermediate' },
      { name: 'Operating Systems', level: 'intermediate' },
    ],
  },
  {
    title: 'Cloud',
    icon: Cloud,
    color: '#F59E0B',
    skills: [
      { name: 'AWS Cloud Fundamentals', level: 'beginner' },
    ],
  },
];

export const CURRENTLY_EXPLORING = [
  'Agentic AI',
  'MLOps',
  'LLMOps',
  'RAG Systems',
  'Vector Databases',
  'Multi-Agent Systems',
];

export const RESUME_URL = 'https://drive.google.com/file/d/1TQJZP-LjCeXNgZk1otvH4N23nPyHeg_3/view?usp=sharing';

export const ANIMATION_VARIANTS = {
  fadeInUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  },
  fadeInLeft: {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0 },
  },
  fadeInRight: {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0 },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
  },
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  },
};

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};
