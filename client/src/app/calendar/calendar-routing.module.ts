import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FullCalendarComponent } from './full-calendar/full-calendar.component';

const routes: Routes = [
  {
    path: "",
    component: FullCalendarComponent
  },
  {


  path: ":id",
  component: FullCalendarComponent,

}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalendarRoutingModule { }


//https://codinglatte.com/posts/angular/reusable-modal-overlay-using-angular-cdk-overlay/
//https://medium.com/@birkantugcu/reusable-routable-modals-for-angular-projects-7fc4c9f8a681