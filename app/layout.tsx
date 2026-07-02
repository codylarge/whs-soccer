import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';

const geist = Geist({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'WHS Soccer',
  description: 'Woodinville High School Girls Soccer — schedule, news, and more.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={geist.className}>
      <body className="min-h-screen flex flex-col bg-white">
        <Navbar />
        <div className="flex-1">{children}</div>
        <footer className="bg-green-950 border-t border-green-900 text-green-500 text-xs text-center py-6 uppercase tracking-widest font-bold">
          WHS Soccer &copy; {new Date().getFullYear()}
        </footer>
      </body>
    </html>
  );
}
