// const apiKey = process.env.WEATHER_API_KEY;
const apiKey = '4a5d01c7b12dd8971128b6ad2a963b86';

export const getWeatherData = async (city) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang=PT&units=metric`
    );

    if (!response.ok) {
      throw new Error(`Error fetching weather data: ${response.statusText}`);
    }

    const data = await response.json();
    // console.log(data);
    return data;
  } catch (error) {
    throw error;
  }
};

export const getWeatherForecast = async (lat, lon) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
    );

    if (!response.ok) {
      throw new Error(`Error fetching weather forecast: ${response.statusText}`);
    }

    const data = await response.json();
    // console.log(data);
    return data;
  } catch (error) {
    throw error;
  }
};