import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { fetchWeatherAction } from '../../slices/weatherSlice';
import './Header.css';

const Header = () => {
  const [cityQuery, setCityQuery] = useState('');
  const [citySearched, setCitySearched] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    // Get user stored location if it exists
    if (localStorage.getItem('city')) {
      setCityQuery(localStorage.getItem('city'));
      dispatch(fetchWeatherAction(localStorage.getItem('city')));
    }
    
    // Get location from geolocation API
    else if (navigator.geolocation) {
      const success = (position) => {
        const coords = { lat: position.coords.latitude, lon: position.coords.longitude };
        dispatch(fetchWeatherAction(coords));
      }

      const error = (err) => {
        console.warn(`ERROR(${err.code}): ${err.message}`);
      }

      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      alert("Geolocation is not supported by this browser. Try using the search feature instead.");
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setCitySearched(true);
    dispatch(fetchWeatherAction(cityQuery));
  }

  return (
    <div className="header-container">
      <form
        className="search-container"
        onSubmit={handleSubmit}
      >
        <div className="label-input-container">
          <input
            className="search-field"
            type="text"
            value={cityQuery}
            placeholder="Search weather by city"
            onChange={(e) => setCityQuery(e.target.value)}
          />
        </div>
        <button
          className="header-button"
          type="submit"
        >Go</button>
      </form>
      {citySearched &&
        <div>
          <button
            className="preferences-button"
            onClick={() => {
              localStorage.setItem('city', cityQuery);
              alert('Location preference has been saved.');
            }}
          >Save My Location Prefence</button>
          <button
            className="preferences-button remove"
            onClick={() =>  {
              localStorage.clear();
              alert('Location preference has been cleared');
            }}
          >Remove My Location Preference</button>
        </div>
      }
    </div>
  );
}

export default Header;