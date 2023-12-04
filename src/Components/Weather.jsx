import React, { useState } from 'react';
import axios from 'axios';
import { FaSearch } from 'react-icons/fa';
import './Weather.css';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [cityImage, setCityImage] = useState(null);
  const [city, setCity] = useState('');

  const fetchCityImage = async (cityName) => {
    const apiUrl = 'Ooak_dDC5hujuD6yKFLycI7F1kJS4dBbwGvWn36DmvE'
    const response = await axios.get(`https://api.unsplash.com/search/photos?query=${cityName}&client_id=${apiUrl}`);
    console.log(response.data.results[0].urls.regular)
    setCityImage(response.data.results[0].urls.regular);
  };

  const fetchWeather = async (cityName) => {
    if (cityName) {
      const apiKey = '5f8947007f3d5e078969d2b105222dad';
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
      const response = await axios.get(apiUrl);
      setWeatherData(response.data);
      console.log(response.data)
    }
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    fetchWeather(city);
    fetchCityImage(city);
  };

  return (
    <div className={`container ${cityImage ? '' : 'gradient'}`} style={cityImage ? { backgroundImage: `url(${cityImage})` } : {}}>
      <form onSubmit={handleSearch} className='top-bar'>
        <input
          type='text'
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder='Nom de la ville'
          className='input'
        />
        <button type='submit' className='search-icon'><FaSearch/></button>
      </form>
      {weatherData && (
        <div className='info-city'>
          <h2>Ville: {weatherData.name}</h2>
          <p>Temperature: {Math.ceil(weatherData.main.temp - 273.15)} °C</p>
        </div>
      )}
      {/* {weatherData && (
        <div className='info-city'>
          <h2>Previsons: {weatherData.name}</h2>
          <p>Temperaturehot: {Math.ceil(weatherData.main.temp - 273.15)} °C</p>
        </div>
      )} */}
    </div>
  );
};

export default Weather;
