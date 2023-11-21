import {Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { DateDebugger, DateDebuggerInitialValue, InfoScreenData } from './types';
import { io } from 'socket.io-client';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DateDebugService {
  // socket = io('http://localhost:3001');
  // dateDebugger$ = new BehaviorSubject<DateDebugger>(DateDebuggerInitialValue);

  // constructor() {
    
  //   this.socket.on('data', (data: InfoScreenData ) => {
  //     if (data.date)
  //     this.dateDebugger$.next(data.date)
  //   });
  // }
}