import { google } from 'googleapis';

export interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  location?: string;
  description?: string;
  isAllDay: boolean;
}

function mapEvent(event: {
  id?: string | null;
  summary?: string | null;
  start?: { dateTime?: string | null; date?: string | null } | null;
  end?: { dateTime?: string | null; date?: string | null } | null;
  location?: string | null;
  description?: string | null;
}): CalendarEvent {
  return {
    id: event.id ?? '',
    title: event.summary ?? 'Untitled Event',
    start: event.start?.dateTime ?? event.start?.date ?? '',
    end: event.end?.dateTime ?? event.end?.date ?? '',
    location: event.location ?? undefined,
    description: event.description ?? undefined,
    isAllDay: !event.start?.dateTime,
  };
}

export async function getUpcomingEvents(maxResults = 20): Promise<CalendarEvent[]> {
  const apiKey = process.env.GOOGLE_CALENDAR_API_KEY;
  const calendarId = process.env.GOOGLE_CALENDAR_ID;

  if (!apiKey || !calendarId) {
    return [];
  }

  const calendar = google.calendar({ version: 'v3', auth: apiKey });

  const res = await calendar.events.list({
    calendarId,
    timeMin: new Date().toISOString(),
    maxResults,
    singleEvents: true,
    orderBy: 'startTime',
  });

  return (res.data.items ?? []).map(mapEvent);
}

/** month is 1-indexed (1 = January) */
export async function getEventsForMonth(year: number, month: number): Promise<CalendarEvent[]> {
  const apiKey = process.env.GOOGLE_CALENDAR_API_KEY;
  const calendarId = process.env.GOOGLE_CALENDAR_ID;

  if (!apiKey || !calendarId) {
    return [];
  }

  const calendar = google.calendar({ version: 'v3', auth: apiKey });

  const res = await calendar.events.list({
    calendarId,
    timeMin: new Date(year, month - 1, 1).toISOString(),
    timeMax: new Date(year, month, 1).toISOString(),
    maxResults: 250,
    singleEvents: true,
    orderBy: 'startTime',
  });

  return (res.data.items ?? []).map(mapEvent);
}
