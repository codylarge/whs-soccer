'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

// Order matters — CSS grid auto-placement fills left-to-right:
// Row 1: L1(×2 cols), P1(×2 rows)
// Row 2: L2, L3, P1(cont)
// Row 3: L4(×2 cols), P2(×2 rows)
// Row 4: L5, L6, P2(cont)
// Row 5: P3(×2 rows), L7(×2 cols)
// Row 6: P3(cont), L8(×2 cols)
const GRID = [
  { src: '/img/landscape/L1.webp', col: 2, row: 1 },
  { src: '/img/portrait/P1.webp',  col: 1, row: 2 },
  { src: '/img/landscape/L2.webp', col: 1, row: 1 },
  { src: '/img/landscape/L3.webp', col: 1, row: 1 },
  { src: '/img/landscape/L4.webp', col: 2, row: 1 },
  { src: '/img/portrait/P2.webp',  col: 1, row: 2 },
  { src: '/img/landscape/L5.webp', col: 1, row: 1 },
  { src: '/img/landscape/L6.webp', col: 1, row: 1 },
  { src: '/img/portrait/P3.webp',  col: 1, row: 2 },
  { src: '/img/landscape/L7.webp', col: 2, row: 1 },
  { src: '/img/landscape/L8.webp', col: 2, row: 1 },
];

export default function PhotoGallery() {
  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    if (selected === null) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setSelected(null);
      if (e.key === 'ArrowRight') setSelected((i) => (i === null ? i : (i + 1) % GRID.length));
      if (e.key === 'ArrowLeft') setSelected((i) => (i === null ? i : (i - 1 + GRID.length) % GRID.length));
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selected]);

  return (
    <section className="bg-gray-950 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div
          className="grid gap-1.5"
          style={{ gridTemplateColumns: 'repeat(3, 1fr)', gridAutoRows: '220px' }}
        >
          {GRID.map(({ src, col, row }, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setSelected(i)}
              aria-label="View photo full screen"
              className="relative overflow-hidden p-0 border-0 bg-transparent cursor-pointer"
              style={{ gridColumn: `span ${col}`, gridRow: `span ${row}` }}
            >
              <Image
                src={src}
                alt="WHS Soccer"
                fill
                sizes={col === 2 ? '(min-width: 1024px) 66vw, 100vw' : '(min-width: 1024px) 33vw, 100vw'}
                className="object-cover object-center hover:scale-105 transition-transform duration-700"
              />
            </button>
          ))}
        </div>
      </div>

      {selected !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 sm:p-10"
          onClick={() => setSelected(null)}
        >
          <button
            type="button"
            onClick={() => setSelected(null)}
            aria-label="Close"
            className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white/70 hover:text-white text-3xl leading-none z-10"
          >
            &#10005;
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setSelected((i) => (i === null ? i : (i - 1 + GRID.length) % GRID.length));
            }}
            aria-label="Previous photo"
            className="absolute left-2 sm:left-6 text-white/70 hover:text-white text-4xl leading-none z-10 px-2 py-4"
          >
            &#8249;
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setSelected((i) => (i === null ? i : (i + 1) % GRID.length));
            }}
            aria-label="Next photo"
            className="absolute right-2 sm:right-6 text-white/70 hover:text-white text-4xl leading-none z-10 px-2 py-4"
          >
            &#8250;
          </button>

          <div
            className="relative w-full h-full max-w-5xl max-h-[85vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={GRID[selected].src}
              alt="WHS Soccer"
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>
        </div>
      )}
    </section>
  );
}
