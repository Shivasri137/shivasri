import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Shiva Sri | AI/ML Engineer & Builder',
  description: 'Portfolio of Shiva Sri — AI/ML engineering, agentic systems, computer vision, and useful products.',
  applicationName: 'Shiva Sri Portfolio',
  openGraph: {
    title: 'Shiva Sri | AI/ML Engineer & Builder',
    description: 'Building intelligent systems and thoughtful digital experiences.',
    type: 'website'
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
