import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Calendar, InfoScreenData, Theme } from '@infoscreen/shared';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { io } from 'socket.io-client';
import { DataAction, WeatherActions } from './data.actions';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  router = inject(Router);
  store = inject(Store);



  socket = io(`${process.env['NX_SERVER_ADDRESS']}:${process.env['NX_SOCKET_PORT']}`);
  setup = false;

  //public calendars$: BehaviorSubject<Calendar[]> = new BehaviorSubject<Calendar[]>([]);
  //public theme$: BehaviorSubject<Theme> = new BehaviorSubject({} as Theme);

  constructor() {
    this.socket.on('data', (data: InfoScreenData) => {
      // only run setup once!
      if (data.setup && this.setup) {
        return;
      }
      this.setup = true;
      if (data.theme) {   
        this.store.dispatch(DataAction.changeTheme({theme: data.theme}))
      }
      if (data.calendars) {
        console.log(data.calendars)
        this.store.dispatch(DataAction.updateCalendars({calendars: data.calendars}))
      }
      if (data.navigate_to_page) {
        this.store.dispatch(DataAction.navigateTo({navigate_to: data.navigate_to_page}))
      }
      if (data.persons) {  
        this.store.dispatch(DataAction.setPersons({persons: data.persons}))
      }
      if (data.date) {  
        this.store.dispatch(DataAction.setTime({date: data.date}))
      }
      if (data.weather?.current) {  
        this.store.dispatch(WeatherActions.current({weather: data.weather.current}))
      }
      if (data.weather?.daily) {  
        this.store.dispatch(WeatherActions.daily({weather: data.weather.daily}))
      }
    });
  }
}


