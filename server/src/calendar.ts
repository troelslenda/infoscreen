
import { google } from 'googleapis';
import { format, formatDistance, formatRelative, subDays, startOfWeek, endOfWeek as ew } from 'date-fns'
import { Calendar, CalendarEvent, User } from '@infoscreen/shared';



export const getCalendarsWithEvents = async () => {
  const startOfWeeka = startOfWeek(new Date())
  const endOfWeek = ew(new Date());

  try {
    const calendars = await loadCalendars();
    const calendarsWithEvents = await Promise.all(
      calendars.map(async (calendar: Calendar) => {
        return {
          ...calendar,
          events: await <Promise<CalendarEvent[]>>loadEventsForCalendar(
            calendar.id,
            startOfWeeka,
            endOfWeek
          ),
        };
      })
    );
    return calendarsWithEvents;
  } catch (e) {
    console.log(e);
  }
};

const credentials: any = {};

export const CALENDAR_IDS = [];

const scopes = 'https://www.googleapis.com/auth/calendar';
const calendar = google.calendar({ version: 'v3' });

const auth = new google.auth.JWT(
  credentials.client_email,
  null,
  credentials.private_key,
  scopes
);

export const addCalendars = async (calendarIds: string[]) => {
  try {
    const addedCalendars: any[] = await Promise.all(
      calendarIds.map(async (calendarId) => {
        return await calendar.calendarList.insert({
          auth,
          requestBody: { id: calendarId },
        });
      })
    );
    return addedCalendars.map((calendar) => {
      return calendar.data.items;
    });
  } catch (e) {
    console.log(e);
  }
};

export const updateCalendars = async (
  calendarIds: string[]
): Promise<Calendar[]> => {
  try {
    const updatedCalendars: any[] = await Promise.all(
      calendarIds.map(async (calendarId) => {
        return await calendar.calendarList.update({
          auth,
          calendarId: calendarId,
        });
      })
    );
    return updatedCalendars.map((calendar) => {
      return calendar.data.items;
    });
  } catch (e) {
    console.log(e);
  }
};

const idToUser = (id: string) => {
  const ids = {
    "d4a6125628606b307f8236610a78a61f409c31f754c29e6790e16dd61173bc9f@group.calendar.google.com": 'bertram',
     "troelslenda@gmail.com": 'troels',
     "a708af7d1cf9a3252a88910dea40a1f279229d49cb3562c82cf7a19bfe5b5bbf@group.calendar.google.com": 'agnes',
     "abed57c87e0241ed7bdad230311bf409e3a68b83e9ce09cb1e39d3a1b78746c2@group.calendar.google.com": 'theodor',
     "estermariastrand@gmail.com": 'ester'
  };
  return ids[id];
}


export const loadCalendars = async (): Promise<Calendar[]> => {
  try {
    const list = await calendar.calendarList.list({ auth });
    return list.data.items.map((item) => {
      return <Calendar>{
        id: item.id,
         user: idToUser(item.id),
        summary: item.summary,
      };
    });
  } catch (e) {
    console.log(e);
  }
};

export const loadEventsForCalendar = async (
  calendarId: string,
  timeMin: Date,
  timeMax: Date
): Promise<CalendarEvent[]> => {
  try {
    const response = await calendar.events.list({
      auth,
      calendarId: calendarId,
      timeMin: timeMin.toISOString(),
      timeMax: timeMax.toISOString(),
      singleEvents: true
    });
    return response.data.items.map((item) => {
      return <CalendarEvent>{
        start: new Date(item.start.dateTime),
        end:  new Date(item.end.dateTime),
        title: item.summary,
        id: item.id,
        meta: {
          user: {
            id: calendarId
          }
          
        }
      };
    });
  } catch (e) {
    console.log(e);
  }
};
