import React from "react";
import styles from "./AreaChart.module.css"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
  } from 'chart.js';

import { Line } from 'react-chartjs-2';


const AreaChart= ({data}) => {
    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Filler,
        Legend
      );
    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top' as const,
          },
        },
    };
    return (
        <div className={styles.mainContainer}>
            <Line options={options} data={data} />
        </div>
    )
}
export default AreaChart;