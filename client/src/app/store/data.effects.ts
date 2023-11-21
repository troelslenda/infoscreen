import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError, tap, switchMap } from 'rxjs/operators';
import { DataAction } from './data.actions';
import { Router } from '@angular/router';
import { isThursday } from 'date-fns';
import { NavigationPath, User } from '@infoscreen/shared';
 
@Injectable()
export class DataEffects {
  private router = inject(Router);
 


  loadMovies$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DataAction.navigateTo),
      tap(({navigate_to}) => {
        if (navigate_to === NavigationPath.None) {
          this.router.navigate(['/'])
        } else {
          this.router.navigate(['user', navigate_to as string])
        }    
      }),
      map(({navigate_to}) => DataAction.getEventsByUser({user: navigate_to}))
      )
  },
  );
  
  
  constructor(
    private actions$: Actions,
  ) {}
}