import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  Filler,
  plugins,
} from "chart.js";
import { useEffect } from "react";

ChartJS.register(
  CategoryScale,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
);

let options_data = {
  scales: {
    y: {
      min: 0,
      max: 500,
    },
    x: {
      ticks: { color: "black" }, 
    },
  },
  plugins: {
    tooltip: {
      enabled: true,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      titleFont: {
        size: 16,
      },
      bodyFont: {
        size: 14,
      },
      callbacks: {
        label: function(tooltipItem) {
          return `Value: ${tooltipItem.raw}`;
        }
      }
    },
    legend: {
      display: true,
      position: 'bottom',
      labels: {
        font: {
          size: 14,
        },
        color: 'black',
      },
    },
  },
};

export function Lines_Chart({stats}) {

  let daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  
  let chart_data = {
    labels: daysOfWeek,
    datasets: [
      {
        label: "Total Consumption",
        data: stats,
        fill: true,
        borderColor: "#ffed00",
        backgroundColor: "rgba(255, 237, 0, 0.1)", 
        pointBackgroundColor: "#e18104",
        pointBorderColor: "orange",
        pointRadius: 5,
        tension: 0.3,
      },
    ],
  };

  useEffect(() => {
    const mapedStats = stats.map((stat) => parseFloat(stat.energyGenerated))
    console.log(stats);
    let chart_data = {
      labels: daysOfWeek,
      datasets: [
        {
          label: "Total Consumption",
          data: stats,
          fill: true,
          borderColor: "#ffed00",
          backgroundColor: "rgba(255, 237, 0, 0.1)", 
          pointBackgroundColor: "#e18104",
          pointBorderColor: "orange",
          pointRadius: 5,
          tension: 0.3,
        },
      ],
    };
  }, [stats]);
  
  return <Line data={chart_data} options={options_data} />;
}
