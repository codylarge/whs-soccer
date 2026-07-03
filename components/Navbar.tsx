'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const links = [
  { href: '/', label: 'Home' },
  { href: '/philosophy', label: 'Philosophy' },
  { href: '/coaches', label: 'Coaches' },
  { href: '/varsity', label: 'Varsity' },
  { href: '/jv', label: 'JV' },
  { href: '/c-team', label: 'C-Team' },
  { href: '/summer-training', label: 'Summer Training' },
  { href: '/tryouts', label: 'Tryouts' },
  { href: '/calendar', label: 'Calendar' },
  { href: '/fundraising', label: 'Fundraising' },
  { href: '/sponsors', label: 'Sponsors' },
  { href: '/alumni', label: 'Alumni' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/resources', label: 'Resources' },
];

const FEATURED_HREFS = ['/', '/varsity', '/jv', '/c-team'];
const featuredLinks = links.filter((link) => FEATURED_HREFS.includes(link.href));

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-green-950 border-b border-green-900">
      <div className="max-w-6xl mx-auto px-6 py-4 grid grid-cols-[1fr_auto_1fr] items-center">
        <Link
          href="/"
          className="justify-self-start text-white font-black text-lg uppercase tracking-widest hover:text-green-400 transition-colors"
        >
          WHS<span className="text-green-400 mx-1.5">·</span>Soccer
        </Link>

        <div className="hidden sm:flex items-center gap-6 justify-self-center">
          {featuredLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-xs font-bold uppercase tracking-widest transition-colors ${
                pathname === link.href ? 'text-green-400' : 'text-white/60 hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="justify-self-end">
          <button
            className="flex flex-col gap-1.5 p-1"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-0.5 bg-white transition-all duration-300 origin-center ${open ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-0.5 bg-white transition-all duration-300 origin-center ${open ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      {open && (
        <div className="px-6 pb-5 flex flex-col gap-4 border-t border-green-900">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-xs font-bold uppercase tracking-widest pt-4 transition-colors ${
                pathname === link.href ? 'text-green-400' : 'text-white/60'
              }`}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
