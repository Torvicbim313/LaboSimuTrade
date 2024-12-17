import connectDB from './src/database/dbConnection.js';
import express from 'express';
import scrapeData from './src/scrapers/scrapeData.js';
import dailyWhalesDataWriter from './src/services/dailyWhalesDataWriter.js';
import { startdailyWhalesDataWriter } from './src/utils/startDailyWhalesDifference.js';
import whalesDataAndPricesRoutes from '../server/routes/whalesDataAndPricesRoutes.js'


const app = express();
const port = process.env.PORT || 3300;



app.get('/', (req, res) => {
  res.send('Simutrade MySQL working');
});

app.use(express.json());
app.use('/api/whales-data', whalesDataAndPricesRoutes);

app.listen(port, () => console.log(`Servidor escuchando en el puerto ${port}`));

// app.get('/ultimo-registro', async (req, res) => {
//   const query = 'SELECT * FROM trading_data ORDER BY ID DESC LIMIT 1';

//   try {
//     // Llama a la función connectDB para obtener la conexión o el pool
//     const db = await connectDB();
//     // Usa el método query para ejecutar la consulta
//     const [results] = await db.query(query);
//     console.log('Último registro:', results);
//     res.json(results); // Envía el resultado como JSON
//   } catch (error) {
//     console.error('Error al obtener el último registro:', error);
//     res.status(500).send('Error al obtener el último registro');
//   }
// });


await dailyWhalesDataWriter()

startdailyWhalesDataWriter()


app.get('/ping', (req, res) => {
  res.status(200).send('Ping OK');
});


const pingInterval = 5 * 60 * 1000; // Intervalo de ping en milisegundos (5 minutos)

// Realizar un ping interno cada cierto intervalo
setInterval(async () => {
  try {
    // Realiza una solicitud de ping interno a tu propia aplicación
    const response = await axios.get('https://simutrade-mysql.onrender.com/ping'); // Ajusta la URL según tu configuración
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

  

