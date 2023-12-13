import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setWeatherData } from '../actions/weatherActions';
import { getWeatherData, getWeatherDataLatLon } from '../services/weatherService';
// import { Container, Row, Col } from "react-bootstrap";
// const apiKey = process.env.WEATHER_REACT_API_KEY
const apiKey = '4a5d01c7b12dd8971128b6ad2a963b86';

const WeatherStatus = () => {
    const dispatch = useDispatch();
    const weatherData = useSelector((state) => state.weatherData);

    const [city, setCity] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const [place, setPlace] = useState({city: '', state: ''});

    //For getting the weather data
    const handleSearch = async () => {
      try {
        const data = await getWeatherData(city);
        dispatch(setWeatherData(data));
        setPlace({city: '', state: ''});
        setSuggestions([]);
      } catch (error) {
        alert('City not found');
        console.error('Error fetching weather data:', error);
      }
    };

    //For fetching the suggestions
    const handleInputChange = (e) => {
      const inputCity = e.target.value;
      setCity(inputCity);
  
      // Fetch city suggestions from the OpenWeatherMap API
      fetch(`https://api.openweathermap.org/geo/1.0/direct?limit=10&APPID=${apiKey}&q=${inputCity}`)
        .then((response) => response.json())
        .then((data) => {
          setSuggestions(data);
          // console.log(data);
        })
        .catch((error) => {
          console.error('Error fetching suggestions:', error);
        });
    };

    //For handling suggestion click and update Weather data accordingly
    const handleSuggestion = async (suggestCity) => {
      try {
        const data = await getWeatherDataLatLon(suggestCity.lat, suggestCity.lon);
        dispatch(setWeatherData(data));
        setCity(suggestCity.name)
        setPlace({city: suggestCity.name, state: suggestCity.state})
        setSuggestions([]);
        // console.log(suggestCity);
      } catch (error) {
        alert('Suggestion not available');
        console.error('Error fetching weather data:', error);
      }
    }

  return (
  <div className='container mt-4 mt-lg-5 mb-0'>
    <div className="row justify-content-between">
      {/* Search bar on the right for large devices */}
      <div className="col-lg order-lg-2">
        <div className='d-flex flex-lg-column-reverse align-items-lg-center'>
          <div className="input-group mb-3 search-bar">
            <input
              type="text"
              className="form-control"
              placeholder="Search your city here...."
              value={city}
              onChange={handleInputChange}
              // onKeyPress={(e) => {
              //   if (e.key === 'Enter') {
              //     handleSearch();
              //     setSuggestions([]);
              //   }
              // }}
            />
            <span className="input-group-text" onClick={handleSearch}>
              <i className="fa-solid fa-magnifying-glass"></i>
            </span>
          </div>
        </div>
        {/* Display suggestions in a dropdown */}
        <div className='suggestion-container'>
          {suggestions.length > 0 && (
            <div className="dropdown">
              <ul className="suggestion-list">
                {suggestions.map((suggestCity) => (
                  <li key={suggestCity.id} onClick={() => {
                    handleSuggestion(suggestCity);
                  }}>
                    {suggestCity.name}, {suggestCity.state}, {suggestCity.country}
                  </li>
                ))}
                </ul>
              </div>
            )}
          </div>
      </div>

      {/* Location */}
      {weatherData!==null ? (
        <div className="col-lg order-lg-1">
        <div className='d-flex'>
          <svg className='mt-2' width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14.2188 25.4375V22.9375C15.0938 22.8125 15.9425 22.5729 16.765 22.2188C17.5883 21.8646 18.3646 21.4167 19.0938 20.875L20.9063 22.6875C19.9271 23.4583 18.875 24.0783 17.75 24.5475C16.625 25.0158 15.4479 25.3125 14.2188 25.4375ZM22.6562 20.875L20.9063 19.125C21.4479 18.4375 21.8854 17.6821 22.2188 16.8587C22.5521 16.0362 22.7812 15.1667 22.9062 14.25H25.4688C25.3021 15.5417 24.9846 16.7446 24.5163 17.8587C24.0471 18.9737 23.4271 19.9792 22.6562 20.875ZM22.9062 11.75C22.7812 10.8125 22.5521 9.93208 22.2188 9.10875C21.8854 8.28625 21.4479 7.54167 20.9063 6.875L22.6562 5.125C23.4479 6.04167 24.0888 7.0625 24.5788 8.1875C25.0679 9.3125 25.3646 10.5 25.4688 11.75H22.9062ZM11.7188 25.4375C8.53125 25.0625 5.87 23.6929 3.735 21.3288C1.59917 18.9638 0.53125 16.1875 0.53125 13C0.53125 9.77083 1.59917 6.97917 3.735 4.625C5.87 2.27083 8.53125 0.916667 11.7188 0.5625V3.0625C9.21875 3.41667 7.14583 4.53125 5.5 6.40625C3.85417 8.28125 3.03125 10.4792 3.03125 13C3.03125 15.5 3.85417 17.6875 5.5 19.5625C7.14583 21.4375 9.21875 22.5625 11.7188 22.9375V25.4375ZM19.1562 5.125C18.4062 4.5625 17.6146 4.10417 16.7812 3.75C15.9479 3.39583 15.0938 3.16667 14.2188 3.0625V0.5625C15.4479 0.666667 16.625 0.952917 17.75 1.42125C18.875 1.89042 19.9271 2.52083 20.9063 3.3125L19.1562 5.125ZM13 19.25C11.3125 17.8125 10.0575 16.4842 9.235 15.265C8.41167 14.0467 8 12.9167 8 11.875C8 10.3125 8.50542 9.06792 9.51625 8.14125C10.5262 7.21375 11.6875 6.75 13 6.75C14.3125 6.75 15.4742 7.21375 16.485 8.14125C17.495 9.06792 18 10.3125 18 11.875C18 12.9167 17.5883 14.0467 16.765 15.265C15.9425 16.4842 14.6875 17.8125 13 19.25ZM13 13C13.375 13 13.6929 12.87 13.9537 12.61C14.2137 12.3492 14.3437 12.0312 14.3437 11.6562C14.3437 11.3021 14.2137 10.9896 13.9537 10.7188C13.6929 10.4479 13.375 10.3125 13 10.3125C12.625 10.3125 12.3075 10.4479 12.0475 10.7188C11.7867 10.9896 11.6562 11.3021 11.6562 11.6562C11.6562 12.0312 11.7867 12.3492 12.0475 12.61C12.3075 12.87 12.625 13 13 13Z" fill="#1D2540"/>
          </svg>
          <h2 className="mx-2">{place.city? place.city : weatherData?.name}, {place.state? place.state : weatherData?.sys.country}</h2>
        </div>
        <p style={{ color: 'rgba(96, 96, 96, 1)' }}>
          {weatherData?.coord.lat}°N & {weatherData?.coord.lon}°E
        </p>
      </div>
      ) : (
        <div className="col-lg order-lg-1">
          <div className='d-flex'>
            <svg className='mt-2' width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.2188 25.4375V22.9375C15.0938 22.8125 15.9425 22.5729 16.765 22.2188C17.5883 21.8646 18.3646 21.4167 19.0938 20.875L20.9063 22.6875C19.9271 23.4583 18.875 24.0783 17.75 24.5475C16.625 25.0158 15.4479 25.3125 14.2188 25.4375ZM22.6562 20.875L20.9063 19.125C21.4479 18.4375 21.8854 17.6821 22.2188 16.8587C22.5521 16.0362 22.7812 15.1667 22.9062 14.25H25.4688C25.3021 15.5417 24.9846 16.7446 24.5163 17.8587C24.0471 18.9737 23.4271 19.9792 22.6562 20.875ZM22.9062 11.75C22.7812 10.8125 22.5521 9.93208 22.2188 9.10875C21.8854 8.28625 21.4479 7.54167 20.9063 6.875L22.6562 5.125C23.4479 6.04167 24.0888 7.0625 24.5788 8.1875C25.0679 9.3125 25.3646 10.5 25.4688 11.75H22.9062ZM11.7188 25.4375C8.53125 25.0625 5.87 23.6929 3.735 21.3288C1.59917 18.9638 0.53125 16.1875 0.53125 13C0.53125 9.77083 1.59917 6.97917 3.735 4.625C5.87 2.27083 8.53125 0.916667 11.7188 0.5625V3.0625C9.21875 3.41667 7.14583 4.53125 5.5 6.40625C3.85417 8.28125 3.03125 10.4792 3.03125 13C3.03125 15.5 3.85417 17.6875 5.5 19.5625C7.14583 21.4375 9.21875 22.5625 11.7188 22.9375V25.4375ZM19.1562 5.125C18.4062 4.5625 17.6146 4.10417 16.7812 3.75C15.9479 3.39583 15.0938 3.16667 14.2188 3.0625V0.5625C15.4479 0.666667 16.625 0.952917 17.75 1.42125C18.875 1.89042 19.9271 2.52083 20.9063 3.3125L19.1562 5.125ZM13 19.25C11.3125 17.8125 10.0575 16.4842 9.235 15.265C8.41167 14.0467 8 12.9167 8 11.875C8 10.3125 8.50542 9.06792 9.51625 8.14125C10.5262 7.21375 11.6875 6.75 13 6.75C14.3125 6.75 15.4742 7.21375 16.485 8.14125C17.495 9.06792 18 10.3125 18 11.875C18 12.9167 17.5883 14.0467 16.765 15.265C15.9425 16.4842 14.6875 17.8125 13 19.25ZM13 13C13.375 13 13.6929 12.87 13.9537 12.61C14.2137 12.3492 14.3437 12.0312 14.3437 11.6562C14.3437 11.3021 14.2137 10.9896 13.9537 10.7188C13.6929 10.4479 13.375 10.3125 13 10.3125C12.625 10.3125 12.3075 10.4479 12.0475 10.7188C11.7867 10.9896 11.6562 11.3021 11.6562 11.6562C11.6562 12.0312 11.7867 12.3492 12.0475 12.61C12.3075 12.87 12.625 13 13 13Z" fill="#1D2540"/>
            </svg>
            <p className='mx-3 my-2 notice'>Location Unavailable, Enter city name</p>
          </div>
        </div>
      )}
    </div>
    <hr className='mt-0' />
  </div>
);

};

export default WeatherStatus;
