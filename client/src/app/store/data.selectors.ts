/* eslint-disable @typescript-eslint/no-namespace */
import { state } from '@angular/animations';
import { InfoScreenDataState, NavigationPath, Theme, User, WeatherDay, WeatherNow } from '@infoscreen/shared';
import { createSelector } from '@ngrx/store';

export namespace DataSelectors {

    const appData = (state: any) => state.appData;

    export const selectAllCalendars = createSelector(appData,(state: InfoScreenDataState) => state.calendars);
    export const selectCalendarByUser = (user: NavigationPath) => {
        return createSelector(appData,(state: InfoScreenDataState) => state.calendars?.find(calendar => calendar.user === user));
    }
    
    
    export const selectCurrentTheme = createSelector(appData,(state: InfoScreenDataState) => {
        return state.theme as Theme;
    });

    export const selectPersons = createSelector(appData,(state: InfoScreenDataState) => {
        return state.persons || []
    });

    export const selectUserEvents = createSelector(appData, (state: InfoScreenDataState) => {
        return state.selectedUser?.events || [];
    })

    export const selectCurrentTime = createSelector(appData, (state: InfoScreenDataState) => {
        return state.date?.correctedTime as Date;
    })

}

export namespace WeatherSelectors {
    const appData = (state: any) => state.appData;

    export const selectCurrent = createSelector(appData,(state: InfoScreenDataState) => {
        if (state.date?.dayCorrection || state.date?.hourCorrection){
            return null;
        }
        return state.weather?.current as WeatherNow;
    });
    export const selectDaily = createSelector(appData,(state: InfoScreenDataState) => state.weather?.daily as WeatherDay);

}

export const selectBoardState = createSelector(
    WeatherSelectors.selectCurrent,
    WeatherSelectors.selectDaily,
    DataSelectors.selectCurrentTime,
    DataSelectors.selectCurrentTheme,
    (currentWeather, dailyWeather, currentTime, currentTheme) => {
        

        const state = {
            theme: currentTheme,
            weather: {
                current: currentWeather,
                daily: dailyWeather,
                clothing: {},
            },
            time: currentTime,
            
        }
        if (dailyWeather) {
            
        const precipitation: boolean = dailyWeather.code > 50;
        const temp = dailyWeather.apparent_temperature.high;

        state.weather.clothing = {
            rain_clothing: precipitation && temp >= 5,
            full_suit: temp < 5,
            coat: !precipitation && (temp >= 5 && temp < 15 ),
            blouse: !precipitation &&  (temp >= 15 && temp < 19 ),
            tshirt: !precipitation &&  (temp >= 19 && temp < 23 ),
            shorts: !precipitation && temp > 23
        }
        }
        return state;
});