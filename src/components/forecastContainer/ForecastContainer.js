import React from 'react';
import { useSelector } from 'react-redux';

import './ForecastContainer.css';

const ForcastContainer = () => {
  const state = useSelector(state => state);
  const { weather, loading, error } = state;

  const dayTime = ['10:00 AM', '1:00 PM', '4:00 PM'];
  const dawnDusk = ['7:00 AM', '7:00 PM'];
  const nightTime = ['10:00 PM', '1:00 AM', '4:00 AM'];

  if (state.weather) {
    console.log(state.weather.list);
  }

  return (
    <div className="forecast-container">
      {loading ? (
        <svg xmlns="http://www.w3.org/2000/svg" height="32" width="32" viewBox="0 0 32 32">
          <g fill="#333333">
            <path id="path1" transform="rotate(0,16,16) translate(0,0) scale(1,1)  " d="M15.819,6.8640137C10.837997,6.8640137 6.7860107,10.962036 6.7860107,16 6.7860107,21.038025 10.837997,25.136047 15.819,25.136047 20.800003,25.136047 24.852005,21.038025 24.852005,16 24.852005,10.962036 20.800003,6.8640137 15.819,6.8640137z M26.201004,6.4440308L23.373001,9.1410522C24.990005,10.962036 25.98201,13.359009 25.98201,16 25.98201,21.677002 21.430008,26.279053 15.819,26.279053 10.206009,26.279053 5.6560059,21.677002 5.6560059,16 5.6560059,13.473022 6.5610046,11.163025 8.0570068,9.3730469L5.026001,6.8980103C2.9880066,9.3670044 1.7580109,12.541016 1.7580109,16 1.7580109,23.842041 8.0660095,30.223022 15.819,30.223022 23.572006,30.223022 29.880005,23.842041 29.880005,16 29.880005,12.321045 28.477005,8.9710083 26.201004,6.4440308z M15.819,0C24.555008,0 31.638,7.1640015 31.638,16 31.638,24.835999 24.555008,32 15.819,32 7.0830078,32 0,24.835999 0,16 0,7.1640015 7.0830078,0 15.819,0z">
              <animateTransform attributeName="transform" attributeType="XML" type="rotate" from="0, 16, 16" to="360, 16, 16" dur="0.5s" repeatCount="indefinite"/>
            </path>
          </g>
        </svg>
      ) : (
        !loading && weather ? (
          state.weather.list.map((item, index) => {
            const date = new Date(parseInt(item.dt * 1000)).toLocaleDateString('en-US').replace(/\/[0-9]{4}/, '');
            const time = new Date(parseInt(item.dt * 1000)).toLocaleTimeString('en-US').replace(/:00/, '');

            return (
              <div
                className={
                  `forecast
                  ${dayTime.includes(time) ? 'day-time' : ''}
                  ${dawnDusk.includes(time) ? 'dawn-dusk' : ''}
                  ${nightTime.includes(time) ? 'night-time' : ''}`
                } key={index}
              >
                <div className="date">{date}</div>
                <div className="time">{time}</div>
                <img className="weather-icon" src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} alt={item.weather[0].description} />
                <div className="weather-description">{item.weather[0].main}</div>
                <div className="temperature">{Math.round(item.main.temp)}°F</div>
              </div>
            );
          })
        ) : (
          <div>Error:{error} Couldn't retreive weather forecast. Please try a different query.</div>
        )
      )}

    </div>
  );
}

export default ForcastContainer;