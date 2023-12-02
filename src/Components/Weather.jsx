import React, { useState } from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('');

  const fetchInseeCode = async (cityName) => {
    const response = await axios.get(`https://geo.api.gouv.fr/communes?nom=${cityName}&fields=nom,code&format=json&geometry=centre`);
    return response.data[0].code;
  };

  const fetchWeather = async (inseeCode) => {
    if (inseeCode) {
      const apiKey = '812b48888f2a14b7a685aa189d028f88ccab259b5feac47a6dfbcec80d622612';
      const apiUrl = `https://api.meteo-concept.com/api/forecast/daily?insee=${inseeCode}&token=${apiKey}`;
      const response = await axios.get(apiUrl);
      setWeatherData(response.data);
      console.log(response.data)
    }
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    const inseeCode = await fetchInseeCode(city);
    fetchWeather(inseeCode);
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <TextField
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
        />
        <Button type="submit">Search</Button>
      </form>
      {weatherData && (
        <div>
          <h2>Ville: {weatherData.city.name}</h2>
          <p>Temperature max: {weatherData.forecast[0].tmax} °C</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
