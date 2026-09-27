import type { Publication } from '@/types';

export const publications: Publication[] = [
  {
    id: 'newslytic-research',
    title: 'AI-Powered Personalized News Summarizer (Newslytic)',
    conference: 'Research Project',
    date: '',
    abstract:
      'Newslytic is a multilingual news processing and summarization system that automatically retrieves news, detects language, performs translation when required, and generates concise summaries using transformer-based NLP models. The system integrates PEGASUS for abstractive summarization and BERT for semantic understanding, with FastAPI REST APIs and Celery-based background processing.',
    keywords: [
      'NLP',
      'Abstractive Summarization',
      'PEGASUS',
      'BERT',
      'Multilingual',
      'Language Detection',
      'Translation',
    ],
    technologies: ['Python', 'PEGASUS', 'BERT', 'FastAPI', 'Celery', 'APScheduler'],
    paperUrl: 'https://scholar.google.com/citations?view_op=list_works&hl=en&hl=en&user=_d3-T8MAAAAJ',
    featured: true,
  },
];
