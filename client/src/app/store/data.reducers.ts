import { createReducer, on } from '@ngrx/store';

import { InfoScreenDataState, WeatherDay, WeatherNow } from '@infoscreen/shared';
import { DataAction, WeatherActions } from './data.actions';
import { act } from '@ngrx/effects';

export const initialState: InfoScreenDataState = {
  loaded: false,
};

export const dataReducer = createReducer<InfoScreenDataState>(
  initialState,
  on(DataAction.updateCalendars, (state, action): InfoScreenDataState => {
    const calendars = action.calendars.map((calendar) => {
      return {
        ...calendar,
        events: calendar.events.map((event) => {
          return {
            ...event,
            start: new Date(event.start),
            end: new Date((event as any).end),
          };
        }),
      };
    });

    return { ...state, calendars };
  }),

  on(DataAction.changeTheme, (state, action): InfoScreenDataState => {
    return {
      ...state,
      theme: action.theme,
    }
  }),

  on(DataAction.setPersons, (state, action): InfoScreenDataState => {
    return {
      ...state,
      persons: action.persons,
    }
  }),

  on(DataAction.setTime, (state, action): InfoScreenDataState => {
    return {
      ...state,
      date: {
        ...action.date,
        correctedTime: new Date(action.date.correctedTime)
      },
    }
  }),

  on(DataAction.getEventsByUser, (state, action): InfoScreenDataState => {
    const calendar = state.calendars?.find(calendar => calendar.user === action.user)
    if (calendar) {
      return { ...state, selectedUser: {
        name: calendar?.summary,
        events: calendar?.events
      } }
    } else {
      // @todo figure out if this is legit?
      const next = {...state}
      delete next.selectedUser;
      return next;
    }
  }),
  on(WeatherActions.daily, (state, action): InfoScreenDataState => {
    const daily = structuredClone(action.weather as WeatherDay);
    daily.day = new Date(daily.day);
    daily.sunrise = new Date(daily.sunrise);
    daily.sunset = new Date(daily.sunset);
    
    
    return {...state, weather: {...state.weather, daily}};
  }),
  on(WeatherActions.current, (state, action): InfoScreenDataState => {
    const current = structuredClone(action.weather as WeatherNow);
    
    return {...state, weather: {...state.weather, current}};
  })
);
