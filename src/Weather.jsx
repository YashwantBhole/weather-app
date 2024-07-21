// src/Weather.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Weather.css'

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(true); //optional


  //by default weather data of your current location using navigetor.geolocation.getCurrentPosition in-built function
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      getWeatherByCoords(latitude, longitude);
    });
  }, []);

  //function to fetch by default weather data
  const getWeatherByCoords = async (lat, lon) => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=50e374c79e1d2e30608e59cca6d0b050&units=metric`);
      setWeather(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setLoading(false);
     
    }
  };

  //function to fetch weather data by city name
  const getWeatherByCity = async (city) => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=50e374c79e1d2e30608e59cca6d0b050&units=metric`);
      setWeather(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setLoading(false);
    
    }
 
  };


  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleCitySubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    getWeatherByCity(city);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="weather-container">
      <h1>Weather App</h1>
      <form onSubmit={handleCitySubmit}>
        <input type="text" value={city} onChange={handleCityChange} placeholder="Enter city name" />
        <button type="submit">Get Weather</button>
      </form>
      {weather && (
        <div className="weather-info">
          <h2 id='name'>{weather.name}({weather.sys.country})</h2>
          <p id='temp'>Temp: {weather.main.temp}°C</p>
          <p id='desc'>Weather: {weather.weather[0].description.toUpperCase()}</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
