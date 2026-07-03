'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const SLIDES = [
  '/img/landscape/L1.webp',
  '/img/landscape/L2.webp',
  '/img/landscape/L3.webp',
  '/img/landscape/L4.webp',
  '/img/landscape/L5.webp',
  '/img/landscape/L6.webp',
  '/img/landscape/L7.webp',
  '/img/landscape/L8.webp',
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setCurrent((c) => (c + 1) % SLIDES.length), 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative h-[90vh] overflow-hidden">
      {SLIDES.map((src, i) => (
        <div
          key={src}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            i === current ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={src}
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center"
            priority={i === 0}
          />
        </div>
      ))}

      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/25 to-black/70" />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight leading-none mb-5">
          Woodinville High School<br />Girls Soccer
        </h1>
        <p className="text-green-400 text-sm sm:text-base uppercase tracking-[0.25em] mb-10">
          One Falcon. One Family.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/season-info"
            className="border-2 border-white/80 text-white text-xs font-bold px-10 py-4 rounded-full uppercase tracking-widest hover:bg-white hover:text-green-900 transition-all duration-300"
          >
            2026 Season Information
          </Link>
          <Link
            href="/summer-training"
            className="bg-green-600 border-2 border-green-600 text-white text-xs font-bold px-10 py-4 rounded-full uppercase tracking-widest hover:bg-green-500 hover:border-green-500 transition-all duration-300"
          >
            Summer Training
          </Link>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i === current ? 'w-8 bg-green-400' : 'w-1.5 bg-white/40 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
