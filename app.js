import express from 'express';
import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3000;

// Configuración de la base de datos
const dbConfig = {
  host: 'mysql-1f93d229-victor-recipes.l.aivencloud.com',
  port: 20659,
  user: 'avnadmin',
  password: process.env.DB_PASSWORD,
  database: 'simutrade', // Cambia aquí el nombre de la base de datos a "simutrade"
  ssl: { rejectUnauthorized: false }, // Requerido por "ssl-mode=REQUIRED"
};

// Crear la conexión
const connection = mysql.createConnection(dbConfig);

// Probar la conexión
connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
  } else {
    console.log('Conexión exitosa a la base de datos MySQL');
  }
});

app.get('/', (req, res) => {
  res.send('Simutrade MySQL working');
});

app.listen(port, () => console.log(`Servidor escuchando en el puerto ${port}`));

app.get('/ultimo-registro', (req, res) => {
    const query = 'SELECT * FROM trading_data ORDER BY ID DESC LIMIT 1';
  
    connection.query(query, (error, results) => {
      if (error) {
        console.error('Error al obtener el último registro:', error);
        res.status(500).send('Error al obtener el último registro');
      } else {
        console.log('Último registro:', results);
        res.json(results); // Envía el resultado como JSON
      }
    });
  });
  
