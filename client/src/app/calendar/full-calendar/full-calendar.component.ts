import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { addDays, addHours, isThursday, startOfDay } from 'date-fns';
import { colors } from '../../demo-utils/colors';
import { Store, select } from '@ngrx/store';
import { DataSelectors } from '../../store/data.selectors';
import { Calendar, User } from '@infoscreen/shared';
import { Observable, map, of } from 'rxjs';

@Component({
  selector: 'infoscreen-full-calendar',
  templateUrl: './full-calendar.component.html',
  styleUrls: ['./full-calendar.component.scss'],
})
export class FullCalendarComponent implements OnInit {
  ngOnInit(): void {
    this.router.params.subscribe(params => {
      this.userId = params['id']
      this.events$ = this.store.select(DataSelectors.selectUserEvents)

    })
  }

  router = inject(ActivatedRoute)
  store = inject(Store);

  userId?: string;

  calendar$!: Observable<Calendar | undefined>;
  view: CalendarView = CalendarView.Week;

  viewDate: Date = new Date();

  date$ = this.store.select(DataSelectors.selectCurrentTime)

  events$!: Observable<CalendarEvent[] | undefined>;

  events: CalendarEvent[] = [
    {
      start: startOfDay(new Date()),
      title: 'An event',
      color: colors.yellow,
    },
    {
      start: addHours(startOfDay(new Date()), 2),
      end: new Date(),
      title: 'Another event',
      color: colors.blue,
    },
    {
      start: addDays(addHours(startOfDay(new Date()), 2), 2),
      end: addDays(new Date(), 2),
      title: 'And another',
      color: colors.red,
    },
  ];

}
