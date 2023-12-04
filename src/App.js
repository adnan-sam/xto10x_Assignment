import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import NavBar from './components/NavBar';
import WeatherStatus from './components/WeatherStatus';
import WeatherForecast from './components/WeatherForecast';

function App() {
  
  return (
    <div>
      <NavBar/>
      <WeatherStatus/>
      <WeatherForecast/>
    </div>
  );
}

export default App;