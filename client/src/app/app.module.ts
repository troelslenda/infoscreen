import { LOCALE_ID, NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';


import { StoreModule } from '@ngrx/store';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { DemoModule } from './demo/module';
import { HttpClientModule } from '@angular/common/http';
import { dataReducer } from './store/data.reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { DataEffects } from './store/data.effects';
import { BoardTopComponent } from './board-top/board-top.component';

import localeDa from '@angular/common/locales/da';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localeDa);


@NgModule({
  declarations: [AppComponent, BoardTopComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    DemoModule,
    HttpClientModule,
    StoreModule.forRoot({ appData: dataReducer }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    EffectsModule.forRoot([DataEffects]),
  ],
  providers: [
    { provide: LOCALE_ID, useValue: "da" }, //replace "en-US" with your locale

  ],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}
