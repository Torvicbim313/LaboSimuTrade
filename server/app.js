import express from 'express';
import { startdailyWhalesDataWriter, startdailyWhalesDataWriterAfternoons } from './src/utils/startDailyWhalesDifference.js';
import whalesDataAndPricesRoutes from './src/routes/whalesDataAndPricesRoutes.js'
import whalesDataAndPricesAfternoonsRoutes from './src/routes/whalesDataAndPricesAfternoonsRoutes.js'
import afternoons2_2Route from './src/routes/afternoons2_2Route.js';
import axios from 'axios';
import cors from 'cors';
import { eventEmitter } from './src/utils/eventEmitter.js';
import sellListeners from './src/services/actions/listeners/sellListeners.js';
import buyListeners from './src/services/actions/listeners/buyListeners.js';
import scrapeStrategicEthReserve from './src/services/scrapers/scrapeStrategicEthReserve.js';
import showGasPrice from './src/services/scrapers/etherGas/etherGas.js';


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('client'));


const port = process.env.PORT || 3300;



app.get('/', (req, res) => {
  res.send('Simutrade MySQL working');
});

app.use('/api/whales-data', whalesDataAndPricesRoutes);
app.use('/api/whales-data-afternoons', whalesDataAndPricesAfternoonsRoutes);
app.use('/api/2_2afternoons', afternoons2_2Route);


app.listen(port, () => console.log(`Servidor escuchando en el puerto ${port}`));


// console.log("sacando el precio del gas de la red Ethereum...");
// showGasPrice();

// const ethReserve = await scrapeStrategicEthReserve()

// console.log('ETH Reserve:', ethReserve);
// await dailyWhalesDataWriter()

startdailyWhalesDataWriter();

// startdailyWhalesDataWriterAfternoons();

sellListeners();

buyListeners();

// eventEmitter.emit('highTradeSignal',103000)
// eventEmitter.emit('highTradeSignalWeth130', 5000)



app.get('/ping', (req, res) => {
  res.status(200).send('Ping OK');
});


const pingInterval = 5 * 60 * 1000; // Intervalo de ping en milisegundos (5 minutos)

// Realizar un ping interno cada cierto intervalo
setInterval(async () => {
  try {
    // Realiza una solicitud de ping interno a tu propia aplicación
    const response = await axios.get('https://labosimutrade-1.onrender.com/ping'); // Ajusta la URL según tu configuración
    if (response.status === 200 && response.data === 'Ping OK') {
      console.log('Ping interno exitoso. La aplicación está activa.');
    } else {
      console.error('Error en el ping interno. La aplicación puede estar inactiva.');
      // Toma medidas para reiniciar la aplicación o notificar si algo sale mal
    }
  } catch (error) {
    console.error('Error en el ping interno:', error.message);
    // Maneja cualquier error que pueda ocurrir durante el ping
  }
}, pingInterval);

  

