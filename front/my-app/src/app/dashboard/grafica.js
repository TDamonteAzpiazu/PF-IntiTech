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

let daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

let consumption = [0, 10, 15, 10, 20, 20, 25];

let chart_data = {
  labels: daysOfWeek,
  datasets: [
    {
      label: "Total Consumption",
      data: consumption,
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

let options_data = {
  scales: {
    y: {
      min: 0,
      max: 30,
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

export function Lines_Chart() {
  return <Line data={chart_data} options={options_data} />;
}
