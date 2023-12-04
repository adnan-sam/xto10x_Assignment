import React from 'react';

function convertCelsiusToFahrenheit(celsius) {
  return Math.round((celsius * 9/5) + 32);
}

const weatherCard = ({date, logo, status, highTemperature, lowTemperature, humidity, sunriseTime, sunsetTime}) => {
  
  // const options = { day: 'numeric', month: 'short', year: 'numeric' }; //For 4 Dec 2023
  const options = { day: '2-digit', month: 'short', year: 'numeric' }; // For 04 Dec 2023
  const formattedDate = new Intl.DateTimeFormat('en-GB', options).format(new Date(date));

  return (
    <div className='card-container'>
      <h5 className="mb-2">{formattedDate}</h5>
        <div className="card py-1 px-4">
        <div className='card-logo'>
        <img className='weather-icon' src={`https://openweathermap.org/img/wn/${logo}@2x.png`} alt="Weather Logo" />
        <p className="card-text">{status}</p>
        </div>
        <hr className='m-0'/>
        <div className="card-body">
          <ul className="list-group list-group-flush">
            <li className="list-group-text">{Math.round(highTemperature)}°C / {convertCelsiusToFahrenheit(highTemperature)}°F</li>
            <li className="list-group-text">{Math.round(lowTemperature)}°C / {convertCelsiusToFahrenheit(lowTemperature)}°F</li>
            <li className="list-group-text">{humidity}%</li>
            <li className="list-group-text">{sunriseTime}</li>
            <li className="list-group-text">{sunsetTime}</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default weatherCard