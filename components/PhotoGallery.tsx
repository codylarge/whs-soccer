import Image from 'next/image';

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
  return (
    <section className="bg-gray-950 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/*  
        <p className="text-green-500 text-xs font-bold uppercase tracking-[0.4em] mb-3 text-center">
          Action Shots
        </p>
        <h2 className="text-3xl font-black text-white uppercase tracking-tight text-center mb-12">
          From the Sidelines
        </h2>
        */}
        <div
          className="grid gap-1.5"
          style={{ gridTemplateColumns: 'repeat(3, 1fr)', gridAutoRows: '220px' }}
        >
          {GRID.map(({ src, col, row }) => (
            <div
              key={src}
              className="relative overflow-hidden"
              style={{ gridColumn: `span ${col}`, gridRow: `span ${row}` }}
            >
              <Image
                src={src}
                alt="WHS Soccer"
                fill
                sizes={col === 2 ? '(min-width: 1024px) 66vw, 100vw' : '(min-width: 1024px) 33vw, 100vw'}
                className="object-cover object-center hover:scale-105 transition-transform duration-700"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
