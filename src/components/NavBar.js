import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setWeatherData, setWeatherForecast } from '../actions/weatherActions';
import { getWeatherDataLatLon, getWeatherForecast } from '../services/weatherService';

const NavBar = () => {
  const dispatch = useDispatch();
  const weatherData = useSelector((state) => state.weatherData);

  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    try {
      setIsRefreshing(true);
      // console.log(weatherData)
      const data = await getWeatherDataLatLon(weatherData.coord.lat, weatherData.coord.lon);
      dispatch(setWeatherData(data));

      if (data.coord) {
        const forecastData = await getWeatherForecast(data.coord.lat, data.coord.lon);
        dispatch(setWeatherForecast(forecastData.list));
      }
    } catch (error) {
      // alert("Enter location first");
      console.error('Error refreshing weather data:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <nav className="navbar justify-content-between navbar-custom">
      <div className='container'>
        <div className='logo' onClick={()=>{ window.location.href = '/'; }}>
          <svg width="27" height="29" viewBox="0 0 27 29" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.2083 0.291664L14.2954 4.70916C13.3396 4.36041 12.2933 4.16666 11.2083 4.16666C10.1233 4.16666 9.07708 4.36041 8.12125 4.70916L11.2083 0.291664ZM0.0224991 6.75L5.39583 6.29791C4.59416 6.97506 3.91287 7.78299 3.38083 8.6875C2.8125 9.64333 2.48958 10.625 2.30875 11.6454L0.0224991 6.75ZM0.0483324 19.6667L2.32167 14.7971C2.70136 16.8799 3.78699 18.7684 5.39583 20.1446L0.0483324 19.6667ZM22.3813 6.75L20.095 11.6454C19.7292 9.5539 18.6413 7.65697 17.0208 6.285L22.3813 6.75ZM26.7083 15.7917H24.125C24.125 18.4396 23.1175 21.0875 21.1025 23.1025C20.1441 24.0644 19.0045 24.8267 17.7496 25.3455C16.4948 25.8643 15.1495 26.1293 13.7917 26.125V28.7083C17.0983 28.7083 20.405 27.4167 22.9237 24.9237C25.4425 22.4308 26.7083 19.0983 26.7083 15.7917ZM21.5417 15.7917H18.9583C18.9583 17.0833 18.4546 18.4396 17.4471 19.4471C16.4396 20.4546 15.0833 20.9583 13.7917 20.9583V23.5417C14.8099 23.5435 15.8186 23.3444 16.7597 22.9555C17.7008 22.5667 18.5559 21.9959 19.2759 21.2759C19.9959 20.5559 20.5667 19.7008 20.9555 18.7597C21.3444 17.8186 21.5435 16.8099 21.5417 15.7917ZM11.2083 9.33333C13.3396 9.33333 15.0833 11.0771 15.0833 13.2083C15.0833 15.3396 13.3396 17.0833 11.2083 17.0833C9.07708 17.0833 7.33333 15.3396 7.33333 13.2083C7.33333 11.0771 9.07708 9.33333 11.2083 9.33333ZM11.2083 6.75C7.64333 6.75 4.75 9.64333 4.75 13.2083C4.75 16.7733 7.64333 19.6667 11.2083 19.6667C14.7733 19.6667 17.6667 16.7733 17.6667 13.2083C17.6667 9.64333 14.7733 6.75 11.2083 6.75Z" fill="white"/>
          </svg>
          <h4>Weather 99</h4>
        </div>
        <div className='logo' onClick={handleRefresh}>
          <div className='refresh d-flex gap-2'>
            <i className={`fa-solid fa-rotate-right m-auto ${isRefreshing ? 'spin' : ''}`}></i>
            <p>{isRefreshing ? 'Refreshing...' : 'Refresh'}</p>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
