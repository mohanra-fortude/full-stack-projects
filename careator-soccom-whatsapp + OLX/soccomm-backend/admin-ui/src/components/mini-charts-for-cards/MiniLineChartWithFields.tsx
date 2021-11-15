import React from "react";
import { Line } from "react-chartjs-2";

const lineData = {
  labels: [
    "August",
    "September",
    "October",
    "November",
  ],
  datasets: [
    {
      label: "Post",
      data: [5,13,10,15],
      fill: false,
      backgroundColor: "#ffd6cc",
      borderColor: "#ff3300",
      tension: 0.5,
    },
    {
      label: "User",
      data: [4,10,14,6],
      fill: false,
      backgroundColor: "#ffccff",
      borderColor: "#742774",
      tension: 0.5,
    },
    {
      label: "Group",
      data: [7,20,14,12],
      fill: false,
      backgroundColor: "#ddff99",
      borderColor: "#669900",
      tension: 0.5,
    },
  ],
};

function MiniLineChartWithFields() {
  return (
    <div>
      <Line
        data={lineData}
        options={{
          maintainAspectRatio: false,
          responsive: true,
          scales: {
            x: { display: false, title: { display: false } },
            y: {
              display: false,
              title: { display: false },
            },
          },
          plugins: {
            legend: {
              display: false,
            },
          },
        }}
        width={200}
        height={200}
      />
    </div>
  );
}

export default MiniLineChartWithFields;
