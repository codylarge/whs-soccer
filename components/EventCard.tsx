'use client';

import { useEffect, useRef, useState } from 'react';
import DOMPurify from 'isomorphic-dompurify';
import type { CalendarEvent } from '@/lib/calendar';

function parseDate(dateStr: string, isAllDay: boolean): Date {
  if (isAllDay) {
    const [y, m, d] = dateStr.split('-').map(Number);
    return new Date(y, m - 1, d);
  }
  return new Date(dateStr);
}

function formatTime(dateStr: string): string {
  return new Date(dateStr).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  });
}

export default function EventCard({ event }: { event: CalendarEvent }) {
  const date = parseDate(event.start, event.isAllDay);
  const [expanded, setExpanded] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);
  const descriptionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = descriptionRef.current;
    if (el) {
      setIsTruncated(el.scrollHeight > el.clientHeight);
    }
  }, [event.description]);

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 bg-green-700 text-white rounded-md px-3 py-2 text-center w-14">
          <div className="text-xs font-semibold uppercase leading-none mb-1">
            {date.toLocaleDateString('en-US', { month: 'short' })}
          </div>
          <div className="text-2xl font-bold leading-none">{date.getDate()}</div>
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900">{event.title}</h3>
          {!event.isAllDay && (
            <p className="text-sm text-gray-500 mt-0.5">
              {formatTime(event.start)} &ndash; {formatTime(event.end)}
            </p>
          )}
          {event.location && (
            <p className="text-sm text-gray-500 mt-0.5">{event.location}</p>
          )}
          {event.description && (
            <div className="mt-1">
              <div
                ref={descriptionRef}
                className={`text-sm text-gray-600 [&_ul]:list-none [&_ul]:pl-0 [&_ol]:list-none [&_ol]:pl-0 [&_li]:list-none [&_li]:pl-0 [&_li]:ml-0 ${expanded ? '' : 'line-clamp-1'}`}
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(event.description) }}
              />
              {(isTruncated || expanded) && (
                <button
                  type="button"
                  onClick={() => setExpanded((prev) => !prev)}
                  className="text-sm text-green-700 font-medium hover:underline mt-0.5"
                >
                  {expanded ? 'Show less' : 'Show more'}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
