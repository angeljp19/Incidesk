
import {
  Chart as ChartJS,
  CategoryScale, // Eje X (Etiquetas de tiempo)
  LinearScale, // Eje Y (Valores numéricos)
  PointElement, // Puntos que componen la línea
  LineElement, // El tipo de elemento principal (la línea)
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2"; // 👈 Importar el componente Line

import { Card } from "flowbite-react";

// 👈 REGISTRO ACTUALIZADO
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface props {
    label: string,
    labels: string[],
    data1: number[],
    data2: number[]
}

export const TendenciaGraficoCard = (props: props) => {
    
    const {labels, data1, data2, label} = props
    const chartData = {
        labels: labels,
        datasets: [
            {
                label: "Tickets CREADOS",
                data: data1, 
                borderColor: 'rgb(255, 99, 132)', 
                backgroundColor: 'rgba(255, 99, 132, 0.5)', 
                tension: 0.4, 
                borderWidth: 3,
            },
            {
                label: "Tickets CERRADOS",
                data: data2, 
                borderColor: 'rgb(53, 162, 235)', 
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
                tension: 0.4,
                borderWidth: 3,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: false,
            },
        },
        scales: {
            y: {
                beginAtZero: true, 
                title: {
                    display: true,
                    text: 'Volumen de Tickets'
                }
            }
        }
    };
    
    return (
        <Card className="md:col-span-2">
            <h5 className="text-lg tracking-tight text-gray-900 ">{label}</h5>
            <div className="h-[280px] ">
                <Line style={{flexGrow: 1}} data={chartData} options={chartOptions} />
            </div>
        </Card>
    );
};