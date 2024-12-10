import connectDB from './src/database/dbConnection.js';
import express from 'express';
import scrapeData from './src/scrapers/scrapeData.js';
import dailyWhalesDataWriter from './src/services/dailyWhalesDataWriter.js';


const app = express();
const port = 3000;



app.get('/', (req, res) => {
  res.send('Simutrade MySQL working');
});

app.listen(port, () => console.log(`Servidor escuchando en el puerto ${port}`));

app.get('/ultimo-registro', async (req, res) => {
  const query = 'SELECT * FROM trading_data ORDER BY ID DESC LIMIT 1';

  try {
    // Llama a la función connectDB para obtener la conexión o el pool
    const db = await connectDB();
    // Usa el método query para ejecutar la consulta
    const [results] = await db.query(query);
    console.log('Último registro:', results);
    res.json(results); // Envía el resultado como JSON
  } catch (error) {
    console.error('Error al obtener el último registro:', error);
    res.status(500).send('Error al obtener el último registro');
  }
});


await dailyWhalesDataWriter()

  

