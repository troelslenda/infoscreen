import express from 'express';
import * as path from 'path';
import cors from 'cors';
import dateService from './date-debug.service';
import navigateService from './navigate.service';
import { NavigationPath } from '@infoscreen/shared';
import calendarService from './calendar.service';

const expressApp = {
  init: () => {
    const app = express();

    
    app.use(cors());

    app.use('/assets', express.static(path.join(__dirname, 'assets')));

    app.use('/client', express.static('./client'));

    app.use('/remote', express.static('./remote'));


    app.get('/api', (req, res) => {
      res.send({ message: 'Welcome to server!' });
    });
    app.get('/navigate_to_user/:userid', (req, res) => {
      navigateService.navigateTo(req.params.userid as NavigationPath);

      res.status(200).send();
    });

    
  
    app.get('/time/:unaryOperator/:fragment', (req, res) => {
      dateService.adjustCorrection(
        req.params.unaryOperator,
        req.params.fragment
      );
      res.status(200).send();
    });
    app.get('/time/reset', (req, res) => {
      dateService.resetCorrection();
      res.status(200).send();
    });

    const port = process.env.NX_EXPRESS_PORT || 3333;
    const server = app.listen(port, () => {
      console.log(`Listening at http://localhost:${port}/api`);
    });
    server.on('error', console.error);
  },
};

export default expressApp;
