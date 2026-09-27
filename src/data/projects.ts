import type { Project } from '@/types';

export const projects: Project[] = [
  {
    id: 'newslytic',
    title: 'AI-Powered Personalized News Summarizer',
    subtitle: 'Newslytic — Multilingual NLP & Summarization System',
    description:
      'An AI-powered multilingual news processing and summarization system that automatically retrieves news, detects language, performs translation when required, and generates concise summaries using transformer-based NLP models.',
    longDescription:
      'Newslytic is a multilingual news processing and summarization platform that automatically retrieves news from multiple sources, detects the language of each article, performs translation when required, and generates concise summaries using transformer-based NLP models. The system integrates PEGASUS for abstractive summarization and BERT for semantic understanding, exposes REST APIs through FastAPI, and uses Celery with APScheduler for automated task scheduling and background processing.',
    image: '/projects/news-summarizer.png',
    category: 'ai',
    technologies: ['Python', 'PEGASUS', 'BERT', 'FastAPI', 'Celery', 'APScheduler', 'NLP', 'Language Detection', 'Translation'],
    features: [
      'Automated news retrieval from multiple sources',
      'Multilingual news processing with language detection',
      'Translation of non-English articles before summarization',
      'Transformer-based abstractive summarization using PEGASUS',
      'BERT-based semantic understanding and topic clustering',
      'REST API endpoints built with FastAPI',
      'Background processing with Celery',
      'Automated task scheduling with APScheduler',
    ],
    challenges: [
      'Handling multilingual content across diverse news sources',
      'Coordinating language detection and translation in the processing pipeline',
      'Managing background task scheduling for periodic news retrieval',
      'Ensuring summary quality across different languages and article formats',
    ],
    learnings: [
      'Transformer architecture for abstractive summarization',
      'Multilingual NLP pipeline design',
      'Background task processing with Celery and APScheduler',
      'REST API design with FastAPI',
    ],
    architecture:
      'Modular pipeline with separate stages for retrieval, language detection, translation, and summarization. FastAPI serves the REST endpoints, Celery handles background processing, and APScheduler manages periodic task scheduling.',
    githubUrl: 'https://github.com/prii13',
    highlight: 'Multilingual transformer-based summarization with automated scheduling',
  },
  {
    id: 'face-recognition-attendance',
    title: 'Face Recognition Based Attendance System',
    subtitle: 'Real-Time Attendance Automation Platform',
    description:
      'A computer-vision-based attendance system designed to automate attendance using real-time face detection and recognition, with backend integration for processing and attendance management.',
    longDescription:
      'A computer-vision-based attendance system that automates attendance marking through real-time face detection and recognition. The system uses YOLOv5 for face detection and MTCNN for face alignment, with a React frontend and FastAPI backend for attendance data handling and management.',
    image: '/projects/face-recognition.png',
    category: 'computer-vision',
    technologies: ['YOLOv5', 'MTCNN', 'React', 'FastAPI', 'OpenCV', 'Pandas'],
    features: [
      'Real-time face detection using YOLOv5',
      'Face alignment with MTCNN',
      'Automated attendance marking',
      'Computer vision pipeline with OpenCV processing',
      'Backend integration for attendance data handling',
      'Attendance data management and reporting',
    ],
    challenges: [
      'Achieving reliable detection across varying lighting conditions',
      'Handling occlusions and partial face visibility',
      'Optimizing the vision pipeline for real-time processing',
      'Integrating detection and recognition with the attendance backend',
    ],
    learnings: [
      'Computer vision pipeline design',
      'Real-time face detection and recognition',
      'Full-stack integration with React and FastAPI',
      'Attendance data management',
    ],
    architecture:
      'Client-server architecture with a React frontend and FastAPI backend. The computer vision pipeline runs YOLOv5 for detection and MTCNN for alignment, with attendance records managed through the backend.',
    githubUrl: 'https://github.com/prii13',
    highlight: 'Real-time computer vision pipeline with attendance automation',
  },
  {
    id: 'telegram-sentinel-bot',
    title: 'Telegram Sentinel Bot',
    subtitle: 'Real-Time Scam & Fraud Detection Monitor',
    description:
      'A real-time Telegram monitoring and analysis bot designed to identify potentially suspicious investment scams, cryptocurrency fraud, stock-market manipulation signals, and other malicious message patterns.',
    longDescription:
      'Telegram Sentinel Bot is a real-time monitoring and analysis tool that watches Telegram channels for potentially suspicious activity. It uses NLP-based message analysis, text classification, sentiment analysis, and rule-based detection to identify investment scams, cryptocurrency fraud, stock-market manipulation signals, and other malicious message patterns. The bot generates automated alerts and actionable security reports.',
    image: '/projects/telegram-sentinel-bot.png',
    category: 'ai',
    technologies: ['Python', 'Telethon', 'NLP', 'Sentiment Analysis', 'Rule-Based Detection'],
    features: [
      'Real-time Telegram channel monitoring via Telethon',
      'NLP-based message analysis and text classification',
      'Sentiment analysis to gauge message tone and urgency',
      'Rule-based detection of suspicious patterns',
      'Keyword and urgency signal detection',
      'Monetary mention detection',
      'Suspicious message pattern identification',
      'Automated alerts and actionable security reports',
    ],
    challenges: [
      'Distinguishing genuine financial discussion from manipulation signals',
      'Reducing false positives in scam detection',
      'Processing high-volume real-time message streams',
      'Designing effective rule-based and NLP detection heuristics',
    ],
    learnings: [
      'Real-time message monitoring with Telethon',
      'NLP-based text classification and sentiment analysis',
      'Rule-based detection system design',
      'Security automation and alert generation',
    ],
    architecture:
      'Python-based bot using Telethon for real-time Telegram monitoring. NLP modules handle text classification and sentiment analysis, while a rule-based engine flags suspicious patterns and generates automated alerts and reports.',
    githubUrl: 'https://github.com/prii13',
    highlight: 'Real-time NLP scam detection with automated security alerts',
  },
];
