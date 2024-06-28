import  {Line} from "react-chartjs-2";
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

let consumo = [0, 10, 20, 10, 15, 30, 25, 49, 80, 70, 50, 90];

let chart_data = {
  labels: meses,
  datasets: [
    {
      label: "Consumo Total",
      data: consumo,
      fill: true,
      borderColor: "#ffed00",
      backgroundColor: "transparent",
      pointBackgroundColor: "#e18104",
      pointBorderColor: "orange",
      pointRadius: 3,
      tension: 0.3,
    },
  ],
};
let options_data = {
  scales: {
    y: {
      min: 0,
      max:100
    },
    x: {
      ticks: { color: "black" }, //color de los meses en este caso
    },
  },
};
export function Lines_Chart() {
  return <Line data={chart_data} options={options_data} />;
}
