// import React, { useEffect } from 'react';
// import { Bar } from 'react-chartjs-2';
// import Chart from 'chart.js/auto';

// export default function NeonBarChart() {
//   useEffect(() => {
//     const neonShadow = {
//       id: 'neonShadow',
//       beforeDraw: (chart) => {
//         const ctx = chart.ctx;
//         ctx.save();
//         ctx.shadowColor = '#ffed00';
//         ctx.shadowBlur = 20;
//         ctx.shadowOffsetX = 0;
//         ctx.shadowOffsetY = 0;
//       },
//       afterDraw: (chart) => {
//         chart.ctx.restore();
//       },
//     };
//     Chart.register(neonShadow);
//   }, []);

//   const chartData = {
//     labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
//     datasets: [
//       {
//         label: 'Sales',
//         data: [65, 59, 80, 81, 56, 55, 40],
//         backgroundColor: 'rgba(255, 237, 0, 0.2)',
//         borderColor: '#ffed00',
//         borderWidth: 2,
//         hoverBackgroundColor: 'rgba(255, 237, 0, 0.6)',
//         hoverBorderColor: '#ffed00',
//       }
//     ]
//   };

//   const options = {
//     plugins: {
//       legend: {
//         display: true,
//         labels: {
//           color: '#ffed00'
//         }
//       }
//     },
//     scales: {
//       y: {
//         beginAtZero: true,
//         ticks: {
//           color: '#ffed00'
//         }
//       },
//       x: {
//         ticks: {
//           color: '#ffed00'
//         }
//       }
//     }
//   };

//   return (
//     <div className="w-full h-64 border border-black">
//       <Bar data={chartData} options={options} />
//     </div>
//   );
// }
