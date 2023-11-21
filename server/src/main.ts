import expressApp from './express';
import socketService from './socket.service';
import dateService from './date-debug.service';
import themeService from './theme.service';
import calendarService from './calendar.service';
import personService from './person.service';
import { InfoScreenPerson } from '@infoscreen/shared';
import weatherService from './weather.service';
import { debounceTime } from 'rxjs';
import { AsyncTask, SimpleIntervalJob, ToadScheduler } from 'toad-scheduler';

// eslint-disable-next-line @typescript-eslint/no-var-requires
if (!process.env.NX_PROD) {
  console.log(require('dotenv').config({ debug: true }));
}

personService.addPerson(<InfoScreenPerson>{
  name: 'Troels',
  calendarId: 'troelslenda@gmail.com',
  navigationUrl: 'troels',
  photoUrl: 'assets/troels.jpg',
});
personService.addPerson(<InfoScreenPerson>{
  name: 'Ester',
  calendarId: 'estermariastrand@gmail.com',
  navigationUrl: 'ester',
  photoUrl: 'assets/ester.jpg',
});
personService.addPerson(<InfoScreenPerson>{
  name: 'Agnes',
  calendarId: 'a708af7d1cf9a3252a88910dea40a1f279229d49cb3562c82cf7a19bfe5b5bbf@group.calendar.google.com',
  navigationUrl: 'agnes',
  photoUrl: 'assets/agnes.jpg',
});
personService.addPerson(<InfoScreenPerson>{
  name: 'Bertram',
  calendarId: 'd4a6125628606b307f8236610a78a61f409c31f754c29e6790e16dd61173bc9f@group.calendar.google.com',
  navigationUrl: 'bertram',
  photoUrl: 'assets/bertram.jpg',
});
personService.addPerson(<InfoScreenPerson>{
  name: 'Theodor',
  calendarId: 'abed57c87e0241ed7bdad230311bf409e3a68b83e9ce09cb1e39d3a1b78746c2@group.calendar.google.com',
  navigationUrl: 'theodor',
  photoUrl: 'assets/theodor.jpg',
});
// personService.addPerson(<InfoScreenPerson>{
//   name: 'Bjarke',
//   calendarId: 'bharje!',
//   navigationUrl: 'bjarke',
//   photoUrl: 'assets/bjarke.jpg',
// });


expressApp.init();
socketService.init();

weatherService.setup();

// on app startup setup
socketService.server.on('connection', async () => {
  console.log('connecte')
  
  //dateService.date.next(dateService.date.getValue());
  //themeService.themeKey.next(themeService.themeKey.getValue());
  
  // weatherService.updateCurrent();
  //weatherService.updateDaily();

  const calendars = await calendarService.getCalendarsOrCache();

  socketService.sendToClient({
    setup: true,
    date: dateService.date.getValue(),
    theme: themeService.theme.getValue(),
    persons: personService.persons,
    calendars: calendars,
    weather: {
      daily: weatherService.dailyWeather.getValue(),
      current: weatherService.currentWeather.getValue()
    }
  })
});


// weatherService.current.subscribe(() => {
//   console.log('current weather changed')
  
// })

// weatherService.daily.subscribe(() => {
//   console.log('daily weather changed')
// })

// when date changes!

weatherService.dailyWeather.subscribe(() => {
  console.log('daily weather updated')
  
  socketService.sendToClient({ weather: {
    daily: weatherService.dailyWeather.getValue()
  } });
})

weatherService.currentWeather.subscribe(() => {
  console.log('current weather updated')
  socketService.sendToClient({ weather: {
    current: weatherService.currentWeather.getValue()
  } });
})

dateService.date.pipe(debounceTime(100)).subscribe(() => {
  console.log('time changed');
  weatherService.setDailyWeather();
  themeService.setThemeKey();
  socketService.sendToClient({ date: dateService.date.getValue() });
});

// When themeKey changes!
themeService.themeKey.subscribe(() => {
  console.log('theme updated');
  themeService.setTheme();
  socketService.sendToClient({ theme: themeService.theme.getValue() });
});


const fetchCalendars = new AsyncTask('Pass Time', async () => {
  console.log('fetchCalendars')
  dateService.updateTime();

  // @todo introduce cache so the event dosent emit every time.
  // @todo make each new calendar update/create/delete emit its own value.
  // socketService.server.sockets.emit('set calendars', appCache.calendarsWithEvents);
});

const scheduler = new ToadScheduler();

scheduler.addSimpleIntervalJob(new SimpleIntervalJob({ seconds: 22 }, new AsyncTask('Pass Time', async () => {
  console.log('tik tok')
  dateService.updateTime();
})));
scheduler.addSimpleIntervalJob(new SimpleIntervalJob({ minutes: 10, runImmediately: true }, new AsyncTask('Pass Time', async () => {
  console.log('update weather')
  weatherService.setCurrentWeather();
})));
// scheduler.addSimpleIntervalJob(
//   new SimpleIntervalJob(
//     { seconds: , runImmediately: true },
//     new Task('UpdateTime', () => {
//       dateService.updateTime()
//     })
//   )
// );


//calendarService.addCalendars(['estermariastrand@gmail.com'])
