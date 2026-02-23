
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Title, Tooltip, Legend } from "chart.js";

import { Card } from "flowbite-react";

ChartJS.register(ArcElement, Title, Tooltip, Legend);
interface props {
  labels: string[];
  colors: string[];
  data: number[];
  label: string;
}

export const DonaGraficoCard = (props: props) => {
  const { data, label, labels, colors } = props;
  return (
    <Card className="">
      <h5 className="text-lg tracking-tight text-gray-900 ">
        {label}
      </h5>
      <div className="max-h-48 mx-auto">
        <Doughnut
          data={{
            labels: labels,
            datasets: [
              {
                label: label,
                data: data,
                backgroundColor: colors,
                hoverOffset: 20,
              },
            ],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: true, // Ensure this is true or omitted (default is true)
          }}
        />
      </div>
    </Card>
  );
};
