import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import NavBar from './components/NavBar';
import WeatherStatus from './components/WeatherStatus';
import WeatherForecast from './components/WeatherForecast';
import LocationFetcher from './components/LocationFetcher';

function App() {
  
  return (
    <div>
      <LocationFetcher/>
      <NavBar/>
      <WeatherStatus/>
      <WeatherForecast/>
    </div>
  );
}

export default App;