import React, { useEffect, useState } from "react";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement,
  ChartOptions,
  ChartData,
  TooltipItem,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement
);

//ARRAY CON INFO DE LA PETICION
const energyData: EnergyData[] = [
  {
    date: "2024-06-23T23:59:15.000Z",
    energyGenerated: 174.91,
  },
  {
    date: "2024-06-24T23:59:15.000Z",
    energyGenerated: 310.75,
  },
  {
    date: "2024-06-25T23:59:15.000Z",
    energyGenerated: 344.75,
  },
  {
    date: "2024-06-26T23:59:15.000Z",
    energyGenerated: 307.97,
  },
  {
    date: "2024-06-27T23:59:15.000Z",
    energyGenerated: 390.8,
  },
  {
    date: "2024-06-28T23:59:15.000Z",
    energyGenerated: 228.77,
  },
  {
    date: "2024-06-29T23:59:15.000Z",
    energyGenerated: 319.05,
  },
];
//OPCIONES PARA CADA TIPO DE CHART QUE NECESITO PARA SETEAR LOS ESTADOS
//lineal
const lineOptions: ChartOptions<"line"> = {
  scales: {
    y: {
      min: 0,
      max: 400,
    },
    x: {
      ticks: { color: "black" },
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
        label: function (tooltipItem: TooltipItem<"line">) {
          return `Value: ${tooltipItem.raw}`;
        },
      },
    },
    legend: {
      display: true,
      position: "bottom",
      labels: {
        font: {
          size: 14,
        },
        color: "black",
      },
    },
  },
};
//barras
const barOptions: ChartOptions<"bar"> = {
  scales: {
    y: {
      min: 0,
      max: 400,
    },
    x: {
      ticks: { color: "black" },
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
          return `Value: ${tooltipItem.raw}`;
        },
      },
    },
    legend: {
      display: true,
      position: "bottom",
      labels: {
        font: {
          size: 14,
        },
        color: "black",
      },
    },
  },
};
//circular
const doughnutOptions: ChartOptions<"doughnut"> = {
  responsive: true,
  maintainAspectRatio: false,
  animation: {
    animateScale: true,
    animateRotate: true,
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
        label: function (tooltipItem: TooltipItem<"doughnut">) {
          return `Value: ${tooltipItem.raw}`;
        },
      },
    },
    legend: {
      display: true,
      position: "bottom",
      labels: {
        font: {
          size: 14,
        },
        color: "black",
      },
    },
  },
};

export function LinesChart({stats} : any) {
  const [chartType, setChartType] = useState<"line" | "bar" | "doughnut">(
    "line"
  );

  const [lineChartData, setLineChartData] = useState<ChartData<"line">>({
    labels: [],
    datasets: [
      {
        label: "Energy Generated",
        data: [],
        fill: true,
        borderColor: "#ffed00",
        backgroundColor: "rgba(255, 237, 0, 0.1)",
        pointBackgroundColor: "#e18104",
        pointBorderColor: "orange",
        pointRadius: 5,
        tension: 0.3,
      },
    ],
  });

  const [barChartData, setBarChartData] = useState<ChartData<"bar">>({
    labels: [],
    datasets: [
      {
        label: "Energy Generated",
        data: [],
        backgroundColor: "rgba(255, 237, 0, 0.1)",
        borderColor: "#ffed00",
        borderWidth: 1,
      },
    ],
  });

  const [doughnutChartData, setDoughnutChartData] = useState<
    ChartData<"doughnut">
  >({
    labels: [],
    datasets: [
      {
        label: "Energy Generated",
        data: [],
        backgroundColor: ["#ffce56", "#ff9f40"],
        hoverBackgroundColor: ["#ffce56", "#ff9f40"],
      },
    ],
  });

  useEffect(() => {
    const labels = energyData.map((item) =>
      new Date(item.date).toLocaleDateString()
    );
    const data = stats;

    setLineChartData({
      labels,
      datasets: [
        {
          ...lineChartData.datasets[0],
          data,
        },
      ],
    });

    setBarChartData({
      labels,
      datasets: [
        {
          ...barChartData.datasets[0],
          data,
        },
      ],
    });

    setDoughnutChartData({
      labels,
      datasets: [
        {
          ...doughnutChartData.datasets[0],
          data,
        },
      ],
    });
  }, [stats]);

  return (
    <div>
      {chartType === "line" && (
        <div className="bg-gradient-to-r from-yellow-50 via-orange-200 to-yellow-100 p-4 rounded-lg shadow-md h-60  flex justify-center">
          {" "}
          <Line data={lineChartData} options={lineOptions} />
        </div>
      )}
      {chartType === "bar" && (
        <div className="bg-gradient-to-r from-yellow-50 via-orange-200 to-yellow-100 p-4 rounded-lg shadow-md h-60  flex justify-center">
          {" "}
          <Bar data={barChartData} options={barOptions} />
        </div>
      )}
      {chartType === "doughnut" && (
        <div className="bg-gradient-to-r from-yellow-50 via-orange-200 to-yellow-100 p-4 rounded-lg shadow-md h-60">
          <Doughnut data={doughnutChartData} options={doughnutOptions} />{" "}
        </div>
      )}

      <div className="p-1 m-t10 bg-slate-400 gap-1 flex justify-around rounded-sm">
        <Button2  onClick={() => setChartType("line")} label="Line Chart">
          Line Chart
        </Button2>
        <Button2 onClick={() => setChartType("bar")} label="Bar Chart">
          Bar Chart
        </Button2>
        <Button2
          onClick={() => setChartType("doughnut")}
          label="Doughnut Cahrt"
        >
          Doughnut Chart
        </Button2>
      </div>
    </div>
  );
};

interface EnergyData {
  date: string;
  energyGenerated: number;
}

interface IbuttonProps {
  onClick: () => void;
  label: string;
  children: React.ReactNode;
  
}

const Button2: React.FC<IbuttonProps> = ({ onClick, label }) => {
  return <button onClick={onClick}>{label}</button>;
};

export default LinesChart;
