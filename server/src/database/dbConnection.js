import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

// Configuración de conexión
const dbConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
};

// Crear conexión
const connectDB = async () => {
  try {
    const connection = mysql.createPool(dbConfig);
    console.log('Conexión exitosa a la base de datos DE AIVEN.');
    return connection;
  } catch (error) {
    console.error('Error al conectar a la base de datos DE AIVEN:', error.message);
    throw error;
  }
};

export default connectDB;
