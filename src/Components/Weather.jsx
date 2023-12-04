import React, { useState } from 'react';
import axios from 'axios';
import { FaSearch } from 'react-icons/fa';
import './Weather.css';
/* import { makeStyles } from '@material-ui/core/styles'; */

/* const useStyles = makeStyles({
  watchContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '500px',
    backgroundColor: '#000',
    borderRadius: '10%',
    border: '10px solid #444',
    maxWidth: '400px',
    margin: '0 auto',
    padding: '20px',
  },
  form: {
    backgroundColor: '#fff',
    padding: '10px',
    borderRadius: '5px',
    color: '#000',
    marginBottom: '20px',
  },
}); */

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [cityImage, setCityImage] = useState(null);
  const [city, setCity] = useState('');
  /* const classes = useStyles(); */

  const fetchCityImage = async (cityName) => {
    const apiUrl = 'Ooak_dDC5hujuD6yKFLycI7F1kJS4dBbwGvWn36DmvE'
    const response = await axios.get(`https://api.unsplash.com/search/photos?query=${cityName}&client_id=${apiUrl}`);
    console.log(response.data.results[0].urls.regular)
    setCityImage(response.data.results[0].urls.regular);
  };

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
    fetchCityImage(city);
  };

  return (
    <div className='container'>
      <form onSubmit={handleSearch} className='top-bar'>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Nom de la ville"
          className='input'
        />
        <button type="submit"><FaSearch /></button>
      </form>
      {weatherData && (
        <div>
          <h2>Ville: {weatherData.city.name}</h2>
          <p>Temperature: {weatherData.forecast[0].tmax} °C</p>
          <img src={cityImage} alt="" className='image'/>
        </div>
      )}
    </div>
  );
};

export default Weather;
