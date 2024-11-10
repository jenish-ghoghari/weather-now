import React from "react";
import { FiWind } from "react-icons/fi";
import { RiDropFill } from "react-icons/ri";
import { TbGrain } from "react-icons/tb";

const MetricCard = ({ icon: Icon, label, value, unit, onClick }) => (
  <button
    onClick={onClick}
    className="flex flex-col space-y-4 w-full cursor-pointer bg-white px-6 py-6 mt-6 rounded-xl ring-8 ring-white ring-opacity-40 items-center"
    aria-label={`View ${label} graph`}
  >
    <div className="text-lg sm:text-xl font-bold flex gap-2 sm:gap-3">
      <Icon size={24} className="text-gray-700" />
      <span className="text-sm sm:text-base">{label}</span>
    </div>
    <div className="flex gap-1 text-4xl sm:text-5xl md:text-6xl font-bold items-end">
      <span>{value ?? "N/A"}</span>
      <span className="text-xl sm:text-2xl font-semibold">{unit}</span>
    </div>
  </button>
);

const Widget = ({ data, currentUnits, setIsGraph, setGraphValue }) => {
  const handleGraphView = (value) => {
    setIsGraph(true);

    const graphSettings = {
      wind: {
        dataKey: "wind_speed_10m",
        label: "Wind speed",
        color: "blue",
      },
      precipitation: {
        dataKey: "precipitation",
        label: "Precipitation",
        color: "green",
      },
      humidity: {
        dataKey: "relative_humidity_2m",
        label: "Humidity",
        color: "yellow",
      },
    };

    setGraphValue(graphSettings[value]);
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-6 sm:gap-10 w-full max-w-screen-lg">
      <MetricCard
        icon={RiDropFill}
        label="Humidity"
        value={data.relative_humidity_2m}
        unit={currentUnits.relative_humidity_2m}
        onClick={() => handleGraphView("humidity")}
      />
      <MetricCard
        icon={FiWind}
        label="Wind"
        value={data.wind_speed_10m}
        unit={currentUnits.wind_speed_10m}
        onClick={() => handleGraphView("wind")}
      />
      <MetricCard
        icon={TbGrain}
        label="Precipitation"
        value={data.precipitation}
        unit={currentUnits.precipitation}
        onClick={() => handleGraphView("precipitation")}
      />
    </div>
  );
};

export default Widget;
