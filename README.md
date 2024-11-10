# Weather App

This is a weather application built with **React**, **Vite**, **Tailwind CSS**, and **Open-Meteo API**. It provides current, hourly, and daily weather forecasts along with visualized data using charts. Additionally, it includes geolocation functionality to fetch the weather based on the user's current location.

---

## Features

### 1. Current Weather Card
This component displays the current weather data for the selected location. It includes the following information:

- Temperature (in Celsius)
- Weather condition (e.g., clear, cloudy, rainy)
- Humidity level
- Wind speed
- Weather icon representing the current condition

### 2. Hourly Weather Card
This component provides a detailed hourly forecast for the next 24 hours. It displays:
- Hourly temperature
- Weather condition for each hour

### 3. Daily Weather Card
The daily forecast card shows the weather for the next 7 days. Each day includes:

- High and low temperatures
- Weather condition (with an icon)

4. Weather Widgets
These compact cards display quick insights into various weather conditions:

- Wind Speed: Displays the current wind speed and direction.
- Precipitation: Shows the amount of precipitation expected.
- Humidity: Displays the current humidity level in percentage.

5. Weather Graphs
Using Tremor, this component visualizes trends in:

- Wind Speed: How the wind speed changes over time.
- Humidity: How the humidity fluctuates over the forecast period.
- Precipitation: Graph showing expected rainfall or snow over time.

---

## Tech Stack

- **React**: Frontend framework
- **Vite**: Development server and build tool
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Axios**: Promise-based HTTP client for making API requests
- **Tremor**: For rendering interactive charts
- **React Icons**: To display icons across the application
- **React Toastify**: For showing notifications and error messages
- **Open-Meteo API**: Provides weather data including current, hourly, and daily forecasts
- **OpenStreetMap API**: Used for getting city data (latitude and longitude)

---
