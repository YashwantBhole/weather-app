// src/NextPage.js
import React, { useState } from 'react';
import axios from 'axios';
import './NextPage.css';

const NextPage = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('');
  const [inputCity, setInputCity] = useState('');

  const fetchWeatherData = async () => {
    const API_KEY = '50e374c79e1d2e30608e59cca6d0b050';
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${inputCity}&appid=${API_KEY}&units=metric`
      );
      setWeatherData(response.data);
      setCity(inputCity);
    } catch (error) {
      console.error("Error fetching weather data", error);
    }
  };

  return (
    <div className="weather-container">
      <h1>Weather App</h1>
      <div className="input-container">
        <input
          type="text"
          value={inputCity}
          onChange={(e) => setInputCity(e.target.value)}
          placeholder="Enter city name"
        />
        <button onClick={fetchWeatherData}>Get Weather</button>
      </div>
      {weatherData && (
        <div className="weather-info">
          <h2 id='cityname'>{weatherData.name}({weatherData.sys.country})</h2>
          <p>{weatherData.weather[0].description}</p>
          <p id='temp'>Temp: {weatherData.main.temp}°C</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Wind Speed: {weatherData.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default NextPage;
