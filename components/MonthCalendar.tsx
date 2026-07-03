'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { CalendarEvent } from '@/lib/calendar';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MAX_VISIBLE = 2;

function eventDateKey(event: CalendarEvent): string {
  if (event.isAllDay) {
    return event.start.slice(0, 10);
  }
  const d = new Date(event.start);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function formatTime(dateStr: string): string {
  return new Date(dateStr).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  });
}

function monthParam(year: number, month: number): string {
  return `${year}-${String(month).padStart(2, '0')}`;
}

function EventPill({ event }: { event: CalendarEvent }) {
  return (
    <div
      className="h-5 shrink-0 flex items-center bg-green-50 border border-green-100 rounded px-1.5 text-[11px] leading-none text-green-900 overflow-hidden whitespace-nowrap"
      title={event.title}
    >
      {!event.isAllDay && (
        <span className="text-green-700 font-semibold shrink-0">{formatTime(event.start)}&nbsp;</span>
      )}
      <span className="truncate">{event.title}</span>
    </div>
  );
}

export default function MonthCalendar({
  year,
  month,
  events,
}: {
  year: number;
  month: number;
  events: CalendarEvent[];
}) {
  const [openDay, setOpenDay] = useState<string | null>(null);

  const eventsByDay = new Map<string, CalendarEvent[]>();
  for (const event of events) {
    const key = eventDateKey(event);
    const bucket = eventsByDay.get(key) ?? [];
    bucket.push(event);
    eventsByDay.set(key, bucket);
  }

  const firstOfMonth = new Date(year, month - 1, 1);
  const daysInMonth = new Date(year, month, 0).getDate();
  const startWeekday = firstOfMonth.getDay();

  const cells: (number | null)[] = [
    ...Array(startWeekday).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  const today = new Date();
  const isCurrentMonth = today.getFullYear() === year && today.getMonth() + 1 === month;

  const prev = month === 1 ? { year: year - 1, month: 12 } : { year, month: month - 1 };
  const next = month === 12 ? { year: year + 1, month: 1 } : { year, month: month + 1 };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <Link
          href={`/calendar?month=${monthParam(prev.year, prev.month)}`}
          className="text-sm font-semibold text-green-700 hover:text-green-800 px-3 py-1.5 rounded-md border border-gray-200 hover:border-green-300 transition-colors"
        >
          &larr; Prev
        </Link>

        <div className="text-center">
          <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">
            {firstOfMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </h2>
          {!isCurrentMonth && (
            <Link
              href={`/calendar?month=${monthParam(today.getFullYear(), today.getMonth() + 1)}`}
              className="text-xs text-green-700 hover:text-green-800 font-semibold uppercase tracking-wide"
            >
              Back to today
            </Link>
          )}
        </div>

        <Link
          href={`/calendar?month=${monthParam(next.year, next.month)}`}
          className="text-sm font-semibold text-green-700 hover:text-green-800 px-3 py-1.5 rounded-md border border-gray-200 hover:border-green-300 transition-colors"
        >
          Next &rarr;
        </Link>
      </div>

      <div className="grid grid-cols-7 border-t border-l border-gray-200">
        {WEEKDAYS.map((day) => (
          <div
            key={day}
            className="border-r border-b border-gray-200 bg-gray-50 py-2 text-center text-xs font-bold text-gray-500 uppercase tracking-widest"
          >
            {day}
          </div>
        ))}

        {cells.map((day, i) => {
          if (day === null) {
            return <div key={i} className="h-32 border-r border-b border-gray-200 bg-gray-50" />;
          }

          const key = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          const dayEvents = eventsByDay.get(key) ?? [];
          const visibleEvents = dayEvents.slice(0, MAX_VISIBLE);
          const hiddenCount = dayEvents.length - MAX_VISIBLE;
          const isToday = isCurrentMonth && today.getDate() === day;
          const isOpen = openDay === key;
          const anchorRight = i % 7 >= 4;

          return (
            <div key={i} className="relative border-r border-b border-gray-200">
              <div className="h-32 p-1.5 overflow-hidden flex flex-col">
                <div
                  className={`text-xs font-semibold w-6 h-6 flex items-center justify-center rounded-full mb-1 shrink-0 ${
                    isToday ? 'bg-green-700 text-white' : 'text-gray-700'
                  }`}
                >
                  {day}
                </div>
                <div className="flex flex-col gap-1">
                  {visibleEvents.map((event) => (
                    <EventPill key={event.id} event={event} />
                  ))}
                  {hiddenCount > 0 && (
                    <button
                      onClick={() => setOpenDay(key)}
                      className="h-5 shrink-0 flex items-center text-[11px] font-semibold text-green-700 hover:text-green-800 px-1.5"
                    >
                      {`+${hiddenCount} more…`}
                    </button>
                  )}
                </div>
              </div>

              {isOpen && (
                <>
                  <div
                    className="fixed inset-0 z-20"
                    onClick={() => setOpenDay(null)}
                    aria-hidden
                  />
                  <div
                    className={`absolute z-30 top-0 ${anchorRight ? 'right-0' : 'left-0'} w-60 max-h-72 overflow-y-auto bg-white border border-gray-200 rounded-lg shadow-xl p-2`}
                  >
                    <div className="flex items-center justify-between mb-2 px-1">
                      <span className="text-xs font-bold text-gray-700">
                        {new Date(year, month - 1, day).toLocaleDateString('en-US', {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                      <button
                        onClick={() => setOpenDay(null)}
                        aria-label="Close"
                        className="text-gray-400 hover:text-gray-600 text-sm leading-none"
                      >
                        &#10005;
                      </button>
                    </div>
                    <div className="flex flex-col gap-1">
                      {dayEvents.map((event) => (
                        <EventPill key={event.id} event={event} />
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
