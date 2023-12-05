import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import WeatherCard from './weatherCard.js';
import { setWeatherForecast } from '../actions/weatherActions';
import { getWeatherForecast } from '../services/weatherService';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import forecastMissing from '../images/forecastMissing.gif';

function convertUnixTimestampToAMPM(timestamp) {
  const date = new Date(timestamp * 1000);
  const hours = date.getHours();
  const minutes = '0' + date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = (hours % 12 || 12).toString().padStart(2, '0'); // Add leading zero
  return `${formattedHours}:${minutes.substr(-2)} ${ampm}`;
}

function formatDate(dateString) {
  const options = { day: '2-digit', month: 'short', year: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

//Main component starts here
const WeatherForecast = () => {
  const dispatch = useDispatch();
  const weatherData = useSelector((state) => state.weatherData);
  const weatherForecast = useSelector((state) => state.weatherForecast);
  const [city, setCity] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const fetchWeatherForecast = async () => {
      try {
        const forecastData = await getWeatherForecast(weatherData.coord.lat, weatherData.coord.lon);
        setCity(forecastData.city);
        dispatch(setWeatherForecast(forecastData.list));
        // console.log(forecastData);
      } catch (error) {
        console.error('Error fetching weather forecast:', error);
      }
    };

    if (weatherData) {
      fetchWeatherForecast();
    }
  }, [weatherData, dispatch]);

  const uniqueDates = [...new Set(weatherForecast.map((item) => item.dt_txt.split(' ')[0]))];

  const filteredForecast = uniqueDates
  .map((date) => {
    const dailyForecast = weatherForecast.find((item) => item.dt_txt.includes(date));
    return dailyForecast;
  })
  .filter((forecast) => new Date(forecast.dt_txt) >= selectedDate || formatDate(forecast.dt_txt) === formatDate(selectedDate));

  return (
    <div className='container forecast-container row flex-nowrap align-items-center'>
      <div className='col-5 col-lg-2 my-5'>
        <label>Select Date:</label>
        <br/>
        <div className="date-picker-container flex-nowrap">
          <i className="fa-solid fa-calendar-days"></i>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="dd MMM yyyy"
            className="custom-date-picker"
          />
        </div>
        <ul className="list-group">
          <li className="list-group-text mx-2 fw-bold text-black mt-3 mt-lg-4">High Temperature</li>
          <li className="list-group-text mx-2 fw-bold text-black mt-2">Low Temperature</li>
          <li className="list-group-text mx-2 fw-bold text-black mt-2">Humidity</li>
          <li className="list-group-text mx-2 fw-bold text-black mt-2">Sunrise Time</li>
          <li className="list-group-text mx-2 fw-bold text-black mt-2">Sunset Time</li>
        </ul>
      </div>

      <div className='col overflow-auto overflow-sm-auto'>
        <div className='row flex-nowrap overflow-auto'>
          {filteredForecast.length>0 ? (filteredForecast.slice(0, 5).map((forecastItem, index) => (
            <WeatherCard
              key={index}
              date={forecastItem.dt_txt}
              logo={forecastItem.weather[0].icon}
              status={forecastItem.weather[0].main}
              highTemperature={forecastItem.main.temp_max}
              lowTemperature={forecastItem.main.temp_min}
              humidity={forecastItem.main.humidity}
              sunriseTime={convertUnixTimestampToAMPM(city.sunrise)}
              sunsetTime={convertUnixTimestampToAMPM(city.sunset)}
            />
          ))) : (
            <div className='forecast-missing'>
              <img
                src={forecastMissing}
                alt='ForecastMissing.gif'
              />
              <p>Forecast not found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WeatherForecast;
