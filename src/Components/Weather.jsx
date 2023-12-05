import React, { useState } from 'react';
import axios from 'axios';
import { FaSearch } from 'react-icons/fa';
import clearSky from '../assets/weather-icons/clear-sky.svg';
import fewClouds from '../assets/weather-icons/few-clouds.svg';
import cloudy from '../assets/weather-icons/cloudy.svg';
import brokenClouds from '../assets/weather-icons/cloudy.svg';
import rain from '../assets/weather-icons/rain.svg';
import showerRain from '../assets/weather-icons/shower-rain.svg';
import thunder from '../assets/weather-icons/thunder.svg';
import snow from '../assets/weather-icons/snow.svg';
import mist from '../assets/weather-icons/weather.svg';
import night from '../assets/weather-icons/night.svg';
import day from '../assets/weather-icons/day.svg';
import './Weather.css';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [cityImage, setCityImage] = useState(null);
  const [city, setCity] = useState('');

  const weatherIcons = {
    '01d': `${clearSky}`,
    '02d': `${fewClouds}`,
    '03d': `${cloudy}`,
    '04d': `${brokenClouds}`,
    '09d': `${rain}`,
    '10d': `${showerRain}`,
    '11d': `${thunder}`,
    '13d': `${snow}`,
    '50d': `${mist}`,
  };

  const fetchCityImage = async (cityName) => {
    const apiUrl = 'Ooak_dDC5hujuD6yKFLycI7F1kJS4dBbwGvWn36DmvE'
    const response = await axios.get(`https://api.unsplash.com/search/photos?query=${cityName}&client_id=${apiUrl}`);
    
    if (response.data.results.length === 0) {
      setCityImage(null); 
    } else {
      const resultsLength = response.data.results.length;
      const randomIndex = Math.floor(Math.random() * resultsLength);
      const randomImage = response.data.results[randomIndex].urls.regular;
      setCityImage(randomImage);
    }
  };

  const fetchWeather = async (cityName) => {
    if (cityName) {
      const apiKey = '5f8947007f3d5e078969d2b105222dad';
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
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
        />
        <button type='submit' className='search-icon'><FaSearch/></button>
      </form>
      {weatherData && (
        <div className='info-city'>
          <h2>{weatherData.name}</h2>
          <h1>{Math.ceil(weatherData.main.temp)} °C</h1>
          <img src={weatherIcons[weatherData.weather[0].icon]} alt="Weather icon" />
          <div className='min-max'>
            <p>min: {Math.ceil(weatherData.main.temp_min)} °C</p>
            <p>max: {Math.ceil(weatherData.main.temp_max)} °C</p>
          </div>
          <div className='night-day'>
            <div>
              <img src={day} alt="" />
              <p>{new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString('fr-FR').slice(0, -3)}</p>
            </div>
            <div>
              <img src={night} alt="" />
              <p>{new Date(weatherData.sys.sunset * 1000).toLocaleTimeString('fr-FR').slice(0, -3)}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
