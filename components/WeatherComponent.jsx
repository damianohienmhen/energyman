import React, { useEffect, useState } from "react";
import "/Users/damianohienmhen/Downloads/enapp/styles.css";
import moment from "moment";
import { Button } from "semantic-ui-react";

const WeatherComponent = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeatherData = async () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        setLatitude(lat);
        setLongitude(lon);

        const apiKey = "8b7e3e1febb887be65439ca4e6b574e1"; // Replace with your actual API key
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

        try {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error("Failed to fetch weather data");
          }
          const data = await response.json();
          setWeather(data);
        } catch (err) {
          setError(err.message);
        }
      },
      (err) => {
        setError("Failed to get location: " + err.message);
      }
    );
  };

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const refresh = () => {
    fetchWeatherData();
  };

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!weather) {
    return <div className="loading">Loading weather data...</div>;
  }

  return <WeatherCard weatherData={weather} refresh={refresh} />;
};

const WeatherCard = ({ weatherData, refresh }) => (
  <div className="weather-card">
    <div className="top">
      <p className="header">{weatherData.name}</p>
      <Button
        className="button"
        inverted
        color="blue"
        circular
        icon="refresh"
        onClick={refresh}
      />
    </div>
    <div className="flex">
      <p className="day">
        {moment().format("dddd")}, <span>{moment().format("LL")}</span>
      </p>
      <p className="description">{weatherData.weather[0].main}</p>
    </div>
    <div className="flex">
      <p className="temp">Temperature: {weatherData.main.temp} &deg;C</p>
      <p className="temp">Humidity: {weatherData.main.humidity} %</p>
    </div>
    <div className="flex">
      <p className="sunrise-sunset">
        Sunrise:{" "}
        {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString("en-IN")}
      </p>
      <p className="sunrise-sunset">
        Sunset:{" "}
        {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString("en-IN")}
      </p>
    </div>
  </div>
);

export default WeatherComponent;
