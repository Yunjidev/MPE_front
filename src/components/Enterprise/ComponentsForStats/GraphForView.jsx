import { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const dataOptions = {
  day: {
    labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
    data: [12, 19, 3, 5, 2, 3, 9],
  },
  month: {
    labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil'],
    data: [65, 59, 80, 81, 56, 55, 40],
  },
  year: {
    labels: ['2020', '2021', '2022', '2023', '2024'],
    data: [300, 450, 700, 600, 800],
  },
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
      labels: {
        color: 'white',
      },
    },
    title: {
      display: true,
      text: 'Nombre de vues par page au fil du temps',
      color: 'white',
    },
  },
  scales: {
    x: {
      ticks: {
        color: 'white',
      },
      grid: {
        color: 'rgba(255, 255, 255, 0.2)',
      },
    },
    y: {
      ticks: {
        color: 'white',
      },
      grid: {
        color: 'rgba(255, 255, 255, 0.2)',
      },
    },
  },
};

export default function ViewsChart() {
  const [timeFrame, setTimeFrame] = useState('month');

  const data = {
    labels: dataOptions[timeFrame].labels,
    datasets: [
      {
        label: 'Nombre de vues',
        data: dataOptions[timeFrame].data,
        borderColor: 'rgba(103, 255, 204, 1)',
        backgroundColor: 'rgba(103, 255, 204, 0.2)',
        fill: true,
      },
    ],
  };

  return (
    <div className="bg-neutral-700 p-6 rounded-lg">
      <div className="flex h-full justify-center mb-4">
        <button onClick={() => setTimeFrame('day')} className="mx-2 px-4 py-2 bg-gray-700 text-white rounded">Jour</button>
        <button onClick={() => setTimeFrame('month')} className="mx-2 px-4 py-2 bg-gray-700 text-white rounded">Mois</button>
        <button onClick={() => setTimeFrame('year')} className="mx-2 px-4 py-2 bg-gray-700 text-white rounded">Année</button>
      </div>
      <Line data={data} options={options} height={168} />
    </div>
  );
}