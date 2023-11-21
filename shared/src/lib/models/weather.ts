/* eslint-disable @typescript-eslint/no-namespace */
import { NumberSymbol } from '@angular/common';

export interface WeatherApiResponseCurrent {
        latitude: number;
        longitude: number;
        generationtime_ms: number;
        utc_offset_seconds: number;
        timezone: string;
        timezone_abbreviation: string;
        elevation: number;
        current_units: {
          time: string;
          interval: string;
          temperature_2m: string;
          apparent_temperature: string;
          is_day: string;
          precipitation: string;
          rain: string;
          showers: string;
          snowfall: string;
          weathercode: string;
          cloudcover: string;
          windspeed_10m: string;
          winddirection_10m: string;
          windgusts_10m: string;
        };
        current: {
          time: string;
          interval: number;
          temperature_2m: number;
          apparent_temperature: number;
          is_day: number;
          precipitation: number;
          rain: number;
          showers: number;
          snowfall: number;
          weathercode: number;
          cloudcover: number;
          windspeed_10m: number;
          winddirection_10m: number;
          windgusts_10m: number;
        };
      }
      
    export interface WeatherApiResponseDay {
        latitude: number;
        longitude: number;
        generationtime_ms: number;
        utc_offset_seconds: number;
        timezone: string;
        timezone_abbreviation: string;
        elevation: number;
        daily_units: {
          time: string;
          weathercode: string;
          temperature_2m_max: string;
          temperature_2m_min: string;
          apparent_temperature_max: string;
          apparent_temperature_min: string;
          sunrise: string;
          sunset: string;
          uv_index_max: string;
          uv_index_clear_sky_max: string;
          precipitation_sum: string;
          rain_sum: string;
          showers_sum: string;
          snowfall_sum: string;
          precipitation_probability_max: string;
          windspeed_10m_max: string;
          windgusts_10m_max: string;
          winddirection_10m_dominant: string;
        };
        daily: {
          time: string[];
          weathercode: number[];
          temperature_2m_max: number[];
          temperature_2m_min: number[];
          apparent_temperature_max: number[];
          apparent_temperature_min: number[];
          sunrise: string[];
          sunset: string[];
          uv_index_max: number[];
          uv_index_clear_sky_max: number[];
          precipitation_sum: number[];
          rain_sum: number[];
          showers_sum: number[];
          snowfall_sum: number[];
          precipitation_probability_max: number[];
          windspeed_10m_max: number[];
          windgusts_10m_max: number[];
          winddirection_10m_dominant: number[];
        };
      }


export enum WeatherCode {
  clear_sky = 0,
  mainly_clear = 1,
  partly_cloudy = 2,
  overcast = 3,
  fog = 45,
  rime_fog = 48,
  drizzle_light = 51,
  drizzle_moderate = 53,
  drizzle_dense = 55,
  freezing_drizzle_light = 56,
  freezing_drizzle_dense = 57,
  rain_light = 61,
  rain_modrate = 63,
  rain_heavy = 65,
  freezing_rain_light = 66,
  freezing_rain_heavy = 67,
}

interface TemperatureCurrent {
  current: number;
}
interface TemperatureDaily {
  high: number;
  low: number;
}

interface WeatherBase {
  code: number;
  wind: {
    direction: number;
    speed: number;
    gust: number;
  };
}

export interface WeatherNow extends WeatherBase {
  temperature: TemperatureCurrent;
  apparent_temperature: TemperatureCurrent;
}

export interface WeatherDay extends WeatherBase {
  day: Date;
  temperature: TemperatureDaily;
  apparent_temperature: TemperatureDaily;
  sunrise: Date;
  sunset: Date;
  uv_max: number;
  uv_max_clear_sky: number;
}

export const initWeatherCurrent: WeatherNow = {
    apparent_temperature: {
        current: 0
    },
    code: 0,
    temperature: {
        current: 0
    },
    wind: {
        speed: 0,
        gust: 0,
        direction: 0
    }
}

export const initWeatherDay: WeatherDay = {
  day: new Date(),
    apparent_temperature: {
        high: 0,
        low: 0,
      },
      sunrise: new Date(),
      sunset: new Date(),
      temperature: {
        high: 0,
        low: 0,
      },
      code: 0,
      uv_max: 0,
      uv_max_clear_sky: 0,
      wind: {
        direction: 0,
        gust: 0,
        speed: 0
      }
}