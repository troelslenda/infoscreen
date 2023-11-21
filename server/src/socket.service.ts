import { InfoScreenData } from '@infoscreen/shared';
import { Server } from 'socket.io';
import dateService from './date-debug.service';

const socketService = {
  server: null,
  init: () => {
    socketService.server = new Server(+process.env.NX_SOCKET_PORT || 3001, {
      cors: { origin: '*' },
    });
    socketService.dateSomething();
  },
  sendToClient: (data: InfoScreenData) => {
    socketService.server.sockets.emit('data', data);
  },

  dateSomething: () => {
   //
  },
};

export default socketService;
