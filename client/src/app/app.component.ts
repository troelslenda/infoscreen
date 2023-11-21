import { Component, OnInit, inject } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Calendar, InfoScreenPerson, Theme } from '@infoscreen/shared';
import { DataSelectors } from './store/data.selectors';
import { Store } from '@ngrx/store';
import { DataService } from './store/data.service';

@Component({
  selector: 'infoscreen-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  ngOnInit(): void {
    this.calendars$ = this.store.select(DataSelectors.selectAllCalendars);
    this.theme$ = this.store.select(DataSelectors.selectCurrentTheme);
    this.persons$ = this.store.select(DataSelectors.selectPersons);
    this.currentTime$ = this.store.select(DataSelectors.selectCurrentTime);
  }
  calendars$?: Observable<Calendar[] | undefined>;
  theme$?: Observable<Theme | undefined>;
  persons$?: Observable<InfoScreenPerson[] | undefined>;
  currentTime$?: Observable<Date | undefined>;


  dataService = inject(DataService)
  store = inject(Store);

  
}
