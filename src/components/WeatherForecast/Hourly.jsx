import React from "react";
import { getStartAndEndOfDay } from "../../helper/helper";
import weatherCode from "./../Common/weatherCode.json";

const Hourly = ({ data, hourlyUnits }) => {
  console.log({ hourlyUnits });
  const currentDate = new Date();
  const currentHour = currentDate.getHours();

  // Find the index of the current hour in the data array
  const currentHourIndex = data.time.findIndex((time) => {
    const timeHour = new Date(time).getHours();
    return timeHour === currentHour;
  });

  // Slice data to show only the next 24 hours
  const next24HoursData = data.time.slice(
    currentHourIndex,
    currentHourIndex + 24
  );

  return (
    <div className="flex flex-col space-y-4 w-full max-w-screen-lg bg-white px-8 py-6 mt-8 rounded-lg shadow-md ring-4 ring-gray-100 ring-opacity-60">
      <div className="text-2xl font-semibold text-gray-700">
        24-Hour Forecast
      </div>
      <div className="flex overflow-x-auto space-x-4 py-4 scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-blue-100">
        {next24HoursData.map((item, index) => {
          const wmoCodeObject = weatherCode.WMO_Codes.find(
            (codeObj) =>
              codeObj.code === data.weather_code[currentHourIndex + index]
          );
          return (
            <div
              key={index}
              className="flex flex-col items-center min-w-[90px] w-[120px] p-2 bg-gray-50 rounded-lg shadow-md transform transition duration-300 hover:scale-105"
            >
              <span className="font-semibold text-sm text-gray-800">
                {data?.temperature_2m[currentHourIndex + index]}
                {hourlyUnits?.temperature_2m}
              </span>
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
              <span className="font-bold text-sm text-gray-700 mt-2">
                {new Date(item).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  hour12: true,
                })}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Hourly;
