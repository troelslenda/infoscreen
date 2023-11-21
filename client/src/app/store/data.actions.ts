/* eslint-disable @typescript-eslint/no-namespace */
import { Calendar, CalendarEvent, DateDebugger, InfoScreenPerson, NavigationPath, Theme, User, WeatherDay, WeatherNow } from "@infoscreen/shared";
import { createAction, props } from "@ngrx/store";

export namespace DataAction {
    export const changeTheme = createAction('[Data] Change Theme',  props<{ theme: Theme }>());
    export const updateCalendars = createAction('[Data] update Calendars',  props<{ calendars: Calendar[] }>() );
    export const getEventsByUser = createAction('[Data] get events by user',  props<{ user: NavigationPath }>() );
    export const navigateTo = createAction('[Data] Navigate To',  props<{ navigate_to: NavigationPath }>());
    export const setPersons = createAction('[Data] Set Persons',  props<{ persons: InfoScreenPerson[] }>());
    export const setTime = createAction('[Data] Set Time',  props<{ date: DateDebugger }>());
   
}

export namespace WeatherActions {
    export const current = createAction('[Weather] Current',  props<{ weather: WeatherNow }>());
    export const daily = createAction('[Weather] Daily',  props<{ weather: WeatherDay }>());
}