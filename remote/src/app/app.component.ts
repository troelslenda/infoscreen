import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { User, DateDebugService, DateDebugger, DateDebuggerInitialValue, InfoScreenData, InfoScreenPerson } from '@infoscreen/shared';
import { BehaviorSubject } from 'rxjs';
import { io } from 'socket.io-client';

@Component({
  selector: 'infoscreen-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  socket = io('http://localhost:3001');
  dateDebugger$ = new BehaviorSubject<DateDebugger>(DateDebuggerInitialValue);
  persons$ = new BehaviorSubject<InfoScreenPerson[]>([]);



  ngOnInit(): void {

    this.socket.on('data', (data: InfoScreenData ) => {
      if (data.date) {
        this.dateDebugger$.next(data.date)
      }
      if (data.persons) {
        this.persons$.next(data.persons)
      
      }
      
    });


    this.dateDebugger$.subscribe((dateDebug: DateDebugger) => {
      this.dateDebug = dateDebug;
    })
  }

  user = User;
  http = inject(HttpClient);
  dateDebugService = inject(DateDebugService);
  dateDebug!: DateDebugger;

  title = 'remote';
  navigateTo(user: string) {
    this.http.get(`http://localhost:3000/navigate_to_user/${user}`).subscribe()
  }
  adjustTime(fragment: 'hour' | 'day', operator: 'increment' | 'decrement') {
    this.http.get(`http://localhost:3000/time/${operator}/${fragment}`).subscribe()  
  }
  reset() {
    this.http.get(`http://localhost:3000/time/reset`).subscribe()  

  }

}
