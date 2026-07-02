import { getUpcomingEvents, type CalendarEvent } from '@/lib/calendar';
import EventCard from '@/components/EventCard';

export const revalidate = 300;

function groupByMonth(events: CalendarEvent[]): [string, CalendarEvent[]][] {
  const map = new Map<string, CalendarEvent[]>();
  for (const event of events) {
    const d = event.isAllDay
      ? (() => { const [y, m, day] = event.start.split('-').map(Number); return new Date(y, m - 1, day); })()
      : new Date(event.start);
    const key = d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    const bucket = map.get(key) ?? [];
    bucket.push(event);
    map.set(key, bucket);
  }
  return Array.from(map.entries());
}

export default async function CalendarPage() {
  const events = await getUpcomingEvents(50).catch(() => []);
  const calendarConfigured = !!(
    process.env.GOOGLE_CALENDAR_API_KEY && process.env.GOOGLE_CALENDAR_ID
  );
  const grouped = groupByMonth(events);

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-1">Full Schedule</h1>
      <p className="text-gray-500 mb-8 text-sm">
        Pulled automatically from Google Calendar &mdash; refreshes every 5 minutes.
      </p>

      {!calendarConfigured ? (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <p className="font-medium text-yellow-800">Calendar not configured.</p>
          <p className="text-sm text-yellow-700 mt-1">
            Add <code className="bg-yellow-100 px-1 rounded">GOOGLE_CALENDAR_API_KEY</code> and{' '}
            <code className="bg-yellow-100 px-1 rounded">GOOGLE_CALENDAR_ID</code> to{' '}
            <code className="bg-yellow-100 px-1 rounded">.env.local</code> to display the schedule.
          </p>
        </div>
      ) : grouped.length === 0 ? (
        <p className="text-gray-500">No upcoming events found.</p>
      ) : (
        grouped.map(([month, monthEvents]) => (
          <section key={month} className="mb-10">
            <h2 className="text-sm font-semibold text-green-800 uppercase tracking-widest mb-4 pb-2 border-b border-green-100">
              {month}
            </h2>
            <div className="flex flex-col gap-3">
              {monthEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </section>
        ))
      )}
    </main>
  );
}
