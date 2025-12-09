import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function ScanChart({ result }) {
  
   // Regroupement par gravité
   const riskCount = {};
   const alertsByRisk = {};

  result.forEach((item) => {
    riskCount[item.risk] = (riskCount[item.risk] || 0) + 1;

    if (!alertsByRisk[item.risk]) {
      alertsByRisk[item.risk] = []; 
    }
    alertsByRisk[item.risk].push(item.alert);
  });

 // Préparation des données pour le pie
 const data = {
    labels: Object.keys(riskCount),
    datasets: [
      {
        data: Object.values(riskCount),
        backgroundColor: ['#ff6384', '#ff9f40', '#ffcd56', '#4bc0c0', '#36a2eb', '#9966ff', '#c9cbff'],
      },
    ],
  };

  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label;
            const count = context.parsed;
            const alerts = alertsByRisk[label].join(', ');
            return `${label}: ${count}. Alertes : ${alerts}`;
          },
        },
      },
    },
  };
  
  return  <Pie data={data} options={options} />;
}

export default ScanChart;
