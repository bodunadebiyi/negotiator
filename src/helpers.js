import axios from 'axios';

const getCurrentTemperature = async (city) => {
  try {
    const apiKey = process.env.VUE_APP_WEATHER_API_KEY;
    const weatherInfo = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}`);
    return weatherInfo.data;
  } catch (e) {
    console.log('error fetching weather information::: ', e.response);
    return 'Unavailable';
  }
};

export default getCurrentTemperature;
