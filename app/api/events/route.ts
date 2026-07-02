import { NextResponse } from 'next/server';
import { getUpcomingEvents } from '@/lib/calendar';

export const revalidate = 300;

export async function GET() {
  try {
    const events = await getUpcomingEvents();
    return NextResponse.json(events);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 });
  }
}
