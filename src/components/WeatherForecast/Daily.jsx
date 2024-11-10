import React from "react";
import weatherCode from "./../Common/weatherCode.json";

const Daily = ({ data, dailyUnits }) => {
  return (
    <div className="flex flex-col space-y-4 w-full max-w-screen-lg bg-white px-8 py-6 mt-8 rounded-lg shadow-md ring-4 ring-gray-100 ring-opacity-60">
      <div className="text-2xl font-semibold text-gray-700">
        Weekly Forecast
      </div>
      <div className="flex overflow-x-auto space-x-4 py-4 scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-blue-100">
        {data.time.map((date, index) => {
          const wmoCodeObject = weatherCode.WMO_Codes.find(
            (codeObj) => codeObj.code === data.weathercode[index]
          );
          return (
            <div
              key={index}
              className="flex flex-col items-center min-w-[100px] w-[150px] p-2 bg-gray-50 rounded-lg shadow-md transform transition duration-300 hover:scale-105"
            >
              {/* Max and Min temperatures */}
              <span className="font-semibold text-sm text-gray-800">
                {Math.round(data.apparent_temperature_max[index])}° /{" "}
                {Math.round(data.apparent_temperature_min[index])}°
              </span>

              {/* Weather icon and description */}
              {wmoCodeObject && (
                <>
                  <span className="text-3xl text-blue-600">
                    {wmoCodeObject.icon}
                  </span>
                  <span className="text-xs text-gray-500 text-center">
                    {wmoCodeObject.description}
                  </span>
                </>
              )}

              {/* Date */}
              <span className="font-bold text-sm text-gray-700 mt-2">
                {new Date(date).toLocaleDateString("en-US", {
                  weekday: "short",
                })}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Daily;
