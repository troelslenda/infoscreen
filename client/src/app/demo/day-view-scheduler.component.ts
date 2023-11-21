import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Injectable,
  Input,
  LOCALE_ID,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  CalendarUtils,
  CalendarWeekViewComponent,
  DateAdapter,
  getWeekViewPeriod,
} from 'angular-calendar';
import {
  WeekView,
  GetWeekViewArgs,
  WeekViewTimeEvent,
  EventColor,
  CalendarEvent,
  WeekViewAllDayEventRow,
  WeekViewAllDayEvent,
} from 'calendar-utils';
import { DragEndEvent, DragMoveEvent } from 'angular-draggable-droppable';
import { InfoScreenPerson } from '@infoscreen/shared';
import { colors } from '../demo-utils/colors';

export interface User {
  id: string;
  name: string;
  color: EventColor;
}

interface DayViewScheduler extends WeekView {
  users: User[];
}

interface GetWeekViewArgsWithUsers extends GetWeekViewArgs {
  users: User[];
}

@Injectable()
export class DayViewSchedulerCalendarUtils extends CalendarUtils {
  override getWeekView(args: GetWeekViewArgsWithUsers): DayViewScheduler {
    const { period } = super.getWeekView(args);
    const view: DayViewScheduler = {
      period,
      allDayEventRows: [],
      hourColumns: [],
      users: [...args.users],
    };

    view.users.forEach((user, columnIndex) => {
      const events = args.events?.filter(
        (event) => event.meta.user.id === user.id
      );
      const columnView = super.getWeekView({
        ...args,
        events,
      });
      view.hourColumns.push(columnView.hourColumns[0]);
      // columnView.allDayEventRows.forEach(({ row }, rowIndex) => {
      //   view.allDayEventRows[rowIndex] = view.allDayEventRows[rowIndex] || {
      //     row: [],
      //   };
      //   view.allDayEventRows[rowIndex].row.push({
      //     ...row[0],
      //     offset: columnIndex,
      //     span: 1,
      //   });
      // });
    });

    return view;
  }
}

@Component({
  selector: 'infoscreen-day-view-scheduler',
  templateUrl: 'day-view-scheduler.component.html',
  providers: [DayViewSchedulerCalendarUtils],
})
export class DayViewSchedulerComponent
  extends CalendarWeekViewComponent
  implements OnChanges
{


  getPersonByUserId(id: string): InfoScreenPerson {
    return this.persons?.find((person) => person.calendarId === id) as InfoScreenPerson;

  }

  @Input() persons?: InfoScreenPerson[] | undefined | null = [];
  users: User[] = [];

  @Output() userChanged = new EventEmitter();

  override view!: DayViewScheduler;

  override daysInWeek = 1;

  constructor(
    override cdr: ChangeDetectorRef,
    override utils: DayViewSchedulerCalendarUtils,
    @Inject(LOCALE_ID) locale: string,
    override dateAdapter: DateAdapter,
    override element: ElementRef<HTMLElement>
  ) {
    super(cdr, utils, locale, dateAdapter, element);
  }

  trackByUserId = (index: number, row: User) => row.id;

  override ngOnChanges(changes: SimpleChanges): void {
    this.users = this.persons?.map((person) => {
      return <User>{color: colors.blue, id: person.calendarId, name: person.name}
    }) || [];
    super.ngOnChanges(changes);

    if (changes['users']) {
      this.refreshBody();
      this.emitBeforeViewRender();
    }
  }

  override getDayColumnWidth(eventRowContainer: HTMLElement): number {
    return Math.floor(eventRowContainer.offsetWidth / this.users.length);
  }

  // override dragMove(dayEvent: WeekViewTimeEvent, dragEvent: DragMoveEvent) {
  //   if (this.snapDraggedEvents) {
  //     const newUser = this.getDraggedUserColumn(dayEvent, dragEvent.x);
  //     const newEventTimes = this.getDragMovedEventTimes(
  //       dayEvent,
  //       { ...dragEvent, x: 0 },
  //       this.dayColumnWidth,
  //       true
  //     );
  //     const originalEvent = dayEvent.event;
  //     const adjustedEvent = {
  //       ...originalEvent,
  //       ...newEventTimes,
  //       meta: { ...originalEvent.meta, user: newUser },
  //     };
  //     const tempEvents = this.events.map((event) => {
  //       if (event === originalEvent) {
  //         return adjustedEvent;
  //       }
  //       return event;
  //     });
  //     this.restoreOriginalEvents(
  //       tempEvents,
  //       new Map([[adjustedEvent, originalEvent]])
  //     );
  //   }
  //   this.dragAlreadyMoved = true;
  // }

  // override dragEnded(
  //   weekEvent: WeekViewAllDayEvent | WeekViewTimeEvent,
  //   dragEndEvent: DragEndEvent,
  //   dayWidth: number,
  //   useY = false
  // ) {
  //   super.dragEnded(
  //     weekEvent,
  //     {
  //       ...dragEndEvent,
  //       x: 0,
  //     },
  //     dayWidth,
  //     useY
  //   );
  //   const newUser = this.getDraggedUserColumn(weekEvent, dragEndEvent.x);
  //   if (newUser && newUser !== weekEvent.event.meta.user) {
  //     this.userChanged.emit({ event: weekEvent.event, newUser });
  //   }
  // }

  override getWeekView(events: CalendarEvent[]) {

    return this.utils.getWeekView({
      events,
      users: this.users,
      viewDate: this.viewDate,
      weekStartsOn: this.weekStartsOn,
      excluded: this.excludeDays,
      precision: this.precision,
      absolutePositionedEvents: true,
      hourSegments: this.hourSegments,
      dayStart: {
        hour: 6,
        minute: 0,
      },
      dayEnd: {
        hour: this.dayEndHour,
        minute: this.dayEndMinute,
      },
      segmentHeight: this.hourSegmentHeight,
      weekendDays: this.weekendDays,
      ...getWeekViewPeriod(
        this.dateAdapter,
        this.viewDate,
        this.weekStartsOn,
        this.excludeDays,
        this.daysInWeek
      ),
    });
  }

  // private getDraggedUserColumn(
  //   dayEvent: WeekViewTimeEvent | WeekViewAllDayEvent,
  //   xPixels: number
  // ) {
  //   const columnsMoved = Math.round(xPixels / this.dayColumnWidth);
  //   const currentColumnIndex = this.view.users.findIndex(
  //     (user) => user === dayEvent.event.meta.user
  //   );
  //   const newIndex = currentColumnIndex + columnsMoved;
  //   return this.view.users[newIndex];
  // }
}
