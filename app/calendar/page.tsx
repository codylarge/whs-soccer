import { getEventsForMonth } from '@/lib/calendar';
import MonthCalendar from '@/components/MonthCalendar';

export const revalidate = 300;

export default async function CalendarPage({
  searchParams,
}: {
  searchParams: Promise<{ month?: string }>;
}) {
  const { month: monthParam } = await searchParams;

  const now = new Date();
  let year = now.getFullYear();
  let month = now.getMonth() + 1;

  if (monthParam && /^\d{4}-\d{2}$/.test(monthParam)) {
    const [y, m] = monthParam.split('-').map(Number);
    if (m >= 1 && m <= 12) {
      year = y;
      month = m;
    }
  }

  const calendarConfigured = !!(
    process.env.GOOGLE_CALENDAR_API_KEY && process.env.GOOGLE_CALENDAR_ID
  );

  const events = calendarConfigured
    ? await getEventsForMonth(year, month).catch(() => [])
    : [];

  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      {!calendarConfigured ? (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <p className="font-medium text-yellow-800">Calendar not configured.</p>
          <p className="text-sm text-yellow-700 mt-1">
            Add <code className="bg-yellow-100 px-1 rounded">GOOGLE_CALENDAR_API_KEY</code> and{' '}
            <code className="bg-yellow-100 px-1 rounded">GOOGLE_CALENDAR_ID</code> to{' '}
            <code className="bg-yellow-100 px-1 rounded">.env.local</code> to display the schedule.
          </p>
        </div>
      ) : (
        <MonthCalendar year={year} month={month} events={events} />
      )}
    </main>
  );
}
