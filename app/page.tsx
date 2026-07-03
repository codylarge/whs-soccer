import Link from 'next/link';
import { getUpcomingEvents } from '@/lib/calendar';
import EventCard from '@/components/EventCard';
import HeroCarousel from '@/components/HeroCarousel';
import QuickLinks from '@/components/QuickLinks';
import ProgramSnapshot from '@/components/ProgramSnapshot';

export const revalidate = 300;

export default async function Home() {
  const events = await getUpcomingEvents(5).catch(() => []);
  const calendarConfigured = !!(
    process.env.GOOGLE_CALENDAR_API_KEY && process.env.GOOGLE_CALENDAR_ID
  );

  return (
    <main>
      <HeroCarousel />
      <QuickLinks />
      <ProgramSnapshot />

      <section className="bg-white py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-green-600 text-xs font-bold uppercase tracking-[0.4em] mb-3">
            Schedule
          </p>
          <div className="flex items-end justify-between mb-10">
            <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tight">
              Upcoming Events
            </h2>
            {calendarConfigured && events.length > 0 && (
              <Link
                href="/calendar"
                className="text-sm text-green-700 font-semibold hover:text-green-800 tracking-wide"
              >
                See all &rarr;
              </Link>
            )}
          </div>

          {!calendarConfigured ? (
            <div className="border border-gray-200 rounded-xl p-6 bg-gray-50">
              <p className="font-semibold text-gray-700">Calendar not configured.</p>
              <p className="text-sm text-gray-500 mt-1">
                Add credentials to{' '}
                <code className="bg-gray-100 px-1 rounded">.env.local</code> to show events.
              </p>
            </div>
          ) : events.length === 0 ? (
            <p className="text-gray-400 text-sm">No upcoming events scheduled.</p>
          ) : (
            <div className="flex flex-col gap-3">
              {events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
