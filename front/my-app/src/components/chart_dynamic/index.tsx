'use client'
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
  TooltipItem,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Opciones para el gráfico de barras
const barOptions: ChartOptions<"bar"> = {
  scales: {
    y: {
      min: 0,
      suggestedMax: 1000, // Ajusta el valor sugerido máximo según el máximo esperado
      grid: {
        color: "rgba(0, 0, 0, 0.1)", // Color más oscuro para las líneas de la grilla
      },
      ticks: {
        color: "black", // Color más oscuro para los números del eje y
      },
    },
    x: {
      ticks: {
        color: "black", // Color más oscuro para los números del eje x
      },
      grid: {
        color: "rgba(0, 0, 0, 0.1)", // Color más oscuro para las líneas de la grilla
      },
    },
  },
  plugins: {
    tooltip: {
      enabled: true,
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      titleFont: {
        size: 16,
      },
      bodyFont: {
        size: 14,
      },
      callbacks: {
        label: function (tooltipItem: TooltipItem<"bar">) {
          return `Cantidad: ${tooltipItem.raw}`;
        },
      },
    },
    legend: {
      display: false, // Oculta la leyenda
    },
  },
};

export function LinesChart({ stats }: { stats: { date: string, totalPrice: number; }[] }) {
  const [barChartData, setBarChartData] = useState<ChartData<"bar">>({
    labels: [],
    datasets: [
      {
        label: "Cantidad de Pedidos",
        data: [],
        backgroundColor: "rgba(54, 162, 235, 0.2)", // Azul más oscuro
        borderColor: "rgba(54, 162, 235, 1)", // Azul más oscuro
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    // Obtener el mes y el año actual de los datos
    const currentMonth = stats.length > 0 ? new Date(stats[0].date).getMonth() : new Date().getMonth();
    const currentYear = stats.length > 0 ? new Date(stats[0].date).getFullYear() : new Date().getFullYear();

    // Crear un array con todos los días del mes actual
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const labels = Array.from({ length: daysInMonth }, (_, i) => (i + 1).toString());

    // Contar cantidad de pedidos por día
    const totalByDay: { [key: string]: number } = {};
    stats.forEach((item) => {
      const date = new Date(item.date);
      const day = date.getUTCDate().toString(); // Usar getUTCDate para asegurarnos de obtener el día correcto
      if (!totalByDay[day]) {
        totalByDay[day] = 0;
      }
      totalByDay[day] += item.totalPrice;
    });

    // Obtener data para el gráfico
    const data = labels.map(label => totalByDay[label] || 0);

    setBarChartData({
      labels,
      datasets: [
        {
          ...barChartData.datasets[0],
          data,
        },
      ],
    });
  }, [stats]);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="date-picker-container"> {/* Asegúrate de aplicar la clase adecuada aquí */}
        <Bar data={barChartData} options={barOptions} />
      </div>
    </div>
  );
}

export default LinesChart;
