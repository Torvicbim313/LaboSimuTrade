<template>
    <div class="flex justify-center items-center w-full h-screen bg-gray-50">
      <div class="w-full h-full p-6 bg-white rounded-lg shadow-md">
        <canvas id="chart"></canvas>
      </div>
    </div>
  </template>
  
  <script>
  import { onMounted, ref } from "vue";
  import Chart from "chart.js/auto";
  
  export default {
    name: "Chart",
    setup() {
      const chartRef = ref(null);
  
      const fetchData = async () => {
        try {
          const response = await fetch("https://simutrade-mysql.onrender.com/api/whales-data/all");
          const data = await response.json();
  
          // Extrae las etiquetas y valores de los datos
          const labels = data.map((record) => record.FECHA.replace("T", " ").replace(".000Z", ""));
          const btcValues = data.map((record) => record.BTC);
          const prices = data.map((record) => record.PRECIO_COMPRA);
  
          return { labels, btcValues, prices };
        } catch (error) {
          console.error("Error fetching data:", error);
          return { labels: [], btcValues: [], prices: [] };
        }
      };
  
      const renderChart = async () => {
        const ctx = chartRef.value.getContext("2d");
        const { labels, btcValues, prices } = await fetchData();
  
        new Chart(ctx, {
          type: "line",
          data: {
            labels,
            datasets: [
              {
                label: "BTC Value",
                data: btcValues,
                borderColor: "#4CAF50",
                backgroundColor: "rgba(76, 175, 80, 0.2)",
                yAxisID: "yBTC",
              },
              {
                label: "Prices",
                data: prices,
                borderColor: "#2196F3",
                backgroundColor: "rgba(33, 150, 243, 0.2)",
                yAxisID: "yPrices",
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              yBTC: {
                type: "linear",
                position: "left",
                title: {
                  display: true,
                  text: "BTC Value",
                },
              },
              yPrices: {
                type: "linear",
                position: "right",
                title: {
                  display: true,
                  text: "Prices (USDC)",
                },
                grid: {
                  drawOnChartArea: false, // Evita que se solapen las escalas
                },
              },
            },
          },
        });
      };
  
      onMounted(() => {
        chartRef.value = document.getElementById("chart");
        renderChart();
      });
    },
  };
  </script>
  
  <style>
  /* Estilos personalizados si son necesarios */
  </style>
  