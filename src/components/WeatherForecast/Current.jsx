import React from "react";
import { getStartAndEndOfDay } from "../../helper/helper";
import wetherCode from "./../Common/weatherCode.json";

const Current = ({ data, currentUnits }) => {
  // Current weather conditions according to weather code
  const currentWeatherCode = data.weather_code;

  // Find the corresponding WMO code object in wetherCode
  const currentWmoCodeObject = wetherCode.WMO_Codes.find(
    (codeObj) => codeObj.code === currentWeatherCode
  );

  return (
    <div className="flex flex-col space-y-4 w-full max-w-screen-md bg-white px-8 py-6 mt-8 rounded-lg shadow-md ring-4 ring-gray-100 ring-opacity-60">
      <div className="flex flex-col sm:flex-row justify-between items-center">
        {/* Weather Icon and Description - Shows first on mobile */}
        {currentWmoCodeObject && (
          <div className="flex flex-col items-center text-gray-600 mt-4 sm:mt-0 gap-2 order-first sm:order-none">
            <span className="text-5xl sm:text-6xl md:text-7xl">
              {currentWmoCodeObject.icon}
            </span>
            <span className="text-base sm:text-lg font-semibold">
              {currentWmoCodeObject.description}
            </span>
          </div>
        )}

        {/* Temperature Display - Shows below weather icon on mobile */}
        <div className="flex items-center gap-4 sm:gap-6 order-last sm:order-none">
          <div className="flex flex-col items-center sm:items-start text-gray-800 gap-2">
            <span className="text-4xl sm:text-5xl md:text-6xl font-bold flex gap-2 items-start">
              {data?.temperature_2m}
              <span className="text-2xl sm:text-3xl font-bold">
                {currentUnits.temperature_2m}
              </span>
            </span>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-300 mt-4 pt-4 flex flex-wrap gap-4 sm:gap-6 justify-around">
        <div className="flex flex-col items-center gap-1 sm:gap-2">
          <span className="font-bold text-xl sm:text-2xl text-gray-700">
            {data.relative_humidity_2m}
            {currentUnits.relative_humidity_2m}
          </span>
          <span className="text-sm sm:text-lg text-gray-500">Humidity</span>
        </div>
        <div className="flex flex-col items-center gap-1 sm:gap-2">
          <span className="font-bold text-xl sm:text-2xl text-gray-700">
            {data.cloud_cover}
            {currentUnits.cloud_cover}
          </span>
          <span className="text-sm sm:text-lg text-gray-500">Clouds</span>
        </div>
        <div className="flex flex-col items-center gap-1 sm:gap-2">
          <span className="font-bold text-xl sm:text-2xl text-gray-700">
            {data.wind_speed_10m}
            {currentUnits.wind_speed_10m}
          </span>
          <span className="text-sm sm:text-lg text-gray-500">Wind</span>
        </div>
      </div>
    </div>
  );
};

export default Current;
