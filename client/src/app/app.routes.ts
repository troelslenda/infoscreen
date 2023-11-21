import { Route } from '@angular/router';

export const appRoutes: Route[] = [
    {path: 'user',
    loadChildren: () => import('./calendar/calendar.module').then(m => m.CalendarModulea)

    
}
];
