export const SET_WEATHER_DATA = 'SET_WEATHER_DATA';
export const SET_WEATHER_FORECAST = 'SET_WEATHER_FORECAST';

export const setWeatherData = (data) => ({
  type: SET_WEATHER_DATA,
  payload: data,
});

export const setWeatherForecast = (forecastData) => ({
  type: SET_WEATHER_FORECAST,
  payload: forecastData,
});