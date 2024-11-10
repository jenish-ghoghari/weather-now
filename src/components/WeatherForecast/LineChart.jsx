import React, { useEffect, useState } from "react";
import { Card, LineChart, Title } from "@tremor/react";
import { IoChevronBack } from "react-icons/io5";

function LineChartCard({ weatherDetails, setIsGraph, dataKey, label, color }) {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (weatherDetails && weatherDetails.hourly) {
      const { hourly } = weatherDetails;
      const times = hourly.time.map((time) =>
        new Date(time)
          .toLocaleString("en-US", {
            weekday: "short",
            hour: "2-digit",
            hour12: true,
          })
          .slice(0, 24)
      );

      const data = times.map((time, index) => ({
        Time: time,
        [label]: hourly[dataKey][index],
      }));

      setChartData(data);
    }
  }, [weatherDetails, dataKey, label]);

  return (
    <div className="w-full">
      <div onClick={() => setIsGraph(false)} className="cursor-pointer flex gap-3 items-center text-2xl font-medium">
      <IoChevronBack size={22} />
      Back
      </div>
      <Card className="!bg-gray-100 mt-5">
        <Title className="!text-black">{label} over time</Title>
        <LineChart
          data={chartData}
          index="Time"
          categories={[label]}
          colors={[color]}
        />
      </Card>
    </div>
  );
}

export default LineChartCard;
