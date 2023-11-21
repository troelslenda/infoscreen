export { CalendarEvent } from 'angular-calendar';
import { CalendarEvent } from 'angular-calendar';
import { WeatherDay, WeatherNow } from './models';

export interface Event {
  id: string;
  created: string;
  updated: string;
  summary: string;
  description: string;
  location: string;
  creator: {
    id: string;
    email: string;
    displayName: string;
    self: boolean;
  };
  start: {
    dateTime: string;
    timeZone: string;
  };
  end: {
    dateTime: string;
    timeZone: string;
  };
}

export interface UnsplashPhoto {
 url: string;
}

export type ThemeKey = 'morning weekend' | 'morning weekday' | 'afternoon' | 'night';
export type WeatherKey = 'today' | 'tomorrow';

export interface WeatherInfo {
  sunrise: Date;
  sunset: Date;
  wind: number;
  windDirection: number;
  temperature: number;
  rain: boolean;
  cloud: boolean;
  
}

export interface Theme {
  name: ThemeKey;
  backgroundPhoto: UnsplashPhoto;
  weatherKey: WeatherKey;
}

export interface Calendar {
  id: string;
  user: NavigationPath;
  summary: string;
  events: CalendarEvent[];
}

export interface InfoScreenPerson {
  name: string;
  navigationUrl: string;
  calendarId: string;
  photoUrl: string;
}

export interface InfoScreenData {
  setup?: boolean;
  weather?: {
    current?: WeatherNow;
    daily?: WeatherDay;
  }
  persons?: InfoScreenPerson[]
  calendars?: Calendar[];
  countdownEvents?: CalendarEvent[];
  theme?: Theme;
  navigate_to_page?: NavigationPath;
  date?: DateDebugger;
}

export interface InfoScreenDataState extends InfoScreenData {
  loaded: boolean;
  selectedUser?: {
    name?: string,
    events?: CalendarEvent[];
  },
  
  highlightedPerson?: InfoScreenPerson;
  persons?: InfoScreenPerson[];
}

export enum User {
  Bertram = 'bertram',
  Ester = 'ester',
  Theodor = 'theodor',
  Agnes = 'agnes',
  Troels = 'troels'
}


export interface DateDebugger {
  dayCorrection: number;
  hourCorrection: number;
  time: Date;
  correctedTime: Date;
}

export const DateDebuggerInitialValue: DateDebugger = {
  dayCorrection: 0,
  hourCorrection: 0,
  time: new Date(),
  correctedTime: new Date()
}

export enum NavigationPath {
  Bertram = 'bertram',
  Ester = 'ester',
  Theodor = 'theodor',
  Agnes = 'agnes',
  Troels = 'troels',
  None = 'none'
}