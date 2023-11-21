import { WeatherApiResponseCurrent, WeatherApiResponseDay, WeatherCode, WeatherDay, WeatherNow, initWeatherCurrent, initWeatherDay } from '@infoscreen/shared';
import axios from 'axios';
import { BehaviorSubject } from 'rxjs';
import dateService from './date-debug.service';
import { format, isSameDay } from 'date-fns';
import { da } from 'date-fns/locale';

const weatherService = {
    daily: new BehaviorSubject<{updatedTime: Date, data: WeatherApiResponseDay | null}>({
        updatedTime: null,
        data: null
    }),
    current: new BehaviorSubject<{updatedTime: Date, data: WeatherApiResponseCurrent | null}>({
        updatedTime: null,
        data: null
    }),

    dailyWeather: new BehaviorSubject<WeatherDay | null>(null),
    currentWeather: new BehaviorSubject<WeatherNow | null>(null),

    

    updateDaily: async() => {
        const apiData: {data: WeatherApiResponseDay} = await axios.get('https://api.open-meteo.com/v1/forecast?latitude=55.7419&longitude=9.6585&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,uv_index_max,uv_index_clear_sky_max,precipitation_sum,rain_sum,showers_sum,snowfall_sum,precipitation_probability_max,windspeed_10m_max,windgusts_10m_max,winddirection_10m_dominant&timezone=Europe%2FBerlin&past_days=7&forecast_days=16');
        weatherService.daily.next({
            data : apiData.data, 
            updatedTime: new Date()
        }); 
    },
    updateCurrent: async() => {
        const apiData : {data: WeatherApiResponseCurrent}  = await axios.get('https://api.open-meteo.com/v1/forecast?latitude=55.7419&longitude=9.6585&current=temperature_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weathercode,cloudcover,windspeed_10m,winddirection_10m,windgusts_10m&timezone=Europe%2FBerlin');
       
        weatherService.current.next({
            data: apiData.data,
            updatedTime: new Date()
        });
    },
    buildCurrentFromData: () => {
        const data = weatherService.current.getValue()
        const {current } = data.data;
        const weather: WeatherNow = {
            apparent_temperature: {
                current: current.apparent_temperature
            },
            temperature: {
                current: current.temperature_2m
            },
            code: current.weathercode,
            wind: {
                speed: current.windspeed_10m,
                gust: current.windgusts_10m,
                direction: current.winddirection_10m
            }
        }
        weatherService.currentWeather.next(weather);
    },
    buildDailyFromData: (index: number, date: Date) => {

        const daily = weatherService.daily.getValue();

        const weather: WeatherDay = {
            day: date,
            apparent_temperature: {
                high: daily.data.daily.apparent_temperature_max[index],
                low: daily.data.daily.apparent_temperature_min[index],
            },
            code: daily.data.daily.weathercode[index],
            sunrise: new Date(daily.data.daily.sunrise[index]),
            sunset: new Date(daily.data.daily.sunset[index]),
            temperature: {
                high: daily.data.daily.temperature_2m_max[index],
                low: daily.data.daily.temperature_2m_min[index],
            },
            uv_max: daily.data.daily.uv_index_max[index],
            uv_max_clear_sky: daily.data.daily.uv_index_clear_sky_max[index],
            wind: {
                gust: daily.data.daily.windgusts_10m_max[index],
                speed: daily.data.daily.windspeed_10m_max[index],
                direction: daily.data.daily.winddirection_10m_dominant[index],
            }
        }
        weatherService.dailyWeather.next(weather);
    },
    setDailyWeather: () => {
        const time = dateService.getTime();
        if (isSameDay(weatherService.dailyWeather.getValue()?.day, time)){
            return;
        }
        const daily = weatherService.daily.getValue()
        if (daily.data) {
            const daily = weatherService.daily.getValue();
            const dailyIndex = daily.data.daily.time.indexOf(format(time, 'yyyy-MM-dd'))
            weatherService.buildDailyFromData(dailyIndex, time)

        }
    },
    setCurrentWeather: () => {
        weatherService.buildCurrentFromData()
    },
    setup: async () => {
        await weatherService.updateDaily();
        weatherService.setDailyWeather();
        await weatherService.updateCurrent();
        weatherService.setCurrentWeather();
    }
}


export default weatherService;