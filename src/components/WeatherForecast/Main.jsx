import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify"; // Import toast
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS
import SearchBar from "./SearchBar";
import Current from "./Current";
import Hourly from "./Hourly";
import Daily from "./Daily";
import Widget from "./Widget";
import LineChart from "./LineChart";

const Main = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("");
  const [isGraph, setIsGraph] = useState(false);
  const [graphValue, setGraphValue] = useState({});
  const [locationError, setLocationError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Function to fetch coordinates based on city
  const fetchCoordinates = async (city) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${city}`
      );
      if (response.data.length === 0) {
        throw new Error("City not found");
      }
      const { lat, lon } = response.data[0];
      return { lat, lon };
    } catch (error) {
      setLocationError("Could not find the specified city. Please try again.");
      toast.error("City not found! Please enter a valid city name."); // Show error toast
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch weather data
  const fetchWeather = async (lat, lon) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m&hourly=temperature_2m,relative_humidity_2m,dew_point_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers,snowfall,snow_depth,weather_code,surface_pressure,visibility,wind_speed_10m,temperature_180m,soil_temperature_54cm,uv_index,uv_index_clear_sky,is_day,sunshine_duration&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,uv_index_max,uv_index_clear_sky_max,precipitation_sum,rain_sum,showers_sum,snowfall_sum,precipitation_hours,precipitation_probability_max,windspeed_10m_max,windgusts_10m_max,winddirection_10m_dominant,shortwave_radiation_sum,et0_fao_evapotranspiration&timezone=auto`
      );
      setWeatherData(response.data);
      setLocationError(null);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setLocationError("Error fetching weather data. Please try again later.");
      toast.error("Error fetching weather data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Request device geolocation on component mount
  useEffect(() => {
    const fetchDefaultLocation = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            fetchWeather(latitude, longitude);
            setLocationError(null);
          },
          (error) => {
            console.error("Geolocation permission denied:", error);
            setLocationError(
              "Please enable location access to get weather data or search city."
            );
            toast.error("Please enable location access to get weather data or search city."); // Show error toast
          }
        );
      } else {
        setLocationError("Geolocation is not supported by this browser.");
        toast.error("Geolocation is not supported by this browser."); // Show error toast
      }
    };
    fetchDefaultLocation();
  }, []);
  

  // Trigger weather fetch when city is entered
  const handleSearch = async () => {
    if (city.trim() === "") {
      setLocationError("Please enter a city name.");
      toast.error("Please enter a city name."); // Show error toast
      return;
    }
    const coordinates = await fetchCoordinates(city);
    if (coordinates) {
      const { lat, lon } = coordinates;
      fetchWeather(lat, lon);
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen text-gray-700 p-10 bg-gradient-to-br from-blue-200 via-blue-300 to-indigo-400">
      <SearchBar setCity={setCity} fetchWeather={handleSearch} />
      {locationError && <p className="text-red-500">{locationError}</p>}
      {loading ? (
        <p className="text-blue-600 mt-4">Loading...</p>
      ) : (
        weatherData && (
          <>
            {isGraph ? (
              <LineChart
                weatherDetails={weatherData}
                dataKey={graphValue.dataKey}
                label={graphValue.label}
                color={graphValue.color}
                setIsGraph={setIsGraph}
              />
            ) : (
              <>
                <div className=" grid grid-cols-1 sm:grid-cols-2 sm:px-0 gap-8 lg:px-8 py-6 mt-8 ">
                  <Current
                    data={weatherData.current}
                    currentUnits={weatherData.current_units}
                  />
                  <Hourly
                    data={weatherData.hourly}
                    hourlyUnits={weatherData.hourly_units}
                  />
                </div>

                <Daily data={weatherData.daily} />
                <Widget
                  data={weatherData.current}
                  currentUnits={weatherData.current_units}
                  setIsGraph={setIsGraph}
                  setGraphValue={setGraphValue}
                />
              </>
            )}
          </>
        )
      )}
      {/* Add ToastContainer to display toasts */}
      <ToastContainer />
    </div>
  );
};

export default Main;
