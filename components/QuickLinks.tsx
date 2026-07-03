import Link from 'next/link';

const QUICK_LINKS = [
  { emoji: '🟢', label: 'Summer Training', href: '/summer-training' },
  { emoji: '⚽', label: 'Tryout Information', href: '/tryouts' },
  { emoji: '📅', label: 'Program Calendar', href: '/calendar' },
  { emoji: '💚', label: 'Team Store', href: '/team-store' },
  { emoji: '📣', label: 'Fundraising', href: '/fundraising' },
  { emoji: '📸', label: 'Photo Gallery', href: '/gallery' },
];

export default function QuickLinks() {
  return (
    <div className="bg-green-950 border-b border-green-900">
      <div className="max-w-6xl mx-auto px-4 py-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
        {QUICK_LINKS.map(({ emoji, label, href }) => (
          <Link
            key={href}
            href={href}
            className="flex items-center gap-2 text-white/80 text-xs font-bold uppercase tracking-widest hover:text-green-400 transition-colors"
          >
            <span aria-hidden>{emoji}</span>
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
}
