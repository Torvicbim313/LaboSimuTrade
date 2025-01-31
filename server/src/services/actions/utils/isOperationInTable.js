import connectDB from "../../../database/dbConnection.js";

const isOperationInTable = async (tableName) => {
  try {
    const db = await connectDB();
    const [rows] = await db.query(
      `SELECT accion FROM ?? ORDER BY id DESC LIMIT 1`, 
      [tableName]
    );

    return rows.length > 0 ? rows[0].accion : null;
  } catch (error) {
    console.error(`Error obteniendo la última acción de la tabla ${tableName}:`, error);
    return null;
  }
};

export default isOperationInTable;
