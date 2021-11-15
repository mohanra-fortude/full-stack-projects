import React from "react";
import { Doughnut } from "react-chartjs-2";

function MiniDoughnutChart() {
  const data = {
    labels: ["Private", "Public"],
    datasets: [
      {
        label: "Group",
        data: [12, 19],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "#ccffcc"],
        hoverBackgroundColor: ["#ff8080", "#4dff4d"],
        borderColor: ["#ff3300", "#009900"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <Doughnut
        data={data}
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

export default MiniDoughnutChart;
