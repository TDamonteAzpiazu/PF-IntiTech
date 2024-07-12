// import { Chart } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   Filler,
//   BarController,
//   PolarAreaController,
//   plugins,
//   scales,
// } from "chart.js";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   Filler,
//   BarController,
//   PolarAreaController,
//   plugins,
//   scales
// );

// let consumptionData = {
//   categories: [
//     "Category 1",
//     "Category 2"
//   ],
//   series: [
//     {
//       label: "Consumo Tipo A",
//       data: [50, 70],
//       backgroundColor: "#e18104", 
//       borderColor: "#c05621", 
//       borderWidth: 1,
//       barThickness: 20, 
//     },
//     {
//       label: "Consumo Tipo B",
//       data: [70, 50],
//       backgroundColor: "#ffd700", 
//       borderColor: "#e18104", 
//       borderWidth: 1,
//       barThickness: 15, 
//     }
//   ]
// };

// let options = {
//   responsive: true,
//   scales: {
//     y: {
//       stacked: true,
//       ticks: { beginAtZero: true },
//       grid: { display: true },
//     },
//     x: {
//       stacked: true,
//       ticks: { color: "#333" },
//     },
//   },
//   plugins: {
//     tooltip: {
//       enabled: true,
//       backgroundColor: 'rgba(0, 0, 0, 0.7)',
//       titleFont: {
//         size: 16,
//       },
//       bodyFont: {
//         size: 14,
//       },
//       callbacks: {
//         label: function(tooltipItem) {
//           return `Value: ${tooltipItem.raw}`;
//         }
//       }
//     },
//     legend: {
//       display: true,
//       position: 'bottom',
//       labels: {
//         font: {
//           size: 14,
//         },
//         color: 'black',
//       },
//     },
//   }
// };

// export function Bar_Chart() {
//   return (
//     <Chart type="bar" data={{
//       labels: consumptionData.categories,
//       datasets: consumptionData.series
//     }} options={options} />
//   );
// }
