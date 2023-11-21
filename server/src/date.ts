import { DateDebugger } from '@infoscreen/shared';
import { addDays, addHours } from 'date-fns';
import { BehaviorSubject } from 'rxjs';
import { Server } from 'socket.io';
// import { dataCorrections } from './main';
import dateService from './date-debug.service';

// export const reset = () => {
//     const value = dataCorrections.getValue()
//     dataCorrections.next({...value, dayCorrection : 0, hourCorrection: 0})
// }

// export const adjustDateDebuggerTime = (operator: string, fragment: string) => {
//     const value = dataCorrections.getValue();
//     const property = fragment === 'hour' ? 'hourCorrection' : 'dayCorrection'
//     value[property] = operator === 'increment' ? value[property]+1 : value[property]-1;
//     dataCorrections.next(value);
// }


// export const setupDateDebuggerSockets = (io: Server) => {
//   io.on('connection', async () => {
//     dateService.date.next(dateService.date.getValue())

//   });
//   dateService.date.subscribe((data) => {
//     io.sockets.emit('date_debugger', data);
//   });
// };

