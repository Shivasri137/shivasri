import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Shiva Sri | AI/ML Engineer & Generative AI Builder',
  description: 'Shiva Sri Jonnala builds practical AI/ML applications, LLM-powered workflows, RAG systems, multi-agent tools, and thoughtful digital products.',
  applicationName: 'Shiva Sri Portfolio',
  keywords: [
    'Shiva Sri Jonnala',
    'AI/ML Engineer',
    'Generative AI',
    'LLM',
    'RAG',
    'AI Agents',
    'Python',
    'Machine Learning',
    'TensorFlow',
    'LangChain',
    'Next.js'
  ],
  openGraph: {
    title: 'Shiva Sri | AI/ML Engineer & Generative AI Builder',
    description: 'Selected work in AI/ML engineering, LLM applications, RAG, multi-agent systems, and product development.',
    type: 'website',
    images: [
      {
        url: '/shiva-portfolio-banner-v2.webp',
        width: 1200,
        height: 465,
        alt: 'Shiva Sri — AI/ML Engineer and Generative AI Builder'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shiva Sri | AI/ML Engineer & Generative AI Builder',
    description: 'AI/ML engineering, LLM applications, RAG, and multi-agent systems.',
    images: ['/shiva-portfolio-banner-v2.webp']
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
