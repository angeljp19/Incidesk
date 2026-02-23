
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale, // Eje X
  LinearScale, // Eje Y
  BarElement, // Tipo de elemento (la barra)
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Card } from "flowbite-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface props {
  labels: string[];
  colors: string[];
  data: number[];
  label: string;
  indexAxis: "x" | "y";
}

export const BarraGraficoCard = (props: props) => {
  const { labels, data, label, colors, indexAxis } = props;
  return (
    <Card className="justify-between">
      <div className="size-full">
        <h5 className="text-lg tracking-tight text-gray-900 ">{label}</h5>
      <Bar
        data={{
          labels: labels,
          datasets: [
            {
              label: "",
              data: data,
              backgroundColor: colors,
            },
          ],
        }}
        options={{
          plugins: {
            legend: {
              display: false,
            },
          },
          indexAxis: indexAxis,
        }}
      />
      </div>
      
    </Card>
  );
};
