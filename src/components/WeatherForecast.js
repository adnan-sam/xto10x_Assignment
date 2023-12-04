import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import WeatherCard from './weatherCard.js';
import { setWeatherForecast } from '../actions/weatherActions';
import { getWeatherForecast } from '../services/weatherService';

//This function is for converting the time into AM and PM
function convertUnixTimestampToAMPM(timestamp) {
  const date = new Date(timestamp * 1000);
  const hours = date.getHours();
  const minutes = '0' + date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12;
  return `${formattedHours}:${minutes.substr(-2)} ${ampm}`;
}

const WeatherForecast = () => {
  const dispatch = useDispatch();
  const weatherData = useSelector((state) => state.weatherData);
  const weatherForecast = useSelector((state) => state.weatherForecast);
  const [city, setCity] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    const fetchWeatherForecast = async () => {
      try {
        const forecastData = await getWeatherForecast(weatherData.coord.lat, weatherData.coord.lon);
        // dispatch(setWeatherForecast(forecastData.list)); //This is giving 40days forecast so we'll slice
        setCity(forecastData.city);
        dispatch(setWeatherForecast(forecastData.list.slice(0, 5)));
        // console.log("This is--", forecastData);
      } catch (error) {
        console.error('Error fetching weather forecast:', error);
      }
    };

    if (weatherData) {
      fetchWeatherForecast();
    }
  }, [weatherData, dispatch]);

  const filteredForecast = selectedDate
    ? weatherForecast.slice(weatherForecast.findIndex((item) => item.dt_txt.includes(selectedDate)))
    : weatherForecast;

  return (
    <div className='d-flex gap-5 m-5'>
      <div className='my-5'>
      Select Date:
      <br/>
      <select onChange={(e) => setSelectedDate(e.target.value)}>
        {weatherForecast.map((forecastItem) => (
          <option key={forecastItem.dt} value={forecastItem.dt_txt}>
            {forecastItem.dt_txt}
          </option>
        ))}
      </select>
      <ul className="list-group">
            <li className="list-group-text mx-2 text-black mt-4">High Temperature</li>
            <li className="list-group-text mx-2 text-black mt-2">Low Temperature</li>
            <li className="list-group-text mx-2 text-black mt-2">Humidity</li>
            <li className="list-group-text mx-2 text-black mt-2">Sunrise Time</li>
            <li className="list-group-text mx-2 text-black mt-2">Sunset Time</li>
          </ul>
      </div>

      {filteredForecast.map((forecastItem) => (
        <WeatherCard
          key={forecastItem.dt}
          date={forecastItem.dt_txt}
          logo={forecastItem.weather[0].icon}
          status={forecastItem.weather[0].main}
          highTemperature={forecastItem.main.temp_max}
          lowTemperature={forecastItem.main.temp_min}
          humidity={forecastItem.main.humidity}
          sunriseTime={convertUnixTimestampToAMPM(city.sunrise)}
          sunsetTime={convertUnixTimestampToAMPM(city.sunset)}
        />
      ))}
    </div>
  );
};

export default WeatherForecast;
