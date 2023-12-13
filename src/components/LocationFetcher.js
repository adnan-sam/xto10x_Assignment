import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setWeatherData, setWeatherForecast } from '../actions/weatherActions';
import { getCurrentLocationData, getWeatherForecast } from '../services/weatherService';

const LocationFetcher = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);

  const fetchWeatherData = async (latitude, longitude) => {
    try {
      const data = await getCurrentLocationData(latitude, longitude);
      dispatch(setWeatherData(data));

      if (data.coord) {
        const forecastData = await getWeatherForecast(data.coord.lat, data.coord.lon);
        dispatch(setWeatherForecast(forecastData.list));
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            fetchWeatherData(latitude, longitude);
            console.log(latitude, longitude)
          },
          (error) => {
            setError(error.message);
          }
        );
      } else {
        setError('Geolocation is not supported by this browser.');
      }
    };

    getLocation();
  }, [dispatch]);

  // return (
  //   <div>
  //     {error && <p className='liveLocation'>Unable to fetch location, Enter city name manually</p>}
  //   </div>
  // );
};

export default LocationFetcher;
