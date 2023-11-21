import {
  ToadScheduler,
  SimpleIntervalJob,
  Task,
  AsyncTask,
  CronJob,
} from 'toad-scheduler';
import { Server } from 'socket.io';

import { getCalendarsWithEvents } from './calendar';
import { InfoScreenData } from '@infoscreen/shared';

import dateService from './date-debug.service';

import { isEqual } from 'lodash';
import themeService from './theme.service';
import socketService from './socket.service';

const scheduler = new ToadScheduler();

const appCache: any = {};

//let io: Server;

export const init = async (ioa: Server) => {
  // io = ioa;
  // await startup();
  // setSchedulers();
  // // setupDateDebuggerSockets(io);

  // dateService.date.subscribe((changes) => {
  //   console.log('time changed')
  //   // date properties changed.
  //   themeService.setThemeKey();

  //   socketService.sendToClient({ date: changes});




  
  //   // if (!isEqual(appCache.theme, theme)) {
  //   //   sendToClient({ theme: {name: theme, backgroundPhoto: null} });
  //   //   appCache.theme = theme;
  //   // }
  // });

  // themeService.themeKey.subscribe(async (changes) => {
  //   console.log('themeKey changed!', changes);
  //   themeService.setTheme();
  //   appCache.theme = themeService.theme.getValue();

  //   socketService.sendToClient({ theme: appCache.theme });
  // })
};


export const startup = async () => {
  // const theme = await themeService.getTheme();
  // appCache.theme = theme;
  // sendToClient({ theme });
  // appCache.calendarsWithEvents = await getCalendarsWithEvents();
  // socketService.sendToClient({ calendars: appCache.calendarsWithEvents });

  // socketService.server.on('connection', async (socket) => {

  // //socketService.sendToClient({ theme: themeService.theme.getValue() });

  //   if (appCache.calendarsWithEvents) {
  //     socketService.sendToClient({ calendars: appCache.calendarsWithEvents });
  //   }
  // });
};



const setSchedulers = () => {
  const fetchCalendars = new AsyncTask('Fetch calendars', async () => {
    console.log('fetching calendars');
    return;
    appCache.calendarsWithEvents = await getCalendarsWithEvents();

    // @todo introduce cache so the event dosent emit every time.
    // @todo make each new calendar update/create/delete emit its own value.
    // socketService.server.sockets.emit('set calendars', appCache.calendarsWithEvents);
  });
  const job = new SimpleIntervalJob({ hours: 1 }, fetchCalendars);

  scheduler.addSimpleIntervalJob(job);
  // scheduler.addSimpleIntervalJob(
  //   new SimpleIntervalJob(
  //     { seconds: , runImmediately: true },
  //     new Task('UpdateTime', () => {
  //       dateService.updateTime()
  //     })
  //   )
  // );
};

// export const sendToClient = (data: InfoScreenData) => {
//   io.sockets.emit('data', data);
// };
