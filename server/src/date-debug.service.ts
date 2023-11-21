import { addDays, addHours } from 'date-fns';
import { BehaviorSubject } from 'rxjs';

const dateService = {
  date: new BehaviorSubject({
    dayCorrection: 0,
    hourCorrection: 0,
    time: new Date(),
    correctedTime: new Date(),
  }),

  adjustCorrection: (operator: string, fragment: string) => {
    const value = dateService.date.getValue();
    const property = fragment === 'hour' ? 'hourCorrection' : 'dayCorrection';
    value[property] =
      operator === 'increment' ? value[property] + 1 : value[property] - 1;
    dateService.date.next(value);
    dateService.updateTime();
  },
  resetCorrection: () => {
    const value = dateService.date.getValue();
    dateService.date.next({ ...value, dayCorrection: 0, hourCorrection: 0  });
    dateService.updateTime();
  },
  updateTime: () => {
    const value = dateService.date.getValue();
    value.time = new Date();
    value['correctedTime'] = value.time;
    if (value.dayCorrection) {
      value['correctedTime'] = addDays(
        value['correctedTime'],
        value.dayCorrection
      );
    }
    if (value.hourCorrection) {
      value['correctedTime'] = addHours(
        value['correctedTime'],
        value.hourCorrection
      );
    }

    
    
    dateService.date.next(value);
  },
  getTime : () => {
    return dateService.date.getValue().correctedTime
  }
};

export default dateService;
