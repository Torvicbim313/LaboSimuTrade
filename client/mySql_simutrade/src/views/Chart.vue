
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
          const response = await fetch("https://labosimutrade-1.onrender.com/api/whales-data/all");
          const data = await response.json();
  
          // Extrae etiquetas y valores
          const labels = data.map((record) => record.FECHA.replace("T", " ").replace(".000Z", ""));
          const btcValues = data.map((record) => record.BTC);
          const prices = data.map((record) => record.PRECIO_COMPRA);
          
          // Datos para resaltar ventas en la línea de precios
          const sales = data.map((record) => record.VENTA);
          const pointSizes = sales.map((sell) => (sell ? 5 : 2)); // Puntos más grandes en ventas
          const pointColors = sales.map((sell) => (sell ? "red" : "#2196F3")); // Rojo para ventas, azul para el resto
  
          return { labels, btcValues, prices, pointSizes, pointColors };
        } catch (error) {
          console.error("Error fetching data:", error);
          return { labels: [], btcValues: [], prices: [], pointSizes: [], pointColors: [] };
        }
      };
  
      const renderChart = async () => {
        const ctx = chartRef.value.getContext("2d");
        const { labels, btcValues, prices, pointSizes, pointColors } = await fetchData();
  
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
                label: "BTC Price",
                data: prices, // 📌 Línea de precios
                borderColor: "#2196F3",
                backgroundColor: "rgba(33, 150, 243, 0.2)",
                yAxisID: "yPrices",
                pointRadius: pointSizes, // 🔴 Resaltar ventas con puntos más grandes
                pointBackgroundColor: pointColors, // 🔴 Rojo para ventas, azul normal
                pointBorderWidth: 1,
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
                title: { display: true, text: "BTC Value" },
              },
              yPrices: {
                type: "linear",
                position: "right",
                title: { display: true, text: "Prices (USDC)" },
                grid: { drawOnChartArea: false }, // Evita que se solapen las escalas
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
  
  
  