import { SET_WEATHER_DATA, SET_WEATHER_FORECAST } from '../actions/weatherActions';

const initialState = {
  weatherData: null,
  weatherForecast: [],
};

const weatherReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_WEATHER_DATA:
      return { ...state, weatherData: action.payload };
    case SET_WEATHER_FORECAST:
      return { ...state, weatherForecast: action.payload };
    default:
      return state;
  }
};

export default weatherReducer;