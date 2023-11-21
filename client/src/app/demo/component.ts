import { Component, ChangeDetectionStrategy, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import {
  CalendarEvent,
  CalendarEventTimesChangedEvent,
} from 'angular-calendar';
import { colors } from '../demo-utils/colors';
import { User } from './day-view-scheduler.component';
import { Calendar, Event, InfoScreenPerson } from 'shared/src';
import { Observable } from 'rxjs';

const users: User[] = [
  {
    id: 'abed57c87e0241ed7bdad230311bf409e3a68b83e9ce09cb1e39d3a1b78746c2@group.calendar.google.com',
    name: 'theodor',
    color: colors.yellow,
  },
  {
    id:  'a708af7d1cf9a3252a88910dea40a1f279229d49cb3562c82cf7a19bfe5b5bbf@group.calendar.google.com',
    name: 'agnes',
    color: colors.blue,
  },
  {
    id: 'd4a6125628606b307f8236610a78a61f409c31f754c29e6790e16dd61173bc9f@group.calendar.google.com',
    name: 'bertram',
    color: colors.blue,
  },
  {
    id: 'estermariastrand@gmail.com',
    name: 'ester',
    color: colors.blue,
  },
  {
    id: 'troelslenda@gmail.com',
    name: 'troels',
    color: colors.blue,
  },
];

@Component({
  selector: 'infoscreen-demo-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'template.html',
})
export class DemoComponent implements OnChanges {

  @Input() persons: InfoScreenPerson[] | undefined | null = [];

  ngOnChanges(changes: SimpleChanges): void {
    const {date} = changes;
    if (date && date.currentValue) {
      this.viewDate = date.currentValue;
    }
    const calendars = changes['calendars']?.currentValue
    if (calendars) {
      this.events = calendars.map((calendar: Calendar) => {
        return calendar.events;

      }).flatMap((event: any) => {
        return event;
      })

    }
    

  }


  @Input() calendars?: Calendar[];

  @Input() date?: Date | null;
  //@Input() persons?: InfoScreenPerson[] | undefined;
  

  viewDate = new Date();

  users = users;

  events: CalendarEvent[] = [
    // {
    //   title: 'An event',
    //   color: users[0].color,
    //   start: addHours(startOfDay(new Date()), 5),
    //   meta: {
    //     user: users[0],
    //   },
    //   resizable: {
    //     beforeStart: true,
    //     afterEnd: true,
    //   },
    //   draggable: true,
    // },
    // {
    //   title: 'Another event',
    //   color: users[1].color,
    //   start: addMinutes(addHours(startOfDay(new Date()), 2), 5),
    //   end: addMinutes(addHours(startOfDay(new Date()), 2), 50),
    //   meta: {
    //     user: users[1],
    //   },
    //   resizable: {
    //     beforeStart: true,
    //     afterEnd: true,
    //   },
    //   draggable: true,
    // },
    // {
    //   title: 'A 3rd event',
    //   color: users[0].color,
    //   start: addHours(startOfDay(new Date()), 7),
    //   meta: {
    //     user: users[0],
    //   },
    //   resizable: {
    //     beforeStart: true,
    //     afterEnd: true,
    //   },
    //   draggable: true,
    // },
    // {
    //   title: 'An all day event',
    //   color: users[0].color,
    //   start: new Date(),
    //   meta: {
    //     user: users[0],
    //   },
    //   draggable: true,
    //   allDay: true,
    // },
    // {
    //   title: 'Another all day event',
    //   color: users[1].color,
    //   start: new Date(),
    //   meta: {
    //     user: users[1],
    //   },
    //   draggable: true,
    //   allDay: true,
    // },
    // {
    //   title: 'A 3rd all day event',
    //   color: users[0].color,
    //   start: new Date(),
    //   meta: {
    //     user: users[0],
    //   },
    //   draggable: true,
    //   allDay: true,
    // },
  ];

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.events = [...this.events];
  }

  userChanged({ event, newUser }: any) {
    event.color = newUser.color;
    event.meta.user = newUser;
    this.events = [...this.events];
  }
}
