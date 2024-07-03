import React from "react";
import { Line } from "react-chartjs-2";

function StepperChart({ chartData, label }) {

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'index',
          intersect: false,
        },
        stacked: false,
        plugins: {
          title: {
            display: true,
            text: label,
            color: 'white',
          },
          legend: {
            labels: {
              color: 'white',
            },
          },
        },
        scales: {
          y: {
            type: 'linear',
            display: true,
            position: 'left',
            ticks: {
              color: 'white',
            },
          },
          y1: {
            type: 'linear',
            display: false,
            position: 'right',
            grid: {
              drawOnChartArea: false,
            },
            ticks: {
              color: 'white',
            },
          },
          y2: {
            type: 'linear',
            display: false,
            position: 'right',
            grid: {
              drawOnChartArea: false,
            },
            offset: true,
            ticks: {
              color: 'white',
            },
          },
          x: {
            display: false,
            ticks: {
              color: 'white',
            },
          },
        },
      };

  const chartDataWithSteppedLines = {
    ...chartData,
    datasets: chartData.datasets.map(dataset => ({
      ...dataset,
      stepped: true
    }))
  };

  return <Line data={chartDataWithSteppedLines} options={options} />;
}

export default StepperChart;
