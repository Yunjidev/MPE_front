/* eslint-disable react/no-unescaped-entities */
import ApexCharts from 'react-apexcharts';

const UsersCard = () => {
  const options = {
    chart: {
      height: '100%',
      maxWidth: '100%',
      type: 'area',
      fontFamily: 'Inter, sans-serif',
      dropShadow: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    tooltip: {
      enabled: true,
      x: {
        show: false,
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        opacityFrom: 0.55,
        opacityTo: 0,
        shade: '#1C64F2',
        gradientToColors: ['#1C64F2'],
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 6,
    },
    grid: {
      show: false,
      strokeDashArray: 4,
      padding: {
        left: 2,
        right: 2,
        top: 0,
      },
    },
    series: [
      {
        name: 'Réservations',
        data: [1, 5, 2, 0, 8, 0],
        color: '#67FFCC',
      },
    ],
    xaxis: {
      categories: [
        '01 Février',
        '02 Février',
        '03 Février',
        '04 Février',
        '05 Février',
        '06 Février',
        '07 Février',
      ],
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: false,
    },
  };

  return (
    <div className="max-w-sm w-full rounded-lg shadow bg-neutral-800 border border-[#67FFCC] p-4 md:p-6">
      <div className="flex justify-between">
        <div>
          <h5 className="leading-none text-3xl font-bold text-white pb-2">16</h5>
          <p className="text-base font-normal text-gray-400">Réservations cette semaine</p>
        </div>
        <div className="flex items-center px-2.5 py-0.5 text-base font-semibold text-green-500 text-center">
          12%
          <svg
            className="w-3 h-3 ms-1"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13V1m0 0L1 5m4-4 4 4"
            />
          </svg>
        </div>
      </div>
      <div id="area-chart">
        <ApexCharts options={options} series={options.series} type="area" height={200} />
      </div>
    </div>
  );
};

export default UsersCard;
