import Image from 'next/image';
import Link from 'next/link';

const TEAMS = [
  { name: 'Varsity', href: '/varsity', photo: '/img/landscape/L1.webp' },
  { name: 'JV', href: '/jv', photo: '/img/landscape/L4.webp' },
  { name: 'C-Team', href: '/c-team', photo: '/img/landscape/L7.webp' },
];

export default function ProgramSnapshot() {
  return (
    <section className="bg-gray-50 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <p className="text-green-600 text-xs font-bold uppercase tracking-[0.4em] mb-3 text-center">
          The Program
        </p>
        <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tight text-center mb-12">
          Program Snapshot
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TEAMS.map((team) => (
            <Link
              key={team.href}
              href={team.href}
              className="group bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={team.photo}
                  alt={team.name}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight mb-3">
                  {team.name}
                </h3>
                <p className="text-sm text-gray-500 mb-1">Coaches: TBA</p>
                <p className="text-sm text-green-700 font-semibold uppercase tracking-wide mt-3 group-hover:text-green-800">
                  Roster &rarr;
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
