import { Chart } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  BarController,
  plugins,
  scales, 
  
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  BarController,
  plugins,
  scales
);

let generacion_solar = [0, 10, 20, 10, 15, 30, 25, 49, 80, 70, 50, 90];
let meses = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

let bar_data = {
  labels: meses,
  datasets: [
    {
      label: "Generacion solar",
      data: generacion_solar,
      backgroundColor: ["#ffed00"],
      borderColor: ["#9ca3af"],
      borderWidth: 1,
    },
  ],
};
let options_bar = {
  responsive: true,
  scales: {
    y: {
      min: 0,
      max: 100,
    },
    x: {
      ticks: { color: "#e18104" },
    },
  }
};


export function Bar_Chart() {
  return <Chart type="polarArea" data={bar_data} options={options_bar} />;
}
