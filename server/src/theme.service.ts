import { createApi } from 'unsplash-js';
import * as nodeFetch from 'node-fetch';
import { BehaviorSubject, firstValueFrom } from 'rxjs';

import { Theme, ThemeKey } from '@infoscreen/shared';
import dateService from './date-debug.service';

const themeService = {
  cache: null,
  themeKey: new BehaviorSubject(<ThemeKey>''),
  theme: new BehaviorSubject(<Theme>{}),
  setThemeKey: () => {
    const { correctedTime } = dateService.date.getValue();

    const hour = correctedTime.getHours();

    const isWeekend =
      correctedTime.getDay() === 6 || correctedTime.getDay() === 0;
    let key: ThemeKey;
    if (hour > 6 && hour < 12) {
      if (isWeekend) {
        key = 'morning weekend';
      } else {
        key = 'morning weekday';
      }
    } else if (hour >= 12 && hour < 20) {
      key = 'afternoon';
    } else {
      key = 'night';
    }
    if (themeService.themeKey.getValue() !== key) {
      themeService.themeKey.next(key);
    }
  },
  setTheme: async () => {
    const key = themeService.themeKey.getValue();

    const DISABLE_UNSPLASH = true;
    let photos: any;

    if (DISABLE_UNSPLASH) {
      const filenames = {
        [<ThemeKey>'morning weekday']: '/assets/autumn-morning.jpg',
        [<ThemeKey>'morning weekend']: '/assets/autumn-morning.jpg',
        [<ThemeKey>'afternoon']: '/assets/autumn-afternoon.jpg',
        [<ThemeKey>'night']: '/assets/autumn-night.jpg',
      };
      photos = {
        response: {
          results: [
            {
              urls: {
                regular: filenames[key],
              },
            },
          ],
        },
      };
    } else {
      const unsplash = createApi({
        accessKey: process.env.NX_UNSPLASH_API_KEY,
        fetch: nodeFetch.default as unknown as typeof fetch,
      });

      photos = await unsplash.search.getPhotos({
        query: 'autumn sunset',
        page: 1,
        perPage: 10,
        orientation: 'portrait',
      });
    }

    themeService.theme.next({
      name: key,
      backgroundPhoto: { url: photos.response.results[0].urls.regular },
      weatherKey: 'today'
    });
  },
};

export default themeService;
