import clearImage from './images/clear_sky.svg';
import cloudImage from './images/material_cloud.svg';
import rainImage from './images/carbon_mixed-rain-hail.svg';
import snowImage from './images/material-symbols_weather-snowy-outline.svg';
import thunderstormImage from './images/thunderstorm.svg';
import windImage from './images/mdi_weather-windy.svg';

const defaultImage = 'error'; 

export const getImgSource = (condition) => {
  switch (condition) {
    case 'Clear':
      return clearImage;
    case 'Clouds':
        return cloudImage;
    case 'Windy':
        return windImage;
    case 'Rain':
      return rainImage;
    case 'Snow':
      return snowImage;
    case 'Thunderstorm':
      return thunderstormImage;

    default:
      return defaultImage;
  }
};