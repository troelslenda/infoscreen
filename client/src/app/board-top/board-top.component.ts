import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { DataSelectors, WeatherSelectors, selectBoardState } from '../store/data.selectors';
import { Observable } from 'rxjs';
import { Theme, WeatherDay, WeatherNow } from '@infoscreen/shared';

@Component({
  selector: 'infoscreen-board-top',
  templateUrl: './board-top.component.html',
  styleUrls: ['./board-top.component.scss'],
})
export class BoardTopComponent implements OnInit {
  store = inject(Store);

  currentWeather$!: Observable<WeatherNow | null>;
  dailyWeather$!:  Observable<WeatherDay>;
  theme$!: Observable<Theme>;
  currentTime$!: Observable<Date>;

  boardSetup$!: Observable<any>;


  ngOnInit(): void {
    this.currentWeather$ = this.store.select(WeatherSelectors.selectCurrent);
    this.dailyWeather$ = this.store.select(WeatherSelectors.selectDaily);  
    this.theme$ = this.store.select(DataSelectors.selectCurrentTheme);
    this.currentTime$ = this.store.select(DataSelectors.selectCurrentTime);

    this.boardSetup$ = this.store.select(selectBoardState);
    

  }

  



}
