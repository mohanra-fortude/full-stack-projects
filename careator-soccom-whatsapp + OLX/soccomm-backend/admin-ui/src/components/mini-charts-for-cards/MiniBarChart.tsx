import React from "react";
import { Bar } from "react-chartjs-2";

function MiniBarChart() {
  const dataBar = {
    labels: [
      "Goods",
      "Services",
      "Rentals",
      "Finance",
      "Informational",  
    ],
    datasets: [
      {
        label: "No of posts",
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "#ccffcc",
          "#e6ccff",
          "rgba(75, 192, 192, 0.2)",          
          "#ffff99",
        ],
        borderColor: [
          "#ff3300",
          "#009900",
          "#4d0099",
          "#0088cc",         
          "#999900",
        ],
        hoverBackgroundColor: [
          "#ff8080",
          "#4dff4d",
          "#cc99ff",
          "#1ab2ff",         
          "#ffff00",
        ],
        borderWidth: 1,
        data: [65, 59, 80, 81, 56],
      },
    ],
  };

  return (
    <div>
      <Bar
        data={dataBar}
        options={{
          maintainAspectRatio: false,
          responsive: true,
          scales: {
            x: { display: false },
            y: {
              display: false,
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

export default MiniBarChart;
